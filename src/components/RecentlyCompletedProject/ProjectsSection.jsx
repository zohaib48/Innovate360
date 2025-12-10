import "./ProjectsSection.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useLayoutEffect(() => {
    const leftElement = leftRef.current;
    const rightElement = rightRef.current;

    // Reset initial positions
    gsap.set([leftElement, rightElement], { opacity: 0, y: 50 });
    gsap.set(leftElement, { x: -100 });
    gsap.set(rightElement, { x: 100 });

    // Create the animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
        once: true
      }
    });

    // Animate left and right sections
    tl.to(leftElement, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to(rightElement, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="projects-section">
      <div className="p-container">
        <div className="projects-wrapper">
          {/* Left Side */}
          <div className="projects-left" ref={leftRef}>
            <div className="projects-label">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#C8FF00"/>
              </svg>
              <span className="label-line"></span>
              <span className="label-text">ABOUT AGENTISE!</span>
            </div>
            <h2 className="projects-title">
              RECENTLY
              <br />
              COMPLETED
              <br />
              PROJECTS
            </h2>
          </div>

          {/* Right Side */}
          <div className="projects-right" ref={rightRef}>
            <div className="stats-number">
              <span className="number">3</span>
              <span className="number">0</span>
              <span className="number-zero">0</span>
              <span className="plus-sign">+</span>
            </div>
            <div className="stats-content">
              <div className="line-container">
                <div className="line-vertical"></div>
                <div className="line-horizontal"></div>
              </div>
              <p className="stats-description">
                Innovate360 has completed over 300 projects, delivering tailored
                solutions that exceed expectations with high-quality, innovative web
                development services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;