import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NecklacesPage.css';

const NecklacesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://amaara-ecom.onrender.com/api/product?category=necklaces');
        
        // Handle different response structures
        const productsData = response.data?.content || response.data?.data || response.data || [];
        setProducts(Array.isArray(productsData) ? productsData : []);
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
    if (product.imageUrl) return product.imageUrl;
    if (product.image) return product.image;
    if (product.images && product.images.length > 0) return product.images[0];
    return 'https://via.placeholder.com/300x400?text=Necklace';
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
                        e.currentTarget.src = 'https://via.placeholder.com/300x400?text=Necklace';
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
