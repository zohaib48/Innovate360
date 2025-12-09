import React from 'react';
import NavbarComponent from '../components/NavbarComponent/NavbarComponent';
import FooterSection from '../components/FooterSection/FooterSection';
import ServicesBanner from '../components/ServicesBanner/ServicesBanner';
import DigitalSolutionsGrid from '../components/DigitalSolutionsGrid/DigitalSolutionsGrid';

function Services() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <NavbarComponent />

            {/* Services Banner Section */}
            <ServicesBanner />

            {/* Digital Solutions Grid Section */}
            <DigitalSolutionsGrid />

            <FooterSection />
        </div>
    );
}

export default Services;
