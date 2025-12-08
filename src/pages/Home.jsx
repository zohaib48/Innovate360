import React from 'react';
import NavbarComponent from '../components/NavbarComponent/NavbarComponent';
import Hero from '../components/Hero/Hero';
import LogoCarousel from '../components/LogoCarousel/LogoCarousel';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import ArchitectureShowcase from '../components/ArchitectureShowcase/ArchitectureShowcase';
import LargeText from '../components/LargeText/LargeText';
import AboutSection from '../components/VideoDetailSection/VideoDetailSection';
import AgencySection from '../components/AgencySection/AgencySection';
import TeamSection from '../components/TeamSection/TeamSection';
import ParallaxImageSection from '../components/ParallaxImageSection/ParallaxImageSection';
import TestimonialsSection from '../components/TestimonialsSection/TestimonialsSection';
import FooterSection from '../components/FooterSection/FooterSection';

function Home() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <NavbarComponent />
            <Hero />
            <LogoCarousel />
            <ServicesSection />
            <ArchitectureShowcase />
            <LargeText />
            <AboutSection />
            <AgencySection />
            <TeamSection />
            <ParallaxImageSection />
            <TestimonialsSection />
            <FooterSection />
        </div>
    );
}

export default Home;
