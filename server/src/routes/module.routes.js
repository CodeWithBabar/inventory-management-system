const express = require('express');

const { listModules } = require('../controllers/module.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authenticate, listModules);

module.exports = router;
