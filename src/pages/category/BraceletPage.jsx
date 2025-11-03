import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BraceletPage.css';

const BraceletPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://amaara-ecom.onrender.com/api/product?category=bracelet');
        
        // Handle different response structures
        const productsData = response.data?.content || response.data?.data || response.data || [];
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        console.error('Error fetching bracelets:', err);
        setError('Failed to load bracelets. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductImage = (product) => {
    if (product.imageUrl) return product.imageUrl;
    if (product.image) return product.image;
    if (product.images && product.images.length > 0) return product.images[0];
    return 'https://via.placeholder.com/300x400?text=Bracelet';
  };

  const getProductPrice = (product) => {
    if (product.price) return Number(product.price);
    return 0;
  };

  const getProductTitle = (product) => {
    return product.title || product.name || 'Bracelet';
  };

  const getProductId = (product) => {
    return product.id || product._id || '';
  };

  if (loading) {
    return (
      <div className="bracelets-page">
        <div className="container">
          <h1>Bracelets</h1>
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p>Loading bracelets...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bracelets-page">
        <div className="container">
          <h1>Bracelets</h1>
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#d32f2f' }}>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bracelets-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> <span>›</span> <span>Bracelets</span>
        </nav>
        
        <h1>Bracelets</h1>
        
        {products.length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p>No bracelets found.</p>
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
                        e.currentTarget.src = 'https://via.placeholder.com/300x400?text=Bracelet';
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

export default BraceletPage;
