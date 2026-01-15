import "./ProjectsSection.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import SectionLabel from "../SectionLabel/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const leftElement = leftRef.current;
    const rightElement = rightRef.current;

    // Animate left section from left
    gsap.fromTo(
      leftElement,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate right section from right with slight delay
    gsap.fromTo(
      rightElement,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="projects-section">
      <div className="p-container">
        <div className="projects-wrapper">
          {/* Left Side */}
          <div className="projects-left" ref={leftRef}>
            <SectionLabel text="ABOUT INNOVATE360!" />
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