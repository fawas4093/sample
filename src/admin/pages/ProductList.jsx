// src/admin/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import http from '../../api/http';
import { useAdminAxios } from '../utils/axiosAdmin';
import { useAdminAuth } from '../auth/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const adminAxios = useAdminAxios();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const load = async () => {
    const res = await http.get('/api/products', { params: { q, page: 0, size: 50, sort: 'title,asc' } });
    const content = res.data?.content ?? res.data;
    setItems(Array.isArray(content) ? content : []);
  };

  useEffect(() => { load(); }, [q]);

  const savePrice = async (id, price) => {
    if (price === '' || Number(price) < 0) return;
    try {
      await adminAxios.put(`/api/products/${id}/price`, { price: Number(price) });
      await load();
    } catch {
      logout();
      navigate('/admin/login', { replace: true });
    }
  };

  return (
    <div className="admin-page">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
        <input
          placeholder="Search products..."
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{ padding: '8px 10px', border: '1px solid #e5e5e5', borderRadius: 8, minWidth: 240 }}
        />
        <button className="btn-primary outline" onClick={load}>Refresh</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: 8 }}>ID</th>
              <th style={{ padding: 8 }}>Title</th>
              <th style={{ padding: 8 }}>Price</th>
              <th style={{ padding: 8 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f3f3f3' }}>
                <td style={{ padding: 8 }}>{p.id}</td>
                <td style={{ padding: 8 }}>{p.title}</td>
                <td style={{ padding: 8 }}>₹ {Number(p.price).toLocaleString('en-IN')}</td>
                <td style={{ padding: 8 }}>
                  <input
                    type="number"
                    defaultValue={p.price}
                    min="0"
                    onBlur={(e) => savePrice(p.id, e.target.value)}
                    style={{ padding: '6px 8px', border: '1px solid #e5e5e5', borderRadius: 6, width: 120 }}
                  />
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: 12, color: '#888' }}>No products</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
