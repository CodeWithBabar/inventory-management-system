const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'Categories',
  allowedFilters: ['Name']
});
