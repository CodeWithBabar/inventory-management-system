const { body } = require('express-validator');
const validate = require('../../middleware/validate');

const register = [
  body('FullName').notEmpty(),
  body('Email').isEmail(),
  body('Password').isLength({ min: 6 }),
  validate
];

const login = [body('Email').isEmail(), body('Password').notEmpty(), validate];

module.exports = { register, login };
