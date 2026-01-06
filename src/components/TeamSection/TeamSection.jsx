import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TeamSection.css";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "DAVID K. ROZAR",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "REBECCA KAYLA",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "ANTHONY STEVEN",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
  },
];

const TeamSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;

    if (!sectionEl || !titleEl) return;

    // Use requestAnimationFrame to ensure DOM is fully rendered
    const rafId = requestAnimationFrame(() => {
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        // Set initial state for cards (hidden)
        gsap.set(cardsRef.current, {
          opacity: 0,
          y: 100,
          scale: 0.9,
        });

        // Animate title
        gsap.fromTo(
          titleEl,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleEl,
              start: "top bottom-=100",
              end: "top center",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Create a timeline for sequential card animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top center",
            end: "center center",
            scrub: 1,
          },
        });

        // Animate each card sequentially as user scrolls
        cardsRef.current.forEach((card, index) => {
          if (card) {
            tl.to(
              card,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
              },
              index * 0.5 // Reduced stagger time for faster sequence
            );
          }
        });
      }, sectionEl);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="team-section" id="team" ref={sectionRef}>
      <div className="container">
        <h2 className="team-title" ref={titleRef}>
          A FAST-GROWING

          REMOTE-FOCUSED
          <br />
          TEAM
        </h2>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card"
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <div className="card-image-wrapper">
                <div className="card-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="5" r="3" stroke="#666" strokeWidth="1.5" />
                    <circle cx="5" cy="19" r="3" stroke="#666" strokeWidth="1.5" />
                    <circle cx="19" cy="19" r="3" stroke="#666" strokeWidth="1.5" />
                    <path d="M12 8V12M12 12L7 16M12 12L17 16" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <img src={member.image} alt={member.name} className="card-image" />
              </div>
              <div className="card-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;