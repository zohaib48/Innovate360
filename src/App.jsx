import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import FloatingBookingButton from './components/FloatingBookingButton/FloatingBookingButton';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <FloatingBookingButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
