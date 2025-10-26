// src/admin/auth/AdminAuthContext.jsx
import React, { createContext, useContext, useMemo, useState } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem('adminToken') || '');

  const login = (username, password) => {
    const t = btoa(`${username}:${password}`);
    sessionStorage.setItem('adminToken', t);
    setToken(t);
  };

  const logout = () => {
    sessionStorage.removeItem('adminToken');
    setToken('');
  };

  const value = useMemo(() => ({ token, login, logout }), [token]);
  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => useContext(AdminAuthContext);
