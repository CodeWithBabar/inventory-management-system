const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'RolePermissions',
  allowedFilters: ['RoleId', 'PermissionId']
});
