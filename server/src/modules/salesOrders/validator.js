const { body } = require('express-validator');
const validate = require('../../middleware/validate');

const create = [
  body('CustomerId').isInt(),
  body('WarehouseId').isInt(),
  body('OrderDate').notEmpty(),
  body('Items').isArray({ min: 1 }),
  validate
];

module.exports = { create };
