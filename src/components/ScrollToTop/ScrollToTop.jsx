import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenisInitialized = useRef(false);

  useEffect(() => {
    const scrollToTop = () => {
      if (window.lenis) {
        try {
          window.lenis.scrollTo(0, { immediate: true });
          lenisInitialized.current = true;
          return true;
        } catch (e) {
          console.warn('Lenis scroll failed, falling back to native scroll');
        }
      }

      window.scrollTo(0, 0);
      return false;
    };

    const success = scrollToTop();

    if (!success && !lenisInitialized.current) {
      const observer = new MutationObserver(() => {
        if (window.lenis) {
          scrollToTop();
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      const timeoutId = setTimeout(() => {
        scrollToTop();
        observer.disconnect();
      }, 500);

      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
      };
    }
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
