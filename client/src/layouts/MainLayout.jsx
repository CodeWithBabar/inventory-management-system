import { Link, Outlet, useNavigate } from 'react-router-dom';

const navigationItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/roles', label: 'Roles' },
  { to: '/permissions', label: 'Permissions' },
  { to: '/categories', label: 'Categories' },
  { to: '/suppliers', label: 'Suppliers' },
  { to: '/warehouses', label: 'Warehouses' },
  { to: '/products', label: 'Products' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/inventory-transactions', label: 'Inventory Transactions' },
  { to: '/purchase-orders', label: 'Purchase Orders' },
  { to: '/customers', label: 'Customers' },
  { to: '/sales-orders', label: 'Sales Orders' },
  { to: '/deliveries', label: 'Deliveries' },
  { to: '/invoices', label: 'Invoices' },
  { to: '/payments', label: 'Payments' },
  { to: '/reports', label: 'Reports' }
];

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ims_token');
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>IMS Admin</h2>
        <nav>
          {navigationItems.map((item) => (
            <Link key={item.to} to={item.to} className="nav-item">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="content-wrapper">
        <header className="topbar">
          <h1>Inventory Management System</h1>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <section className="content-area">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainLayout;
