import { useState, useEffect } from 'react';

const QUERY = '(max-width: 768px)';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    // Initialise synchronously to avoid a flash of wrong state
    if (typeof window === 'undefined') return false;
    return window.matchMedia(QUERY).matches || 'ontouchstart' in window;
  });

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const handler = (e) => setIsMobile(e.matches || 'ontouchstart' in window);

    // Use the modern addEventListener if available, fall back to addListener
    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    } else {
      // Safari < 14 fallback
      mql.addListener(handler);
      return () => mql.removeListener(handler);
    }
  }, []);

  return isMobile;
};

export default useIsMobile;
