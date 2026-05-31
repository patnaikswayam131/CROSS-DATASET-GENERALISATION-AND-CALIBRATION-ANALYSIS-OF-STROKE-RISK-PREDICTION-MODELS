import { useMouseParallax } from '../../hooks/useMouseParallax';

/**
 * GlassCard — frosted glass card with mouse-driven 3D parallax tilt.
 * Wraps children in a glassmorphism container.
 *
 * @param {{ children: React.ReactNode, className?: string, maxTilt?: number, accent?: string }} props
 */
export function GlassCard({ children, className = '', maxTilt = 8, accent = 'primary' }) {
  const { ref, onMouseMove, onMouseLeave } = useMouseParallax({ maxTilt, maxShift: 5 });

  const accentColors = {
    primary: 'rgba(79,142,247,0.18)',
    danger:  'rgba(224,92,92,0.18)',
    warning: 'rgba(232,168,56,0.18)',
    success: 'rgba(76,175,130,0.18)',
    neutral: 'rgba(139,144,164,0.12)',
  };

  const borderColors = {
    primary: 'rgba(79,142,247,0.25)',
    danger:  'rgba(224,92,92,0.25)',
    warning: 'rgba(232,168,56,0.25)',
    success: 'rgba(76,175,130,0.25)',
    neutral: 'rgba(139,144,164,0.18)',
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{
        background: 'rgba(26, 29, 39, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${borderColors[accent] || borderColors.neutral}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.06)`,
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare overlay */}
      <div
        data-glare="true"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl transition-all duration-300"
        style={{ background: 'transparent' }}
      />
      {/* Accent top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColors[accent]}, transparent)` }}
      />
      {/* Content */}
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
}

export default GlassCard;
