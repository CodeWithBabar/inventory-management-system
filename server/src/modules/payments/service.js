const createCrudService = require('../common/crudService');
const { getPool, sql } = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const baseService = createCrudService({ table: 'Payments', allowedFilters: ['PaymentMethod'] });

const create = async ({ InvoiceId, PaymentDate, Amount, PaymentMethod }) => {
  const pool = await getPool();
  const tx = new sql.Transaction(pool);
  await tx.begin();
  try {
    const invoiceResult = await tx.request().input('InvoiceId', InvoiceId).query('SELECT * FROM Invoices WHERE Id = @InvoiceId');
    const invoice = invoiceResult.recordset[0];
    if (!invoice) throw new ApiError(404, 'Invoice not found');

    const nextPaidAmount = Number(invoice.PaidAmount || 0) + Number(Amount);
    if (nextPaidAmount > Number(invoice.TotalAmount)) {
      throw new ApiError(400, 'Payment exceeds invoice outstanding amount');
    }

    const paymentResult = await tx
      .request()
      .input('InvoiceId', InvoiceId)
      .input('PaymentDate', PaymentDate)
      .input('Amount', Amount)
      .input('PaymentMethod', PaymentMethod)
      .query('INSERT INTO Payments (InvoiceId, PaymentDate, Amount, PaymentMethod) OUTPUT INSERTED.* VALUES (@InvoiceId, @PaymentDate, @Amount, @PaymentMethod)');

    const status = nextPaidAmount === Number(invoice.TotalAmount) ? 'Paid' : nextPaidAmount > 0 ? 'Partially Paid' : 'Unpaid';
    await tx
      .request()
      .input('Id', InvoiceId)
      .input('PaidAmount', nextPaidAmount)
      .input('Status', status)
      .query('UPDATE Invoices SET PaidAmount = @PaidAmount, Status = @Status WHERE Id = @Id');

    await tx.commit();
    return paymentResult.recordset[0];
  } catch (error) {
    await tx.rollback();
    throw error;
  }
};

module.exports = { ...baseService, create };
