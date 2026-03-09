const asyncHandler = require('../../utils/asyncHandler');
const service = require('./service');

module.exports = {
  dashboard: asyncHandler(async (req, res) => res.json(await service.dashboard())),
  lowStock: asyncHandler(async (req, res) => res.json(await service.lowStock())),
  salesSummary: asyncHandler(async (req, res) => res.json(await service.salesSummary()))
};
