const createCrudRoutes = require('../common/crudRoutes');
const controller = require('./controller');
const validator = require('./validator');

module.exports = createCrudRoutes(controller, validator);
