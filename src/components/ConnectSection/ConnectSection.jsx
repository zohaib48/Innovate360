import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ConnectSection.css';
import SectionLabel from "../SectionLabel/SectionLabel";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ConnectSection = () => {
  const sectionRef = useRef(null);
  const itemLeftRef = useRef(null);
  const itemCenterTopRef = useRef(null);
  const itemSkypeRef = useRef(null);
  const itemRightRef = useRef(null);
  const itemCenterLeftRef = useRef(null);
  const itemCenterBottomRef = useRef(null);
  const getInTouchRef = useRef(null);

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth < 768;

    // Common animation properties
    const fadeIn = { opacity: 1, duration: 0.8, ease: 'power2.out' };
    const initialMobileState = { opacity: 0, y: 20 };

    // Set initial styles to prevent FOUC (Flash of Unstyled Content)
    const allElements = [
      itemLeftRef.current,
      itemRightRef.current,
      itemCenterTopRef.current,
      itemCenterLeftRef.current,
      itemCenterBottomRef.current,
      itemSkypeRef.current,
      getInTouchRef.current
    ];

    gsap.set(allElements, {
      opacity: 0,
      force3D: !isMobile, // Disable force3D on mobile for better performance
      backfaceVisibility: 'hidden',
      ...(isMobile && initialMobileState) // Add mobile-specific initial state
    });

    // Create a master timeline
    const master = gsap.timeline({
      defaults: {
        ease: 'power2.out',
        force3D: !isMobile, // Disable force3D on mobile
        overwrite: 'auto'
      },
      onComplete: () => {
        if (!isMobile) {
          // Only clear these properties on desktop
          gsap.set(allElements, {
            clearProps: 'will-change,transform-style'
          });
        }
      }
    });

    if (isMobile) {
      // Simplified mobile animation - fade in with slight stagger
      master.fromTo(allElements,
        { opacity: 0, y: 20 },
        {
          ...fadeIn,
          y: 0,
          stagger: 0.1,
          onComplete: () => {
            // Clean up after mobile animation
            gsap.set(allElements, { clearProps: 'all' });
          }
        },
        0
      );
    } else {
      // Desktop animations (original complex animations)
      master
        .fromTo(itemLeftRef.current,
          { x: -100, opacity: 0, force3D: true },
          { x: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.2
        )
        .fromTo(itemCenterTopRef.current,
          { y: -80, opacity: 0, force3D: true },
          { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.1
        )
        .fromTo(itemRightRef.current,
          { x: 100, opacity: 0, force3D: true },
          { x: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.3
        )
        .fromTo(itemCenterLeftRef.current,
          { x: -80, y: 50, opacity: 0, force3D: true },
          { x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.2
        )
        .fromTo(itemCenterBottomRef.current,
          { y: 80, opacity: 0, force3D: true },
          { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.25
        )
        .fromTo(itemSkypeRef.current,
          { scale: 0.5, opacity: 0, force3D: true },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
          0.4
        )
        .fromTo(getInTouchRef.current,
          { y: 50, opacity: 0, force3D: true },
          { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.5
        );
    }

    // Create scroll trigger only for desktop
    if (!isMobile) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => master.play(),
        onEnterBack: () => master.play(0),
        onLeaveBack: () => master.pause(0)
      });
    } else {
      // On mobile, play animation immediately
      master.play();
    }

    // Cleanup function
    return () => {
      master.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="connect-section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="connect-header">
          <div className="services-banner-label" style={{ display: 'flex', justifyContent: "center", marginBottom: 20 }}>
            <SectionLabel text="LETS TALK !" customStyle={{ marginBottom: 0 }} />
          </div>
          <h2 className="connect-title">
            CONNECT WITH US, WE'RE
            <br />
            &nbsp;HERE TO HELP
          </h2>

        </div>

        {/* Gallery Grid */}
        <div className="connect-gallery">
          {/* Left tall image */}
          <div className="gallery-item item-left" ref={itemLeftRef}>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=600&fit=crop"
              alt="Modern office space"
            />
          </div>

          {/* Center top large image */}
          <div className="gallery-item item-center-top large-top" ref={itemCenterTopRef}>
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop"
              alt="Creative workspace with colorful mural"
            />
          </div>

          {/* Get in Touch text */}
          <div className="get-in-touch" ref={getInTouchRef}>
            <span className="handwritten">Get in Touch</span>
            <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 2C15 2 20 15 15 25C10 35 15 38 15 38" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 33L15 38L20 33" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Skype contact card */}
          <div className="gallery-item item-skype" ref={itemSkypeRef}>
            <div className="skype-card">
              <div className="skype-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.722 4.324" fill="#888" />
                </svg>
              </div>
              <p className="skype-label">Direct contact:</p>
              <p className="skype-handle">info@innovate360.us</p>
            </div>
          </div>

          {/* Right tall image */}
          <div className="gallery-item item-right right-tall" ref={itemRightRef}>
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=500&fit=crop"
              alt="Modern building architecture"
            />
          </div>

          {/* Center bottom left small image */}
          <div className="gallery-item item-center-left" ref={itemCenterLeftRef}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
              alt="Team collaboration"
            />
          </div>

          {/* Center bottom large image */}
          <div className="gallery-item item-center-bottom" ref={itemCenterBottomRef}>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
              alt="People working together"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;