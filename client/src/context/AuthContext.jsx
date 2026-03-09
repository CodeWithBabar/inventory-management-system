import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('ims_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ims_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('ims_token', token);
    } else {
      localStorage.removeItem('ims_token');
    }

    if (user) {
      localStorage.setItem('ims_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ims_user');
    }
  }, [token, user]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.post('/auth/login', credentials);
      setToken(data.token);
      setUser(data.user);
      toast.success('Welcome back!');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to login.';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    toast.info('Logged out.');
  };

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), loading, login, logout }),
    [token, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
