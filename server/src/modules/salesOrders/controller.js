const asyncHandler = require('../../utils/asyncHandler');
const service = require('./service');

module.exports = {
  list: asyncHandler(async (req, res) => res.json(await service.list(req.query))),
  getById: asyncHandler(async (req, res) => res.json(await service.getById(req.params.id))),
  create: asyncHandler(async (req, res) => res.status(201).json(await service.create(req.body))),
  dispatch: asyncHandler(async (req, res) => res.json(await service.dispatch(req.params.id)))
};
