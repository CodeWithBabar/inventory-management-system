import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardLayout() {
  return (
    <div className="layout-root">
      <Sidebar />
      <div className="layout-main">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
