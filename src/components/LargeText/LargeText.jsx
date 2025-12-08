import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LargeText.css';

gsap.registerPlugin(ScrollTrigger);

const LargeText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionEl = textRef.current;
    if (!sectionEl) return;

    // Use requestAnimationFrame to ensure DOM is fully rendered
    const rafId = requestAnimationFrame(() => {
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        gsap.fromTo(
          sectionEl,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 85%',
              end: 'top 65%',
              toggleActions: 'play none none none',
              // Add markers for debugging (remove in production)
              // markers: true
            }
          }
        );
      }, sectionEl);

      return () => {
        ctx.revert();
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="large-text-section" ref={textRef}>
      <p className="large-text-paragraph">
        <span>INNOVATE360</span> <span className="large-text-muted">CRAFTS</span> RALLYING IDEAS TO SHAPE MARKET
        POSITIONS, INCREASE BRAND <span className="large-text-muted">REVENUE</span>, AND ENHANCE COMPANY VALUE
        THROUGH <span className="large-text-muted">INNOVATIVE</span> AND EFFECTIVE STRATEGIES.
      </p>
    </section>
  );
};

export default LargeText;