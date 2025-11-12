import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NecklacesPage.css';

// Create a simple SVG placeholder as data URI (works offline)
const createPlaceholderImage = (width = 300, height = 400, text = 'Necklace') => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3eaea"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="#732f2f" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const PLACEHOLDER_NECKLACE = createPlaceholderImage(300, 400, 'Necklace');
const API_BASE_URL = 'https://amaara-ecom.onrender.com';

// Static images from public/images/products folder
// Image numbers from 1 to 28 (skipping 27 if missing)
const STATIC_IMAGE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28];

// Helper function to get static image path by index
const getStaticImagePath = (index) => {
  const imageNum = STATIC_IMAGE_NUMBERS[index % STATIC_IMAGE_NUMBERS.length];
  return `/images/products/necklaces-${imageNum}.jpg`;
};

// Helper function to get product title
const getProductTitle = (product) => {
  return product.title || product.name || 'Necklace';
};

// Helper function to get product price
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

const NecklacesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleViewDetails = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check authentication status
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');
    
    // If not authenticated, redirect to customer auth page with product path in state
    if (!userId && !userToken) {
      navigate('/customer-auth', { state: { from: `/product/${productId}` } });
    } else {
      // If authenticated, navigate to product page
      navigate(`/product/${productId}`);
    }
  };

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

  if (loading) {
    return (
      <div className="necklaces-page">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> <span>›</span> <span>Necklaces</span>
          </nav>
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
          <nav className="breadcrumb">
            <Link to="/">Home</Link> <span>›</span> <span>Necklaces</span>
          </nav>
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
            {products.map((product, index) => {
              const productId = getProductId(product);
              const productTitle = getProductTitle(product);
              const productPrice = getProductPrice(product);
              // Use static image from public folder based on index
              const staticImage = getStaticImagePath(index);
              
              return (
                <Link 
                  key={productId} 
                  to={`/product/${productId}`}
                  className="product-card"
                  state={{ product }}
                >
                  <div className="thumb">
                    <img 
                      src={staticImage} 
                      alt={productTitle}
                      className="product-image"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_NECKLACE;
                      }}
                    />
                  </div>
                  <div className="info">
                    <h3 className="title">{productTitle}</h3>
                    {product.description && (
                      <p className="description">{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</p>
                    )}
                    <div className="meta">
                      <span className="price">₹{productPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <button 
                      className="btn-primary"
                      onClick={(e) => handleViewDetails(e, productId)}
                    >
                      View Details
                    </button>
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
