import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Modal } from 'react-bootstrap';
import styles from './FloatingBookingButton.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingBookingButton = () => {
  const location = useLocation();
  const floatingBtnRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isModalOpen) return;

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

    setTimeout(() => {
      window.Cal('init', 'metting', { origin: 'https://app.cal.com' });

      window.Cal.ns.metting('inline', {
        elementOrSelector: '#my-cal-inline-metting',
        config: { layout: 'month_view', theme: 'dark' },
        calLink: 'zohaib-shafique-mql6e9/metting',
      });

      window.Cal.ns.metting('ui', {
        theme: 'dark',
        hideEventTypeDetails: true,
        layout: 'month_view',
      });
    }, 100);
  }, [isModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isBottom = windowHeight + scrollPosition >= documentHeight - 100;

      setShowFloatingButton(scrollPosition > 600 && !isBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll, { passive: true });
  }, []);

  useEffect(() => {
    if (showFloatingButton && floatingBtnRef.current) {
      gsap.to(floatingBtnRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else if (floatingBtnRef.current) {
      gsap.to(floatingBtnRef.current, {
        y: 100,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [showFloatingButton]);

  useEffect(() => {
    if (!floatingBtnRef.current) return;

    let intervalId = null;

    const attentionAnimation = () => {
      if (showFloatingButton) {
        gsap.to(floatingBtnRef.current, {
          scale: 1.1,
          duration: 0.5,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.to(floatingBtnRef.current, {
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
            });
          },
        });
      }
    };

    const initialTimeout = setTimeout(() => {
      attentionAnimation();
      intervalId = setInterval(attentionAnimation, 6000);
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [showFloatingButton]);

  // Hide the button on the contact page (after all hooks are called)
  if (location.pathname === '/contact') {
    return null;
  }

  return (
    <>
      <div
        ref={floatingBtnRef}
        className={`${styles.floatingButton} ${!isModalOpen ? styles.visible : styles.hidden}`}
        onClick={() => navigate('/contact')}
      >
        <svg

          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>CONNECT WITH US</span>
      </div>
    </>
  );
};

export default FloatingBookingButton;
