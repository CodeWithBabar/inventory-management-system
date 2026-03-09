import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="shell">
      <aside className="sidebar">
        <h2>IMS</h2>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/invoice/1001">Invoice Print</Link>
        </nav>
      </aside>
      <main className="main">
        <header className="navbar">Inventory Management System</header>
        <section className="content"><Outlet /></section>
      </main>
    </div>
  );
};

export default Layout;
