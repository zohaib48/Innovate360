import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./DigitalSolutionsGrid.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: '🧩',
        title: "BRAND STRATEGY",
        description: "Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression.",
    },
    {
        icon: '🎨',
        title: "UI/UX DESIGN",
        description: "Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression.",
    },
    {
        icon: '💻',
        title: "WEB DEVELOPMENT",
        description: "Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression.",
    },
    {
        icon: '📈',
        title: "DIGITAL MARKETING",
        description: "Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression.",
    },
    {
        icon: '🎬',
        title: "VIDEO PRODUCTION",
        description: "Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression.",
    },
    {
        icon: '🖥️',
        title: "WEB DESIGN",
        description: "Crafting distinctive placing resonate ensuring your brand stands out and a lasting impression.",
    },
];

const DigitalSolutionsGrid = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        // Animate title from bottom up
        gsap.fromTo(
            titleRef.current,
            {
                y: 80,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Animate cards one by one from bottom up
        const cards = cardsRef.current;
        cards.forEach((card, index) => {
            if (card) {
                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 60,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                        delay: index * 0.1, // Stagger delay for each card
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section className="digital-solutions-section" ref={sectionRef}>
            <div className="service-container">
                {/* Header */}
                <div className="solutions-header">
                    <div className="solutions-label">
                        <svg className="rotating-star" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#C8FF00" />
                        </svg>
                        <span className="label-line"></span>
                        <span className="label-text">EXCLUSIVE SERVICES</span>
                    </div>
                    <h2 ref={titleRef} className="solutions-title">
                        TO PROVIDE DIGITAL
                        <br />
                        SOLUTION
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="solutions-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="solution-card  h-100 d-flex gap-3"
                            ref={(el) => (cardsRef.current[index] = el)}
                        >
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DigitalSolutionsGrid;
