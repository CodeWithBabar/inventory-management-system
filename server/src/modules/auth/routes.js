const express = require('express');
const controller = require('./controller');
const validator = require('./validator');

const router = express.Router();

router.post('/register', validator.register, controller.register);
router.post('/login', validator.login, controller.login);

module.exports = router;
