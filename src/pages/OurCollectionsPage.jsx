import React from 'react';
import './OurCollectionsPage.css';

const OurCollectionsPage = () => {
  // Random selection of product images from public/images/products
  const productImages = [
    { src: '/images/products/necklaces-1.jpg', name: 'Elegant Necklace' },
    { src: '/images/products/earring-5.jpg', name: 'Classic Earrings' },
    { src: '/images/products/pendant-3.jpg', name: 'Delicate Pendant' },
    { src: '/images/products/necklaces-8.jpg', name: 'Statement Necklace' },
    { src: '/images/products/earring-12.jpg', name: 'Modern Earrings' },
    { src: '/images/products/pendant-15.jpg', name: 'Vintage Pendant' },
    { src: '/images/products/necklaces-15.jpg', name: 'Layered Necklace' },
    { src: '/images/products/earring-8.jpg', name: 'Drop Earrings' },
    { src: '/images/products/pendant-22.jpg', name: 'Designer Pendant' },
    { src: '/images/products/necklaces-20.jpg', name: 'Choker Necklace' },
    { src: '/images/products/earring-15.jpg', name: 'Stud Earrings' },
    { src: '/images/products/pendant-8.jpg', name: 'Minimalist Pendant' },
  ];

  return (
    <div className="collections-page">
      <section className="collections-banner">
        <div className="collections-banner-text">
          <h2>Welcome to Amaara Collections</h2>
        </div>
      </section>

      <section className="collections-content">
        <div className="container">
          <div className="product-images-grid">
            {productImages.map((product, index) => (
              <div key={index} className="product-image-card">
                <div className="product-image-wrapper">
                  <img src={product.src} alt={product.name} />
                </div>
                <div className="product-image-info">
                  <h3>{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurCollectionsPage;

