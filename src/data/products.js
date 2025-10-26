const BASE_ITEMS = [
  { base: 'Mangalsutra', img: '/images/products/mangalsutra-1.png' },
  { base: 'Necklace',   img: '/images/products/necklace-1.png' },
  { base: 'Earrings',   img: '/images/products/earrings-1.png' },
  { base: 'Bracelet',   img: '/images/products/bracelet-1.png' },
  { base: 'Ganthan',    img: '/images/products/ganthan-1.png' },
  { base: 'Ring',       img: '/images/products/ring-1.png' },
  { base: 'Pendant',    img: '/images/products/pendant-1.png' },
  { base: 'Bangle',     img: '/images/products/bangle-1.png' },
  { base: 'Anklet',     img: '/images/products/anklet-1.png' }
];

const adjectives = [
  'Classic', 'Elegant', 'Statement', 'Delicate', 'Modern',
  'Royal', 'Premium', 'Heritage', 'Aesthetic', 'Timeless'
];

const makeSafeImages = (img) => {
  if (!img) return [];
  const a = img.replace('-1', '-2');
  const b = img.replace('-1', '-3');
  return [img, a, b];
};

const buildProducts = (count = 50) => {
  const out = [];
  let id = 1;
  while (out.length < count) {
    for (let i = 0; i < BASE_ITEMS.length && out.length < count; i++) {
      const item = BASE_ITEMS[i];
      const adj = adjectives[(id + i) % adjectives.length];
      const price = 1200 + ((id * 137) % 3000);

      out.push({
        id,
        title: `${adj} ${item.base} ${id}`,
        price,
        img: item.img,
        images: makeSafeImages(item.img),
        specs: {
          type: 'Gold Ornament',
          purity: (id % 2 === 0) ? '22 kt' : '18 kt',
          grossWt: (10 + (id % 10) + 0.14).toFixed(2),
          netWt: (9.7 + (id % 10) + 0.18).toFixed(2),
          colour: (id % 3 === 0) ? 'Rose Gold' : 'Yellow Gold',
          productType: item.base,
          gender: (id % 2 === 0) ? 'Women' : 'Men',
          brand: 'Rokadeshwar'
        },
        highlights: [
          { icon: 'purity', title: 'Purity Guaranteed' },
          { icon: 'legacy', title: 'Trusted Legacy' },
          { icon: 'aesthetic', title: 'Aesthetic Design' }
        ]
      });
      id++;
    }
  }
  return out;
};

export const PRODUCTS = buildProducts(50);
