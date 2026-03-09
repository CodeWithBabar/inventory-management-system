const express = require('express');

const authRoutes = require('./auth.routes');
const moduleRoutes = require('./module.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/modules', moduleRoutes);

module.exports = router;
