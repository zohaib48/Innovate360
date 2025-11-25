import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ServicesSection.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonRef = useRef(null);

  const services = [
    {
      icon: '🧩',
      title: 'BRAND STRATEGY',
      description: 'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression'
    },
    {
      icon: '🎨',
      title: 'UI/UX DESIGN',
      description: 'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression'
    },
    {
      icon: '💻',
      title: 'WEB DEVELOPMENT',
      description: 'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression'
    },
    {
      icon: '📈',
      title: 'DIGITAL MARKETING',
      description: 'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression'
    },
    {
      icon: '🎬',
      title: 'VIDEO PRODUCTION',
      description: 'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression'
    },
    {
      icon: '🖥️',
      title: 'WEB DESIGN',
      description: 'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression'
    }
  ];

  useEffect(() => {
    // Set initial state for left content elements
    gsap.set([headingRef.current, subtextRef.current, buttonRef.current], {
      y: 60,
      opacity: 0
    });

    // Animate heading independently
    gsap.to(headingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Animate subtext independently
    gsap.to(subtextRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: subtextRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Animate button independently
    gsap.to(buttonRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: buttonRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Set initial state for cards
    gsap.set(cardRefs.current, {
      y: 80,
      opacity: 0
    });

    // Animate cards row by row (2 cards per row)
    // Row 1: cards 0 and 1
    gsap.to([cardRefs.current[0], cardRefs.current[1]], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRefs.current[0],
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Row 2: cards 2 and 3
    gsap.to([cardRefs.current[2], cardRefs.current[3]], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRefs.current[2],
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Row 3: cards 4 and 5
    gsap.to([cardRefs.current[4], cardRefs.current[5]], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRefs.current[4],
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="services-section bg-white">
      <div className="container-fluid">
        <div className="row align-items-center g-5">
          {/* Left Content */}
          <div className="col-lg-4 col-md-12 mt-0" style={{marginBottom: '5rem'}}>
            <h2 ref={headingRef} className="services-heading mb-4">
              TO PROVIDE<br />
              DIGITAL<br />
              SOLUTION.
            </h2>
            <p ref={subtextRef} className="services-subtext text-muted mb-4">
              If you're looking for a specialist to build <br />
              a meaningful digital project you can <br />
              easily reach us by clicking here
            </p>
            <button ref={buttonRef} className="btn services-cta-btn px-4 py-3 fw-semibold">
              Explore Services →
            </button>
          </div>

          {/* Right Content - Services Grid */}
          <div className="col-lg-8 col-md-12">
            <div className="row g-4">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="col-lg-6 col-md-6 col-sm-12"
                  ref={(el) => (cardRefs.current[index] = el)}
                >
                  <div className="service-card p-4 h-100 d-flex gap-3">
                    <div className="service-icon-wrapper flex-shrink-0">
                      <span className="service-icon">{service.icon}</span>
                    </div>
                    <div className="service-content flex-grow-1">
                      <h3 className="service-title text-uppercase mb-3">{service.title}</h3>
                      <p className="service-description mb-3">{service.description}</p>
                      <a href="#" className="service-link text-decoration-none d-inline-flex align-items-center gap-2">
                        View Details 
                        <span className="arrow-circle">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
