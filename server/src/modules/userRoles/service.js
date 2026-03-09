const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'UserRoles',
  allowedFilters: ['UserId', 'RoleId']
});
