import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ParallaxImageSection.css';

gsap.registerPlugin(ScrollTrigger);

const ParallaxImageSection = () => {
  const sectionRef = useRef(null);
  if (sectionRef.current === null || !(sectionRef.current instanceof HTMLDivElement)) {
    sectionRef.current = document.createElement('div');
  }

  const imageRef = useRef(null);
  if (imageRef.current === null || !(imageRef.current instanceof HTMLDivElement)) {
    imageRef.current = document.createElement('div');
  }

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    gsap.fromTo(
      image,
      {
        yPercent: -20,
      },
      {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="parallax-section">
      <div className="parallax-container">
        <div
          ref={imageRef}
          className="parallax-image"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`,
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxImageSection;
