import React from 'react';
import NavbarComponent from './components/NavbarComponent';
import Hero from './components/Hero';
import LogoCarousel from './components/LogoCarousel';
import StatsSection from './components/StatsSection';
import ServicesSection from './components/ServicesSection';
import LargeText from './components/LargeText';
import AboutSection from './components/VideoDetailSection';
import ArchitectureShowcase from './components/ArchitectureShowcase';

function App() {
  return (
    <div className="App">
      {/* <NavbarComponent /> */}
      <Hero />
      <LogoCarousel />
      <StatsSection />
      <LargeText/>
      <ServicesSection />
      <AboutSection/>
      <ArchitectureShowcase/>
    
    </div>
  );
}

export default App;
