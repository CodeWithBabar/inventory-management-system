import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import PlaceholderPage from './pages/PlaceholderPage';

const App = () => {
  const modules = [
    'Users',
    'Roles',
    'Permissions',
    'Categories',
    'Suppliers',
    'Warehouses',
    'Products',
    'Inventory',
    'Inventory Transactions',
    'Purchase Orders',
    'Customers',
    'Sales Orders',
    'Deliveries',
    'Invoices',
    'Payments',
    'Reports'
  ];

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        {modules.map((moduleName) => (
          <Route
            key={moduleName}
            path={moduleName.toLowerCase().replace(/\s+/g, '-')}
            element={<PlaceholderPage title={moduleName} />}
          />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
