import React, { useRef, useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { gsap } from 'gsap';

const NavbarComponent = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Navigation animation
    gsap.fromTo(navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      ref={navRef}
      expand="lg"
      variant={scrolled ? 'light' : 'dark'}
      className="py-3"
      style={{
        backgroundColor: scrolled ? '#ffffff' : 'transparent',
        backgroundImage: scrolled
          ? 'none'
          : `radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.9), transparent),
             radial-gradient(2px 2px at 60px 70px, rgba(255,255,255,0.6), transparent),
             radial-gradient(1px 1px at 50px 50px, rgba(255,255,255,0.7), transparent),
             radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.5), transparent)`,
        backgroundSize: scrolled ? 'auto' : '340px 180px',
        backgroundRepeat: scrolled ? 'no-repeat' : 'repeat-x',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.08)' : 'none',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease',
      }}
    >
      <Container fluid className="px-5">
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center fw-semibold fs-5"
          style={{ fontFamily: 'Helvetica Neue' }}
        >
          INNOVATE
          <div style={{ 
            width: '36px', 
            height: '36px', 
            backgroundColor: '#bfff00', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#000',
            fontSize: '18px',
            fontWeight: '700',
            marginLeft: '6px'
          }}>360</div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              href="#home"
              className={`mx-2 ${scrolled ? 'text-dark' : 'text-white'}`}
                    style={{fontSize:22,letterSpacing:1}}
            >
              Home
              <span
                style={{
                  fontSize: '1.0rem',
                  marginLeft: '4px',
                  display: 'inline-block',
                  transform: 'translateY(-1px)',
                }}
              >
                ↓
              </span>
            </Nav.Link>
            <Nav.Link
              href="#pages"
              className={`mx-2 ${scrolled ? 'text-dark' : 'text-white'}`}
              style={{fontSize:22,letterSpacing:1}}
            >
              Pages
              <span
                style={{
                  fontSize: '1.0rem',
                  marginLeft: '4px',
                  display: 'inline-block',
                  transform: 'translateY(-1px)',
                }}
              >
                ↓
              </span>
            </Nav.Link>
            <Nav.Link
              href="#service"
              className={`mx-2 ${scrolled ? 'text-dark' : 'text-white'}`}
              style={{fontSize:22,letterSpacing:1}}
            >
              Service
            </Nav.Link>
            <Nav.Link
              href="#portfolio"
              className={`mx-2 ${scrolled ? 'text-dark' : 'text-white'}`}
              style={{fontSize:22,letterSpacing:1}}
            >
              Portfolio
            </Nav.Link>
            <Nav.Link
              href="#blog"
              className={`mx-2 ${scrolled ? 'text-dark' : 'text-white'}`}
              style={{fontSize:22,letterSpacing:1}}
            >
              Blog
            </Nav.Link>
            <Nav.Link
              href="#contact"
              className={`mx-2 ${scrolled ? 'text-dark' : 'text-white'}`}
              style={{fontSize:22,letterSpacing:1}}
            >
              Contact
            </Nav.Link>
          </Nav>
          
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
