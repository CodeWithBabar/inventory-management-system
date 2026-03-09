const { getPool } = require('../../config/db');

const dashboard = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT COUNT(*) AS totalProducts FROM Products;
    SELECT COUNT(*) AS totalCustomers FROM Customers;
    SELECT COUNT(*) AS pendingPurchaseOrders FROM PurchaseOrders WHERE Status = 'Pending';
    SELECT COUNT(*) AS pendingSalesOrders FROM SalesOrders WHERE Status = 'Pending';
  `);
  return {
    totalProducts: result.recordsets[0][0].totalProducts,
    totalCustomers: result.recordsets[1][0].totalCustomers,
    pendingPurchaseOrders: result.recordsets[2][0].pendingPurchaseOrders,
    pendingSalesOrders: result.recordsets[3][0].pendingSalesOrders
  };
};

const lowStock = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT p.Id, p.Name, p.ReorderLevel, i.Quantity, i.WarehouseId
    FROM Inventory i
    INNER JOIN Products p ON i.ProductId = p.Id
    WHERE i.Quantity <= p.ReorderLevel
    ORDER BY i.Quantity ASC
  `);
  return result.recordset;
};

const salesSummary = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT CAST(OrderDate AS DATE) AS SalesDate, SUM(d.Quantity * d.UnitPrice) AS SalesAmount
    FROM SalesOrders s
    INNER JOIN SalesOrderDetails d ON s.Id = d.SalesOrderId
    GROUP BY CAST(OrderDate AS DATE)
    ORDER BY SalesDate DESC
  `);
  return result.recordset;
};

module.exports = { dashboard, lowStock, salesSummary };
