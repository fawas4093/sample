import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Category.css';

// Import images
import Earring from '../assets/images/Type/newearring.webp';
import Pendant from '../assets/images/Type/pendant.webp';
import Necklace from '../assets/images/Type/newnecklace.webp';

const categories = [
  { name: 'Necklaces', image: Necklace, path: '/necklaces' },
  { name: 'Earring', image: Earring, path: '/earring' },
  { name: 'Pendant', image: Pendant, path: '/pendant' },
];

const CategoryShowcase = ({ requireAuth = false }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (e, categoryPath) => {
    // If authentication is required, check if user is logged in
    if (requireAuth) {
      const userId = sessionStorage.getItem('userId');
      const userToken = sessionStorage.getItem('userToken');
      
      // If not authenticated, redirect to customer auth page
      if (!userId && !userToken) {
        e.preventDefault();
        navigate('/customer-auth');
        return;
      }
    }
    // If authenticated or auth not required, allow normal navigation
  };

  return (
    <section className="category-showcase">
      <div className="inner">
        {/* Remove or change the heading below if not needed */}
        {/* <h2 className="title">Everyday Demifine Jewellery</h2> */}

        {/* Grid: 3 columns (desktop/tablet), 2 columns (mobile) */}
        <div className="categories">
          {categories.map((cat, i) => (
            <Link 
              key={i} 
              to={cat.path} 
              className="category-card"
              onClick={(e) => handleCategoryClick(e, cat.path)}
            >
              <img src={cat.image} alt={cat.name} />
              <p>{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
