import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../api/http';
import './BestSeller.css';

const BestSellerPage = () => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const params = { q: query, page: 0, size: 50 };
      if (sortBy === 'price-asc') params.sort = 'price,asc';
      if (sortBy === 'price-desc') params.sort = 'price,desc';
      if (sortBy === 'featured') params.sort = 'title,asc';

      const res = await http.get('/api/products', { params });
      const content = res.data?.content ?? res.data;
      setItems(Array.isArray(content) ? content : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [query, sortBy]);

  const products = useMemo(() => items, [items]);

  return (
    <main className="page page-best-seller">
      {/* ...hero and toolbar unchanged... */}
      <section className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid">
            {products.map(p => (
              <article key={p.id} className="card">
                <div className="thumb">
                  <img
                    src={p.imageUrl || (p.images && p.images[0]) || '/images/products/placeholder.png'}
                    alt={p.title}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x500?text=Product'; }}
                  />
                  {p.bestSeller && <span className="badge">Best Seller</span>}
                </div>
                <div className="info">
                  <h3 className="title">{p.title}</h3>
                  <div className="meta">
                    <span className="price">₹ {Number(p.price).toLocaleString('en-IN')}</span>
                  </div>
                  <Link to={`/product/${p.id}`} className="btn-primary outline">Explore</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default BestSellerPage;
