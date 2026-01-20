import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import "./AgencySection.css";
import SectionLabel from "../SectionLabel/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const StatCard = ({ number, label, filled, greenCorner, isInView }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const isNumeric = !isNaN(parseInt(number));
  const targetNumber = isNumeric ? parseInt(number) : 0;
  const suffix = number.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView && isNumeric) {
      let start = 0;
      const duration = 2000;
      const increment = targetNumber / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          setDisplayNumber(targetNumber);
          clearInterval(timer);
        } else {
          setDisplayNumber(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, targetNumber, isNumeric]);

  return (
    <div className="stat-card">
      <div className={`card-corner ${greenCorner ? 'green' : ''}`}></div>
      <div className={`stat-number ${filled ? 'filled' : 'outlined'}`}>
        {isNumeric ? displayNumber : number}{suffix}
      </div>
      <div className="stat-label" dangerouslySetInnerHTML={{ __html: label }} />
    </div>
  );
};

const AgencySection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const gridRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const stats = [
    { number: "26", label: "YEARS OF<br/>EXPERIENCE", filled: true, greenCorner: false },
    { number: "25", label: "EXPERIENCE<br/>ENGINEERING MEMBERS", filled: false, greenCorner: true },
    { number: "4K", label: "SUCCESSFULLY FINISHED<br/>PROJECT.", filled: false, greenCorner: false },
    { number: "22", label: "GOOD AWARD WINING<br/>COMPANY", filled: false, greenCorner: false },
  ];

  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate image
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Trigger counter animation when grid is in view
    ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top bottom-=100",
      onEnter: () => setIsInView(true),
    });

    // Animate stat cards
    const cards = gridRef.current?.querySelectorAll('.stat-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="agency-section" ref={sectionRef}>
      {/* Social Sidebar */}
      <div className="agency-social-sidebar">
        <div className="sidebar-accent"></div>
        <span className="sidebar-follow">FOLLOW</span>
        <div className="sidebar-line"></div>
        <div className="sidebar-icons">
          <a href="https://www.facebook.com/profile.php?id=61556300186224" target="_blank" aria-label="Facebook"><Facebook size={18} /></a>
          <a href="#" aria-label="X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
        </div>
      </div>

      <div className="container">
        <div className="agency-grid" ref={gridRef}>
          {/* Row 1: Title + 2 stat cards */}
          <div className="agency-header">
            <div className="agency-label">
              <SectionLabel text="WHO WE ARE" CustomStyleText={{ fontSize: "18px" }} />
            </div>
            <h2 className="agency-title" ref={titleRef}>
              OUR COMPANY
              <br />
              KNOWS WORK
              <br />
              DOMINATES OUR

              LIVES
            </h2>
          </div>
          <StatCard {...stats[0]} isInView={isInView} />
          <StatCard {...stats[1]} isInView={isInView} />

          {/* Row 2: Image + 2 stat cards */}
          <div className="agency-image" ref={imageRef}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
              alt="Team collaboration"
            />
          </div>
          <StatCard {...stats[2]} isInView={isInView} />
          <StatCard {...stats[3]} isInView={isInView} />
        </div>
      </div>
    </section>
  );
};

export default AgencySection;
