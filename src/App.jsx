import React from 'react';
import NavbarComponent from './components/NavbarComponent';
import Hero from './components/Hero';
import LogoCarousel from './components/LogoCarousel';
import ServicesSection from './components/ServicesSection';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Hero />
      <LogoCarousel />
      <ServicesSection />
    </div>
  );
}

export default App;
