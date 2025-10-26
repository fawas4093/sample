import React, { useState, useEffect } from 'react';
import { getMetalsRates } from '../api/metalsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const searchSuggestions = [
    'Search for mangalsutra...',
    'Search for ganthan...',
    'Search for necklaces...',
    'Search for earrings...',
    'Search for rings...',
    'Search for bangles...',
    'Search for anklets...',
    'Search for pendants...',
    'Search for bracelets...',
    'Search for nose pins...'
  ];

  useEffect(() => {
    const currentSuggestion = searchSuggestions[currentSuggestionIndex];
    const typeTimeout = setTimeout(() => {
      if (!isDeleting && currentCharIndex < currentSuggestion.length) {
        setPlaceholderText(currentSuggestion.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      } else if (!isDeleting && currentCharIndex === currentSuggestion.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentCharIndex > 0) {
        setPlaceholderText(currentSuggestion.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(currentCharIndex - 1);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentSuggestionIndex((prevIndex) => (prevIndex + 1) % searchSuggestions.length);
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(typeTimeout);
  }, [currentCharIndex, currentSuggestionIndex, isDeleting, searchSuggestions]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleInputFocus = () => setPlaceholderText('Search Gifts for your dearest...');
  const handleInputBlur = () => {
    if (!searchQuery) {
      setCurrentCharIndex(0);
      setIsDeleting(false);
    }
  };

  // Placeholder rates, replace with live API data as needed

  const [rates, setRates] = useState({
    gold: 'Loading...',
    silver: 'Loading...',
    diamond: '₹3,50,000/carat', // Static
    platinum: '₹3,200/g' // Static
  });
  const [showRates, setShowRates] = useState(false);

  // Show rates on hover
  const handleRateMouseEnter = () => setShowRates(true);
  const handleRateMouseLeave = () => setShowRates(false);

  useEffect(() => {
    const apiKey = 'demo'; // Replace with your Metals-API key for production
    getMetalsRates(apiKey).then(ratesObj => {
      setRates(r => ({
        ...r,
        gold: ratesObj.gold,
        silver: ratesObj.silver
      }));
    });
  }, []);

  return (
    <header className="header">
      <div className="container">
        {/* Brand -> home */}
        <div className="logo">
          <Link to="/" className="brand-link" aria-label="Go to home">
            <h1>certifyied Jewelry</h1>
          </Link>
        </div>

        {/* Search + Actions */}
        <div className={`search-and-actions ${isMobile ? 'mobile-layout' : ''}`}>
          <form className="search-container" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={placeholderText + (showCursor && !searchQuery ? '|' : '')}
              className="search-input animated-placeholder"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          <div className="header-actions" style={{display:'flex',alignItems:'center',gap:'20px'}}>
            {/* Admin Link */}
            <Link to="/admin/login" className="action-btn" aria-label="Admin">
              <FontAwesomeIcon icon={faUser} />
              <span className="badge">A</span>
            </Link>

            {/* Wishlist */}
            <button className="action-btn" aria-label="Wishlist">
              <FontAwesomeIcon icon={faHeart} />
              <span className="badge">0</span>
            </button>

            {/* Cart */}
            <button className="action-btn" aria-label="Cart">
              <FontAwesomeIcon icon={faShoppingBag} />
              <span className="badge">0</span>
            </button>

            {/* Rate Button (hover to show rates) */}
            <div style={{position:'relative',display:'inline-block'}}>
              <button
                className="rate-btn"
                style={{
                  padding:'10px 26px',
                  fontWeight:'bold',
                  background:'linear-gradient(135deg, #f9e7c2 0%, #e6cfa7 100%)',
                  border:'none',
                  borderRadius:'24px',
                  color:'#7a5c2e',
                  marginLeft:'10px',
                  fontSize:'16px',
                  boxShadow:'0 2px 8px rgba(201,169,97,0.10)',
                  cursor:'pointer',
                  transition:'all 0.3s',
                  letterSpacing:'1px',
                  position:'relative',
                  outline:'none'
                }}
                onMouseEnter={handleRateMouseEnter}
                onMouseLeave={handleRateMouseLeave}
                onFocus={handleRateMouseEnter}
                onBlur={handleRateMouseLeave}
              >
                <span style={{display:'inline-block',verticalAlign:'middle',fontWeight:'600',fontSize:'16px',letterSpacing:'1px'}}>💎 Rate</span>
              </button>
              {showRates && (
                <div
                  className="inline-rate-bar"
                  style={{
                    position:'absolute',
                    top:'110%',
                    left:'50%',
                    transform:'translateX(-50%)',
                    background:'#fff',
                    padding:'10px 18px',
                    fontSize:'15px',
                    color:'#333',
                    borderRadius:'8px',
                    border:'1px solid #eee',
                    boxShadow:'0 4px 16px rgba(0,0,0,0.10)',
                    minWidth:'220px',
                    zIndex:100
                  }}
                  onMouseEnter={handleRateMouseEnter}
                  onMouseLeave={handleRateMouseLeave}
                >
                  <table style={{width:'100%',borderCollapse:'collapse',textAlign:'left'}}>
                    <thead>
                      <tr style={{background:'#f8f8f8'}}>
                        <th style={{padding:'6px',borderBottom:'1px solid #eee'}}>Metal</th>
                        <th style={{padding:'6px',borderBottom:'1px solid #eee'}}>Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{padding:'6px'}}>Gold</td>
                        <td style={{padding:'6px'}}><b>{rates.gold}</b></td>
                      </tr>
                      <tr>
                        <td style={{padding:'6px'}}>Silver</td>
                        <td style={{padding:'6px'}}><b>{rates.silver}</b></td>
                      </tr>
                      <tr>
                        <td style={{padding:'6px'}}>Diamond</td>
                        <td style={{padding:'6px'}}><b>{rates.diamond}</b></td>
                      </tr>
                      <tr>
                        <td style={{padding:'6px'}}>Platinum</td>
                        <td style={{padding:'6px'}}><b>{rates.platinum}</b></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
