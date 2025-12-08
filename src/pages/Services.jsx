import React from 'react';
import NavbarComponent from '../components/NavbarComponent/NavbarComponent';
import FooterSection from '../components/FooterSection/FooterSection';

function Services() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <NavbarComponent />

            {/* Header Section */}
            {/* <div style={{
                backgroundColor: '#000',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '100px',
                paddingBottom: '80px'
            }}>
                <div style={{
                    textAlign: 'center',
                    maxWidth: '1200px',
                    padding: '0 20px'
                }}>
                    <h1 style={{
                        fontFamily: 'Helvetica Neue',
                        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                        fontWeight: 800,
                        color: '#C8FF00',
                        marginBottom: '24px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        Our Services
                    </h1>
                    <p style={{
                        fontFamily: 'Noyh',
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                        color: '#fff',
                        maxWidth: '800px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        Transform your digital presence with our comprehensive suite of creative and technical services
                    </p>
                </div>
            </div> */}

            {/* Content Section - Placeholder */}
            <div style={{
                minHeight: '400px',
                padding: '80px 20px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontFamily: 'Helvetica Neue',
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    fontWeight: 700,
                    color: '#121212',
                    marginBottom: '24px',
                    marginTop: 100,
                }}>
                    Services Content Coming Soon
                </h2>
                <p style={{
                    fontFamily: 'Noyh',
                    fontSize: '1.125rem',
                    color: '#666',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    This section will showcase our services in detail. Add your custom content here.
                </p>
            </div>

            <FooterSection />
        </div>
    );
}

export default Services;
