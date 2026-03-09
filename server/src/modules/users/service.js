const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'Users',
  allowedFilters: ['FullName', 'Email']
});
