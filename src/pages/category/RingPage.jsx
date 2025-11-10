import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RingPage.css';

// Create a simple SVG placeholder as data URI (works offline)
const createPlaceholderImage = (width = 300, height = 400, text = 'Ring') => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3eaea"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="#732f2f" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const PLACEHOLDER_RING = createPlaceholderImage(300, 400, 'Ring');
const API_BASE_URL = 'https://amaara-ecom.onrender.com';

const RingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/api/product?category=rings`);
        
        // Handle different response structures
        const productsData = response.data?.content || response.data?.data || response.data || [];
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        console.error('Error fetching rings:', err);
        setError('Failed to load rings. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductPrice = (product) => {
    if (product.price) return Number(product.price);
    return 0;
  };

  const getProductTitle = (product) => {
    return product.title || product.name || 'Ring';
  };

  const getProductId = (product) => {
    return product.id || product._id || '';
  };

  const getProductDescription = (product) => {
    return product.description || '';
  };

  const getProductCategory = (product) => {
    return product.category || '';
  };

  const getAllProductImages = (product) => {
    const images = [];
    
    // Check for images array (backend format: images[{url, alt, _id}])
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach(img => {
        let imageUrl = null;
        
        // Handle object format: {url: "/public/images/...", alt: "...", _id: "..."}
        if (typeof img === 'object' && img !== null) {
          imageUrl = img.url || img.imageUrl || img.src;
        } 
        // Handle string format (fallback)
        else if (typeof img === 'string') {
          imageUrl = img;
        }
        
        if (imageUrl) {
          let fullUrl;
          // If URL starts with http/https, use as-is
          if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            fullUrl = imageUrl;
          }
          // If URL starts with /, prefix with API_BASE_URL
          else if (imageUrl.startsWith('/')) {
            fullUrl = `${API_BASE_URL}${imageUrl}`;
          }
          // Otherwise, prefix with API_BASE_URL and ensure leading /
          else {
            fullUrl = `${API_BASE_URL}/${imageUrl}`;
          }
          
          if (!images.includes(fullUrl)) {
            images.push(fullUrl);
          }
        }
      });
    }
    
    // Check for imageUrl (fallback)
    if (product.imageUrl && images.length === 0) {
      const imageUrl = product.imageUrl;
      let fullUrl;
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        fullUrl = imageUrl;
      } else {
        fullUrl = imageUrl.startsWith('/') ? `${API_BASE_URL}${imageUrl}` : `${API_BASE_URL}/${imageUrl}`;
      }
      if (!images.includes(fullUrl)) {
        images.push(fullUrl);
      }
    }
    
    // Check for single image string (fallback)
    if (product.image && images.length === 0) {
      const imageUrl = product.image;
      let fullUrl;
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        fullUrl = imageUrl;
      } else {
        fullUrl = imageUrl.startsWith('/') ? `${API_BASE_URL}${imageUrl}` : `${API_BASE_URL}/${imageUrl}`;
      }
      if (!images.includes(fullUrl)) {
        images.push(fullUrl);
      }
    }
    
    return images.length > 0 ? images : [PLACEHOLDER_RING];
  };

  if (loading) {
    return (
      <div className="rings-page">
        <div className="container">
          <h1>Rings</h1>
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p>Loading rings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rings-page">
        <div className="container">
          <h1>Rings</h1>
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#d32f2f' }}>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rings-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> <span>›</span> <span>Rings</span>
        </nav>
        
        <h1>Rings</h1>
        
        {products.length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p>No rings found.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => {
              const productId = getProductId(product);
              const allImages = getAllProductImages(product);
              const description = getProductDescription(product);
              const category = getProductCategory(product);
              
              return (
                <Link 
                  key={productId} 
                  to={`/product/${productId}`}
                  className="product-card"
                  state={{ product }}
                >
                  <div className="thumb">
                    <img 
                      src={product.images && product.images.length > 0 && product.images[0].url 
                        ? `${API_BASE_URL}${product.images[0].url}` 
                        : PLACEHOLDER_RING} 
                      alt={product.images && product.images.length > 0 && product.images[0].alt 
                        ? product.images[0].alt 
                        : getProductTitle(product)}
                      className="product-image"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_RING;
                      }}
                    />
                    {allImages.length > 1 && (
                      <div className="image-indicator">
                        <span className="image-count">{allImages.length} images</span>
                      </div>
                    )}
                    {category && (
                      <div className="category-badge">
                        {category}
                      </div>
                    )}
                  </div>
                  <div className="info">
                    <h3 className="title">{getProductTitle(product)}</h3>
                    {description && (
                      <p className="description">{description.length > 100 ? `${description.substring(0, 100)}...` : description}</p>
                    )}
                    <div className="meta">
                      <span className="price">₹{getProductPrice(product).toLocaleString('en-IN')}</span>
                    </div>
                    <button className="btn-primary">View Details</button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RingPage;
