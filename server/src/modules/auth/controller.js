const asyncHandler = require('../../utils/asyncHandler');
const service = require('./service');

const register = asyncHandler(async (req, res) => {
  const result = await service.register(req.body);
  res.status(201).json(result);
});

const login = asyncHandler(async (req, res) => {
  const result = await service.login(req.body);
  res.json(result);
});

module.exports = { register, login };
