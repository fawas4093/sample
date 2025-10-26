// src/admin/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAdminAuth } from '../auth/AdminAuthContext';
import './login.css';

const Login = () => {
  const { token, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/admin/products';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to={redirectTo} replace />;

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    const t = btoa(`${username}:${password}`);

    try {
      // Probe a public endpoint but with Basic to validate creds reach the server
      await axios.get(
        (process.env.REACT_APP_API_BASE || 'http://localhost:8080') + '/api/products',
        { headers: { Authorization: `Basic ${t}` } }
      );
      login(username, password);
      navigate(redirectTo, { replace: true });
    } catch {
      setErr('Invalid credentials or server unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-login-head">
          <h2>Admin Sign In</h2>
          <p>Enter credentials to manage products and prices.</p>
        </div>

        <form className="admin-login-form" onSubmit={submit}>
          <label>
            <span>Username</span>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={e=>setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              required
            />
          </label>

          {err && <div className="admin-login-error">{err}</div>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="admin-login-help">
            <span>Tip: default is admin / admin123</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
