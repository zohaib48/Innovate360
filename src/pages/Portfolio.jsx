import React from 'react';
import NavbarComponent from '../components/NavbarComponent/NavbarComponent';
import FooterSection from '../components/FooterSection/FooterSection';
import ProjectsSection from '../components/RecentlyCompletedProject/ProjectsSection';
import ArchitectureShowcase from '../components/ArchitectureShowcase/ArchitectureShowcase';
import GameShowcaseSection from '../components/GameShowcaseSection/GameShowcaseSection';

function Portfolio() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <NavbarComponent />

           
          
            <ProjectsSection/>
            {/* <ArchitectureShowcase backgroundColor='white'/> */}
            <GameShowcaseSection />

            <FooterSection />
        </div>
    );
}

export default Portfolio;
