const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'Customers',
  allowedFilters: ['FullName', 'Email']
});
