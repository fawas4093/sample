import React from 'react';
import Hero from '../components/Hero';
import CategoryShowcase from '../components/CategoryShowcase';
import VideoCardsSection from '../components/VideoCardsSection';
import CustomJewellery from '../components/CustomJewellery';
import StoreLocator from '../components/StoreLocator';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <CategoryShowcase requireAuth={true} />
      <VideoCardsSection />
      <CustomJewellery /> 
      <StoreLocator/>
    </>
  );
};

export default LandingPage;

