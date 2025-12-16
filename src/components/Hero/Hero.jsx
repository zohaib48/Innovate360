import { useEffect, useRef, useState, useId } from 'react';
import { gsap } from 'gsap/all';
import ParticlesBackground from '../ParticlesBackground/ParticlesBackground';
import { Col, Container, Row, Modal } from 'react-bootstrap';
import styles from './Hero.module.css';
import NavbarComponent from '../NavbarComponent/NavbarComponent';

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const imageRef = useRef(null);
  const circularBtnRef = useRef(null);
  const floatingBtnRef = useRef(null);
  const particlesContainerRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const circleId = useId();

  useEffect(() => {
    if (!isModalOpen) return;

    // Only initialize Cal.com when modal is open
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    // Wait for the script to load before initializing
    setTimeout(() => {
      // Initialize Cal
      window.Cal('init', 'metting', { origin: 'https://app.cal.com' });

      // Configure Inline Embed
      window.Cal.ns.metting('inline', {
        elementOrSelector: '#my-cal-inline-metting',
        config: { layout: 'month_view', theme: 'dark' },
        calLink: 'zohaib-shafique-mql6e9/metting',
      });

      // UI Configuration
      window.Cal.ns.metting('ui', {
        theme: 'dark',
        hideEventTypeDetails: true,
        layout: 'month_view',
      });
    }, 100);
  }, [isModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowFloatingButton(scrollPosition > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll, { passive: true });
  }, []);

  // Animate the Floating Button
  useEffect(() => {
    if (showFloatingButton && floatingBtnRef.current) {
      gsap.to(floatingBtnRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else if (floatingBtnRef.current) {
      gsap.to(floatingBtnRef.current, {
        y: 100,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [showFloatingButton]);

  // Initial Hero Animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        ctaGroupRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, x: 50 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2 },
        '-=1'
      );

    if (circularBtnRef.current) {
      gsap.to(circularBtnRef.current.querySelector('svg'), {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  // Attention-grabbing animation for Connect With Us button after 3 seconds
  useEffect(() => {
    const button = ctaGroupRef.current?.querySelector('button');
    if (!button) return;

    let intervalId = null;

    const attentionAnimation = () => {
      gsap.to(button, {
        scale: 1.08,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        },
      });
    };

    // Start attention animation after 3 seconds, then repeat every 6 seconds
    const initialTimeout = setTimeout(() => {
      attentionAnimation();
      intervalId = setInterval(attentionAnimation, 6000);
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  // Attention-grabbing animation for Floating Button after 3 seconds
  useEffect(() => {
    if (!floatingBtnRef.current) return;

    let intervalId = null;

    const attentionAnimation = () => {
      // Only animate if button is visible
      if (showFloatingButton) {
        gsap.to(floatingBtnRef.current, {
          scale: 1.1,
          duration: 0.5,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.to(floatingBtnRef.current, {
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
            });
          },
        });
      }
    };

    // Start attention animation after 3 seconds, then repeat every 6 seconds
    const initialTimeout = setTimeout(() => {
      attentionAnimation();
      intervalId = setInterval(attentionAnimation, 6000);
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [showFloatingButton]);

  return (
    <>
      <div className={styles.heroSection}>
        <NavbarComponent />
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
            pointerEvents: 'none',
          }}
        >
          <ParticlesBackground containerRef={particlesContainerRef} />
        </div>

        <Container
          fluid
          className="px-3 px-md-4 px-lg-5"
          style={{ position: 'relative', zIndex: 10 }}
        >
          <Row className="align-items-center">
            <Col lg={7}>
              <h1 ref={titleRef} className={styles.heroTitle}>
                Transform Your Business
              </h1>

              <p ref={descriptionRef} className={styles.heroDescription}>
                We are a creative agency that specializes in providing high quality design and
                branding solutions to businesses. Let us help you stand out in the digital
                landscape.
              </p>

              <div ref={ctaGroupRef} className={styles.ctaGroup}>
                <button
                  onClick={() => {
                    const calWidget = document.getElementById('cal-widget');
                    if (calWidget) {
                      calWidget.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`${styles['custom-btn']} ${styles['btn-7']}`}
                >
                  <svg
                    className={styles['phone-icon']}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>CONNECT WITH US</span>
                </button>
              </div>
            </Col>

            <Col lg={5}>
              <div ref={imageRef} className={styles.heroImageContainer}>
                <img
                  src="https://i.postimg.cc/7h3TwRdV/Gemini-Generated-Image-eojoeteojoeteojo-(1)-Photoroom.png"
                  alt="3D Head Model"
                  className={styles.heroImage}
                />
              </div>
            </Col>
          </Row>
        </Container>

        {/* Circular Button - Bottom Right */}
        <div ref={circularBtnRef} className={styles.circularButton}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 130 130"
            style={{ position: 'absolute', overflow: 'visible' }}
            className={styles.circularButtonSvg}
          >
            <defs>
              <path id={circleId} d="M 65,65 m -55,0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0" />
            </defs>
            <text
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="500"
              letterSpacing="3"
              style={{ opacity: 0.9 }}
            >
              <textPath href={`#${circleId}`} startOffset="0%">
                TRANSFORM • CREATE • DESIGN • MAINTAIN •
              </textPath>
            </text>
          </svg>
          {/* <span className={styles.circularButtonArrow}>→</span> */}
        </div>

        {/* Modal */}
        <Modal
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
          size="xl"
          centered
          style={{ zIndex: 2000 }}
          className={styles.bookingModal}
          contentClassName={styles.modalContentCustom}
          scrollable
        >
          <Modal.Header
            closeButton
            className={`border-0 pb-3 px-4 ${styles.modalHeader}`}
            onc
            closeVariant="white"
            closeStyle={{
              filter: 'invert(1) grayscale(1) brightness(2)',
              opacity: 0.8,
              transition: 'opacity 0.2s ease',
              width: '1.5rem',
              height: '1.5rem',
              backgroundSize: '1.25rem',

              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e\")",
            }}
          >
            <Modal.Title className="w-100">
              <p className={`text-center mb-0 ${styles.modalSubtitle}`}>
                Choose a time that works best for you
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBodyCustom}>
            <div className={styles.calendarContainer}>
              <div
                id="my-cal-inline-metting"
                style={{ width: '100%', height: '100%', minHeight: '400px', overflow: 'scroll' }}
              ></div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Hero;
