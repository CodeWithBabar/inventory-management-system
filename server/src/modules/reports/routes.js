const express = require('express');
const controller = require('./controller');

const router = express.Router();
router.get('/dashboard', controller.dashboard);
router.get('/low-stock', controller.lowStock);
router.get('/sales-summary', controller.salesSummary);

module.exports = router;
