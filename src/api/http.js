// src/api/http.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE || 'https://jewelry-admin-1.onrender.com';

const http = axios.create({
  baseURL
});

export default http;
