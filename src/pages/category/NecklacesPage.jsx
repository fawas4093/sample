import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NecklacesPage.css';

// Create a simple SVG placeholder as data URI (works offline)
const createPlaceholderImage = (width = 300, height = 400, text = 'Necklace') => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3eaea"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="#732f2f" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const PLACEHOLDER_NECKLACE = createPlaceholderImage(300, 400, 'Necklace');
const API_BASE_URL = 'https://amaara-ecom.onrender.com';

const NecklacesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/api/product/category/necklace`);
        
        // API returns an array directly
        const productsData = Array.isArray(response.data) ? response.data : [];
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching necklaces:', err);
        setError('Failed to load necklaces. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductImage = (product) => {
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
    
    return PLACEHOLDER_NECKLACE;
  };

  const getProductPrice = (product) => {
    if (product.price) return Number(product.price);
    return 0;
  };

  const getProductTitle = (product) => {
    return product.title || product.name || 'Necklace';
  };

  const getProductId = (product) => {
    return product.id || product._id || '';
  };

  if (loading) {
    return (
      <div className="necklaces-page">
        <div className="container">
          <h1>Necklaces</h1>
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p>Loading necklaces...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="necklaces-page">
        <div className="container">
          <h1>Necklaces</h1>
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#d32f2f' }}>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="necklaces-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> <span>›</span> <span>Necklaces</span>
        </nav>
        
        <h1>Necklaces</h1>
        
        {products.length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p>No necklaces found.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => {
              const productId = getProductId(product);
              return (
                <Link 
                  key={productId} 
                  to={`/product/${productId}`}
                  className="product-card"
                  state={{ product }}
                >
                  <div className="thumb">
                    <img 
                      src={getProductImage(product)} 
                      alt={getProductTitle(product)}
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_NECKLACE;
                      }}
                    />
                  </div>
                  <div className="info">
                    <h3 className="title">{getProductTitle(product)}</h3>
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

export default NecklacesPage;
