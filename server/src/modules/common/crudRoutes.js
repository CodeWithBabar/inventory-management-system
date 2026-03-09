const express = require('express');

const createCrudRoutes = (controller, validator = []) => {
  const router = express.Router();
  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.post('/', validator, controller.create);
  router.put('/:id', validator, controller.update);
  router.delete('/:id', controller.remove);
  return router;
};

module.exports = createCrudRoutes;
