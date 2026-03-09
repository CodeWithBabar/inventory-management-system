const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'Deliveries',
  allowedFilters: ['Status']
});
