import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TestimonialsSection.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "EMILY JOHNSON",
    title: "Founder of Lifestyle Hub",
    headline: "AMAZING WORK.",
    quote: "Working with agentise was a game-changer for our business. Their innovative strategies and creative solutions helped us reach new audiences and grow our brand. The team's dedication and expertise are unparalleled",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    rating: 5
  },
  {
    id: 2,
    name: "MICHAEL CHEN",
    title: "CEO of TechStart Inc",
    headline: "EXCEPTIONAL SERVICE.",
    quote: "The level of professionalism and creativity exceeded our expectations. They transformed our vision into reality and delivered results that truly made a difference for our company's growth.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    rating: 5
  },
  {
    id: 3,
    name: "SARAH WILLIAMS",
    title: "Marketing Director at Innovate Co",
    headline: "OUTSTANDING RESULTS.",
    quote: "From start to finish, the experience was seamless. Their attention to detail and commitment to excellence made all the difference. I highly recommend their services to anyone looking for top tier solutions.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const autoPlayRef = useRef(null);
  
  // Track if this is the first load to prevent animation conflict
  const isFirstRender = useRef(true);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const handleNavClick = (direction) => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    direction === 'prev' ? goToPrev() : goToNext();
    autoPlayRef.current = setInterval(() => goToNext(), 5000);
  };

  // 1. SCROLL ENTRANCE ANIMATION
  // This runs once when the component mounts
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Animation starts when top of section hits 80% of viewport
          end: "top 20%",
          toggleActions: "play none none reverse" // Replays on scroll, reverses on scroll up
        }
      });

      // Animate Image: Left (-100) to Right (0)
      tl.fromTo(".testimonial-image-wrapper",
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        0
      );

      // Animate Text: Right (100) to Left (0)
      tl.fromTo(".testimonials-content > .testimonial-content",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        0.1 // Slight delay after image starts
      );

    }, contentRef);

    return () => ctx.revert();
  }, []);

  // 2. SLIDE CHANGE ANIMATION
  // This runs every time currentIndex changes
  useEffect(() => {
    // Skip this effect on the very first render, 
    // because the ScrollTrigger above handles the initial entrance.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      // Image: Left to Right
      gsap.fromTo(".testimonial-image-wrapper",
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );

      // Text: Right to Left
      gsap.fromTo(".testimonials-content > .testimonial-content",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonials-section" ref={sectionRef}>
      <div className="container">
        <div className="testimonials-wrapper" ref={contentRef}>
          {/* Header is outside the animated columns, so it stays stable or can be animated separately */}
          <h2 className="testimonials-heading">
            HEAR WHAT OUR SATISFIED<br />CLIENTS HAVE TO SAY
          </h2>

          <div className="testimonials-content">
            {/* Left Column (Image) */}
            <div className="testimonial-image-wrapper">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="testimonial-image"
              />
            </div>

            {/* Right Column (Text) */}
            <div className="testimonial-content">
              <div className="testimonial-stars">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>

              <h3 className="testimonial-headline">{currentTestimonial.headline}</h3>
              <p className="testimonial-quote">{currentTestimonial.quote}</p>

              <div className="testimonial-author">
                <span className="author-name">{currentTestimonial.name}</span>
                <span className="author-title">{currentTestimonial.title}</span>
              </div>

              <div className="testimonial-nav">
                <button 
                  className="nav-btn" 
                  onClick={() => handleNavClick('prev')}
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button 
                  className="nav-btn" 
                  onClick={() => handleNavClick('next')}
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="decorative-element">
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 35V25C15 20 18 15 25 15V20C22 20 20 22 20 25H25V35H15ZM35 35V25C35 20 38 15 45 15V20C42 20 40 22 40 25H45V35H35Z" fill="#121212"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;