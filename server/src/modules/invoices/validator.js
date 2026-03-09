const { body } = require('express-validator');
const validate = require('../../middleware/validate');

module.exports = [body('SalesOrderId').isInt(), body('InvoiceDate').notEmpty(), body('TotalAmount').isFloat({ gt: 0 }), validate];
