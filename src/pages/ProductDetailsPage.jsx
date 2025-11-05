import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
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
    // Check for images array first (backend format: images[{url, alt, _id}])
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      const firstImage = product.images[0];
      let imageUrl = null;
      
      // Handle object format: {url: "/public/images/...", alt: "...", _id: "..."}
      if (typeof firstImage === 'object' && firstImage !== null) {
        imageUrl = firstImage.url || firstImage.imageUrl || firstImage.src;
      } 
      // Handle string format (fallback)
      else if (typeof firstImage === 'string') {
        imageUrl = firstImage;
      }
      
      if (imageUrl) {
        // If URL starts with http/https, use as-is
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
          return imageUrl;
        }
        // If URL starts with /, prefix with API_BASE_URL
        if (imageUrl.startsWith('/')) {
          return `${API_BASE_URL}${imageUrl}`;
        }
        // Otherwise, prefix with API_BASE_URL and ensure leading /
        return `${API_BASE_URL}/${imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl}`;
      }
    }
    
    // Check for imageUrl (fallback)
    if (product.imageUrl) {
      const imageUrl = product.imageUrl;
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
      }
      return imageUrl.startsWith('/') ? `${API_BASE_URL}${imageUrl}` : `${API_BASE_URL}/${imageUrl}`;
    }
    
    // Check for single image string (fallback)
    if (product.image) {
      const imageUrl = product.image;
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
      }
      return imageUrl.startsWith('/') ? `${API_BASE_URL}${imageUrl}` : `${API_BASE_URL}/${imageUrl}`;
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
          // Try multiple possible API endpoints
          let res;
          try {
            res = await axios.get(`${API_BASE_URL}/api/product/${id}`);
          } catch (err1) {
            try {
              res = await axios.get(`${API_BASE_URL}/api/products/${id}`);
            } catch (err2) {
              console.error('Error loading product:', err2);
              return;
            }
          }
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
                  let imgSrc = null;
                  
                  // Handle object format: {url: "/public/images/...", alt: "...", _id: "..."}
                  if (typeof img === 'object' && img !== null) {
                    imgSrc = img.url || img.imageUrl || img.src;
                  } 
                  // Handle string format
                  else if (typeof img === 'string') {
                    imgSrc = img;
                  }
                  
                  const fullUrl = imgSrc 
                    ? (imgSrc.startsWith('http://') || imgSrc.startsWith('https://') 
                        ? imgSrc 
                        : `${API_BASE_URL}${imgSrc.startsWith('/') ? imgSrc : '/' + imgSrc}`)
                    : PLACEHOLDER_THUMB;
                  
                  return (
                    <button key={idx} className="thumb-btn" onClick={() => setHero(fullUrl || PLACEHOLDER_IMAGE)}>
                      <img 
                        src={fullUrl || PLACEHOLDER_THUMB} 
                        alt={typeof img === 'object' && img.alt ? img.alt : `${p.title || p.name} ${idx+1}`} 
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
            
            {/* Price Display */}
            {p.price !== undefined && p.price !== null && (
              <div className="price-display">
                <span className="price-label">Price:</span>
                <span className="price-value">₹{Number(p.price).toLocaleString('en-IN')}</span>
              </div>
            )}
            
            {/* Description Display */}
            {p.description && (
              <div className="description-block">
                <h4>Description</h4>
                <p className="description-text">{p.description}</p>
              </div>
            )}
            
            {/* Category Display */}
            {p.category && (
              <div className="category-display">
                <span className="category-label">Category:</span>
                <span className="category-value">{p.category}</span>
              </div>
            )}
            
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
