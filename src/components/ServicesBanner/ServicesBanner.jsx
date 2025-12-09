import React, { useEffect, useRef } from 'react';
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './ServicesBanner.css';

gsap.registerPlugin(ScrollTrigger);

const ServicesBanner = () => {
    const titleRef = useRef(null);
    const serviceItemsRef = useRef([]);

    const services = [
        { left: "Brand Strategy", right: "Digital Marketing" },
        { left: "Development", right: "Video Production" },
        { left: "UI/UX Design", right: "Web Design" },
    ];

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

        // Animate service items one by one from bottom up
        serviceItemsRef.current.forEach((item, index) => {
            if (item) {
                gsap.fromTo(
                    item,
                    {
                        y: 60,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 95%",
                            toggleActions: "play none none reverse",
                        },
                        delay: index * 0.1, // Stagger delay for each item
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section className="services-banner-section">
            {/* Social Sidebar */}


            <div className='intro-section'>
                {/* Header */}
                <div className="services-banner-header">
                    <div className="services-banner-label">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#C8FF00" />
                        </svg>
                        <span className="label-line"></span>
                        <span className="label-text">OUR SERVICES</span>
                    </div>
                    <h2 ref={titleRef} className="services-banner-title">
                        ELEVATE YOUR BRAND WITH

                        OUR EXPERT DIGITAL BLEND

                        AND SERVICES
                    </h2>
                </div>

                {/* Services List */}
                <div className="services-list-wrapper">
                    <div className="line-container">
                        <div className="line-vertical"></div>
                        <div className="line-horizontal"></div>
                    </div>
                    <div className="services-grid-list">
                        <div className="services-col">
                            {services.map((service, index) => (
                                <div
                                    key={`left-${index}`}
                                    className="service-item"
                                    ref={(el) => (serviceItemsRef.current[index] = el)}
                                >
                                    <span className="service-plus">+</span>
                                    <span>{service.left}</span>
                                </div>
                            ))}
                        </div>
                        <div className="services-col">
                            {services.map((service, index) => (
                                <div
                                    key={`right-${index}`}
                                    className="service-item"
                                    ref={(el) => (serviceItemsRef.current[index + 3] = el)}
                                >
                                    <span className="service-plus">+</span>
                                    <span>{service.right}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="services-image-wrapper">
                    {/* <div className="social-sidebar">
                        <span className="follow-text">FOLLOW</span>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook">
                                <Facebook size={16} />
                            </a>
                            <a href="#" aria-label="X">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <Instagram size={16} />
                            </a>
                            <a href="#" aria-label="LinkedIn">
                                <Linkedin size={16} />
                            </a>
                        </div>
                    </div> */}
                    <div className="scroll-indicator">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop"
                        alt="Team collaboration"
                        className="services-image"
                    />
                </div>
            </div>


        </section>
    );
};

export default ServicesBanner;