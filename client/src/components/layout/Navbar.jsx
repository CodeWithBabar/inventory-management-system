import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div>
        <h1>Inventory Management System</h1>
        <p className="subtitle">Manage operations across procurement, stock, sales, and finance.</p>
      </div>
      <div className="navbar-right">
        <span>{user?.name || user?.email || 'Administrator'}</span>
        <button type="button" className="btn btn-secondary" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
