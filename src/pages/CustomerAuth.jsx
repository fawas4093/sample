// src/pages/CustomerAuth.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../admin/pages/login.css';

const CustomerAuth = ({ mode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const resetFields = () => {
    setPassword('');
    setErr('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      if (isLogin) {
        const { data } = await axios.post('https://amaara-ecom.onrender.com/api/user/login', { email, password });
        
        // Store user token if it exists in response
        if (data.token) {
          sessionStorage.setItem('userToken', data.token);
        }
        
        // Store user email
        sessionStorage.setItem('userEmail', email);
        
        // Store user ID - check different possible response structures
        const userId = data.user?.id || data.user?._id || data.id || data.userId || data.user?.userId;
        if (userId) {
          sessionStorage.setItem('userId', userId.toString());
          // Redirect to intended page or home page with user ID in URL
          if (redirectTo && redirectTo !== '/') {
            navigate(redirectTo, { replace: true });
          } else {
            navigate(`/?userId=${userId}`, { replace: true });
          }
        } else {
          // If no user ID found, redirect to intended page or home
          if (redirectTo && redirectTo !== '/') {
            navigate(redirectTo, { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        }
      } else {
        await axios.post('https://amaara-ecom.onrender.com/api/user/register', { name, email, password });
        setErr('Registration successful! Redirecting to login...');
        setTimeout(() => {
          setIsLogin(true);
          resetFields();
        }, 1500);
      }
    } catch (ex) {
      setErr(
        ex.response?.data?.message ||
        (isLogin ? 'Invalid credentials or server error.' : 'Registration failed. Email may already be registered.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-login-head">
          <h2>{isLogin ? 'Customer Sign In' : 'Customer Registration'}</h2>
          <p>{isLogin ? 'Welcome back! Sign in to your account.' : 'Create a new account to shop with us.'}</p>
        </div>

        <form className="admin-login-form" onSubmit={submit}>
          {!isLogin && (
            <label>
              <span>Name</span>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </label>
          )}

          <label>
            <span>Email</span>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </label>

          {err && <div className="admin-login-error">{err}</div>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? (isLogin ? 'Signing in...' : 'Registering...') : (isLogin ? 'Sign In' : 'Register')}
          </button>

          <div className="admin-login-help">
            {isLogin ? (
              <>
                New customer?{' '}
                <button
                  type="button"
                  onClick={() => { setIsLogin(false); resetFields(); }}
                  style={{ color: '#2c1810', textDecoration: 'underline', background: 'none', border: 0, cursor: 'pointer', margin: 0, padding: 0 }}
                >
                  Register here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsLogin(true); resetFields(); }}
                  style={{ color: '#2c1810', textDecoration: 'underline', background: 'none', border: 0, cursor: 'pointer', margin: 0, padding: 0 }}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerAuth;

