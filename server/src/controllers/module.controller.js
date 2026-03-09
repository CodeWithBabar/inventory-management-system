const listModules = (req, res) => {
  res.status(200).json({
    modules: [
      'Authentication and RBAC',
      'Dashboard',
      'Users / Roles / Permissions',
      'Categories',
      'Suppliers',
      'Warehouses',
      'Products',
      'Inventory',
      'Inventory Transactions',
      'Purchase Orders',
      'Customers',
      'Sales Orders',
      'Deliveries',
      'Invoices',
      'Payments',
      'Reports'
    ]
  });
};

module.exports = {
  listModules
};
