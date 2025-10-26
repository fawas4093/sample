import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CategoryShowcase from './components/CategoryShowcase';
import VideoCardsSection from "./components/VideoCardsSection";
import CustomJewellery from './components/CustomJewellery';

import BestSellerPage from './pages/BestSellerPage';
import NewArrivals from './components/NewArrivals.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage';
import FineSilver, { FineSilverDetails } from "./pages/FineSilver.jsx";

// Admin entry
import AdminApp from './admin/AdminApp';

import NecklacePage from './pages/category/NecklacesPage.jsx';
import RingPage from './pages/category/RingPage.jsx';
import EarringPage from './pages/category/EarringPage.jsx';
import BraceletPage from './pages/category/BraceletPage.jsx';
import MensPage from './pages/category/MensPage.jsx';
import MangalsutraPage from './pages/category/MangalsutraPage.jsx';
import StoreLocator from './components/StoreLocator.jsx';
import StoresPage from './pages/StoresPage.jsx';

import './App.css';


const Home = () => (
  <>
    <Hero />
    <CategoryShowcase />
    <VideoCardsSection />
    <CustomJewellery /> 
    <StoreLocator/>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <TopBanner />
      <Header />
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/best-seller" element={<BestSellerPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/admin/*" element={<AdminApp />} />
        
        <Route path="/fine-silver" element={<FineSilver />} />
        <Route path="/fine-silver/:id" element={<FineSilverDetails />} />

         <Route path="/necklaces" element={<NecklacePage />} />
        <Route path="/ring" element={<RingPage />} />
        <Route path="/earring" element={<EarringPage />} />
        <Route path="/bracelet" element={<BraceletPage />} />
        <Route path="/mens" element={<MensPage />} />
        <Route path="/mangalsutra" element={<MangalsutraPage />} />
         {/* ✅ Add this route for your new store page */}
        <Route path="/stores" element={<StoresPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
