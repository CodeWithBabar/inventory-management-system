USE InventoryManagementDB;
GO

INSERT INTO Roles (RoleName, Description)
VALUES
  ('Admin', 'Full system access'),
  ('InventoryManager', 'Handles products and stocks'),
  ('SalesOfficer', 'Handles customers, sales, and invoices');

INSERT INTO Permissions (PermissionKey, ModuleName, ActionName)
VALUES
  ('dashboard:view', 'Dashboard', 'view'),
  ('products:create', 'Products', 'create'),
  ('products:update', 'Products', 'update'),
  ('products:delete', 'Products', 'delete'),
  ('inventory:view', 'Inventory', 'view'),
  ('inventory:adjust', 'Inventory', 'adjust'),
  ('sales-orders:create', 'SalesOrders', 'create'),
  ('invoices:view', 'Invoices', 'view'),
  ('payments:create', 'Payments', 'create');

INSERT INTO Users (FullName, Email, PasswordHash, IsActive)
VALUES
  ('System Admin', 'admin@ims.local', 'Admin@123', 1),
  ('Inventory Lead', 'inventory@ims.local', 'Inventory@123', 1),
  ('Sales Lead', 'sales@ims.local', 'Sales@123', 1);

INSERT INTO UserRoles (UserId, RoleId)
VALUES
  (1, 1),
  (2, 2),
  (3, 3);

INSERT INTO RolePermissions (RoleId, PermissionId)
SELECT 1, PermissionId FROM Permissions;

INSERT INTO RolePermissions (RoleId, PermissionId)
VALUES
  (2, 2), (2, 3), (2, 5), (2, 6),
  (3, 7), (3, 8), (3, 9);

INSERT INTO Categories (CategoryName, Description)
VALUES
  ('Electronics', 'Devices and digital accessories'),
  ('Office Supplies', 'Everyday office essentials');

INSERT INTO Suppliers (SupplierName, ContactPerson, Email, Phone, AddressLine)
VALUES
  ('Prime Electronics Co.', 'Amir Khan', 'amir@primeelectronics.com', '+1-555-1010', '45 Market Street, NY'),
  ('OfficeMart Ltd.', 'Laura Smith', 'laura@officemart.com', '+1-555-2020', '91 Commerce Ave, CA');

INSERT INTO Warehouses (WarehouseCode, WarehouseName, Location)
VALUES
  ('WH-NY', 'New York Central Warehouse', 'New York'),
  ('WH-CA', 'California West Warehouse', 'California');

INSERT INTO Products (SKU, ProductName, CategoryId, SupplierId, UnitPrice, ReorderLevel)
VALUES
  ('ELEC-001', 'Wireless Barcode Scanner', 1, 1, 120.00, 15),
  ('ELEC-002', 'Thermal Receipt Printer', 1, 1, 250.00, 10),
  ('OFF-001', 'A4 Printer Paper Pack', 2, 2, 6.50, 50);

INSERT INTO Inventory (WarehouseId, ProductId, QuantityOnHand)
VALUES
  (1, 1, 40),
  (1, 2, 20),
  (1, 3, 140),
  (2, 1, 25),
  (2, 3, 90);

INSERT INTO InventoryTransactions (WarehouseId, ProductId, TransactionType, Quantity, ReferenceType, ReferenceId, Notes, CreatedBy)
VALUES
  (1, 1, 'IN', 40, 'Seed', NULL, 'Opening stock', 1),
  (1, 2, 'IN', 20, 'Seed', NULL, 'Opening stock', 1),
  (1, 3, 'IN', 140, 'Seed', NULL, 'Opening stock', 1);

INSERT INTO PurchaseOrders (PONumber, SupplierId, WarehouseId, OrderDate, ExpectedDate, Status, Notes, CreatedBy)
VALUES
  ('PO-2026-0001', 1, 1, '2026-01-15', '2026-01-20', 'Received', 'Initial hardware procurement', 1);

INSERT INTO PurchaseOrderDetails (PurchaseOrderId, ProductId, OrderedQty, ReceivedQty, UnitCost)
VALUES
  (1, 1, 40, 40, 98.00),
  (1, 2, 20, 20, 210.00);

INSERT INTO Customers (CustomerName, Email, Phone, BillingAddress, ShippingAddress)
VALUES
  ('Northwind Retail', 'procurement@northwind.com', '+1-555-3030', '120 Industrial Rd, NY', '120 Industrial Rd, NY');

INSERT INTO SalesOrders (SONumber, CustomerId, WarehouseId, OrderDate, Status, CreatedBy)
VALUES
  ('SO-2026-0001', 1, 1, '2026-01-22', 'Confirmed', 3);

INSERT INTO SalesOrderDetails (SalesOrderId, ProductId, Quantity, UnitPrice)
VALUES
  (1, 1, 3, 150.00),
  (1, 3, 10, 8.00);

INSERT INTO Deliveries (SalesOrderId, DeliveryNumber, DeliveryDate, Status, Notes)
VALUES
  (1, 'DL-2026-0001', '2026-01-23', 'Dispatched', 'Dispatched via ground shipping');

INSERT INTO Invoices (SalesOrderId, InvoiceNumber, InvoiceDate, TotalAmount, PaidAmount, Status)
VALUES
  (1, 'INV-2026-0001', '2026-01-23', 530.00, 230.00, 'Partially Paid');

INSERT INTO Payments (InvoiceId, PaymentDate, Amount, PaymentMethod, ReferenceNumber, Notes)
VALUES
  (1, '2026-01-24', 200.00, 'BankTransfer', 'TXN-889911', 'Advance payment'),
  (1, '2026-01-25', 30.00, 'Cash', 'CASH-001', 'Cash received at warehouse desk');
GO
