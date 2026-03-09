import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../api/http';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@inventory.local', password: 'Admin@123' });
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await http.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-wrap">
      <form className="card" onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
