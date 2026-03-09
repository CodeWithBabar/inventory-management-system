const { body } = require('express-validator');
const validate = require('../../middleware/validate');

module.exports = [
  body('InvoiceId').isInt(),
  body('PaymentDate').notEmpty(),
  body('Amount').isFloat({ gt: 0 }),
  body('PaymentMethod').notEmpty(),
  validate
];
