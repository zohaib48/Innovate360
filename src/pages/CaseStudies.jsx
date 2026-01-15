import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "../components/SectionLabel/SectionLabel";
import { Search, ChevronDown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from '../components/NavbarComponent/NavbarComponent';
import FooterSection from '../components/FooterSection/FooterSection';
import "./CaseStudiesPage.css";

gsap.registerPlugin(ScrollTrigger);

import { caseStudiesData as caseStudies } from "../data/caseStudiesData";

const expertiseAreas = [
    {
        icon: "💻",
        title: "Digital",
        description: "HCLTech's end to end Digital offerings enable enterprises to increase business resilience, improve control over efficiency and deepen client engagement.",
        color: "#6366f1",
    },
    {
        icon: "⚙️",
        title: "Engineering",
        description: "HCLTech Engineering and R&D services (ERS) empower enterprises to improve time-to-profit, accelerate product development and maximize return on innovation.",
        color: "#10b981",
    },
    {
        icon: "☁️",
        title: "Cloud",
        description: "HCLTech's exclusive CloudSMART offerings and services enable organizations to optimize cloud to accelerate innovation and agility at scale.",
        color: "#8b5cf6",
    },
    {
        icon: "🤖",
        title: "AI",
        description: "HCLTech empowers organizations across industries to identify and seize opportunities to leverage AI and GenAI to automate and accelerate business processes.",
        color: "#f59e0b",
    },
];

const CaseStudiesPage = () => {
    const heroRef = useRef(null);
    const cardsRef = useRef(null);
    const expertiseRef = useRef(null);
    const [activeTab, setActiveTab] = useState("Cloud case study");
    const navigate = useNavigate();

    const tabs = ["Digital Case Study", "Engineering Case Study", "Cloud case study"];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animation
            gsap.from(".hero-content", {
                opacity: 0,
                x: -200,
                y: 0,
                duration: 2,
                ease: "power3.out",
            });

            gsap.from(".hero-subtitle", {
                opacity: 0,
                x: 500,
                y: 0,
                duration: 2,
                ease: "power3.out",
            });



            // Cards animation - set initial state first
            gsap.set(".case-card", { opacity: 1, y: 0 });

            const cards = document.querySelectorAll(".case-card");
            cards.forEach((card, index) => {
                gsap.fromTo(card,
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

            // Expertise section animation
            gsap.set(".expertise-card", { opacity: 1, y: 0 });

            const expertiseCards = document.querySelectorAll(".expertise-card");
            expertiseCards.forEach((card, index) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 40 },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        delay: index * 0.1,
                        ease: "power3.out",
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/case-studies/${id}`);
    };

    return (
        <div style={{ backgroundColor: 'black' }}>
            <NavbarComponent />
            <div className="case-studies-page" style={{ backgroundColor: 'white' }}>
                {/* Hero Section */}
                <section ref={heroRef} className="hero-section">
                    <div className="hero-overlay"></div>
                    <div className="container-s">
                        <div className="row">
                            <div className="col-lg-7 col-md-10">
                                <div className="hero-content">
                                    <h1 className="hero-title">
                                        Delivering End-to-End Digital Transformation at Scale
                                    </h1>
                                    <p className="hero-subtitle">  How we modernized systems, improved performance, and accelerated growth</p>

                                </div>
                            </div>
                        </div>
                        {/* <div className="hero-tabs">
                            {tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    className={`tab-item ${activeTab === tab ? "active" : ""}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div> */}
                    </div>
                </section>

                {/* Case Studies Section */}
                <section className="case-studies-section">
                    <div className="container">

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <SectionLabel text="CASE STUDIES" CustomStyleText={{ fontSize: "34px" }} />
                        </div>


                        {/* Cards Grid */}
                        <div ref={cardsRef} className="row g-4" style={{ backgroundColor: 'white' }}>
                            {caseStudies.map((study) => (
                                <div key={study.id} className="col-lg-4 col-md-6">
                                    <div className="case-card" onClick={() => handleCardClick(study.id)} style={{ cursor: 'pointer' }}>
                                        <div className="card-image">
                                            <img src={study.image} alt={study.title} />
                                        </div>
                                        <div className="card-content">
                                            <div className="card-categories">
                                                <span className="category-tag">
                                                    {study.category}
                                                </span>
                                            </div>
                                            <h3 className="card-title">{study.title}</h3>
                                            <p className="card-description">{study.description}</p>
                                            <a
                                                href="#"
                                                className="service-link text-decoration-none d-inline-flex align-items-center gap-2"
                                            >

                                                <span className="arrow-circle">→</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {/* <div className="pagination-wrapper">
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item active"><span className="page-link">1</span></li>
                                    <li className="page-item"><span className="page-link">2</span></li>
                                    <li className="page-item"><span className="page-link">3</span></li>
                                    <li className="page-item"><span className="page-link">4</span></li>
                                    <li className="page-item"><span className="page-link">5</span></li>
                                    <li className="page-item"><span className="page-link">6</span></li>
                                    <li className="page-item"><span className="page-link">7</span></li>
                                    <li className="page-item"><span className="page-link">8</span></li>
                                    <li className="page-item"><span className="page-link">9</span></li>
                                    <li className="page-item"><span className="page-link">...</span></li>
                                    <li className="page-item"><span className="page-link">Next</span></li>
                                </ul>
                            </nav>
                            <div className="page-size">
                                <span>Case studies per page</span>
                                <button className="page-size-btn">12 <ChevronDown size={14} /></button>
                            </div>
                        </div> */}
                    </div>
                </section>

                {/* Our Areas of Expertise Section */}
                <section ref={expertiseRef} className="expertise-section">
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <SectionLabel text="OUR AREA OF EXPERTISE" CustomStyleText={{ fontSize: "34px" }} />
                        </div>
                        <p className="expertise-subtitle">
                            With expertise in Digital, Engineering and Cloud, we deliver solutions that fulfil the traditional,
                            transformations, and future needs of clients across the globe.
                        </p>

                        <div className="row g-4 justify-content-center">
                            {expertiseAreas.map((area, index) => (
                                <div key={index} className="col-lg-3 col-md-6">
                                    <div className="expertise-card">
                                        <div className="expertise-icon" style={{ background: `${area.color}20`, color: area.color }}>
                                            <span>{area.icon}</span>
                                        </div>
                                        <h3 className="expertise-card-title">{area.title}</h3>
                                        <p className="expertise-card-desc">{area.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <FooterSection />
        </div>
    );
};

export default CaseStudiesPage;
