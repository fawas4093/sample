// src/admin/components/AdminHeader.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../auth/AdminAuthContext';

const AdminHeader = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-header">
      <div className="admin-header-left">
        <Link to="/admin/products" className="admin-brand">Admin Panel</Link>
      </div>
      <div className="admin-header-right">
        <button className="btn-primary outline" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminHeader;
