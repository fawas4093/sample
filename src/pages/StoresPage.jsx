import React, { useState } from "react";
import "./StoresPage.css";
import storeBanner from "../assets/images/hero/store.avif";

const StoresPage = () => {
  const stores = [
    {
      name: "Alephata",
      address:
        "Address : Rokadeshwar Jeweler, Maharashtra 412411", // adjust as needed
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2810857775007!2d74.09079507381959!3d19.182921548609883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd23ba37e268e5%3A0x23ce1641eaafea97!2sRokadeshwar%20Jeweler!5e0!3m2!1sen!2sin!4v1759586840002!5m2!1sen!2sin",
    },
    {
      name: "Narayangaon",
      address: "Address : Plot No. 12, Narayangaon Bypass, Maharashtra 413133",
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2810857775007!2d74.09079507381959!3d19.182921548609883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd23ba37e268e5%3A0x23ce1641eaafea97!2sRokadeshwar%20Jeweler!5e0!3m2!1sen!2sin!4v1759586840002!5m2!1sen!2sin",
    },
    {
      name: "Manchar",
      address: "Address : Kapre, Manchar, Maharashtra 411014",
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2810857775007!2d74.09079507381959!3d19.182921548609883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd23ba37e268e5%3A0x23ce1641eaafea97!2sRokadeshwar%20Jeweler!5e0!3m2!1sen!2sin!4v1759586840002!5m2!1sen!2sin",
    },
  ];

  const [selectedStore, setSelectedStore] = useState(stores[0]);

  return (
    <div className="stores-page">
      {/* Banner */}
      <section className="store-banner">
        <div className="store-banner-text">
          <h2>Our Stores</h2>
        </div>
        <img src={storeBanner} alt="Store" className="store-banner-img" />
      </section>

      {/* Store Selector + Map */}
      <section className="store-map-section">
        <div className="store-list">
          <h3>Our Stores</h3>
          {stores.map((store, index) => (
            <button
              key={index}
              className={`store-btn ${
                selectedStore.name === store.name ? "active" : ""
              }`}
              onClick={() => setSelectedStore(store)}
            >
              {store.name}
            </button>
          ))}
        </div>

        <div className="map-container">
          <h3 className="map-title">{selectedStore.name}</h3>
          <p className="map-address">{selectedStore.address}</p>
          <div className="map-responsive">
            <iframe
              title={selectedStore.name}
              src={selectedStore.mapSrc}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoresPage;
