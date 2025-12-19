import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, User, ArrowRight, Home } from "lucide-react";
import NavbarComponent from '../components/NavbarComponent/NavbarComponent';
import FooterSection from '../components/FooterSection/FooterSection';
import "./CaseStudyDetailPage.css";

gsap.registerPlugin(ScrollTrigger);

const CaseStudyDetailPage = () => {
    const heroRef = useRef(null);
    const overviewRef = useRef(null);
    const challengeRef = useRef(null);
    const approachRef = useRef(null);
    const solutionsRef = useRef(null);
    const outcomesRef = useRef(null);
    const relatedRef = useRef(null);

    const relatedCaseStudies = [
        {
            category: "Mobility",
            title: "Driving Innovation in Agriculture with a Drone-Booking App for Farmers",
            date: "May 25, 2023",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
        },
        {
            category: "Enterprise",
            title: "Enterprise Digital Transformation for Senior Living",
            date: "May 15, 2023",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
        },
        {
            category: "Fintech, Wealth Management",
            title: "Flagship product for users to know their Global connections better",
            date: "Jul 21, 2023",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animation
            gsap.from(".csd-hero-content", {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
            });

            // Overview animation
            gsap.from(".csd-overview", {
                scrollTrigger: {
                    trigger: overviewRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
            });

            // Challenge animation
            gsap.from(".csd-challenge", {
                scrollTrigger: {
                    trigger: challengeRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
            });

            // Dashboard images animation
            gsap.from(".csd-dashboard-img", {
                scrollTrigger: {
                    trigger: ".csd-dashboard-images",
                    start: "top 80%",
                },
                opacity: 0,
                y: 60,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });

            // Approach animation
            gsap.from(".csd-approach-item", {
                scrollTrigger: {
                    trigger: approachRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });

            // Solutions animation
            gsap.from(".csd-solutions", {
                scrollTrigger: {
                    trigger: solutionsRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
            });

            // Outcomes animation
            gsap.from(".csd-outcomes-content", {
                scrollTrigger: {
                    trigger: outcomesRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
            });

            // Quote animation
            gsap.from(".csd-quote-section", {
                scrollTrigger: {
                    trigger: ".csd-quote-section",
                    start: "top 80%",
                },
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                ease: "power3.out",
            });

            // Related cards animation
            gsap.set(".csd-related-card", { opacity: 1, y: 0 });
            const cards = document.querySelectorAll(".csd-related-card");
            cards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60 },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: "power3.out",
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="csd-page" style={{ backgroundColor: 'white' }}>
            <NavbarComponent />

            {/* Hero Section */}
            <section className="csd-hero" ref={heroRef}>
                <div className="hero-overlay"></div>
                <div className="container">

                    <div className="csd-hero-content">
                        <span className="csd-label">Case Study</span>
                        <h1 className="csd-hero-title">
                            Accelerating Drilling Operations and Ensuring Safety Through
                            Next-Generation Design
                        </h1>
                        <div className="csd-hero-meta">
                            <span className="csd-meta-item">
                                <User size={16} />
                                By Seven Peaks
                            </span>
                            <span className="csd-meta-item">
                                <Calendar size={16} />
                                Dec 15, 2024
                            </span>
                            <span className="csd-meta-item">
                                <Clock size={16} />
                                8 min read
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="csd-section" ref={overviewRef}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="csd-overview">
                                <h2 className="csd-section-title">Overview</h2>
                                <p className="csd-text">
                                    Faced with the critical need to digitally transform their drilling operations,
                                    a leading oil and gas company partnered with us to redesign their mission-critical
                                    systems. The challenge was to modernize legacy infrastructure while maintaining
                                    uninterrupted drilling operations and ensuring the highest safety standards
                                    across multiple offshore platforms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenge Section */}
            <section className="csd-section" ref={challengeRef}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="csd-challenge">
                                <h2 className="csd-section-title">The Challenge</h2>
                                <p className="csd-text">
                                    The existing monitoring system was built on outdated technology that couldn't
                                    scale with modern drilling operations. Real-time data processing was limited,
                                    causing delays in critical decision-making. The user interface was complex and
                                    non-intuitive, leading to increased training costs and potential human errors.
                                </p>
                                <p className="csd-text">
                                    Additionally, the system lacked proper integration between drilling operations
                                    and safety protocols, creating potential blind spots in risk management. The
                                    client needed a solution that would not only modernize their infrastructure
                                    but also provide real-time insights and predictive capabilities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Images */}
            <section className="csd-dashboard-section">
                <div className="container">
                    <div className="csd-dashboard-images">
                        <div className="row g-4">
                            <div className="col-md-6">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
                                    alt="Dashboard Overview"
                                    className="csd-dashboard-img"
                                />
                            </div>
                            <div className="col-md-6">
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                                    alt="Analytics Dashboard"
                                    className="csd-dashboard-img"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Approach Section */}
            <section className="csd-section" ref={approachRef}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="csd-section-title csd-approach-item">Our Approach</h2>
                            <p className="csd-text csd-approach-item">
                                Our team adopted a holistic approach combining cutting-edge technology with
                                deep domain expertise in oil and gas operations.
                            </p>

                            <div className="csd-approach-subsection csd-approach-item">
                                <h3 className="csd-subsection-title">
                                    Strategic Cloud Transformation & Data Flow
                                </h3>
                                <p className="csd-text">
                                    We migrated the client's infrastructure to a modern cloud-based solution,
                                    enabling real-time data processing and seamless integration across all
                                    drilling platforms. The new architecture supports horizontal scaling and
                                    ensures 99.99% uptime for mission-critical operations.
                                </p>
                            </div>

                            <div className="csd-approach-subsection csd-approach-item">
                                <h3 className="csd-subsection-title">Human-Centric UX and Visualization</h3>
                                <p className="csd-text">
                                    A user-first approach was adopted throughout the design process. Our UX
                                    team worked closely with field operators to understand their daily workflows
                                    and pain points. The resulting interface features:
                                </p>
                                <ul className="csd-list">
                                    <li>Intuitive dashboard layouts</li>
                                    <li>Real-time alerts and notifications</li>
                                    <li>Customizable data visualizations</li>
                                </ul>
                                <p className="csd-text">
                                    The interface was designed to reduce cognitive load and present critical
                                    information at a glance, significantly improving response times during
                                    emergency situations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section className="csd-section" ref={solutionsRef}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="csd-solutions">
                                <h2 className="csd-section-title">Our Solutions</h2>
                                <p className="csd-text">
                                    To successfully deliver the project, our team built a comprehensive platform
                                    that seamlessly integrated operations and analytics. Key features included:
                                </p>
                                <p className="csd-text fw-semibold">Key deliverables included:</p>
                                <ul className="csd-list">
                                    <li>
                                        <strong>Advanced Pattern Detection:</strong> A custom machine learning
                                        model that predicts maintenance needs, preventing costly downtime and
                                        ensuring continuous operations.
                                    </li>
                                    <li>
                                        <strong>AI-powered recommendations:</strong> The system provides intelligent
                                        suggestions for optimizing drilling parameters, resulting in 15% improved
                                        efficiency and reduced environmental impact.
                                    </li>
                                    <li>
                                        <strong>Integrated Safety Protocols:</strong> Real-time monitoring with
                                        automated safety responses, reducing incident response time by 60%.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Outcomes Section */}
            <section className="csd-section" ref={outcomesRef}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="csd-outcomes-content">
                                <h2 className="csd-section-title">Key Outcomes and Strategic Partnership</h2>
                                <p className="csd-text">
                                    The strategic collaboration between Seven Peaks and the client resulted in
                                    a transformative solution that exceeded expectations. The new platform has
                                    become a cornerstone of their drilling operations, setting new industry
                                    standards for safety and efficiency.
                                </p>

                                <h3 className="csd-subsection-title mt-4">Outcomes</h3>
                                <ul className="csd-list">
                                    <li>
                                        <strong>45% reduction</strong> in drilling downtime through predictive
                                        maintenance and real-time monitoring capabilities.
                                    </li>
                                    <li>
                                        <strong>60% faster</strong> incident response time through integrated
                                        safety protocols and automated alerting systems.
                                    </li>
                                    <li>
                                        <strong>30% improvement</strong> in operator productivity through intuitive
                                        interface design and streamlined workflows.
                                    </li>
                                </ul>

                                <p className="csd-text">
                                    The comprehensive platform combining operational insights, safety protocols,
                                    and predictive analytics has positioned the client as a leader in digital
                                    transformation within the energy sector.
                                </p>

                                <div className="csd-cta-box">
                                    <p className="csd-cta-text">See more projects like this?</p>
                                    <p className="csd-cta-subtext">
                                        Let us walk you through our success stories
                                    </p>
                                    <button className="csd-cta-btn">
                                        Get in touch
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            {/* <section className="csd-quote-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="csd-quote-card">
                                <p className="csd-quote-label">From Our Blog</p>
                                <p className="csd-quote-text">
                                    "Mastering Microservices: Important lessons we've learned at Primer Quantum Engine"
                                </p>
                                <Home className="csd-quote-icon" size={24} />
                                <a href="#" className="csd-quote-link">Read Our Stories</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Related Case Studies */}
            <section className="csd-related-section" ref={relatedRef}>
                <div className="container">
                    <h2 className="csd-related-title">You May Also Like</h2>
                    <p className="csd-related-subtitle">Explore More Stories</p>
                    <div className="row g-4">
                        {relatedCaseStudies.map((study, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="csd-related-card">
                                    <div className="csd-related-img-wrapper">
                                        <img
                                            src={study.image}
                                            alt={study.title}
                                            className="csd-related-img"
                                        />
                                    </div>
                                    <div className="csd-related-content">
                                        <span className="csd-related-category">{study.category}</span>
                                        <h3 className="csd-related-card-title">{study.title}</h3>
                                        <div className="csd-related-meta">
                                            <span>{study.date}</span>
                                            <span className="csd-meta-separator">•</span>
                                            <span>{study.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FooterSection />
        </div>
    );
};

export default CaseStudyDetailPage;
