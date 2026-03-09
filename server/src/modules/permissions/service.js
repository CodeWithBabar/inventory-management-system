const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'Permissions',
  allowedFilters: ['Name']
});
