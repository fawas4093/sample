import React from 'react';
import { Link } from 'react-router-dom';
import './Category.css';

// Import images
import MangalsutraImg from '../assets/images/Type/Mangalsutra.png';
import Earring from '../assets/images/Type/Earring.jpeg';
import Bracelet from '../assets/images/Type/Bracelet.webp';
import Pendant from '../assets/images/Type/Mens.webp';
import Necklace from '../assets/images/Type/Necklace.png';
import Ring from '../assets/images/Type/Ring.jpg';

const categories = [
  { name: 'Necklaces', image: Necklace, path: '/necklaces' },
  { name: 'Ring', image: Ring, path: '/ring' },
  { name: 'Earring', image: Earring, path: '/earring' },
  { name: 'Bracelet', image: Bracelet, path: '/bracelet' },
  { name: 'Pendant', image: Pendant, path: '/pendant' },
  { name: 'Mangalsutra', image: MangalsutraImg, path: '/mangalsutra' },
];

const CategoryShowcase = () => {
  return (
    <section className="category-showcase">
      <div className="inner">
        {/* Remove or change the heading below if not needed */}
        {/* <h2 className="title">Everyday Demifine Jewellery</h2> */}

        {/* Grid: 3 columns (desktop/tablet), 2 columns (mobile) */}
        <div className="categories">
          {categories.map((cat, i) => (
            <Link key={i} to={cat.path} className="category-card">
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
