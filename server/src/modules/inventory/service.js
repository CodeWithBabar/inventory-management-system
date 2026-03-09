const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'Inventory',
  allowedFilters: ['WarehouseId', 'ProductId']
});
