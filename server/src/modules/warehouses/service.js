const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'Warehouses',
  allowedFilters: ['Name', 'Location']
});
