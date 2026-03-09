const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'Roles',
  allowedFilters: ['Name']
});
