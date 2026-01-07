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

    // Function to handle iframe scroll events and prevent scroll locking
    const handleIframeScroll = (iframe) => {
        if (!iframe) return;

        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const iframeBody = iframeDocument.body;
            const iframeHtml = iframeDocument.documentElement;

            // Check if we've scrolled to the bottom of the iframe
            const scrollTop = iframeHtml.scrollTop || iframeBody.scrollTop;
            const scrollHeight = iframeHtml.scrollHeight || iframeBody.scrollHeight;
            const clientHeight = iframeHtml.clientHeight || iframeBody.clientHeight;

            const isAtBottom = scrollHeight - scrollTop <= clientHeight + 5;
            const isAtTop = scrollTop <= 5;

            // Add/remove classes based on scroll position
            if (isAtBottom) {
                iframe.classList.add('at-bottom');
            } else {
                iframe.classList.remove('at-bottom');
            }

            if (isAtTop) {
                iframe.classList.add('at-top');
            } else {
                iframe.classList.remove('at-top');
            }

            return { isAtBottom, isAtTop, scrollTop };
        } catch (e) {
            console.warn('Could not access iframe document:', e);
            return { isAtBottom: false, isAtTop: false, scrollTop: 0 };
        }
    };

    // 1. Handle Cal.com Embed Script - Lazy Load
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
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
                    window.Cal('init', 'metting', {
                        origin: 'https://app.cal.com',
                        // Add configuration to make the iframe more mobile-friendly
                        config: {
                            layout: 'month_view',
                            theme: 'light',
                            isMobile: window.innerWidth <= 768,
                        },
                    });

                    // Configure Inline Embed
                    window.Cal.ns.metting('inline', {
                        elementOrSelector: '#my-cal-inline-metting',
                        config: {
                            layout: 'month_view',
                            theme: 'light',
                            isMobile: window.innerWidth <= 768,
                        },
                        calLink: 'zohaib-shafique-mql6e9/metting',
                    });

                    // UI Configuration
                    window.Cal.ns.metting('ui', {
                        theme: 'light',
                        hideEventTypeDetails: true,
                        layout: 'month_view',
                    });

                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        const widget = document.getElementById(id);
        if (widget) {
            observer.observe(widget);
        }

        return () => observer.disconnect();
    }, [id]);

    useEffect(() => {
        if (leftColumnRef.current && rightColumnRef.current) {

            gsap.set(leftColumnRef.current, {
                x: -100,
                opacity: 0,
            });
            gsap.set(rightColumnRef.current, {
                x: 100,
                opacity: 0,
            });


            gsap.to(leftColumnRef.current, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: leftColumnRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });


            gsap.to(rightColumnRef.current, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: rightColumnRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
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
                            id="my-cal-inline-metting"
                            className="cal-iframe-container"
                            style={{ width: '100%', height: '100%' }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
