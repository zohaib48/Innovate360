import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import './FooterSection.css';
import TextMarquee from '../TextMarquee/TextMarquee';
import CalWidget from '../CalWidget/CalWidget';
import CalWidget2 from '../CalWidget/CalWidget2';
import footerBg from '../../assets/images/footer-main-bg.png';
import logoLight from '../../assets/images/logo-light.png';
gsap.registerPlugin(ScrollTrigger);

const FooterSection = ({ showCalWidget2 }) => {
  const brandRef = useRef(null);
  const footerRef = useRef(null);
  const location = useLocation();
  const year = new Date().getFullYear();
  console.log(location.pathname)
  // Hide CalWidget on services and portfolio pages
  const showCalWidget = !['/services', '/portfolio', '/case-studies'].some((path) =>
    location.pathname.startsWith(path)
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const brandEl = brandRef.current;
    const footerEl = footerRef.current;

    if (!brandEl || !footerEl) return;

    // Use requestAnimationFrame to ensure DOM is fully rendered
    const rafId = requestAnimationFrame(() => {
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        // Animate brand text on scroll
        gsap.fromTo(
          brandEl,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: brandEl,
              start: 'top bottom-=50',
              end: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, footerEl);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer className="footer-section" ref={footerRef}>
      {/* Newsletter Section */}
      {showCalWidget && (showCalWidget2 ? <CalWidget2 /> : <CalWidget />)}

      <TextMarquee />
      {/* Main Footer */}
      <div
        className="footer-main"
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            `url(${footerBg})`,
        }}
      >
        <div style={{ padding: '3% 8%', paddingBottom: '0' }}>
          <div className="footer-grid">
            {/* Logo */}
            <div className="footer-logo-col">
              <div className="footer-logo">
                <img
                  src={logoLight}
                  alt="Innovate360 Logo"
                  style={{
                    height: 'auto',
                    width: '320px',
                    maxWidth: '100%',
                    marginTop: '-25px',
                    marginRight: '12px',
                    objectFit: 'contain',
                  }}
                  width="206"
                  height="54"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>

            {/* Service and Company Links Container */}
            <div className="footer-links-container">
              {/* Service Links */}
              <div className="footer-col text-uppercase">
                <h4 className="footer-heading">SERVICE</h4>
                <ul className="footer-links">
                  <li>
                    <a href="#">Web Design</a>
                  </li>
                  <li>
                    <a href="#">Development</a>
                  </li>
                  <li>
                    <a href="#">Branding</a>
                  </li>
                  <li>
                    <a href="#">Marketing</a>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div className="footer-col text-uppercase">
                <h4 className="footer-heading">COMPANY</h4>
                <ul className="footer-links">
                  <li>
                    <a href="/#team">Team</a>
                  </li>
                  <li>
                    <a href="/services">Services</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                  <li>
                    <a href="/case-studies">Case Studies</a>
                  </li>

                </ul>
              </div>
            </div>

            {/* Address */}
            <div className="footer-col text-uppercase">
              <h4 className="footer-heading">ADDRESS</h4>
              <div className="footer-address">
                <a href="#" className="address-link">
                  1772 Street charleston,
                  <br />
                  New York
                </a>
                <p className="address-phone">+1 (804) 404-2457</p>
                <a href="mailto:info@innovate360.us" className="address-email">
                  info@innovate360.us
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="footer-bottom">
            <p className="copyright">© 2025 INNOVATE360</p>

            <button className="scroll-top-btn" onClick={scrollToTop}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1V13M7 1L1 7M7 1L13 7"
                  stroke="#C8FF00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="social-links">
              <a href="#">Facebook</a>
              <span>|</span>
              <a href="#">LinkedIn</a>
              {/* <span>|</span>
              <a href="#">Dribbble</a> */}
            </div>
          </div>

          {/* Large Brand Text */}
          {/* <div className="footer-brand" ref={brandRef}>
            <span>INNOVATE360</span>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
