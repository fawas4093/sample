import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import http from '../api/http';
import './ProductDetails.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [p, setP] = useState(location.state?.product || null);
  const [hero, setHero] = useState('');

  useEffect(() => {
    if (location.state?.product) {
      setP(location.state.product);
      setHero(location.state.product.image || 'https://via.placeholder.com/800x600?text=Image');
    } else {
      const load = async () => {
        const res = await http.get(`/api/products/${id}`);
        const prod = res.data;
        setP(prod);
        const first = prod.imageUrl || (prod.images && prod.images[0]);
        setHero(first || 'https://via.placeholder.com/800x600?text=Image');
      };
      load();
    }
  }, [id, location.state]);

  if (!p) return <div className="container" style={{ padding: '40px 0' }}><h2>Loading...</h2></div>;

  return (
    <main className="page page-product-details">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> <span>›</span>
          {location.state?.fromNewArrivals ? (
            <Link to="/new-arrivals"> New Arrival</Link>
          ) : (
            <Link to="/best-seller"> Best Seller</Link>
          )}
          <span>›</span>
          <span>{p.title || p.name}</span>
        </nav>

        <div className="details-layout">
          <div className="media-block">
            <div className="hero-img">
              <img id="pd-hero" src={hero} alt={p.title || p.name} onError={(e)=>{e.currentTarget.src='https://via.placeholder.com/800x600?text=Image';}} />
            </div>
            {(p.images && p.images.length > 1) && (
              <div className="thumbs">
                {p.images.map((src, idx) => (
                  <button key={idx} className="thumb-btn" onClick={()=> setHero(src)}>
                    <img src={src} alt={`${p.title || p.name} ${idx+1}`} onError={(e)=>{e.currentTarget.src='https://via.placeholder.com/120?text=NA';}} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="highlights-block">
            <h3>{p.title || p.name}</h3>
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
              <li><span>Type:</span> {p.specs?.type || '-'}</li>
              <li><span>Metal Purity:</span> {p.specs?.purity || '-'}</li>
              <li><span>Gross Wt:</span> {p.specs?.grossWt || '-'}</li>
              <li><span>Net Wt:</span> {p.specs?.netWt || '-'}</li>
              <li><span>Metal Colour:</span> {p.specs?.colour || '-'}</li>
              <li><span>Product Type:</span> {p.specs?.productType || '-'}</li>
              <li><span>Gender:</span> {p.specs?.gender || '-'}</li>
              <li><span>Brand:</span> {p.specs?.brand || '-'}</li>
            </ul>
            <p style={{ marginTop: 10, fontWeight: 700 }}>
              Price: ₹ {Number(p.price || p.price === 0 ? p.price : (10000 + (p.id || 1) * 500)).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
