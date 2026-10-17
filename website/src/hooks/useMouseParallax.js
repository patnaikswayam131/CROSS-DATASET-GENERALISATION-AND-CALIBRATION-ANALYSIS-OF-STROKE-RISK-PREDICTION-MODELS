import { useRef, useCallback } from 'react';

/**
 * useMouseParallax  -  returns an event handler and ref that adds a subtle 3D tilt
 * and translation effect to a card element based on mouse position.
 *
 * @param {Object} options
 * @param {number} options.maxTilt  - Max tilt in degrees (default 8)
 * @param {number} options.maxShift - Max translate in px (default 6)
 * @returns {{ ref: React.RefObject, onMouseMove: Function, onMouseLeave: Function }}
 */
export function useMouseParallax({ maxTilt = 8, maxShift = 6 } = {}) {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Normalized -1 to +1
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);

      const rotateX = (-ny * maxTilt).toFixed(2);
      const rotateY = (nx * maxTilt).toFixed(2);
      const tx = (nx * maxShift).toFixed(2);
      const ty = (ny * maxShift).toFixed(2);

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${tx}px, ${ty}px)`;
      el.style.transition = 'transform 0.05s linear';

      // Subtle glare shift
      const glare = el.querySelector('[data-glare]');
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${50 + nx * 30}% ${50 + ny * 30}%, rgba(79,142,247,0.12) 0%, transparent 60%)`;
      }
    },
    [maxTilt, maxShift]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translate(0px,0px)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';

    const glare = el.querySelector('[data-glare]');
    if (glare) {
      glare.style.background = 'transparent';
    }
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

export default useMouseParallax;
