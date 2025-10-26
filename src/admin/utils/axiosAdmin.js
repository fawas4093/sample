// src/admin/utils/axiosAdmin.js
import axios from 'axios';
import { useAdminAuth } from '../auth/AdminAuthContext';

const baseURL = process.env.REACT_APP_API_BASE || 'https://jewelry-admin-1.onrender.com/api/products';

export const makeAdminAxios = (token) => {
  return axios.create({
    baseURL,
    headers: token ? { Authorization: `Basic ${token}` } : {}
  });
};

export const useAdminAxios = () => {
  const { token } = useAdminAuth();
  return makeAdminAxios(token);
};
