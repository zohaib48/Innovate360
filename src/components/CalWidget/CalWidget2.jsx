import { useEffect, useRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CalWidget2.css';
import { useLocation } from 'react-router-dom';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function CalWidget2({ id = 'cal-widget' }) {
    const leftColumnRef = useRef(null);
    const rightColumnRef = useRef(null);
    const location = useLocation();

    const showDifferentDescription = !['/'].includes(location.pathname);


    // 1. Handle Cal.com Embed Script - Lazy Load
    // 1. Handle Cal.com Embed Script - Lazy Load
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    // Load Cal.com script only when visible
                    (function (C, A, L) {
                        let p = function (a, ar) {
                            a.q.push(ar);
                        };
                        let d = C.document;
                        C.Cal =
                            C.Cal ||
                            function () {
                                let cal = C.Cal;
                                let ar = arguments;
                                if (!cal.loaded) {
                                    cal.ns = {};
                                    cal.q = cal.q || [];
                                    d.head.appendChild(d.createElement('script')).src = A;
                                    cal.loaded = true;
                                }
                                if (ar[0] === L) {
                                    const api = function () {
                                        p(api, arguments);
                                    };
                                    const namespace = ar[1];
                                    api.q = api.q || [];
                                    if (typeof namespace === 'string') {
                                        cal.ns[namespace] = cal.ns[namespace] || api;
                                        p(cal.ns[namespace], ar);
                                        p(cal, ['initNamespace', namespace]);
                                    } else p(cal, ar);
                                    return;
                                }
                                p(cal, ar);
                            };
                    })(window, 'https://app.cal.com/embed/embed.js', 'init');

                    // Initialize Cal
                    window.Cal('init', '30min', {
                        origin: 'https://app.cal.com',
                        config: {
                            layout: 'month_view',
                            theme: 'light',
                            isMobile: window.innerWidth <= 768,
                        },
                    });

                    // Configure Inline Embed
                    window.Cal.ns["30min"]("inline", {
                        elementOrSelector: "#my-cal-inline-30min",
                        config: {
                            layout: 'month_view',
                            theme: 'light',
                            isMobile: window.innerWidth <= 768,
                        },
                        calLink: "waris-shahid-c2uhum/30min",
                    });

                    // UI Configuration
                    window.Cal.ns["30min"]("ui", {
                        theme: 'light',
                        hideEventTypeDetails: true,
                        layout: 'month_view',
                    });

                    observer.disconnect(); // Stop observing once loaded
                }
            },
            { rootMargin: '200px' } // Load slightly before it comes into view
        );

        const widget = document.getElementById(id);
        if (widget) {
            observer.observe(widget);
        }

        return () => observer.disconnect();
    }, [id]);

    // 3. Fix scroll and click issues with Cal.com iframe
    useEffect(() => {
        // Wait for Cal.com to load and create its iframe
        const checkForIframe = setInterval(() => {
            const calContainer = document.querySelector('#my-cal-inline-30min');
            const iframe = calContainer?.querySelector('iframe');

            if (iframe) {
                clearInterval(checkForIframe);

                // Fix pointer-events to allow proper scrolling
                iframe.style.pointerEvents = 'auto';

                // Prevent the double-click issue by stopping event propagation
                const preventDoubleClick = (e) => {
                    // Only prevent propagation on actual calendar interactions
                    const target = e.target;
                    if (target.closest('[role="button"]') || target.closest('button')) {
                        e.stopPropagation();
                    }
                };

                // Add event listener to the container instead of iframe
                calContainer.addEventListener('click', preventDoubleClick, true);

                // Ensure smooth scrolling over the calendar
                calContainer.style.overflow = 'visible';
                calContainer.style.position = 'relative';
            }
        }, 100);

        // Cleanup after 10 seconds
        setTimeout(() => clearInterval(checkForIframe), 10000);

        return () => clearInterval(checkForIframe);
    }, []);

    return (
        <div id={id} className="cal-widget-wrapper">
            <div className="cal-widget-grid">
                <div className="cal-info-column-2" ref={leftColumnRef}>
                    <h2 className="cal-info-title-2">Build Smarter with Innovate360</h2>
                    <p className="cal-info-description-2">
                        {!showDifferentDescription ? ' Book a free, no-obligation call to explore your project and get a tailored quote.' : 'Choose a date and time to schedule a free, no-obligation consultation. During this call, we\'ll discuss your project and provide a custom quote, along with a detailed development plan, at no cost.'}

                    </p>


                </div>

                <div className="cal-calendar-column" ref={rightColumnRef}>
                    <div className="cal-embed-container">
                        <div
                            id="my-cal-inline-30min"
                            className="cal-iframe-container"
                            style={{ width: '100%', height: '100%' }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
