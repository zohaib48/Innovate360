import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef } from "react";
import { Mail, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CalWidget.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function CalWidget() {
    const leftColumnRef = useRef(null);
    const rightColumnRef = useRef(null);

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "30min" });
            cal("ui", { "theme": "light", "hideEventTypeDetails": true, "layout": "month_view" });
        })();
    }, []);

    useEffect(() => {
    

        if (leftColumnRef.current && rightColumnRef.current) {
            // Set initial state
            gsap.set(leftColumnRef.current, {
                x: -100,
                opacity: 0
            });
            gsap.set(rightColumnRef.current, {
                x: 100,
                opacity: 0
            });

            // Animate left column from left to right
            gsap.to(leftColumnRef.current, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: leftColumnRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate right column from right to left
            gsap.to(rightColumnRef.current, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: rightColumnRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="cal-widget-wrapper">
            <div className="cal-widget-grid">
                {/* Left Column - Contact Information */}
                <div className="cal-info-column" ref={leftColumnRef}>
                    <h2 className="cal-info-title">
                        Interested in partnering with Innovate360?
                    </h2>
                    <p className="cal-info-description">
                        Choose a date and time to schedule a free, no-obligation consultation.
                        During this call, we'll discuss your project and provide a custom quote,
                        along with a detailed development plan, at no cost.
                    </p>

                    <div className="cal-contact-info">
                        <div className="cal-contact-item">
                            <div className="cal-contact-icon">
                                <Mail size={20} />
                            </div>
                            <div className="cal-contact-details">
                                <span className="cal-contact-label">Email:</span>
                                <a href="mailto:contact@rapidevelopers.com" className="cal-contact-link">
                                    contact@rapidevelopers.com
                                </a>
                            </div>
                        </div>

                        <div className="cal-contact-item cal-contact-item-p">
                            <div className="cal-contact-icon">
                                <Phone size={20} />
                            </div>
                            <div className="cal-contact-details">
                                <span className="cal-contact-label">For sales related inquiries, Call:</span>
                                <a href="tel:+17742318410" className="cal-contact-link">
                                    (774) 231-8410
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Cal Widget */}
                <div className="cal-calendar-column" ref={rightColumnRef}>
                    <div className="cal-embed-container">
                        <Cal
                            namespace="30min"
                            calLink="zohaib-shafique-mql6e9/30min"
                            style={{ width: "100%" }}
                            config={{ "layout": "month_view", "theme": "light" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
