import { NavLink } from 'react-router-dom';
import { MODULES } from '../../config/modules';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>IMS Admin</h2>
      <nav>
        <NavLink to="/dashboard" className="menu-item">Dashboard</NavLink>
        {MODULES.map((module) => (
          <NavLink key={module.key} to={`/${module.key}`} className="menu-item">
            {module.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
