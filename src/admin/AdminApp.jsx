// src/admin/AdminApp.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './auth/AdminAuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import AdminHeader from './components/AdminHeader';

const AdminLayout = ({ children }) => (
  <div className="container" style={{ padding: '24px 0' }}>
    <AdminHeader />
    {children}
  </div>
);

const AdminApp = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="products"
            element={
              <AdminLayout>
                <ProductList />
              </AdminLayout>
            }
          />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
};

export default AdminApp;
