import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import http from '../api/http';
import './ProductDetailSilver.css';

const ProductDetailSilver = () => {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [hero, setHero] = useState('');

  useEffect(() => {
    const load = async () => {
      // Adjust API endpoint if fine silver products require a different endpoint or filter
      const res = await http.get(`/api/products/${id}`);
      const prod = res.data;
      setP(prod);
      const first = prod.imageUrl || (prod.images && prod.images[0]);
      setHero(first || 'https://via.placeholder.com/800x600?text=Image');
    };
    load();
  }, [id]);

  if (!p)
    return (
      <div className="container" style={{ padding: '40px 0' }}>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <main className="page page-product-details">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> <span>›</span>
          <Link to="/finesilver"> Fine Silver</Link> <span>›</span>
          <span>{p.title}</span>
        </nav>

        <div className="details-layout">
          <div className="media-block">
            <div className="hero-img">
              <img
                id="pd-hero"
                src={hero}
                alt={p.title}
                onError={e => {
                  e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image';
                }}
              />
            </div>
            {p.images && p.images.length > 1 && (
              <div className="thumbs">
                {p.images.map((src, idx) => (
                  <button key={idx} className="thumb-btn" onClick={() => setHero(src)}>
                    <img
                      src={src}
                      alt={`${p.title} ${idx + 1}`}
                      onError={e => {
                        e.currentTarget.src = 'https://via.placeholder.com/120?text=NA';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="highlights-block">
            <h3>Classic, Charismatic Sophistication</h3>
            <div className="highlight-list">
              {(p.highlights || []).map((h, i) => (
                <div key={i} className="highlight-item">
                  <span className={`icon ${h.icon}`} aria-hidden="true"></span>
                  <span className="text">{h.title}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary enquire-btn">Enquire Now</button>
          </div>

          <div className="specs-block">
            <h3>Product Specifications</h3>
            <ul className="spec-list">
              <li>
                <span>Type:</span> {p.specs?.type || '-'}
              </li>
              <li>
                <span>Metal Purity:</span> {p.specs?.purity || '-'}
              </li>
              <li>
                <span>Gross Wt:</span> {p.specs?.grossWt || '-'}
              </li>
              <li>
                <span>Net Wt:</span> {p.specs?.netWt || '-'}
              </li>
              <li>
                <span>Metal Colour:</span> {p.specs?.colour || '-'}
              </li>
              <li>
                <span>Product Type:</span> {p.specs?.productType || '-'}
              </li>
              <li>
                <span>Gender:</span> {p.specs?.gender || '-'}
              </li>
              <li>
                <span>Brand:</span> {p.specs?.brand || '-'}
              </li>
            </ul>
            <p style={{ marginTop: 10, fontWeight: 700 }}>
              Price: ₹ {Number(p.price).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailSilver;
