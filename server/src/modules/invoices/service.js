const createCrudService = require('../common/crudService');
const ApiError = require('../../utils/ApiError');
const { getPool } = require('../../config/db');

const baseService = createCrudService({ table: 'Invoices', allowedFilters: ['Status'] });

const create = async ({ SalesOrderId, InvoiceDate, TotalAmount }) => {
  const pool = await getPool();
  const existing = await pool.request().input('SalesOrderId', SalesOrderId).query('SELECT Id FROM Invoices WHERE SalesOrderId = @SalesOrderId');
  if (existing.recordset[0]) {
    throw new ApiError(400, 'An invoice already exists for this sales order');
  }

  return baseService.create({ SalesOrderId, InvoiceDate, TotalAmount, PaidAmount: 0, Status: 'Unpaid' });
};

module.exports = { ...baseService, create };
