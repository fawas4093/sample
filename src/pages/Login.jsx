import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import http from '../api/http';
import './AuthForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await http.post('/api/users/login', { email, password });
      sessionStorage.setItem('userToken', data.token);
      sessionStorage.setItem('userEmail', email);
      navigate('/', { replace: true });
    } catch (ex) {
      setError(ex.response?.data?.message || 'Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form-wrap">
      <form className="auth-form-card auth-form-frm" onSubmit={submit}>
        <div className="auth-form-title">Sign In</div>
        <div className="auth-form-desc">Welcome back! Sign in to your account.</div>
        <label>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" placeholder="you@email.com" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} placeholder="********" autoComplete="current-password" />
        </label>
        {error && <div className="auth-form-error">{error}</div>}
        <button className="btn-primary" disabled={loading} type="submit">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="auth-form-footer">
          New to Certifyied? <Link to="/signup">Create an account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
