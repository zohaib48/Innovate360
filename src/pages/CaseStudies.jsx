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
                        <div className="projects-label" style={{ justifyContent: 'center' }}>
                            <svg
                                className="rotating-star"
                                height="30px"
                                width="30px"
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 512 512"
                                xmlSpace="preserve"
                                fill="#000000"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path style={{ fill: "#66e04d" }} d="M131.21,112.392c29.639,17.11,77.945,116.564,77.945,116.564s-110.285,7.905-139.924-9.22 c-29.639-17.111-39.807-55.022-22.682-84.662C63.659,105.435,101.571,95.267,131.21,112.392z"></path>
                                    <path style={{ fill: "#4ba05c" }} d="M209.155,283.044c0,0-48.305,99.453-77.945,116.578c-29.639,17.111-67.551,6.957-84.662-22.696 c-17.125-29.639-6.957-67.551,22.682-84.662C98.87,275.154,209.155,283.044,209.155,283.044z"></path>
                                    <path style={{ fill: "#66e04d" }} d="M465.459,135.074c17.111,29.639,6.957,67.551-22.696,84.662 c-29.639,17.125-139.924,9.22-139.924,9.22s48.305-99.453,77.945-116.564C410.437,95.267,448.334,105.435,465.459,135.074z"></path>
                                    <g>
                                        <path style={{ fill: "#4ba05c" }} d="M442.763,292.264c29.654,17.111,39.807,55.022,22.696,84.662 c-17.125,29.653-55.022,39.807-84.676,22.696c-29.639-17.125-77.945-116.578-77.945-116.578S413.123,275.154,442.763,292.264z"></path>
                                        <path style={{ fill: "#4ba05c" }} d="M256.004,14.141c34.221,0,61.98,27.759,61.98,61.98c0,34.235-61.98,125.798-61.98,125.798 s-61.98-91.562-61.98-125.798C194.024,41.9,221.769,14.141,256.004,14.141z"></path>
                                    </g>
                                    <path style={{ fill: "#66e04d" }} d="M317.983,435.879c0,34.235-27.759,61.98-61.98,61.98c-34.235,0-61.98-27.744-61.98-61.98 s61.98-125.783,61.98-125.783S317.983,401.644,317.983,435.879z"></path>
                                    <path d="M256.002,216.059L256.002,216.059c-4.692,0-9.08-2.328-11.71-6.215c-10.754-15.889-64.409-97.012-64.409-133.724 C179.883,34.147,214.029,0,256.002,0s76.121,34.147,76.121,76.121c0,36.711-53.653,117.835-64.41,133.724 C265.082,213.731,260.696,216.059,256.002,216.059z M256.002,28.282c-26.377,0-47.837,21.46-47.837,47.839 c0,18.344,25.906,65.27,47.836,99.939c21.931-34.681,47.84-81.613,47.84-99.939C303.841,49.742,282.382,28.282,256.002,28.282z"></path>
                                    <path d="M154.22,245.058c-34.157,0-73.838-2.548-92.063-13.078c-17.603-10.162-30.198-26.576-35.463-46.217 c-5.265-19.645-2.562-40.159,7.612-57.764c10.162-17.603,26.575-30.198,46.215-35.463c19.647-5.265,40.159-2.561,57.764,7.611 c31.785,18.356,75.208,105.372,83.59,122.63c2.05,4.221,1.872,9.185-0.474,13.249c-2.345,4.064-6.556,6.7-11.235,7.035 C202,243.645,179.636,245.058,154.22,245.058z M100.3,118.204c-4.155,0-8.337,0.546-12.46,1.65 c-12.344,3.308-22.657,11.224-29.045,22.289c-6.393,11.067-8.091,23.956-4.784,36.298s11.225,22.658,22.289,29.047 c15.883,9.176,69.471,10.198,110.46,8.543c-19.068-36.331-46.756-82.234-62.622-91.391c-0.001-0.001-0.003-0.001-0.004-0.003 C116.767,120.379,108.588,118.204,100.3,118.204z"></path>
                                    <path d="M100.348,422.098c-6.614,0-13.268-0.87-19.827-2.627c-19.643-5.265-36.056-17.863-46.22-35.477 c-10.169-17.598-12.872-38.113-7.608-57.757c5.265-19.64,17.86-36.055,35.468-46.22H62.16 c31.786-18.349,128.863-12.448,148.003-11.078c4.681,0.335,8.89,2.971,11.236,7.035c2.346,4.064,2.524,9.028,0.474,13.249 c-8.383,17.259-51.809,104.281-83.59,122.643C126.554,418.637,113.536,422.098,100.348,422.098z M154.915,295.324 c-33.275,0-66.656,2.284-78.614,9.187c0,0,0,0-0.001,0c-11.064,6.387-18.981,16.703-22.289,29.047 c-3.308,12.344-1.611,25.233,4.781,36.294c6.392,11.075,16.705,18.993,29.048,22.3c12.341,3.306,25.234,1.612,36.298-4.777 c15.879-9.173,43.562-55.073,62.623-91.4C176.663,295.569,165.79,295.324,154.915,295.324z"></path>
                                    <path d="M256.002,512c-41.973,0-76.119-34.147-76.119-76.121c0-36.711,53.653-117.823,64.409-133.711 c2.63-3.886,7.018-6.214,11.71-6.214c4.692,0,9.08,2.328,11.709,6.214c10.756,15.887,64.412,97,64.412,133.711 C332.123,477.853,297.975,512,256.002,512z M256.002,335.954c-21.93,34.675-47.837,81.6-47.837,99.927 c0,26.378,21.46,47.839,47.837,47.839c26.378,0,47.839-21.46,47.839-47.839C303.841,417.554,277.934,370.629,256.002,335.954z"></path>
                                    <path d="M411.637,422.045c-12.904,0-25.967-3.276-37.922-10.174c-0.001-0.001-0.004-0.003-0.007-0.004 c-31.782-18.362-75.208-105.385-83.59-122.643c-2.05-4.221-1.872-9.185,0.474-13.249c2.346-4.064,6.557-6.7,11.236-7.035 c19.138-1.369,116.221-7.27,148.004,11.078c17.61,10.162,30.208,26.576,35.472,46.22c5.265,19.64,2.564,40.153-7.601,57.76 C463.619,408.39,437.97,422.045,411.637,422.045z M387.856,387.378c22.84,13.174,52.163,5.318,65.355-17.523 c6.389-11.064,8.084-23.953,4.777-36.297c-3.309-12.344-11.225-22.658-22.295-29.045c-15.868-9.159-69.463-10.191-110.46-8.538 C344.302,332.309,371.99,378.21,387.856,387.378L387.856,387.378z"></path>
                                    <path d="M357.78,245.058c-25.424,0-47.785-1.413-55.953-1.998c-4.681-0.335-8.889-2.971-11.235-7.035 c-2.346-4.064-2.524-9.028-0.474-13.249c8.383-17.259,51.811-104.284,83.594-122.633c11.97-6.911,25.553-10.437,39.323-10.2 c7.809,0.136,14.029,6.574,13.893,14.383c-0.133,7.725-6.438,13.896-14.132,13.896c-0.085,0-0.167,0-0.25-0.001 c-8.661-0.143-17.164,2.07-24.693,6.416c-15.866,9.159-43.553,55.059-62.62,91.388c41.004,1.659,94.593,0.631,110.455-8.535 c20.487-11.822,29.313-37.251,20.535-59.157c-2.906-7.249,0.618-15.481,7.867-18.386c7.251-2.9,15.481,0.617,18.386,7.867 c13.978,34.881-0.058,75.365-32.646,94.169C431.613,242.51,391.932,245.058,357.78,245.058z"></path>
                                    <path d="M447.407,129.481c-2.803,0-5.632-0.831-8.103-2.562c-0.407-0.286-0.817-0.564-1.232-0.836 c-6.53-4.283-8.352-13.051-4.068-19.581c4.282-6.529,13.048-8.353,19.579-4.068c0.658,0.431,1.308,0.872,1.953,1.324 c6.395,4.483,7.946,13.301,3.465,19.695C456.249,127.381,451.862,129.481,447.407,129.481z"></path>
                                </g>
                            </svg>
                            <span className="label-line"></span>
                            <span className="section-title">OUR AREA OF EXPERTISE</span>
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
