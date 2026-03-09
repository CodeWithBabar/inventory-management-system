import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import ModuleFormPage from './pages/ModuleFormPage';
import ModuleListPage from './pages/ModuleListPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/:moduleKey" element={<ModuleListPage />} />
          <Route path="/:moduleKey/new" element={<ModuleFormPage />} />
          <Route path="/:moduleKey/:id" element={<ModuleDetailPage />} />
          <Route path="/:moduleKey/:id/edit" element={<ModuleFormPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
