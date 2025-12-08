import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FooterSection.css";
import TextMarquee from "../TextMarquee/TextMarquee";

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const brandRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            ease: "power3.out",
            scrollTrigger: {
              trigger: brandEl,
              start: "top bottom-=50",
              end: "top center",
              toggleActions: "play none none reverse",
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
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-wrapper">
            <div className="newsletter-content">
              <h2 className="newsletter-title">DON'T MISS A THING!</h2>
              <p className="newsletter-desc">
                Get our latest tips on how to improve your digital presence,
                <br />
                subscribe to our free newsletter.
              </p>
            </div>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="example@gmail.com"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <TextMarquee />
      {/* Main Footer */}
      <div className="footer-main" style={{ backgroundSize: 'cover', backgroundImage: 'url(https://i.postimg.cc/KzyRgN79/Gemini-Generated-Image-jtql09jtql09jtql.png)' }} >
        <div style={{ padding: '3% 8%' }}>
          <div className="footer-grid" >
            {/* Logo */}
            <div className="footer-logo-col">
              <div className="footer-logo">
                <img
                  src="https://i.postimg.cc/jjgV92ZS/Gemini-Generated-Image-ydnaalydnaalydna-removebg-preview.png"
                  alt="Innovate360 Logo"
                  style={{
                    height: '85px',
                    width: 'auto',
                    marginTop: '-25px',
                    marginRight: '12px',
                    objectFit: 'contain',

                  }}
                />

              </div>
            </div>

            {/* Service and Company Links Container */}
            <div className="footer-links-container">
              {/* Service Links */}
              <div className="footer-col text-uppercase">
                <h4 className="footer-heading">SERVICE</h4>
                <ul className="footer-links">
                  <li><a href="#">Web Design</a></li>
                  <li><a href="#">Development</a></li>
                  <li><a href="#">Branding</a></li>
                  <li><a href="#">Marketing</a></li>
                </ul>
              </div>

              {/* Company Links */}
              <div className="footer-col text-uppercase">
                <h4 className="footer-heading">COMPANY</h4>
                <ul className="footer-links">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Team</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Contact</a></li>
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
                <p className="address-phone">+1 287-360-633</p>
                <a href="mailto:Info@Yourwebsite.Com" className="address-email">
                  Info@Yourwebsite.Com
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="footer-bottom">
            <p className="copyright">© 2025 INNOVATE360  powered by INNOVATE360</p>

            <button className="scroll-top-btn" onClick={scrollToTop}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1V13M7 1L1 7M7 1L13 7" stroke="#C8FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="social-links">
              <a href="#">Facebook</a>
              <span>|</span>
              <a href="#">LinkedIn</a>
              <span>|</span>
              <a href="#">Dribbble</a>
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