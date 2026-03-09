export const MODULES = [
  { key: 'users', label: 'Users', endpoint: '/users', requiredFields: ['name', 'email'], statusField: 'isActive', columns: ['id', 'name', 'email', 'phone', 'isActive'] },
  { key: 'roles', label: 'Roles', endpoint: '/roles', requiredFields: ['name'], statusField: 'isActive', columns: ['id', 'name', 'description', 'isActive'] },
  { key: 'permissions', label: 'Permissions', endpoint: '/permissions', requiredFields: ['name', 'resource'], statusField: 'isActive', columns: ['id', 'name', 'resource', 'action', 'isActive'] },
  { key: 'categories', label: 'Categories', endpoint: '/categories', requiredFields: ['name'], statusField: 'isActive', columns: ['id', 'name', 'description', 'isActive'] },
  { key: 'suppliers', label: 'Suppliers', endpoint: '/suppliers', requiredFields: ['name', 'email'], statusField: 'isActive', columns: ['id', 'name', 'email', 'contactPerson', 'isActive'] },
  { key: 'warehouses', label: 'Warehouses', endpoint: '/warehouses', requiredFields: ['name', 'location'], statusField: 'isActive', columns: ['id', 'name', 'location', 'managerName', 'isActive'] },
  { key: 'products', label: 'Products', endpoint: '/products', requiredFields: ['name', 'sku', 'categoryId'], statusField: 'isActive', columns: ['id', 'sku', 'name', 'categoryName', 'unitPrice', 'isActive'] },
  { key: 'inventory', label: 'Inventory', endpoint: '/inventory', requiredFields: ['productId', 'warehouseId', 'quantity'], statusField: 'isLowStock', columns: ['id', 'productName', 'warehouseName', 'quantity', 'reorderLevel', 'isLowStock'] },
  { key: 'inventory-transactions', label: 'Inventory Transactions', endpoint: '/inventory-transactions', requiredFields: ['inventoryId', 'transactionType', 'quantity'], statusField: 'status', columns: ['id', 'transactionType', 'quantity', 'referenceType', 'referenceId', 'status'] },
  { key: 'purchase-orders', label: 'Purchase Orders', endpoint: '/purchase-orders', requiredFields: ['supplierId', 'orderDate'], statusField: 'status', columns: ['id', 'supplierName', 'orderDate', 'totalAmount', 'status'] },
  { key: 'customers', label: 'Customers', endpoint: '/customers', requiredFields: ['name', 'email'], statusField: 'isActive', columns: ['id', 'name', 'email', 'phone', 'isActive'] },
  { key: 'sales-orders', label: 'Sales Orders', endpoint: '/sales-orders', requiredFields: ['customerId', 'orderDate'], statusField: 'status', columns: ['id', 'customerName', 'orderDate', 'totalAmount', 'status'] },
  { key: 'deliveries', label: 'Deliveries', endpoint: '/deliveries', requiredFields: ['salesOrderId', 'deliveryDate'], statusField: 'status', columns: ['id', 'salesOrderId', 'deliveryDate', 'carrier', 'status'] },
  { key: 'invoices', label: 'Invoices', endpoint: '/invoices', requiredFields: ['salesOrderId', 'invoiceDate', 'totalAmount'], statusField: 'status', columns: ['id', 'invoiceNumber', 'invoiceDate', 'totalAmount', 'status'] },
  { key: 'payments', label: 'Payments', endpoint: '/payments', requiredFields: ['invoiceId', 'paymentDate', 'amount'], statusField: 'status', columns: ['id', 'invoiceId', 'paymentDate', 'amount', 'status'] },
  { key: 'reports', label: 'Reports', endpoint: '/reports', requiredFields: ['reportType'], statusField: 'status', columns: ['id', 'reportType', 'generatedAt', 'generatedBy', 'status'] },
];

export function findModule(moduleKey) {
  return MODULES.find((module) => module.key === moduleKey);
}
