import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import http from '../api/http';
import './AuthForm.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await http.post('/api/users/register', { name, email, password });
      setSuccess('Registration successful! You can now sign in.');
      setTimeout(() => navigate('/login', { state: { fromSignup: true } }), 1200);
    } catch (ex) {
      setError(ex.response?.data?.message || 'Registration failed. Email may already be registered.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form-wrap">
      <form className="auth-form-card auth-form-frm" onSubmit={submit}>
        <div className="auth-form-title">Create Account</div>
        <div className="auth-form-desc">Join Certifyied and discover beautiful jewelry collections.</div>
        <label>
          Name
          <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your Name" autoComplete="name" />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" placeholder="you@email.com" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} placeholder="Choose a password" autoComplete="new-password" />
        </label>
        {error && <div className="auth-form-error">{error}</div>}
        {success && <div className="auth-form-error" style={{ color: '#217847', background: '#e2faee', borderColor: '#6be1a6' }}>{success}</div>}
        <button className="btn-primary" disabled={loading} type="submit">
          {loading ? 'Registering...' : 'Sign Up'}
        </button>
        <div className="auth-form-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
