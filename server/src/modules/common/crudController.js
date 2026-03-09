const asyncHandler = require('../../utils/asyncHandler');

const createCrudController = (service) => ({
  list: asyncHandler(async (req, res) => {
    const result = await service.list(req.query);
    res.json(result);
  }),
  getById: asyncHandler(async (req, res) => {
    const result = await service.getById(req.params.id);
    res.json(result);
  }),
  create: asyncHandler(async (req, res) => {
    const result = await service.create(req.body);
    res.status(201).json(result);
  }),
  update: asyncHandler(async (req, res) => {
    const result = await service.update(req.params.id, req.body);
    res.json(result);
  }),
  remove: asyncHandler(async (req, res) => {
    const result = await service.remove(req.params.id);
    res.json(result);
  })
});

module.exports = createCrudController;
