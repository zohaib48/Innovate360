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

    // 1. Handle Cal.com Embed Script
    useEffect(() => {
        (function (C, A, L) {
            let p = function (a, ar) { a.q.push(ar); };
            let d = C.document;
            C.Cal = C.Cal || function () {
                let cal = C.Cal;
                let ar = arguments;
                if (!cal.loaded) {
                    cal.ns = {};
                    cal.q = cal.q || [];
                    d.head.appendChild(d.createElement("script")).src = A;
                    cal.loaded = true;
                }
                if (ar[0] === L) {
                    const api = function () { p(api, arguments); };
                    const namespace = ar[1];
                    api.q = api.q || [];
                    if (typeof namespace === "string") {
                        cal.ns[namespace] = cal.ns[namespace] || api;
                        p(cal.ns[namespace], ar);
                        p(cal, ["initNamespace", namespace]);
                    } else p(cal, ar);
                    return;
                }
                p(cal, ar);
            };
        })(window, "https://app.cal.com/embed/embed.js", "init");

        // Initialize Cal
        window.Cal("init", "metting", { origin: "https://app.cal.com" });

        // Configure Inline Embed
        window.Cal.ns.metting("inline", {
            elementOrSelector: "#my-cal-inline-metting",
            config: { "layout": "month_view", "theme": "light" },
            calLink: "zohaib-shafique-mql6e9/metting",
        });

        // UI Configuration
        window.Cal.ns.metting("ui", { "theme": "light", "hideEventTypeDetails": true, "layout": "month_view" });

    }, []);

    // 2. Handle GSAP Animations
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

            // Animate left column
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

            // Animate right column
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
                                    info@innovate360.us
                                </a>
                            </div>
                        </div>

                        <div className="cal-contact-item cal-contact-item-p">
                            <div className="cal-contact-icon">
                                <Phone size={20} />
                            </div>
                            <div className="cal-contact-details">
                                <span className="cal-contact-label">For sales related inquiries, Call:</span>
                                <a href="tel:+18044042457" className="cal-contact-link">
                                    +1 (804) 404-2457
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Native Embed Div */}
                <div className="cal-calendar-column" ref={rightColumnRef}>
                    <div className="cal-embed-container">
                        {/* The ID here must match the ID in the useEffect script */}
                        <div
                            id="my-cal-inline-metting"
                            style={{ width: "100%", height: "100%", }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}