// src/admin/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from './auth/AdminAuthContext';

const ProtectedRoute = () => {
  const { token } = useAdminAuth();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
