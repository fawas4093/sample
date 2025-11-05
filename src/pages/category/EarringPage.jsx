import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EarringPage.css';

// Create a simple SVG placeholder as data URI (works offline)
const createPlaceholderImage = (width = 300, height = 400, text = 'Earring') => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3eaea"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="#732f2f" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const PLACEHOLDER_EARRING = createPlaceholderImage(300, 400, 'Earring');
const API_BASE_URL = 'https://amaara-ecom.onrender.com';

// Static images from public/images/products folder
// Earring images from 1 to 17
const STATIC_EARRING_IMAGE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

// Helper function to get static image path by index
const getStaticImagePath = (index) => {
  const imageNum = STATIC_EARRING_IMAGE_NUMBERS[index % STATIC_EARRING_IMAGE_NUMBERS.length];
  return `/images/products/earring-${imageNum}.jpg`;
};

// Helper function to get product name from API
const getProductName = (product) => {
  return product.name || product.title || 'Earring';
};

// Helper function to get product price from API
const getProductPrice = (product) => {
  if (product.price !== undefined && product.price !== null) {
    return Number(product.price);
  }
  return 0;
};

// Helper function to get product ID
const getProductId = (product) => {
  return product.id || product._id || '';
};

const EarringPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/api/product/category/earring`);
        
        // API returns an array directly
        const productsData = Array.isArray(response.data) ? response.data : [];
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching earrings:', err);
        setError('Failed to load earrings. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="earrings-page">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> <span>›</span> <span>Earrings</span>
          </nav>
          <h1>Earrings</h1>
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p>Loading earrings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="earrings-page">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> <span>›</span> <span>Earrings</span>
          </nav>
          <h1>Earrings</h1>
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#d32f2f' }}>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="earrings-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> <span>›</span> <span>Earrings</span>
        </nav>
        
        <h1>Earrings</h1>
        
        {products.length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p>No earrings found.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product, index) => {
              const productId = getProductId(product);
              // Get name, description, and price from API
              const productName = getProductName(product);
              const description = product.description || '';
              const productPrice = getProductPrice(product);
              // Use static image from public/images/products folder (earring-{number}.jpg)
              const staticImage = getStaticImagePath(index);
              
              return (
                <div key={productId} className="product-card">
                  <Link 
                    to={`/product/${productId}`}
                    className="product-link"
                    state={{ product }}
                  >
                    <div className="thumb">
                      <img 
                        src={staticImage} 
                        alt={productName}
                        className="product-image"
                        onError={(e) => {
                          e.currentTarget.src = PLACEHOLDER_EARRING;
                        }}
                      />
                    </div>
                    <div className="info">
                      <h3 className="title">{productName}</h3>
                      {description && (
                        <p className="description">{description.length > 100 ? `${description.substring(0, 100)}...` : description}</p>
                      )}
                      <div className="meta">
                        <span className="price">₹{productPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </Link>
                  <button 
                    className="btn-primary buy-btn" 
                    onClick={(e) => {
                      e.preventDefault();
                      // Add buy functionality here
                      alert(`Added ${productName} to cart!`);
                    }}
                  >
                    Buy
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EarringPage;
