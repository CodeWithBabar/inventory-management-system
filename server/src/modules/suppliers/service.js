const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'Suppliers',
  allowedFilters: ['Name', 'Email']
});
