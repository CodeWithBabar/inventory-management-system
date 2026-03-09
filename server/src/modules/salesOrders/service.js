const { getPool, sql } = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { getPagination } = require('../../utils/pagination');

const list = async (query) => {
  const pool = await getPool();
  const { page, limit, offset } = getPagination(query);
  const result = await pool
    .request()
    .input('offset', offset)
    .input('limit', limit)
    .query(`SELECT * FROM SalesOrders ORDER BY Id DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY; SELECT COUNT(*) AS total FROM SalesOrders;`);
  return { data: result.recordsets[0], pagination: { page, limit, total: result.recordsets[1][0].total } };
};

const getById = async (id) => {
  const pool = await getPool();
  const order = await pool.request().input('id', id).query('SELECT * FROM SalesOrders WHERE Id = @id');
  if (!order.recordset[0]) throw new ApiError(404, 'Sales order not found');
  const details = await pool.request().input('id', id).query('SELECT * FROM SalesOrderDetails WHERE SalesOrderId = @id');
  return { ...order.recordset[0], details: details.recordset };
};

const create = async ({ CustomerId, WarehouseId, OrderDate, Status, Items = [] }) => {
  const pool = await getPool();
  const tx = new sql.Transaction(pool);
  await tx.begin();
  try {
    const orderResult = await tx
      .request()
      .input('CustomerId', CustomerId)
      .input('WarehouseId', WarehouseId)
      .input('OrderDate', OrderDate)
      .input('Status', Status || 'Pending')
      .query(`INSERT INTO SalesOrders (CustomerId, WarehouseId, OrderDate, Status) OUTPUT INSERTED.* VALUES (@CustomerId, @WarehouseId, @OrderDate, @Status)`);
    const order = orderResult.recordset[0];

    for (const item of Items) {
      await tx
        .request()
        .input('SalesOrderId', order.Id)
        .input('ProductId', item.ProductId)
        .input('Quantity', item.Quantity)
        .input('UnitPrice', item.UnitPrice)
        .query(`INSERT INTO SalesOrderDetails (SalesOrderId, ProductId, Quantity, UnitPrice) VALUES (@SalesOrderId, @ProductId, @Quantity, @UnitPrice)`);
    }

    await tx.commit();
    return getById(order.Id);
  } catch (error) {
    await tx.rollback();
    throw error;
  }
};

const dispatch = async (id) => {
  const pool = await getPool();
  const tx = new sql.Transaction(pool);
  await tx.begin();
  try {
    const orderResult = await tx.request().input('id', id).query('SELECT * FROM SalesOrders WHERE Id = @id');
    const order = orderResult.recordset[0];
    if (!order) throw new ApiError(404, 'Sales order not found');

    const detailsResult = await tx.request().input('id', id).query('SELECT ProductId, Quantity FROM SalesOrderDetails WHERE SalesOrderId = @id');

    for (const item of detailsResult.recordset) {
      const invResult = await tx
        .request()
        .input('WarehouseId', order.WarehouseId)
        .input('ProductId', item.ProductId)
        .query('SELECT Quantity FROM Inventory WHERE WarehouseId = @WarehouseId AND ProductId = @ProductId');
      const available = invResult.recordset[0]?.Quantity || 0;
      if (available < item.Quantity) {
        throw new ApiError(400, `Insufficient inventory for product ${item.ProductId}`);
      }

      await tx
        .request()
        .input('WarehouseId', order.WarehouseId)
        .input('ProductId', item.ProductId)
        .input('Qty', item.Quantity)
        .query('UPDATE Inventory SET Quantity = Quantity - @Qty WHERE WarehouseId = @WarehouseId AND ProductId = @ProductId');

      await tx
        .request()
        .input('WarehouseId', order.WarehouseId)
        .input('ProductId', item.ProductId)
        .input('Quantity', item.Quantity)
        .input('TransactionType', 'OUT')
        .input('ReferenceType', 'SALES_ORDER')
        .input('ReferenceId', order.Id)
        .query('INSERT INTO InventoryTransactions (WarehouseId, ProductId, Quantity, TransactionType, ReferenceType, ReferenceId) VALUES (@WarehouseId, @ProductId, @Quantity, @TransactionType, @ReferenceType, @ReferenceId)');
    }

    await tx.request().input('id', id).query("UPDATE SalesOrders SET Status = 'Dispatched' WHERE Id = @id");
    await tx.commit();
    return getById(id);
  } catch (error) {
    await tx.rollback();
    throw error;
  }
};

module.exports = { list, getById, create, dispatch };
