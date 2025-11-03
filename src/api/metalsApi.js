// metalsApi.js
// Fetches live rates for gold and silver from Metals-API
// Usage: import { getMetalsRates } from './metalsApi';

// Uses GoldAPI for gold/silver rates in USD, then converts to INR using exchangerate.host
export async function getMetalsRates(apiKey = 'goldapi-fwpich19mg9hdncb-io') {
  try {
    // Default static prices (fallback when API fails)
    let goldInrPerGram = 6200;
    let silverInrPerGram = 75;

    // Get gold rate in USD per troy ounce
    const goldRes = await fetch('https://www.goldapi.io/api/XAU/USD', {
      headers: { 'x-access-token': apiKey, 'Content-Type': 'application/json' }
    });
    
    // Check if gold API request was successful
    if (!goldRes.ok) {
      console.warn(`GoldAPI error: ${goldRes.status} ${goldRes.statusText}. Using fallback rates.`);
      return {
        gold: `₹${goldInrPerGram.toFixed(2)}/g`,
        silver: `₹${silverInrPerGram.toFixed(2)}/g`,
        error: `API Error: ${goldRes.status}`
      };
    }
    
    const goldData = await goldRes.json();
    console.log('GoldAPI gold response:', goldData);
    
    // Get silver rate in USD per troy ounce
    const silverRes = await fetch('https://www.goldapi.io/api/XAG/USD', {
      headers: { 'x-access-token': apiKey, 'Content-Type': 'application/json' }
    });
    
    // Check if silver API request was successful
    if (!silverRes.ok) {
      console.warn(`GoldAPI error: ${silverRes.status} ${silverRes.statusText}. Using fallback rates.`);
      return {
        gold: `₹${goldInrPerGram.toFixed(2)}/g`,
        silver: `₹${silverInrPerGram.toFixed(2)}/g`,
        error: `API Error: ${silverRes.status}`
      };
    }
    
    const silverData = await silverRes.json();
    console.log('GoldAPI silver response:', silverData);

    // Get USD to INR conversion rate
    const fxRes = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=INR');
    const fxData = await fxRes.json();
    console.log('Currency conversion response:', fxData);
    const usdToInr = fxData.rates?.INR || 0;

    // Convert rates to INR per gram
    // 1 troy ounce = 31.1035 grams
    let goldPrice = goldData.price ? goldData.price : null;
    let silverPrice = silverData.price ? silverData.price : null;
    if (
      usdToInr > 0 &&
      goldPrice && !isNaN(goldPrice) &&
      silverPrice && !isNaN(silverPrice)
    ) {
      const goldUsdPerGram = goldPrice / 31.1035;
      const silverUsdPerGram = silverPrice / 31.1035;
      const goldCalc = goldUsdPerGram * usdToInr;
      const silverCalc = silverUsdPerGram * usdToInr;
      if (!isNaN(goldCalc) && goldCalc > 0) goldInrPerGram = goldCalc;
      if (!isNaN(silverCalc) && silverCalc > 0) silverInrPerGram = silverCalc;
    }

    return {
      gold: `₹${goldInrPerGram.toFixed(2)}/g`,
      silver: `₹${silverInrPerGram.toFixed(2)}/g`,
      raw: { goldData, silverData, fxData }
    };
  } catch (err) {
    console.error('GoldAPI error:', err);
    // Return fallback rates on any error
    return {
      gold: '₹6,200.00/g',
      silver: '₹75.00/g',
      error: err
    };
  }
}
