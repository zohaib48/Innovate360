import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import gsap from 'gsap';

import styles from './Hero.module.css';
import ParticlesBackground from './ParticlesBackground';
import Cal, { getCalApi } from "@calcom/embed-react";

const Hero = () => {
  const titleRef = useRef(null);
  const ratingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Ref for the new custom floating button
  const floatingBtnRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // 1. Simplified Cal Init (We don't need the native floating button config anymore)
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"theme":"dark", "styles":{"branding":{"brandColor":"#000000"}}, "hideEventTypeDetails":true, "layout":"month_view"});
    })();
  }, []);

  // 2. Handle Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show button after scrolling down 600px
      setShowFloatingButton(scrollPosition > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll, { passive: true });
  }, []);

  // 3. Animate the Floating Button based on state
  useEffect(() => {
    if (showFloatingButton) {
      gsap.to(floatingBtnRef.current, {
        y: 0,
        autoAlpha: 1, // handles opacity + visibility
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      gsap.to(floatingBtnRef.current, {
        y: 100, // Slide down out of view
        autoAlpha: 0,
        duration: 0.5,
        ease: "power3.in"
      });
    }
  }, [showFloatingButton]);

  // Initial Hero Animation (Existing code)
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const title1 = titleRef.current.querySelector('.title-1');

    tl.fromTo(title1,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 2 },
      "-=0.4"
    );

    tl.fromTo(ratingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(descriptionRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
    .fromTo(buttonRef.current,
        { y: 40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 },
        "-=0.5"
      );

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }

    tl.fromTo(imageRef.current,
      { opacity: 0, scale: 0.9, x: 50 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power2.out" },
      "-=1.2"
    );

    gsap.to(buttonRef.current.querySelector('svg'), {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "none"
    });
  }, []);

  const particlesContainerRef = useRef(null);

  return (
    <div className={styles.heroSection}>
      <div className={styles.backgroundPattern}></div>
      <div className={styles.stars}></div>
      <div className={styles.twinkle}></div>
      <div 
        ref={particlesContainerRef} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        <ParticlesBackground containerRef={particlesContainerRef} />
      </div>

      {/* --- CUSTOM FLOATING BUTTON START --- */}
      <div 
        ref={floatingBtnRef}
        onClick={() => setIsModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 9999,
          backgroundColor: '#bfff00',
          color: '#000',
          padding: '12px 24px',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 20px rgba(191, 255, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: 0, // Hidden initially by GSAP
          transform: 'translateY(100px)' // Hidden initially by GSAP
        }}
        onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
      >
        <span>Let<span className="safeApostrophe">’</span>s Talk</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      {/* --- CUSTOM FLOATING BUTTON END --- */}

      <Container fluid className="px-5 py-2" style={{ position: 'relative', zIndex: 10, height: '100%' }}>
        <Row className="align-items-center position-relative" style={{ minHeight: '90vh', zIndex: 10 }}>
          <Col lg={8} className="text-center" style={{ zIndex: 1 }}>
            <div ref={titleRef} className="mb-5">
              <div className={`title-1 ${styles.title}`} style={{ fontFamily: 'Helvetica Neue' }}>
                TRANSFORM YOUR BUSINESS !
              </div>
            </div>

            <Row className="mb-5 align-items-start" style={{ minHeight: '300px' }}>
              <Col md={5} ref={ratingRef} className="d-flex flex-column align-items-center" style={{ height: '100%' }}>
                <div className={styles.description} >
                  We are a creative agency that specializes in providing high quality design and branding solutions to businesses.
                </div>
                <div ref={buttonRef}>
                  <div
                    className={styles.circularButton}
                    style={{ pointerEvents: 'auto' }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { scale: 1.05, borderColor: '#bfff00', duration: 0.3 });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, borderColor: '#2a2a2a', duration: 0.3 });
                    }}
                  >
                    <svg width="130" height="130" style={{ position: 'absolute' }}>
                      <defs>
                        <path id="circle" d="M 65,65 m -55,0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0" />
                      </defs>
                      <text fill="#FFFFFF" fontSize="11" fontWeight="500" letterSpacing="3">
                        <textPath href="#circle" startOffset="0%">
                          EXPLORE • MORE • EXPLORE • MORE •
                        </textPath>
                      </text>
                    </svg>
                    <span className={styles.arrow}>→</span>
                  </div>
                </div>
              </Col>

              <Col md={1} className="d-flex align-items-center justify-content-center h-100">
                <div className={styles.divider}></div>
              </Col>

              <Col md={6} ref={descriptionRef} >
                <div className={styles.ctaSection} ref={ctaRef}>
                  <p className={styles.ctaText}>
                   Let<span className="safeApostrophe">’</span>s discuss how we can bring your ideas to life with innovative design solutions tailored to your business needs.
                  </p>

                  <button
                    className={styles.ctaButton}
                    onClick={() => setIsModalOpen(true)}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { scale: 1.05, backgroundColor: '#a8e600', duration: 0.3 });
                      gsap.to(e.currentTarget.querySelector(`.${styles.ctaButtonIcon}`), { x: 5, duration: 0.3 });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, backgroundColor: '#bfff00', duration: 0.3 });
                      gsap.to(e.currentTarget.querySelector(`.${styles.ctaButtonIcon}`), { x: 0, duration: 0.3 });
                    }}
                  >
                    <span className={styles.ctaButtonText}>Connect With Us</span>
                    <span className={styles.ctaButtonIcon}>→</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg={4} className="text-end position-relative" style={{ zIndex: 1 }}>
            <div ref={imageRef}>
              <img
                src="https://i.postimg.cc/7h3TwRdV/Gemini-Generated-Image-eojoeteojoeteojo-(1)-Photoroom.png"
                alt="3D Head Model"
                className={styles.heroImage}
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Schedule a Meeting</h2>
              <p className={styles.modalSubtitle}>Choose a time that works best for you</p>
            </div>

            <div className={styles.calendarContainer}>
              <Cal
                namespace="30min"
                calLink="zohaib-shafique-mql6e9/30min"
                config={{ layout: "month_view", theme: "dark", }}
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;