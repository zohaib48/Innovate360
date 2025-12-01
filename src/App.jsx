import React from 'react';
import NavbarComponent from './components/NavbarComponent';
import Hero from './components/Hero';
import LogoCarousel from './components/LogoCarousel';
import StatsSection from './components/StatsSection';
import ServicesSection from './components/ServicesSection';
import LargeText from './components/LargeText';

function App() {
  return (
    <div className="App">
      {/* <NavbarComponent /> */}
      <Hero />
      <LogoCarousel />
      <StatsSection />
      <LargeText/>
      <ServicesSection />
    
    </div>
  );
}

export default App;
