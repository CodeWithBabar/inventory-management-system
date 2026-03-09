const express = require('express');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.use('/auth', require('../modules/auth/routes'));
router.use('/users', auth, authorize('manage_users'), require('../modules/users/routes'));
router.use('/roles', auth, authorize('manage_roles'), require('../modules/roles/routes'));
router.use('/permissions', auth, authorize('manage_roles'), require('../modules/permissions/routes'));
router.use('/user-roles', auth, authorize('manage_roles'), require('../modules/userRoles/routes'));
router.use('/role-permissions', auth, authorize('manage_roles'), require('../modules/rolePermissions/routes'));
router.use('/categories', auth, require('../modules/categories/routes'));
router.use('/suppliers', auth, require('../modules/suppliers/routes'));
router.use('/warehouses', auth, require('../modules/warehouses/routes'));
router.use('/products', auth, require('../modules/products/routes'));
router.use('/inventory', auth, require('../modules/inventory/routes'));
router.use('/inventory-transactions', auth, require('../modules/inventoryTransactions/routes'));
router.use('/purchase-orders', auth, require('../modules/purchaseOrders/routes'));
router.use('/customers', auth, require('../modules/customers/routes'));
router.use('/sales-orders', auth, require('../modules/salesOrders/routes'));
router.use('/deliveries', auth, require('../modules/deliveries/routes'));
router.use('/invoices', auth, require('../modules/invoices/routes'));
router.use('/payments', auth, require('../modules/payments/routes'));
router.use('/reports', auth, require('../modules/reports/routes'));

module.exports = router;
