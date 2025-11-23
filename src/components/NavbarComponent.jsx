import React, { useRef, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { gsap } from 'gsap';

const NavbarComponent = () => {
  const navRef = useRef(null);

  useEffect(() => {
    // Navigation animation
    gsap.fromTo(navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <Navbar ref={navRef} expand="lg" variant="dark" className="py-3" style={{ backgroundColor: 'transparent' }}>
      <Container fluid className="px-5">
        <Navbar.Brand href="#home" className="d-flex align-items-center fw-semibold fs-5">
         
          INNOVATE <div style={{ 
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
            <Nav.Link href="#home" className="text-white mx-2">Home ▼</Nav.Link>
            <Nav.Link href="#pages" className="text-white mx-2">Pages ▼</Nav.Link>
            <Nav.Link href="#service" className="text-white mx-2">Service</Nav.Link>
            <Nav.Link href="#portfolio" className="text-white mx-2">Portfolio</Nav.Link>
            <Nav.Link href="#blog" className="text-white mx-2">Blog</Nav.Link>
            <Nav.Link href="#contact" className="text-white mx-2">Contact</Nav.Link>
          </Nav>
          
          <div className="d-flex align-items-center gap-4">
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <Badge 
                bg="warning" 
                text="dark"
                pill
                style={{ 
                  position: 'absolute', 
                  top: '-8px', 
                  right: '-8px',
                  fontSize: '11px',
                  fontWeight: '700'
                }}
              >
                0
              </Badge>
            </div>
            
            <Button 
              style={{ 
                backgroundColor: '#bfff00', 
                color: '#000',
                border: 'none',
                fontWeight: '600',
                fontSize: '15px'
              }}
              className="px-4 py-2"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { y: -2, boxShadow: '0 10px 30px rgba(191, 255, 0, 0.3)', duration: 0.3 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { y: 0, boxShadow: '0 0 0 rgba(191, 255, 0, 0)', duration: 0.3 });
              }}
            >
              Get started <span style={{ fontSize: '18px' }}>→</span>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
