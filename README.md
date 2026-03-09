# Inventory Management System (Semester Demo Ready)

Full-stack Inventory Management System scaffold with React frontend, Express backend, and SQL Server schema/seed scripts.

## Project Structure

- `client` - React + Vite admin UI (dashboard, auth flow, printable invoice page)
- `server` - Node.js + Express REST API (JWT auth, dashboard summary, invoice endpoint)
- `database` - SQL Server schema and seed data
- `.env.example` - combined environment template

## Features Included

- JWT login with role payload
- Protected frontend routes
- Dashboard cards + sample charts (Recharts)
- Invoice details page with print button and print CSS
- SQL schema containing all required semester project tables
- Seed data and demo users

---

## 1) SQL Server Database Initialization

### Prerequisites
- SQL Server running locally or reachable over network
- SQL Server Management Studio (SSMS) or `sqlcmd`

### Option A: SSMS
1. Open SSMS and connect to your SQL Server instance.
2. Open `database/schema.sql` and execute it.
3. Open `database/seed.sql` and execute it.

### Option B: `sqlcmd`
```bash
sqlcmd -S localhost,1433 -U sa -P "YourStrong!Passw0rd" -i database/schema.sql
sqlcmd -S localhost,1433 -U sa -P "YourStrong!Passw0rd" -i database/seed.sql
```

---

## 2) Backend Setup (Server)

```bash
cd server
npm install
cp .env.example .env
```

Update `.env` values as needed:

```env
PORT=5000
JWT_SECRET=change_me_to_a_strong_secret
DB_SERVER=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=YourStrong!Passw0rd
DB_NAME=InventoryDB
DB_ENCRYPT=false
DB_TRUST_SERVER_CERT=true
```

Run server:

```bash
npm run dev
```

Health check:

```bash
curl http://localhost:5000/health
```

---

## 3) Frontend Setup (Client)

```bash
cd client
npm install
cp .env.example .env
```

Ensure `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Open http://localhost:5173

---

## 4) Demo Credentials

- **Admin**: `admin@inventory.local` / `Admin@123`
- **Manager**: `manager@inventory.local` / `Manager@123`

---

## 5) API Route Map (Frontend/Backend Consistency)

- `POST /api/auth/login`
- `GET /api/dashboard/summary`
- `GET /api/invoices/:id`

These are the routes used by the current client build.

---

## 6) Semester Demo Checklist

- ✅ Login and token-protected navigation
- ✅ Dashboard KPI cards
- ✅ Dashboard charts
- ✅ Printable invoice page
- ✅ Required SQL table set present
- ✅ Seed and demo credentials provided

## Remaining TODOs (for production-grade expansion)

- Replace demo in-memory auth with DB-backed hashed passwords
- Implement full CRUD for all modules (products, orders, deliveries, payments, reports)
- Add pagination/filtering on list APIs
- Add robust request validation and audit logging
- Expand RBAC to DB-backed permission checks

