import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./FineSilver.css";

const products = [...[...Array(12)].map((_, i) => {
  const names = [
    "Pendant-Ring Set", "Silver Bangles", "Silver Pendant Set", "Silver Ankle",
    "Silver Ankles", "Silver Set", "Silver diamond Bracelet", "Silver Ring",
    "Silver Pendant", "Silver Bracelet", "Silver-Gold Ring Set", "Silver Bracelet"
  ];
  const images = [
    "https://media.istockphoto.com/id/1216928523/photo/elegant-jewelry-set-of-white-gold-ring-necklace-and-earrings-with-diamonds.jpg?s=612x612&w=0&k=20&c=lzwVcm8OVTEwEzeLCbcBGqsEF8GcezB-tmjXMzmsfbo=",
    "https://img3.exportersindia.com/product_images/bc-full/2021/7/9024018/92-5-sterling-silver-jewellery-1625417364-5883646.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTptaeeAN4iDc7U4LJ0WNi01WljxXncG0USLQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKG67wbp0hCfsAT1TZYp91F5wERFNT8NRa8A&s",
    "https://tse2.mm.bing.net/th/id/OIP.P8R_ON4yA8pu1YtzqwUeeQHaHa?pid=Api&P=0&h=180",
    "https://www.giva.co/cdn/shop/articles/679-min.jpg?v=1713267383",
    "https://tse2.mm.bing.net/th/id/OIP.-OKSEReuPG80oU1TcrQYawHaFh?pid=Api&P=0&h=180",
    "https://tse1.mm.bing.net/th/id/OIP.vlmazZwVwhFOuoGHBsCjQQHaE8?pid=Api&P=0&h=180",
    "https://tse3.mm.bing.net/th/id/OIP.aXMVhi5NWzc_gZGdqmUIxgHaEJ?pid=Api&P=0&h=180",
    "https://tse4.mm.bing.net/th/id/OIP.i8lfFt8P_2mYKuzYCG2-uQHaE9?pid=Api&P=0&h=180",
    "https://tse3.mm.bing.net/th/id/OIP.e5oIrcF24qQMypsjR-TVOwHaEK?pid=Api&P=0&h=180",
    "https://tse4.mm.bing.net/th/id/OIP.I6_JVrLiDCkHXVn6s-sC1gHaEJ?pid=Api&P=0&h=180"
  ];
  const grossWts = ["6.1g", "3.0g", "7.5g", "10.8g", "5.5g", "2.7g", "1.9g", "4.6g", "12.0g", "9.2g", "3.3g", "2.9g"];
  const netWts = ["5.8g", "2.8g", "7.0g", "10.2g", "5.2g", "2.3g", "1.7g", "4.3g", "11.4g", "8.5g", "3.1g", "2.6g"];

  return {
    id: i + 1,
    name: names[i % names.length],
    image: images[i % images.length],
    description: `Genuine Fine Silver ${names[i % names.length]}, crafted with perfection.`,
    highlights: [
      { title: "Premium Quality" },
      { title: "Elegant Design" },
      { title: "Durable Material" }
    ],
    specs: {
      type: "Jewelry",
      purity: "99.9% Silver",
      grossWt: grossWts[i % grossWts.length],
      netWt: netWts[i % netWts.length],
      colour: "Silver",
      productType: names[i % names.length].split(" ")[1] || "Jewelry",
      gender: "Unisex",
      brand: "Fine Silver Works"
    },
    price: 1500 + (i + 1) * 220
  };
})];

// -------------------- Components -------------------- //

function FineSilver() {
  return (
    <main className="page fine-silver-page">
      <section className="container">
        <div className="grid">
          {products.map(product => (
            <article key={product.id} className="card">
              <div className="thumb">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  onError={e => { e.currentTarget.src = "https://via.placeholder.com/400x500?text=Silver+Product"; }}
                />
              </div>
              <div className="info">
                <h3 className="title">{product.name}</h3>
                <span className="price">₹ {product.price}</span>
                <Link
                  to={`/fine-silver/${product.id}`}
                  className="btn-primary outline full-width"
                  state={{ product }}
                >
                  Explore
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function FineSilverDetails() {
  const { id } = useParams();
  const location = useLocation();

  let product = location.state?.product || products.find(p => p.id === Number(id));

  if (!product) return <p>Product not found.</p>;

  return (
    <main className="page product-detail">
      <section className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>›</span>
          <Link to="/fine-silver">Fine Silver</Link> <span>›</span>
          <span>{product.name}</span>
        </div>

        <div className="detail-container">
          <ProductImage src={product.image} alt={product.name} />

          <div className="detail-info">
            <h2>{product.name}</h2>

            <div className="info-flex">
              <ul className="highlights">
                {product.highlights.map((h, i) => <li key={i}>{h.title}</li>)}
                <Link to="/contact" className="btn-enquire">
                Enquire Now
              </Link>
              </ul>
              

              <div className="specs">
                <h3>Product Specifications</h3>
                <p><strong>Type:</strong> {product.specs.type}</p>
                <p><strong>Metal Purity:</strong> {product.specs.purity}</p>
                <p><strong>Gross Wt:</strong> {product.specs.grossWt}</p>
                <p><strong>Net Wt:</strong> {product.specs.netWt}</p>
                <p><strong>Metal Colour:</strong> {product.specs.colour}</p>
                <p><strong>Product Type:</strong> {product.specs.productType}</p>
                <p><strong>Gender:</strong> {product.specs.gender}</p>
                <p><strong>Brand:</strong> {product.specs.brand}</p>
              </div>
            </div>

            <h3 className="price">Price: ₹ {product.price}</h3>
          </div>
        </div>
      </section>
    </main>
  );
}

// -------------------- ProductImage Component -------------------- //

function ProductImage({ src, alt }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="detail-image">
      <img
        src={src}
        alt={alt}
        className={zoomed ? "zoomed" : ""}
        onClick={() => setZoomed(!zoomed)}
        onError={e => { e.currentTarget.src = "https://via.placeholder.com/400x500?text=Silver+Product"; }}
      />
    </div>
  );
}

export default FineSilver;
export { FineSilverDetails };
