# Inventory Management System (Phase 1 Scaffold)

A full-stack Inventory Management System scaffold built for semester-project-grade development.

## Tech Stack
- **Frontend:** React + JavaScript + Vite
- **Backend:** Node.js + Express.js
- **Database:** Microsoft SQL Server
- **Authentication:** JWT
- **API Style:** REST
- **Package Manager:** npm

## Folder Structure

```text
inventory-management-system/
├── client/
├── server/
├── database/
├── .env.example
└── README.md
```

## Implemented in Phase 1

- Full project folder structure for frontend, backend, and database
- Frontend scaffold with routing, protected routes, sidebar, topbar, dashboard cards, and module placeholders
- Backend scaffold with Express app, modular routes/controllers/middleware, JWT auth middleware, DB connector, and error handling
- SQL Server schema with all required tables and relationships
- Seed data for roles, permissions, users, modules, stock, purchase/sales, invoice, and payments
- Environment template files for root, frontend, and backend

## Demo Credentials

Use these demo users after running seed script:

- **Admin:** `admin@ims.local` / `Admin@123`
- **Inventory:** `inventory@ims.local` / `Inventory@123`
- **Sales:** `sales@ims.local` / `Sales@123`

## Setup Instructions

## 1) Clone and Enter Project

```bash
git clone <your-repo-url>
cd inventory-management-system
```

## 2) Setup SQL Server Database

1. Ensure SQL Server is running.
2. Create or use a login/user with permission to create DB objects.
3. Run schema script:

```bash
sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -i database/schema.sql
```

4. Run seed script:

```bash
sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -i database/seed.sql
```

## 3) Setup Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Backend URL:
- `http://localhost:5000`
- Health check: `http://localhost:5000/health`

## 4) Setup Frontend

Open a second terminal:

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Frontend URL:
- `http://localhost:5173`

## 5) Verify Basic Flow

1. Open frontend URL.
2. Login using demo credentials.
3. Navigate dashboard and module placeholders.
4. (Optional) Call API endpoints:
   - `POST /api/v1/auth/login`
   - `GET /api/v1/modules` (with Bearer token)

## API Endpoints Available in Phase 1

- `GET /health`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `GET /api/v1/modules`

## Notes

- This phase focuses on **scaffolding and database foundation**.
- Passwords are seeded as plain values for demo-only development.
- Phase 2 can extend this scaffold with complete CRUD, validation layers, pagination/filtering, transactional stock movement logic, and report endpoints.
