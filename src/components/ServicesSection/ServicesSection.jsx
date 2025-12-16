import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ServicesSection.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonRef = useRef(null);

  const services = [
    {
      icon: '🧩',
      title: 'BRAND STRATEGY',
      description:
        'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression',
    },
    {
      icon: '🎨',
      title: 'UI/UX DESIGN',
      description:
        'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression',
    },
    {
      icon: '💻',
      title: 'WEB DEVELOPMENT',
      description:
        'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression',
    },
    {
      icon: '📈',
      title: 'DIGITAL MARKETING',
      description:
        'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression',
    },
    {
      icon: '🎬',
      title: 'VIDEO PRODUCTION',
      description:
        'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression',
    },
    {
      icon: '🖥️',
      title: 'Web/Interface Design',
      description:
        'Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression',
    },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // Use requestAnimationFrame to ensure DOM is fully rendered
    const rafId = requestAnimationFrame(() => {
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        if (!headingRef.current || !subtextRef.current || !buttonRef.current) return;

        // Set initial state for left content elements
        gsap.set([headingRef.current, subtextRef.current, buttonRef.current], {
          y: 60,
          opacity: 0,
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
            end: 'top 65%',
            toggleActions: 'play none none none',
          },
        });

        gsap.to(subtextRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subtextRef.current,
            start: 'top 85%',
            end: 'top 65%',
            toggleActions: 'play none none none',
          },
        });

        gsap.to(buttonRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 85%',
            end: 'top 65%',
            toggleActions: 'play none none none',
          },
        });

        const animationVariants = [
          { from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1 } },
          { from: { x: 80, opacity: 0 }, to: { x: 0, opacity: 1 } },
          { from: { y: 60, opacity: 0 }, to: { y: 0, opacity: 1 } },
          { from: { x: -60, y: 40, opacity: 0 }, to: { x: 0, y: 0, opacity: 1 } },
          { from: { x: 60, y: -40, opacity: 0 }, to: { x: 0, y: 0, opacity: 1 } },
          { from: { scale: 0.9, opacity: 0 }, to: { scale: 1, opacity: 1 } },
        ];

        cardRefs.current.forEach((card, index) => {
          if (!card) return;

          const variant = animationVariants[index % animationVariants.length];
          const rowIndex = Math.floor(index / 2);
          const rowTrigger = cardRefs.current[rowIndex * 2] || card;

          gsap.set(card, variant.from);

          gsap.to(card, {
            ...variant.to,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rowTrigger,
              start: 'top 80%',
              end: 'top 60%',
              toggleActions: 'play none none none',
            },
          });
        });
      }, sectionEl);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="services-section bg-white">
      <div className="container-fluid">
        <div className="row align-items-start g-5">
          <div className="col-lg-4 col-md-12 mt-10" style={{ marginBottom: '1rem' }}>
            <h2
              ref={headingRef}
              className="services-heading mb-4 mt-3"
              style={{ marginBottom: '1rem' }}
            >
              TO PROVIDE
              <br />
              DIGITAL
              <br />
              SOLUTION
            </h2>
            <p ref={subtextRef} className="services-subtext text-muted mb-4">
              Elevate your digital success with Innovate360, experts in digital innovation, web solutions and business strategies.
            </p>
            <button
              ref={buttonRef}
              onClick={() => navigate('/services')}
              style={{ fontFamily: 'Noyh' }}
              className="btn services-cta-btn px-4 py-3"
            >
              Explore Services <span style={{ position: 'relative', top: '2px' }}>→</span>
            </button>
          </div>

          <div className="col-lg-8 col-md-12">
            <div className="row g-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="col-lg-6 col-md-6 col-sm-12"
                  ref={(el) => (cardRefs.current[index] = el)}
                >
                  <div className="service-card  h-100 d-flex gap-3">
                    <div className="service-icon-wrapper flex-shrink-0">
                      <span className="service-icon">{service.icon}</span>
                    </div>
                    <div className="service-content flex-grow-1">
                      <h3 className="service-title text-uppercase mb-3">{service.title}</h3>
                      <p className="service-description mb-3">{service.description}</p>
                      <a
                        href="#"
                        className="service-link text-decoration-none d-inline-flex align-items-center gap-2"
                      >
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
