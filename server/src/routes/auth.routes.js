const express = require('express');

const { login, profile } = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/login', login);
router.get('/me', authenticate, profile);

module.exports = router;
