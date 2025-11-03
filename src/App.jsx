import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CategoryShowcase from './components/CategoryShowcase';
import VideoCardsSection from "./components/VideoCardsSection";
import CustomJewellery from './components/CustomJewellery';

import ProductDetailsPage from './pages/ProductDetailsPage';

// Admin entry
import AdminApp from './admin/AdminApp';

import NecklacePage from './pages/category/NecklacesPage.jsx';
import RingPage from './pages/category/RingPage.jsx';
import EarringPage from './pages/category/EarringPage.jsx';
import BraceletPage from './pages/category/BraceletPage.jsx';
import PendantPage from './pages/category/PendantPage.jsx';
import MangalsutraPage from './pages/category/MangalsutraPage.jsx';
import StoreLocator from './components/StoreLocator.jsx';
import StoresPage from './pages/StoresPage.jsx';
import CustomerAuth from './pages/CustomerAuth';
import Cart from './pages/Cart';

import './App.css';

// Protected Home component - redirects to login if not authenticated
const Home = () => {
  // Check authentication status
  const userId = sessionStorage.getItem('userId');
  const userToken = sessionStorage.getItem('userToken');
  
  // If not logged in, redirect to customer-auth
  if (!userId && !userToken) {
    return <Navigate to="/customer-auth" replace />;
  }

  return (
    <>
      <Hero />
      <CategoryShowcase />
      <VideoCardsSection />
      <CustomJewellery /> 
      <StoreLocator/>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <TopBanner />
      <Header />
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-auth" element={<CustomerAuth mode="login" />} />
        <Route path="/customer-register" element={<CustomerAuth mode="register" />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/*" element={<AdminApp />} />

         <Route path="/necklaces" element={<NecklacePage />} />
        <Route path="/ring" element={<RingPage />} />
        <Route path="/earring" element={<EarringPage />} />
        <Route path="/bracelet" element={<BraceletPage />} />
        <Route path="/pendant" element={<PendantPage />} />
        <Route path="/mangalsutra" element={<MangalsutraPage />} />
         {/* ✅ Add this route for your new store page */}
        <Route path="/stores" element={<StoresPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
