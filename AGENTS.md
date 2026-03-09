# Project Instructions

Build a complete full-stack Inventory Management System.

## Tech Stack
- Frontend: React + JavaScript
- Backend: Node.js + Express.js
- Database: Microsoft SQL Server
- Authentication: JWT
- API Style: REST
- Package manager: npm

## Project Goal
Create a complete semester-project-grade Inventory Management System with:
- normalized SQL Server database
- role-based access control
- warehouse-wise inventory
- purchase orders
- sales orders
- deliveries
- invoices
- payments
- reports
- polished responsive admin UI

## Core Modules
1. Authentication and RBAC
2. Dashboard
3. Users / Roles / Permissions
4. Categories
5. Suppliers
6. Warehouses
7. Products
8. Inventory
9. Inventory Transactions
10. Purchase Orders
11. Customers
12. Sales Orders
13. Deliveries
14. Invoices
15. Payments
16. Reports

## Required Database Tables
- Users
- Roles
- Permissions
- UserRoles
- RolePermissions
- Categories
- Suppliers
- Warehouses
- Products
- Inventory
- InventoryTransactions
- PurchaseOrders
- PurchaseOrderDetails
- Customers
- SalesOrders
- SalesOrderDetails
- Deliveries
- Invoices
- Payments

## Key Business Rules
- Receiving purchase order items increases inventory
- Sales dispatch/completion decreases inventory
- Inventory movements always create transaction history
- One invoice per sales order
- Partial payments supported
- Payments update invoice status
- Low stock is based on reorder level
- RBAC controls page access and API access

## Backend Requirements
- Node.js + Express
- modular architecture
- mssql package
- JWT auth
- authorization middleware
- validation
- centralized error handling
- pagination and filtering
- .env support

## Frontend Requirements
- React + JavaScript
- sidebar layout
- top navbar
- protected routes
- dashboard cards
- CRUD pages
- forms with validation
- tables with search/filter/pagination
- toast notifications
- loading and empty states

## Folder Structure Preference
- /client
- /server
- /database
- /README.md
- /.env.example

## Delivery Expectations
Codex should:
1. scaffold the project
2. create SQL schema
3. create seed data
4. build backend
5. build frontend
6. connect frontend to backend
7. write README
8. provide demo credentials

Do not produce pseudo-code.
Create actual runnable files.
Keep code clean and consistent.
