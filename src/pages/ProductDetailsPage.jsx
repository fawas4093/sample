import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import http from '../api/http';
import './ProductDetails.css';

// Create a simple SVG placeholder as data URI (works offline)
const createPlaceholderImage = (width = 800, height = 600, text = 'Image') => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3eaea"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#732f2f" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// Placeholder images (created once, reused)
const PLACEHOLDER_IMAGE = createPlaceholderImage(800, 600, 'Image');
const PLACEHOLDER_THUMB = createPlaceholderImage(120, 120, 'NA');
const API_BASE_URL = 'https://amaara-ecom.onrender.com';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [p, setP] = useState(location.state?.product || null);
  const [hero, setHero] = useState(PLACEHOLDER_IMAGE); // Initialize with placeholder instead of empty string

  const getProductImageUrl = (product) => {
    // Check for imageUrl first
    if (product.imageUrl) {
      return product.imageUrl.startsWith('http') ? product.imageUrl : `${API_BASE_URL}${product.imageUrl}`;
    }
    
    // Check for single image string
    if (product.image) {
      return product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`;
    }
    
    // Check for images array (new API structure: images[0].url)
    if (product.images && product.images.length > 0) {
      const imageUrl = typeof product.images[0] === 'string' 
        ? product.images[0] 
        : product.images[0].url;
      
      if (imageUrl) {
        return imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`;
      }
    }
    
    return PLACEHOLDER_IMAGE;
  };

  useEffect(() => {
    if (location.state?.product) {
      setP(location.state.product);
      setHero(getProductImageUrl(location.state.product));
    } else {
      const load = async () => {
        try {
          const res = await http.get(`/api/products/${id}`);
          const prod = res.data;
          setP(prod);
          setHero(getProductImageUrl(prod));
        } catch (err) {
          console.error('Error loading product:', err);
          // Keep placeholder image
        }
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
              <img id="pd-hero" src={hero} alt={p.title || p.name} onError={(e)=>{e.currentTarget.src=PLACEHOLDER_IMAGE;}} />
            </div>
            {(p.images && p.images.length > 1) && (
              <div className="thumbs">
                {p.images.map((img, idx) => {
                  const imgSrc = typeof img === 'string' ? img : img.url;
                  const fullUrl = imgSrc && imgSrc.startsWith('http') ? imgSrc : `${API_BASE_URL}${imgSrc || ''}`;
                  return (
                    <button key={idx} className="thumb-btn" onClick={() => setHero(fullUrl || PLACEHOLDER_IMAGE)}>
                      <img 
                        src={fullUrl || PLACEHOLDER_THUMB} 
                        alt={`${p.title || p.name} ${idx+1}`} 
                        onError={(e) => { e.currentTarget.src = PLACEHOLDER_THUMB; }} 
                      />
                    </button>
                  );
                })}
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
