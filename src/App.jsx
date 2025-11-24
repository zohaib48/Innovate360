import React from 'react';
import NavbarComponent from './components/NavbarComponent';
import Hero from './components/Hero';
import LogoCarousel from './components/LogoCarousel';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Hero />
      <LogoCarousel />
    </div>
  );
}

export default App;
