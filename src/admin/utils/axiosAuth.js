// src/admin/utils/axiosAuth.js
import axios from 'axios';

const username = process.env.REACT_APP_ADMIN_USER || 'admin';
const password = process.env.REACT_APP_ADMIN_PASS || 'admin123';
const token = btoa(`${username}:${password}`);

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'https://jewelry-admin-1.onrender.com/api/products',
  headers: { Authorization: `Basic ${token}` }
});

export default instance;
