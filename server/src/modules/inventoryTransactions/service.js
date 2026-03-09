const createCrudService = require('../common/crudService');

module.exports = createCrudService({
  table: 'InventoryTransactions',
  allowedFilters: ['TransactionType', 'ReferenceType']
});
