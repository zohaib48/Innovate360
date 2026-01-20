import React, { useRef, useState, useEffect } from 'react';
import './ArchitectureShowcaseMobile.css';

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
        <path
            fill="#121212"
            d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
        />
    </svg>
);

const ArchitectureShowcaseMobile = ({ data }) => {
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Handle scroll to update active dot
    const handleScroll = () => {
        if (sliderRef.current) {
            const scrollLeft = sliderRef.current.scrollLeft;
            const center = scrollLeft + sliderRef.current.offsetWidth / 2;
            const children = sliderRef.current.children;

            let closestIndex = 0;
            let minDistance = Infinity;

            Array.from(children).forEach((child, index) => {
                const childCenter = child.offsetLeft + child.offsetWidth / 2;
                const distance = Math.abs(childCenter - center);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            // Update state only if changed to avoid renders responsible for jitter
            setActiveIndex((prev) => (prev !== closestIndex ? closestIndex : prev));
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener('scroll', handleScroll);
            return () => slider.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Helper to safely scroll to a slide without hijacking page scroll
    const scrollToSlide = (index) => {
        if (!sliderRef.current) return;
        const slider = sliderRef.current;
        const child = slider.children[index];

        if (child) {
            // Calculate centering position relative to the container
            const newScrollLeft = child.offsetLeft - (slider.offsetWidth - child.offsetWidth) / 2;
            slider.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        }
    };

    const [isInView, setIsInView] = useState(false);

    // Viewport detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Start 3s delay before enabling auto-play
                    const timer = setTimeout(() => {
                        setIsInView(true);
                    }, 3000); // Wait 3s after appearing
                    return () => clearTimeout(timer);
                } else {
                    setIsInView(false);
                }
            },
            { threshold: 0.3 } // 30% visible
        );

        if (sliderRef.current) {
            observer.observe(sliderRef.current);
        }

        return () => {
            if (sliderRef.current) observer.unobserve(sliderRef.current);
        };
    }, []);

    // Auto-play logic
    useEffect(() => {
        let interval;
        if (isInView && !isPaused) {
            interval = setInterval(() => {
                const nextIndex = (activeIndex + 1) % data.length;
                scrollToSlide(nextIndex);
            }, 3000); // 3 seconds per slide
        }
        return () => clearInterval(interval);
    }, [activeIndex, isPaused, isInView, data.length]);

    return (
        <div
            className="arch-mobile-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <div className="arch-mobile-header">
                <h2>Our Work</h2>
            </div>

            <div className="arch-mobile-slider" ref={sliderRef}>
                {data.map((item, index) => (
                    <div key={item.id} className="arch-mobile-card">
                        <div className="arch-mobile-image">
                            <img
                                src={item.mobileImage || item.image}
                                alt={item.imageAlt}
                                loading="lazy"
                            />
                        </div>
                        <div className="arch-mobile-content">
                            <h3 className="arch-mobile-title">{item.title}</h3>
                            <p className="arch-mobile-desc">{item.description}</p>
                            <a
                                href={item.link}
                                className="arch-mobile-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ backgroundColor: item.linkColor }}
                            >
                                <LeafIcon /> <span>View Project</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="arch-mobile-dots">
                {data.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => scrollToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArchitectureShowcaseMobile;
