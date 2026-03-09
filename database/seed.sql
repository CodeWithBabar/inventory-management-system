USE InventoryDB;
GO

INSERT INTO Roles (Name) VALUES ('Admin'), ('Manager'), ('Viewer');
INSERT INTO Permissions ([Key], Description) VALUES
('dashboard.view', 'View dashboard'), ('inventory.manage', 'Manage inventory'), ('orders.manage', 'Manage orders');
INSERT INTO Users (FullName, Email, PasswordHash) VALUES
('System Admin', 'admin@inventory.local', 'Admin@123'),
('Warehouse Manager', 'manager@inventory.local', 'Manager@123');
INSERT INTO UserRoles (UserId, RoleId) VALUES (1,1), (2,2);
INSERT INTO RolePermissions (RoleId, PermissionId)
SELECT 1, Id FROM Permissions;

INSERT INTO Categories (Name, Description) VALUES ('Electronics','Devices'), ('Office','Office essentials');
INSERT INTO Suppliers (Name, Email, Phone, Address) VALUES ('TechSource Ltd','supply@techsource.com','+1-555-1111','Austin, TX');
INSERT INTO Warehouses (Name, Location) VALUES ('Main WH','Austin'), ('Secondary WH','Dallas');
INSERT INTO Products (SKU, Name, CategoryId, SupplierId, UnitPrice, ReorderLevel) VALUES
('PRD-001','Barcode Scanner',1,1,120,10),
('PRD-002','Thermal Printer',1,1,220,8);
INSERT INTO Inventory (ProductId, WarehouseId, Quantity) VALUES (1,1,50),(2,1,25);
INSERT INTO InventoryTransactions (ProductId, WarehouseId, QuantityChange, TransactionType, ReferenceType, ReferenceId)
VALUES (1,1,50,'IN','PO',1),(2,1,25,'IN','PO',1);

INSERT INTO PurchaseOrders (SupplierId, OrderDate, Status, WarehouseId) VALUES (1, '2026-01-10', 'Received', 1);
INSERT INTO PurchaseOrderDetails (PurchaseOrderId, ProductId, Quantity, UnitCost) VALUES (1,1,50,95),(1,2,25,180);

INSERT INTO Customers (Name, Email, Phone, Address) VALUES ('ABC Retail','procurement@abcretail.com','+1-555-1032','Austin, TX');
INSERT INTO SalesOrders (CustomerId, OrderDate, Status, WarehouseId) VALUES (1, '2026-01-15', 'Dispatched', 1);
INSERT INTO SalesOrderDetails (SalesOrderId, ProductId, Quantity, UnitPrice) VALUES (1,1,3,120),(1,2,2,220);
INSERT INTO Deliveries (SalesOrderId, DeliveredDate, Status, TrackingNo) VALUES (1,'2026-01-16','Delivered','TRK-1001');
INSERT INTO Invoices (SalesOrderId, InvoiceNumber, InvoiceDate, TotalAmount, PaidAmount, Status)
VALUES (1,'INV-1001','2026-01-15',924,400,'PartiallyPaid');
INSERT INTO Payments (InvoiceId, Amount, PaymentDate, Method, ReferenceNo)
VALUES (1,400,'2026-01-17','BankTransfer','PAY-4459');
GO
