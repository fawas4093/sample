import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const API_BASE_URL = 'https://amaara-ecom.onrender.com';

// Create a simple SVG placeholder as data URI
const createPlaceholderImage = (width = 300, height = 400, text = 'Product') => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3eaea"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="#732f2f" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const PLACEHOLDER_IMAGE = createPlaceholderImage(300, 400, 'Product');
const PRODUCT_DETAIL_IMAGE = '/images/products/productdetail.webp';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user token from sessionStorage
        const userToken = sessionStorage.getItem('userToken');
        const userId = sessionStorage.getItem('userId');

        console.log('Fetching cart - UserToken:', userToken ? 'Present' : 'Missing', 'UserId:', userId || 'Missing');

        // Prepare headers
        const headers = {
          'Content-Type': 'application/json'
        };

        // Add authorization header if token exists
        if (userToken) {
          headers['Authorization'] = `Bearer ${userToken}`;
        }

        // Fetch cart data
        let response;
        
        try {
          // Make the API request
          if (userId) {
            response = await axios.get(`${API_BASE_URL}/api/cart/getcart`, {
              headers: headers,
              params: { userId },
              validateStatus: function (status) {
                // Accept 200-299 and also 500 if it contains cart data
                return (status >= 200 && status < 300) || status === 500;
              }
            });
          } else {
            response = await axios.get(`${API_BASE_URL}/api/cart/getcart`, {
              headers: headers,
              validateStatus: function (status) {
                // Accept 200-299 and also 500 if it contains cart data
                return (status >= 200 && status < 300) || status === 500;
              }
            });
          }
        } catch (requestError) {
          // If axios throws an error, check if response contains cart data
          if (requestError.response?.data && (requestError.response.data.items || requestError.response.data._id)) {
            // Server returned cart data even with error status - treat as success
            response = requestError.response;
          } else {
            throw requestError;
          }
        }

        console.log('Cart API Response:', response.data);
        console.log('Response status:', response.status);

        // Handle different response formats
        let items = [];
        const responseData = response.data;
        
        if (!responseData) {
          // Empty response - cart might be empty
          items = [];
        } else if (Array.isArray(responseData)) {
          // Response is directly an array of items
          items = responseData;
        } else if (responseData.items && Array.isArray(responseData.items)) {
          // Response has items array (this is the format we're seeing)
          items = responseData.items;
        } else if (responseData.cart && Array.isArray(responseData.cart)) {
          items = responseData.cart;
        } else if (responseData.data && Array.isArray(responseData.data)) {
          items = responseData.data;
        } else if (responseData._id && responseData.items) {
          // Cart object with items array (the format from the error response)
          items = responseData.items;
        } else if (responseData.message) {
          // API might return a message indicating empty cart
          console.log('API message:', responseData.message);
          items = [];
        }

        console.log('Parsed cart items:', items);
        setCartItems(items);
        
        // If no items, it's just an empty cart (not an error)
        if (items.length === 0) {
          // Don't set error for empty cart, just show empty state
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
        console.error('Error response data:', JSON.stringify(err.response?.data, null, 2));
        console.error('Error status:', err.response?.status);
        console.error('Error headers:', err.response?.headers);
        console.error('Request URL:', err.config?.url);
        console.error('Request method:', err.config?.method);
        console.error('Request headers:', err.config?.headers);
        console.error('Request params:', err.config?.params);
        
        // Extract detailed error message
        let errorMessage = 'Failed to load cart. Please try again.';
        
        if (err.response?.status === 401) {
          setError('Please log in to view your cart.');
          return;
        } else if (err.response?.status === 404) {
          // 404 might mean empty cart, not necessarily an error
          setCartItems([]);
          // Don't set error for 404, just show empty cart
          return;
        } else if (err.response?.status === 500) {
          // For 500 errors, show more helpful message and log details
          const errorData = err.response.data;
          if (errorData?.message) {
            errorMessage = `Server error: ${errorData.message}`;
          } else if (errorData?.error) {
            errorMessage = `Server error: ${errorData.error}`;
          } else {
            errorMessage = 'Server error occurred. The cart service may be temporarily unavailable. Please try again later.';
          }
          setError(errorMessage);
        } else if (err.response?.data) {
          const errorData = err.response.data;
          errorMessage = errorData.message 
            || errorData.error 
            || errorData.errorMessage
            || `Error ${err.response.status}: Failed to load cart.`;
          setError(errorMessage);
        } else if (err.request) {
          setError('Unable to connect to server. Please check your internet connection.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Helper function to get product name
  const getProductName = (item) => {
    return item.product?.name || item.product?.title || item.name || 'Product';
  };

  // Helper function to get product description
  const getProductDescription = (item) => {
    return item.product?.description || item.product?.desc || item.description || '';
  };

  // Helper function to get product price/amount
  const getProductPrice = (item) => {
    if (item.amount !== undefined && item.amount !== null) {
      return Number(item.amount);
    }
    if (item.product?.amount !== undefined && item.product?.amount !== null) {
      return Number(item.product.amount);
    }
    if (item.price !== undefined && item.price !== null) {
      return Number(item.price);
    }
    if (item.product?.price !== undefined && item.product?.price !== null) {
      return Number(item.product.price);
    }
    return 0;
  };

  // Helper function to get product ID
  const getProductId = (item) => {
    return item.productId || item.product?.id || item.product?._id || item.id || '';
  };

  // Calculate totals
  const calculateTotals = () => {
    let subtotal = 0;
    cartItems.forEach(item => {
      const price = getProductPrice(item);
      const qty = item.quantity || 1;
      subtotal += price * qty;
    });
    return subtotal;
  };

  const subtotal = calculateTotals();

  if (loading) {
    return (
      <div className="cart-page">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> <span>›</span> <span>Cart</span>
          </nav>
          <h1>Shopping Cart</h1>
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p>Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> <span>›</span> <span>Cart</span>
          </nav>
          <h1>Shopping Cart</h1>
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#d32f2f' }}>
            <p>{error}</p>
            {error.includes('log in') && (
              <Link to="/customer-auth" style={{ marginTop: '20px', display: 'inline-block' }}>
                <button className="btn-primary">Go to Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> <span>›</span> <span>Cart</span>
        </nav>
        
        <h1>Shopping Cart</h1>

        {error && (
          <div style={{ 
            padding: '12px', 
            marginBottom: '20px',
            backgroundColor: '#fff3cd',
            color: '#856404',
            border: '1px solid #ffeaa7',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p>Your cart is empty.</p>
            <Link to="/" style={{ marginTop: '20px', display: 'inline-block' }}>
              <button className="btn-primary">Continue Shopping</button>
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item, index) => {
                const productId = getProductId(item);
                const productName = getProductName(item);
                const description = getProductDescription(item);
                const price = getProductPrice(item);
                const quantity = item.quantity || 1;
                const itemTotal = price * quantity;

                return (
                  <div key={item._id || item.id || index} className="cart-item">
                    <Link 
                      to={`/product/${productId}`}
                      className="cart-item-image-link"
                    >
                      <div className="cart-item-image">
                        <img 
                          src={PRODUCT_DETAIL_IMAGE}
                          alt={productName}
                          onError={(e) => {
                            e.currentTarget.src = PLACEHOLDER_IMAGE;
                          }}
                        />
                      </div>
                    </Link>
                    
                    <div className="cart-item-details">
                      <Link to={`/product/${productId}`} className="cart-item-title-link">
                        <h3 className="cart-item-title">{productName}</h3>
                      </Link>
                      {description && (
                        <p className="cart-item-description">
                          {description.length > 150 ? `${description.substring(0, 150)}...` : description}
                        </p>
                      )}
                      <div className="cart-item-meta">
                        <div className="cart-item-quantity">
                          <span>Quantity: {quantity}</span>
                        </div>
                        <div className="cart-item-price">
                          <span className="price-label">Price:</span>
                          <span className="price-value">₹{price.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="cart-item-total">
                          <span className="total-label">Total:</span>
                          <span className="total-value">₹{itemTotal.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

