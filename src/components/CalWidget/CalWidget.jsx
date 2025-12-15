import { useEffect, useRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CalWidget.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function CalWidget({ id = 'cal-widget' }) {
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

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

  // 1. Handle Cal.com Embed Script
  useEffect(() => {
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

    // Add event listener to handle iframe scroll events
    const checkIframe = setInterval(() => {
      const iframe = document.querySelector('#my-cal-inline-metting iframe');
      if (iframe) {
        clearInterval(checkIframe);

        // Set iframe styles for better scrolling
        iframe.style.overflowY = 'scroll';
        iframe.style.display = 'block';
        iframe.style.minHeight = '500px';

        // Add scroll event listener to the iframe
        const setupIframe = () => {
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const iframeBody = iframeDoc.body;
            const iframeHtml = iframeDoc.documentElement;

            // Add scroll event listener
            iframeDoc.addEventListener('scroll', () => handleIframeScroll(iframe));

            // Variables to track touch state
            let touchStartY = 0;
            let iframeScrollTop = 0;

            // Handle touchstart to record initial positions
            iframeDoc.addEventListener(
              'touchstart',
              (e) => {
                touchStartY = e.touches[0].clientY;
                iframeScrollTop = iframeHtml.scrollTop || iframeBody.scrollTop;
              },
              { passive: true }
            );

            // Handle touchmove to control scroll behavior
            iframeDoc.addEventListener(
              'touchmove',
              (e) => {
                const touchY = e.touches[0].clientY;
                const touchDeltaY = touchY - touchStartY;

                const { isAtBottom, isAtTop } = handleIframeScroll(iframe);

                // If scrolling down and at bottom, allow page scroll
                if (touchDeltaY < 0 && isAtBottom) {
                  // User is trying to scroll down and iframe is at bottom
                  // Allow the event to propagate to parent
                  return;
                }

                // If scrolling up and at top, allow page scroll
                if (touchDeltaY > 0 && isAtTop) {
                  // User is trying to scroll up and iframe is at top
                  // Allow the event to propagate to parent
                  return;
                }

                // Otherwise, prevent the event from bubbling to prevent page scroll
                e.stopPropagation();
              },
              { passive: true }
            );
          } catch (e) {
            console.warn('Could not access iframe document:', e);
          }
        };

        // Setup iframe when it loads
        if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
          setupIframe();
        } else {
          iframe.addEventListener('load', setupIframe);
        }
      }
    }, 500);

    return () => {
      clearInterval(checkIframe);
      const iframe = document.querySelector('#my-cal-inline-metting iframe');
      if (iframe) {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          if (iframeDoc) {
            // Remove event listeners
            iframeDoc.removeEventListener('scroll', () => handleIframeScroll(iframe));
            iframeDoc.removeEventListener('touchstart', null);
            iframeDoc.removeEventListener('touchmove', null);
          }
        } catch (e) {
          console.warn('Could not remove iframe event listener:', e);
        }
      }
    };
  }, []);

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
    <div id={id} className="cal-widget-wrapper">
      <div className="cal-widget-grid">
        {/* Left Column - Contact Information */}
        <div className="cal-info-column" ref={leftColumnRef}>
          <h2 className="cal-info-title">Interested in partnering with Innovate360?</h2>
          <p className="cal-info-description">
            Choose a date and time to schedule a free, no-obligation consultation. During this call,
            we'll discuss your project and provide a custom quote, along with a detailed development
            plan, at no cost.
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
              className="cal-iframe-container"
              style={{ width: '100%', minHeight: '500px' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
