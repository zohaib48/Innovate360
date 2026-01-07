import { useEffect, useRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CalWidget.module.css';
import { useLocation } from 'react-router-dom';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function CalWidget({ id = 'cal-widget' }) {
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
        iframe.classList.add(styles['at-bottom']);
      } else {
        iframe.classList.remove(styles['at-bottom']);
      }

      if (isAtTop) {
        iframe.classList.add(styles['at-top']);
      } else {
        iframe.classList.remove(styles['at-top']);
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
          window.Cal('init', 'metting', {
            origin: 'https://app.cal.com',
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

  // 2. Handle GSAP Animations
  useEffect(() => {
    if (leftColumnRef.current && rightColumnRef.current) {
      // Set initial state
      gsap.set(leftColumnRef.current, {
        x: -100,
        opacity: 0,
      });
      gsap.set(rightColumnRef.current, {
        x: 100,
        opacity: 0,
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
          toggleActions: 'play none none reverse',
        },
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
          toggleActions: 'play none none reverse',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id={id} className={styles['cal-widget-wrapper']}>
      <div className={styles['cal-widget-grid']}>
        {/* Left Column - Contact Information */}
        <div className={styles['cal-info-column']} ref={leftColumnRef}>
          <h2 className={styles['cal-info-title']}>Interested in partnering with Innovate360?</h2>
          <p className={styles['cal-info-description']}>
            {!showDifferentDescription ? ' Book a free, no-obligation call to explore your project and get a tailored quote.' : 'Choose a date and time to schedule a free, no-obligation consultation. During this call, we\'ll discuss your project and provide a custom quote, along with a detailed development plan, at no cost.'}

          </p>

          <div className={styles['cal-contact-info']}>
            <div className={styles['cal-contact-item']}>
              <div className={styles['cal-contact-icon']}>
                <Mail size={20} />
              </div>
              <div className={styles['cal-contact-details']}>
                <span className={styles['cal-contact-label']}>Email:</span>
                <a href="mailto:contact@rapidevelopers.com" className={styles['cal-contact-link']}>
                  info@innovate360.us
                </a>
              </div>
            </div>

            <div className={`${styles['cal-contact-item']} ${styles['cal-contact-item-p']}`}>
              <div className={styles['cal-contact-icon']}>
                <Phone size={20} />
              </div>
              <div className={styles['cal-contact-details']}>
                <span className={styles['cal-contact-label']}>For sales inquiries, Call:</span>
                <a href="tel:+18044042457" className={styles['cal-contact-link']}>
                  +1 (804) 404-2457
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Native Embed Div */}
        <div className={styles['cal-calendar-column']} ref={rightColumnRef}>
          <div className={styles['cal-embed-container']}>
            {/* The ID here must match the ID in the useEffect script */}
            <div
              id="my-cal-inline-metting"
              className={styles['cal-iframe-container']}
              style={{ width: '100%', minHeight: '500px' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
