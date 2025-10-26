import React from 'react';
import './NewArrivals.css';
import { Link } from 'react-router-dom';
const products = [
  ...[...Array(24)].map((_, i) => {
    const names = [
      'Diamond Ring', 'Gold Ring', 'Gold Chain', 'Diamond Pendant', 'Gold Necklace', 'Diamond Necklace',
      'Gold & Pearl Bangel', 'Diamond Set', 'Silver Anklet', 'Ruby Bracelet', 'Emerald Earrings', 'Platinum Band',
      'Pearl Necklace', 'Sapphire Pendant', 'Classic Mangalsutra', 'Designer Bracelet', 'Antique Ring', 'Modern Chain',
      'Wedding Necklace', 'Party Earrings', 'Daily Wear Ring',
      'Opal Bracelet', 'Turquoise Pendant', 'Rose Gold Chain'
    ];
    const images = [
      'https://tse3.mm.bing.net/th/id/OIP.TzHm8M_b05aiG3hS0pV0uQHaE7?pid=Api&P=0&h=180',
      'https://tse3.mm.bing.net/th/id/OIP.yPURHWn8X9U0WbE99y8giQHaE7?pid=Api&P=0&h=180',
      'https://tse2.mm.bing.net/th/id/OIP.KBGzKWbkvz_72ujLCanjmwHaJ4?pid=Api&P=0&h=180',
      'https://tse2.mm.bing.net/th/id/OIP.NvFd3qwiMrXMr8KgzqweugAAAA?pid=Api&P=0&h=180',
      'https://tse2.mm.bing.net/th/id/OIP.vAaJhsqjhWrwpmrlOFq4dwHaHH?pid=Api&P=0&h=180',
      'http://3.bp.blogspot.com/-fEzQaq54bTY/VI7FgbwbxnI/AAAAAAAAOjc/ALOxif7m5SM/s1600/1.jpg',
      'https://tse4.mm.bing.net/th/id/OIP.Ss3lta_7lm05XDNk-LXZBwHaE8?pid=Api&P=0&h=180',
      'https://tse2.mm.bing.net/th/id/OIP.-xsis_Jh6SJvmSQW60kbewHaHa?pid=Api&P=0&h=180',
      'https://tse2.mm.bing.net/th/id/OIP.P8R_ON4yA8pu1YtzqwUeeQHaHa?pid=Api&P=0&h=180',
      'https://tse2.mm.bing.net/th/id/OIP.-OKSEReuPG80oU1TcrQYawHaFh?pid=Api&P=0&h=180',
      'https://tse4.mm.bing.net/th/id/OIP.UXTTUa_W84wlMdC2tzsoaQHaH6?pid=Api&P=0&h=180',
      'https://tse3.mm.bing.net/th/id/OIP.sd6O6Z30S7Bg5mAG9A64fwHaJx?pid=Api&P=0&h=180',
      'https://tse2.mm.bing.net/th/id/OIP.ipqV7vkfHCzB-pjAGonYtAHaE8?pid=Api&P=0&h=180',
      'https://tse3.mm.bing.net/th/id/OIP.aXMVhi5NWzc_gZGdqmUIxgHaEJ?pid=Api&P=0&h=180',
      'https://tse1.mm.bing.net/th/id/OIP.UkZFHshIYzcwj2_0VSh0NgHaHa?pid=Api&P=0&h=180',
      'https://tse4.mm.bing.net/th/id/OIP.i8lfFt8P_2mYKuzYCG2-uQHaE9?pid=Api&P=0&h=180',
      'https://tse1.mm.bing.net/th/id/OIP.vlmazZwVwhFOuoGHBsCjQQHaE8?pid=Api&P=0&h=180',
      'https://tse3.mm.bing.net/th/id/OIP.VeRiwF2Ce7U-MvCQU1EU6AHaHa?pid=Api&P=0&h=180',
      'https://tse2.mm.bing.net/th/id/OIP.bFZADjbnx-mkVm142G4SKwHaHP?pid=Api&P=0&h=180',
      'https://tse3.mm.bing.net/th/id/OIP.oX4xu0vABXy60DXQ2Nc77AHaFh?pid=Api&P=0&h=180',
      'https://tse3.mm.bing.net/th/id/OIP.e5oIrcF24qQMypsjR-TVOwHaEK?pid=Api&P=0&h=180',
      'https://tse3.mm.bing.net/th/id/OIP.xuCejAs_PgNupj15V1nNpQHaHa?pid=Api&P=0&h=180', 
      'https://tse4.mm.bing.net/th/id/OIP.I6_JVrLiDCkHXVn6s-sC1gHaEJ?pid=Api&P=0&h=180', 
      'https://tse3.mm.bing.net/th/id/OIP.l0uXDqp7_AruQRG76qdWXgHaHa?pid=Api&P=0&h=180'  
    ];
    const grossWts = [
      '2.1g', '3.5g', '5.0g', '2.8g', '12.5g', '24.7g', '17.0g', '33.2g', '8.5g', '2.9g', '4.0g', '5.5g',
      '6.8g', '3.9g', '7.2g', '5.6g', '5.8g', '9.3g', '31.0g', '6.7g', '7.5g', '7.4g', '5.2g', '4.9g'
    ];
    const netWts = [
      '1.9g', '3.2g', '4.6g', '2.5g', '11.8g', '23.2g', '16.5g', '32.8g', '8.0g', '2.5g', '3.7g', '5.0g',
      '6.2g', '3.5g', '6.8g', '5.2g', '5.3g', '8.9g', '29.6g', '5.3g', '7.0g', '7.1g', '4.8g', '4.5g'
    ];
    const colours = [
      'Silver', 'Gold', 'Gold', 'Platinum', 'Yellow Gold', 'White Gold', 'Gold', 'Silver', 'Silver', 'Silver',
      'Emerald', 'Platinum', 'Pearl', 'Sapphire', 'Gold', 'Diamond', 'Silver', 'Gold', 'Gold', 'Ruby',
      'Silver', 'Platinum', 'Rose Gold', 'Gold'
    ];
    return {
      id: i + 1,
      name: names[i % names.length],
      image: images[i % images.length],
      description: `This is a beautiful ${names[i % names.length]} perfect for any occasion.`,
      highlights: [
        { icon: 'icon-star', title: 'Premium Quality' },
        { icon: 'icon-gem', title: 'Elegant Design' },
        { icon: 'icon-shield', title: 'Durable Material' }
      ],
      specs: {
        type: 'Jewelry',
        purity: '22K',
        grossWt: grossWts[i % grossWts.length],
        netWt: netWts[i % netWts.length],
        colour: colours[i % colours.length],
        productType: names[i % names.length].split(' ')[1] || 'Ring',
        gender: 'Female',
        brand: 'Rokadeshwar Jeweller'
      },
      price: 10000 + (i + 1) * 500
    };
  })
];
export default function NewArrivals() {
  return (
    <main className="new-arrivals-container">
      <section className="new-arrivals-section">
        <div className="new-arrivals-grid">
          {products.map(product => (
            <article key={product.id} className="new-arrival-item">
              <div className="new-arrival-thumb">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  onError={e => { e.currentTarget.src = 'https://via.placeholder.com/400x500?text=Product'; }}
                />
              </div>
              <div className="new-arrival-info">
                <h3 className="new-arrival-title">{product.name}</h3>
                <div className="new-arrival-meta">
                  <span className="new-arrival-price">₹ {10000 + product.id * 500}</span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="btn-primary outline"
                  state={{ product, fromNewArrivals: true }}
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
