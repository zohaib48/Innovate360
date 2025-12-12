import React, { useEffect, useRef } from 'react';
import { ArrowRight, Pause } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import teamImage from "../../assets/team-working.jpg";
import './VideoDetailSection.css';
import MText from '../MText/MText';
import { useNavigate } from 'react-router-dom';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  // 1. Create Refs for the elements we want to animate
  const sectionRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 2. Use gsap.context for React cleanup safety
    const ctx = gsap.context(() => {

      // Animate Left Section (Image) -> From Left to Right
      gsap.fromTo(leftSectionRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%", // Animation starts when top of section hits 80% of viewport height
            end: "bottom 20%",
            toggleActions: "play none none reverse" // Plays on enter, reverses on leave
          }
        }
      );

      // Animate Right Section (Text) -> From Right to Left
      gsap.fromTo(rightSectionRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef); // Scope selector to this section

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section className="w-100 py-5 bg-white" ref={sectionRef}>
      <div className="responsive-container">
        {/* Bootstrap Grid: Row with 3 columns on large screens, 1 on mobile */}
        <div className="row align-items-center gy-5">

          {/* Left - Circular Image with Video Controls */}
          {/* Added ref={leftSectionRef} here */}
          <div
            className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-start"
            ref={leftSectionRef}
          >
            <div className="position-relative">
              {/* Image Container */}
              <div
                className="rounded-circle overflow-hidden shadow-lg"
              >
                <img
                  src={teamImage}
                  alt="Team working collaboratively"
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Pause button overlay */}
              <button
                className="btn btn-light rounded-circle position-absolute d-flex align-items-center justify-content-center shadow-sm pause-btn"
                style={{ width: '45px', height: '45px' }}
                aria-label="Pause video"
              >
                <Pause style={{ width: '40px' }} />
              </button>
            </div>
          </div>

          {/* Center - Stats */}
          <div className="col-12 col-lg-3 d-flex justify-content-center align-items-center">
            <MText />
          </div>

          {/* Vertical Divider - Only visible on lg screens and up */}
          <div className="col-12 col-lg-1 d-none d-lg-flex justify-content-center">
            <div style={{ width: '1px', height: '500px', backgroundColor: '#e9ecef' }}></div>
          </div>

          {/* Right - About Text */}
          {/* Added ref={rightSectionRef} here */}
          <div className="col-12 col-lg-4" ref={rightSectionRef}>
            <div className="d-flex flex-column gap-4">
              <p className="text-dark lead text-muted des">
                Welcome to Innovate360 agency committed to transforming ideas into
                impactful digital experiences. Our passionate team of designers,
                developers, and strategists works collaboratively to deliver
                tailored solutions that drive results and elevate your brand.
              </p>

              <div>
                <button

                  onClick={() => navigate('/services')}
                  style={{ fontFamily: 'Noyh' }}
                  className="btn services-cta-btn px-4 py-3"
                >
                  Explore Services <span style={{ position: 'relative', top: '2px' }}>→</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;