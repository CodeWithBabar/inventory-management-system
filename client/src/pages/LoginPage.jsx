import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, loading, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validate = () => {
    const nextErrors = {};
    if (!form.email) nextErrors.email = 'Email is required';
    if (!form.password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    await login(form);
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <p>Access the Inventory Management admin portal.</p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} />
        {errors.email && <small className="error-text">{errors.email}</small>}

        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} />
        {errors.password && <small className="error-text">{errors.password}</small>}

        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        <small className="hint">Demo: admin@ims.local / Admin@123</small>
      </form>
    </div>
  );
}
