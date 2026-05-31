import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that triggers a callback when an element scrolls into view.
 * Used for count-up animations and fade-in effects.
 * @param {Object} options - IntersectionObserver options
 * @param {number} [options.threshold=0.2] - Visibility threshold
 * @param {string} [options.rootMargin='0px'] - Root margin
 * @param {boolean} [options.triggerOnce=true] - Only trigger once
 * @returns {[React.RefObject, boolean]} - [ref to attach to element, isVisible]
 */
export function useScrollAnimation({ threshold = 0.2, rootMargin = '0px', triggerOnce = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

export default useScrollAnimation;
