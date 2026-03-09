# Inventory Management System

Phase 2 backend implementation is included in `server/` with modular Express architecture and SQL Server support.

## Backend features
- JWT authentication (`/api/auth/register`, `/api/auth/login`)
- RBAC modules: users, roles, permissions, user-roles, role-permissions
- Master modules: categories, suppliers, warehouses, products, customers
- Operations modules: inventory, inventory-transactions, purchase-orders, sales-orders, deliveries, invoices, payments
- Reporting endpoints: dashboard, low-stock, sales-summary
- Pagination/filtering for list endpoints
- Centralized validation and error handling
- Business rules:
  - receiving purchase orders increases inventory + creates inventory transactions
  - dispatching sales orders decreases inventory + creates inventory transactions
  - one invoice per sales order enforced
  - partial payments supported and invoice status auto-updated

## Run backend
```bash
cd server
npm install
npm run dev
```

## Environment
Copy `.env.example` into `.env` and update SQL Server + JWT values.

## Database
Use `database/schema.sql` to create all required tables.
