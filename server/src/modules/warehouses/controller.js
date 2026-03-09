const createCrudController = require('../common/crudController');
const service = require('./service');

module.exports = createCrudController(service);
