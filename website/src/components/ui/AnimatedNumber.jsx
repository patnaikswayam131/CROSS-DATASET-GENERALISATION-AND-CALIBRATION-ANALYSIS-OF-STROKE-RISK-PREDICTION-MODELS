import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * AnimatedNumber  -  counts up from 0 to target value on scroll.
 * @param {{ value: number, duration: number, suffix: string, prefix: string, decimals: number }} props
 */
export function AnimatedNumber({ value, duration = 1500, suffix = '', prefix = '', decimals = 0 }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(eased * value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, value, duration]);

  return (
    <span ref={ref} className="mono font-bold tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
      {prefix}{displayValue.toFixed(decimals)}{suffix}
    </span>
  );
}

export default AnimatedNumber;
