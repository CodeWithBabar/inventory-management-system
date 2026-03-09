const express = require('express');
const controller = require('./controller');
const validator = require('./validator');

const router = express.Router();
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', validator.create, controller.create);
router.post('/:id/dispatch', controller.dispatch);
module.exports = router;
