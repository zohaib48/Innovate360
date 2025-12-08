import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import moonImage from "../../assets/moon.png";
import "./MText.css";

gsap.registerPlugin(ScrollTrigger);

const MText = () => {
  const sectionRef = useRef(null);
  const numberRef = useRef(null);
  const textRef = useRef(null);
  const moonRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // Use requestAnimationFrame to ensure DOM is fully rendered
    const rafId = requestAnimationFrame(() => {
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        // Animate number
        gsap.fromTo(
          numberRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 60%",
            },
          },
        );

        // Animate text
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 60%",
            },
          },
        );

        // Animate moon
        gsap.fromTo(
          moonRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 60%",
            },
          },
        );
      }, sectionEl);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Generate M letters only on the right side of the moon border
  const mLetters = Array.from({ length: 12 }, (_, i) => {
    // Position from -60deg to +60deg (right side arc)
    const angle = -60 + (i * 120) / 11;
    const radians = (angle * Math.PI) / 180;
    // Calculate position on the circle edge
    const radius = 55; // percentage from center
    const x = 50 + radius * Math.cos(radians);
    const y = 50 + radius * Math.sin(radians);

    return (
      <span
        key={i}
        className="moon-letter position-absolute"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
          fontSize: '14px',
       
           fontFamily: 'Helvetica Neue',
              fontWeight: '600',
          opacity: '1',
          color:'rgba(155, 190, 52, 1)',
        }}
      >
        X
      </span>
    );
  });

  return (
    <div ref={sectionRef} className="mtext-container py-4 py-md-5">
      <div className="d-flex justify-content-center">
        <div className="moon-wrapper position-relative">
          {/* Moon image */}
          <div ref={moonRef} className="moon-image position-absolute d-flex align-items-center justify-content-center">
            <img src={moonImage} alt="Decorative moon shape" className="w-100 h-100" style={{ objectFit: 'contain' }} />
          </div>

          {/* M letters on right border */}
          <div className="moon-letters position-absolute d-d-md-block">
            {mLetters}
          </div>

          {/* Content overlay */}
          <div className="moon-content position-absolute d-flex flex-column align-items-center justify-content-center text-center z-1 px-3 px-md-4">
            <div ref={numberRef} className="moon-numbers d-flex align-its-baseline gap-1 mb-2">
              <span className="text-dark number-large">
                21
              </span>
              <span className="text-dark number-unit">M</span>
            </div>
            <p ref={textRef} className="moon-text text-muted mb-0">
              We assisted companies in securing over <span style={{fontFamily:'-apple-system'}}>$</span>21M in funding successfully.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MText;