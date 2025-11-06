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

// Product detail image from public/images/products folder
const PRODUCT_DETAIL_IMAGE = '/images/products/productdetail.webp';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [p, setP] = useState(location.state?.product || null);
  const [hero, setHero] = useState(PLACEHOLDER_IMAGE); // Initialize with placeholder instead of empty string
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState(null);

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

  // Helper function to get product amount
  const getProductAmount = (product) => {
    if (product.amount !== undefined && product.amount !== null) {
      return Number(product.amount);
    }
    if (product.price !== undefined && product.price !== null) {
      return Number(product.price);
    }
    return 0;
  };

  // Helper function to get product name
  const getProductName = (product) => {
    return product.name || product.title || 'Product';
  };

  // Helper function to get product description
  const getProductDescription = (product) => {
    return product.description || product.desc || '';
  };

  // Calculate total amount based on quantity
  const baseAmount = p ? getProductAmount(p) : 0;
  const totalAmount = baseAmount * quantity;

  // Handle quantity changes
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  // Get product image from public folder
  const getProductImagePath = () => {
    return PRODUCT_DETAIL_IMAGE;
  };

  // Helper function to get product ID
  const getProductId = (product) => {
    return product.id || product._id || id || '';
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!p) return;

    setIsAddingToCart(true);
    setCartMessage(null);

    try {
      const productId = getProductId(p);
      
      // Validate productId
      if (!productId || productId === '') {
        throw new Error('Product ID is missing');
      }

      // Ensure productId is a string
      const productIdString = String(productId);
      
      // Get user token and userId from sessionStorage if available
      const userToken = sessionStorage.getItem('userToken');
      const userId = sessionStorage.getItem('userId');
      
      // Prepare headers
      const headers = {
        'Content-Type': 'application/json'
      };
      
      // Add authorization header if token exists
      if (userToken) {
        headers['Authorization'] = `Bearer ${userToken}`;
      }
      
      // API expects format: { 'productId': '...', 'quantity': ... }
      const cartData = {
        productId: productIdString,
        quantity: quantity
      };
      
      // Include userId in request if available (some APIs require it)
      if (userId) {
        cartData.userId = userId;
      }

      console.log('Sending cart data:', cartData);
      console.log('Headers:', headers);

      const response = await axios.post(`${API_BASE_URL}/api/cart/add`, cartData, {
        headers: headers
      });
      
      console.log('Cart response:', response.data);
      
      setCartMessage({
        type: 'success',
        text: 'Item added to cart successfully!'
      });

      // Clear message after 3 seconds
      setTimeout(() => {
        setCartMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error response headers:', error.response?.headers);
      console.error('Request data sent:', {
        productId: getProductId(p),
        quantity: quantity
      });
      
      // Try to extract more detailed error information
      let errorMessage = 'Failed to add item to cart. Please try again.';
      
      if (error.response) {
        // Server responded with error
        const errorData = error.response.data;
        errorMessage = errorData?.message 
          || errorData?.error 
          || errorData?.errorMessage
          || `Server error: ${error.response.status}`;
        
        // If it's a 500 error, provide more helpful message
        if (error.response.status === 500) {
          errorMessage = 'Internal server error. Please check if you are logged in and try again.';
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Error in setting up the request
        errorMessage = error.message || 'An error occurred. Please try again.';
      }
      
      setCartMessage({
        type: 'error',
        text: errorMessage
      });

      // Clear error message after 5 seconds
      setTimeout(() => {
        setCartMessage(null);
      }, 5000);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!p) return <div className="container" style={{ padding: '40px 0' }}><h2>Loading...</h2></div>;

  return (
    <main className="page page-product-details">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> <span>›</span> <span>{getProductName(p)}</span>
        </nav>

        <div className="details-layout">
          <div className="highlights-block">
            {/* Product Name */}
            <h1 style={{ marginBottom: '20px', fontSize: '28px', fontWeight: 'bold' }}>
              {getProductName(p)}
            </h1>
            
            {/* Description Display */}
            {getProductDescription(p) && (
              <div className="description-block" style={{ marginBottom: '30px' }}>
                <p className="description-text" style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
                  {getProductDescription(p)}
                </p>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="quantity-selector" style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <label htmlFor="quantity" style={{ fontSize: '16px', fontWeight: '500' }}>Quantity:</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  style={{
                    padding: '8px 15px',
                    border: 'none',
                    backgroundColor: '#f5f5f5',
                    cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: quantity <= 1 ? '#ccc' : '#333',
                    borderRight: '1px solid #ddd'
                  }}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    handleQuantityChange(val);
                  }}
                  style={{
                    width: '60px',
                    padding: '8px',
                    textAlign: 'center',
                    border: 'none',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  style={{
                    padding: '8px 15px',
                    border: 'none',
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333',
                    borderLeft: '1px solid #ddd'
                  }}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Amount Display */}
            <div className="amount-display" style={{ marginBottom: '30px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#732f2f' }}>
                <span style={{ fontSize: '18px', fontWeight: 'normal', marginRight: '10px' }}>Total Amount:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              {quantity > 1 && (
                <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  (₹{baseAmount.toLocaleString('en-IN')} × {quantity})
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              className="btn-primary"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              style={{
                width: '100%',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '15px',
                cursor: isAddingToCart ? 'not-allowed' : 'pointer',
                opacity: isAddingToCart ? 0.7 : 1
              }}
            >
              {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </button>

            {/* Cart Message */}
            {cartMessage && (
              <div
                style={{
                  padding: '12px',
                  borderRadius: '4px',
                  backgroundColor: cartMessage.type === 'success' ? '#d4edda' : '#f8d7da',
                  color: cartMessage.type === 'success' ? '#155724' : '#721c24',
                  border: `1px solid ${cartMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                  fontSize: '14px',
                  marginTop: '10px'
                }}
              >
                {cartMessage.text}
              </div>
            )}
          </div>
          
          {/* Right Side: Product Image */}
          <div className="media-block">
            <div className="hero-img">
              <img 
                src={getProductImagePath()} 
                alt={getProductName(p)} 
                onError={(e) => {
                  e.currentTarget.src = PLACEHOLDER_IMAGE;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
