const { body } = require('express-validator');
const validate = require('../../middleware/validate');

module.exports = [body().isObject(), validate];
