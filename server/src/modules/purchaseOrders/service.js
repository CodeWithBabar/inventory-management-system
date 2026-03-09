const { getPool, sql } = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { getPagination } = require('../../utils/pagination');

const list = async (query) => {
  const pool = await getPool();
  const { page, limit, offset } = getPagination(query);
  const req = pool.request().input('offset', offset).input('limit', limit);
  const result = await req.query(`
    SELECT * FROM PurchaseOrders ORDER BY Id DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
    SELECT COUNT(*) AS total FROM PurchaseOrders;
  `);
  return { data: result.recordsets[0], pagination: { page, limit, total: result.recordsets[1][0].total } };
};

const getById = async (id) => {
  const pool = await getPool();
  const order = await pool.request().input('id', id).query('SELECT * FROM PurchaseOrders WHERE Id = @id');
  if (!order.recordset[0]) throw new ApiError(404, 'Purchase order not found');
  const details = await pool.request().input('id', id).query('SELECT * FROM PurchaseOrderDetails WHERE PurchaseOrderId = @id');
  return { ...order.recordset[0], details: details.recordset };
};

const create = async ({ SupplierId, WarehouseId, OrderDate, Status, Items = [] }) => {
  const pool = await getPool();
  const tx = new sql.Transaction(pool);
  await tx.begin();
  try {
    const orderResult = await tx
      .request()
      .input('SupplierId', SupplierId)
      .input('WarehouseId', WarehouseId)
      .input('OrderDate', OrderDate)
      .input('Status', Status || 'Pending')
      .query(`INSERT INTO PurchaseOrders (SupplierId, WarehouseId, OrderDate, Status) OUTPUT INSERTED.* VALUES (@SupplierId, @WarehouseId, @OrderDate, @Status)`);
    const order = orderResult.recordset[0];

    for (const item of Items) {
      await tx
        .request()
        .input('PurchaseOrderId', order.Id)
        .input('ProductId', item.ProductId)
        .input('Quantity', item.Quantity)
        .input('UnitPrice', item.UnitPrice)
        .query(`INSERT INTO PurchaseOrderDetails (PurchaseOrderId, ProductId, Quantity, UnitPrice) VALUES (@PurchaseOrderId, @ProductId, @Quantity, @UnitPrice)`);
    }

    await tx.commit();
    return getById(order.Id);
  } catch (error) {
    await tx.rollback();
    throw error;
  }
};

const receive = async (id) => {
  const pool = await getPool();
  const tx = new sql.Transaction(pool);
  await tx.begin();
  try {
    const orderResult = await tx.request().input('id', id).query('SELECT * FROM PurchaseOrders WHERE Id = @id');
    const order = orderResult.recordset[0];
    if (!order) throw new ApiError(404, 'Purchase order not found');

    const detailsResult = await tx
      .request()
      .input('id', id)
      .query('SELECT ProductId, Quantity FROM PurchaseOrderDetails WHERE PurchaseOrderId = @id');

    for (const item of detailsResult.recordset) {
      await tx
        .request()
        .input('WarehouseId', order.WarehouseId)
        .input('ProductId', item.ProductId)
        .input('Qty', item.Quantity)
        .query(`
          MERGE Inventory AS target
          USING (SELECT @WarehouseId AS WarehouseId, @ProductId AS ProductId) AS source
          ON target.WarehouseId = source.WarehouseId AND target.ProductId = source.ProductId
          WHEN MATCHED THEN UPDATE SET Quantity = target.Quantity + @Qty
          WHEN NOT MATCHED THEN INSERT (WarehouseId, ProductId, Quantity) VALUES (@WarehouseId, @ProductId, @Qty);
        `);

      await tx
        .request()
        .input('WarehouseId', order.WarehouseId)
        .input('ProductId', item.ProductId)
        .input('Quantity', item.Quantity)
        .input('TransactionType', 'IN')
        .input('ReferenceType', 'PURCHASE_ORDER')
        .input('ReferenceId', order.Id)
        .query(`INSERT INTO InventoryTransactions (WarehouseId, ProductId, Quantity, TransactionType, ReferenceType, ReferenceId) VALUES (@WarehouseId, @ProductId, @Quantity, @TransactionType, @ReferenceType, @ReferenceId)`);
    }

    await tx.request().input('id', id).query("UPDATE PurchaseOrders SET Status = 'Received' WHERE Id = @id");
    await tx.commit();
    return getById(id);
  } catch (error) {
    await tx.rollback();
    throw error;
  }
};

module.exports = { list, getById, create, receive };
