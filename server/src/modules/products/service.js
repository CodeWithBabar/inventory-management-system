const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'Products',
  allowedFilters: ['Name', 'SKU']
});
