import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, User, ArrowRight, Home } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarComponent from '../components/NavbarComponent/NavbarComponent';
import FooterSection from '../components/FooterSection/FooterSection';
import { caseStudiesData } from "../data/caseStudiesData";
import "./CaseStudyDetailPage.css";

gsap.registerPlugin(ScrollTrigger);

const CaseStudyDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const overviewRef = useRef(null);
    const challengeRef = useRef(null);
    const approachRef = useRef(null);
    const solutionsRef = useRef(null);
    const outcomesRef = useRef(null);
    const relatedRef = useRef(null);

    const caseStudy = caseStudiesData.find(c => c.id === parseInt(id));

    // Filter related studies (exclude current one)
    const relatedCaseStudies = caseStudiesData
        .filter(c => c.id !== parseInt(id))
        .slice(0, 3);

    useEffect(() => {
        if (!caseStudy) {
            navigate("/case-studies"); // Redirect if not found
            return;
        }

        // Scroll to top when ID changes
        window.scrollTo(0, 0);

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
    }, [id, navigate, caseStudy]);

    if (!caseStudy) return null;

    return (
        <div style={{ backgroundColor: 'black' }}>
            <NavbarComponent />

            <div className="csd-page" style={{ backgroundColor: 'white' }}>

                {/* Hero Section */}
                <section className="csd-hero" ref={heroRef}>
                    <div className="hero-overlay"></div>
                    <div className="container">

                        <div className="csd-hero-content">
                            <span className="csd-label">Case Study | {caseStudy.category}</span>
                            <h1 className="csd-hero-title">
                                {caseStudy.title}
                            </h1>
                            <div className="csd-hero-meta">
                                <span className="csd-meta-item">
                                    <User size={16} />
                                    By {caseStudy.client}
                                </span>
                                <span className="csd-meta-item">
                                    <Calendar size={16} />
                                    {caseStudy.date}
                                </span>
                                <span className="csd-meta-item">
                                    <Clock size={16} />
                                    {caseStudy.readTime}
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
                                        {caseStudy.overview}
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
                                    <h3 className="csd-subsection-title">{caseStudy.challenge.title}</h3>
                                    <p className="csd-text">
                                        {caseStudy.challenge.description}
                                    </p>
                                    <ul className="csd-list mt-4">
                                        {caseStudy.challenge.points.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
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
                                <h3 className="csd-subsection-title csd-approach-item">{caseStudy.approach.title}</h3>
                                <p className="csd-text csd-approach-item">
                                    {caseStudy.approach.description}
                                </p>

                                {caseStudy.approach.steps.map((step, index) => (
                                    <div key={index} className="csd-approach-subsection csd-approach-item mt-5">
                                        <h3 className="csd-subsection-title">
                                            {index + 1}. {step.title}
                                        </h3>
                                        <p className="csd-text">
                                            {step.text}
                                        </p>
                                    </div>
                                ))}
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
                                    <h3 className="csd-subsection-title">{caseStudy.solutions.title}</h3>
                                    <p className="csd-text">
                                        {caseStudy.solutions.description}
                                    </p>
                                    <p className="csd-text fw-semibold mt-4">Key deliverables included:</p>
                                    <ul className="csd-list">
                                        {caseStudy.solutions.features.map((feature, i) => (
                                            <li key={i}>
                                                <strong>{feature.title}:</strong> {feature.text}
                                            </li>
                                        ))}
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
                                    <h2 className="csd-section-title">Key Outcomes</h2>
                                    <p className="csd-text">
                                        {caseStudy.outcomes.text}
                                    </p>

                                    <h3 className="csd-subsection-title mt-4">Impact</h3>
                                    <ul className="csd-list">
                                        {caseStudy.outcomes.stats.map((stat, i) => (
                                            <li key={i}>
                                                <strong>{stat.value}</strong> {stat.label}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="csd-cta-box">
                                        <p className="csd-cta-text">See more projects like this?</p>
                                        <p className="csd-cta-subtext">
                                            Let us walk you through our success stories
                                        </p>
                                        <button className="csd-cta-btn" onClick={() => navigate('/contact')}>
                                            Get in touch
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Case Studies */}
                <section className="csd-related-section" ref={relatedRef}>
                    <div className="container">
                        <h2 className="csd-related-title">You May Also Like</h2>
                        <p className="csd-related-subtitle">Explore More Stories</p>
                        <div className="row g-4">
                            {relatedCaseStudies.map((study, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="csd-related-card" onClick={() => navigate(`/case-studies/${study.id}`)} style={{ cursor: 'pointer' }}>
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
        </div>
    );
};

export default CaseStudyDetailPage;
