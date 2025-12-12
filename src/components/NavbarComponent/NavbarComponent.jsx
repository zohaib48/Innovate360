import React, { useRef, useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export const NavbarComponent = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  // Check if we're on a page that should show the background image
  const isOtherPage = ['/services', '/portfolio', '/contact'].includes(location.pathname);

  useEffect(() => {
    // Navigation animation
    gsap.fromTo(navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
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
      expanded={expanded}
      onToggle={(val) => setExpanded(val)}
      variant={(scrolled) ? 'light' : 'dark'}
      bg={(scrolled) ? 'light' : 'transparent'}
      className="py-3"
      fixed="top"
      style={{
        minHeight: expanded ? 80 : undefined,
        maxHeight: expanded ? undefined : 80,
        zIndex: 1000,
        backgroundColor: (scrolled) ? '#ffffff' : 'transparent',
        backgroundImage: (isOtherPage && !scrolled) ? 'url(https://i.postimg.cc/BnJnB6RC/image.png)' : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginLeft: isOtherPage ? '-2px' : '0px',
        boxShadow: (scrolled) ? '0 12px 30px rgba(0, 0, 0, 0.08)' : 'none',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease',
        width: '100%',
      }}
    >
      <Container fluid className="align-items-center" style={{ padding: '0 45px' }}>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center fw-semibold fs-5"
          style={{ fontFamily: 'Noyh' }}
        >
          <img
            src={scrolled ? "https://i.postimg.cc/y6XdKjZw/Gemini-Generated-Image-ntpx2wntpx2wntpx-removebg-preview.png" : "https://i.postimg.cc/jjgV92ZS/Gemini-Generated-Image-ydnaalydnaalydna-removebg-preview.png"}
            alt="Innovate360 Logo"
            style={{
              height: 'auto',
              width: '250px',
              marginRight: '10px',
              objectFit: 'contain',
              marginTop: '2px',
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle style={{ borderColor: 'darkgrey' }} aria-controls="navbar-nav" />

        <Navbar.Collapse
          id="navbar-nav"
          className="navbar-collapse"
          style={{
            justifyContent: 'flex-end',
            backgroundColor: 'transparent',
            transition: 'max-height 0.3s ease-in-out'
          }}
        >
          <Nav className="text-center" style={{ textTransform: 'uppercase' }}>
            <Nav.Link
              as={Link}
              to="/"
              className={`mx-2 ${scrolled ? 'text-dark' : 'text-white'}`}
              style={{ fontSize: 20, letterSpacing: 1, fontFamily: 'Noyh', fontWeight: 500 }}
              onMouseEnter={(e) => {
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.style.transform = 'translateY(2px)';
              }}
              onMouseLeave={(e) => {
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.style.transform = 'translateY(-1px)';
              }}
            >
              Home
              {/* <svg
                style={{
                  width: '14px',
                  height: '14px',
                  marginLeft: '6px',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  transform: 'translateY(-1px)',
                  transition: 'transform 0.3s ease',
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 20 9"></polyline>
              </svg> */}
            </Nav.Link>
            {/* <Nav.Link
              href="#pages"
              className={`mx-2 ${(scrolled && window.innerWidth >= 992)  ? 'text-dark' : 'text-white'}`}
              style={{fontSize:20,letterSpacing:1,fontFamily:'Noyh',fontWeight:500}}
              onMouseEnter={(e) => {
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.style.transform = 'translateY(2px)';
              }}
              onMouseLeave={(e) => {
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.style.transform = 'translateY(-1px)';
              }}
            >
              Pages
              <svg
                style={{
                  width: '14px',
                  height: '14px',
                  marginLeft: '6px',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  transform: 'translateY(-1px)',
                  transition: 'transform 0.3s ease',
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 20 9"></polyline>
              </svg>
            </Nav.Link> */}
            <Nav.Link
              as={Link}
              to="/services"
              className={`mx-2 ${(scrolled && window.innerWidth >= 992) ? 'text-dark' : 'text-white'}`}
              style={{ fontSize: 20, letterSpacing: 1, fontFamily: 'Noyh', fontWeight: 500 }}
            >
              Service
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/portfolio"
              className={`mx-2 ${(scrolled && window.innerWidth >= 992) ? 'text-dark' : 'text-white'}`}
              style={{ fontSize: 20, letterSpacing: 1, fontFamily: 'Noyh', fontWeight: 500 }}
            >
              Portfolio
            </Nav.Link>
            {/* <Nav.Link
              href="#blog"
              className={`mx-2 ${(scrolled && window.innerWidth >= 992)  ? 'text-dark' : 'text-white'}`}
              style={{fontSize:20,letterSpacing:1,fontFamily:'Noyh',fontWeight:500}}
            >
              Blog
            </Nav.Link> */}
            <Nav.Link
              as={Link}
              to="/contact"
              className={`${(scrolled && window.innerWidth >= 992) ? 'text-dark' : 'text-white'}`}
              style={{ fontSize: 20, letterSpacing: 1, fontFamily: 'Noyh', fontWeight: 500, marginRight: 160 }}
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