/**
 * Badge  -  crisp technical metadata tag.
 * Clean geometric borders (3px radius), monospace tracking, zero neon glow.
 * Variants: 'severe' / 'danger', 'moderate' / 'warning', 'stable' / 'success', 'primary', 'neutral'.
 */
export function Badge({ variant = 'neutral', children, className = '', showDot = true }) {
  const variants = {
    severe: {
      wrap: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      dot: 'bg-rose-500',
    },
    danger: {
      wrap: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      dot: 'bg-rose-500',
    },
    moderate: {
      wrap: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      dot: 'bg-amber-500',
    },
    warning: {
      wrap: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      dot: 'bg-amber-500',
    },
    stable: {
      wrap: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      dot: 'bg-emerald-500',
    },
    success: {
      wrap: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      dot: 'bg-emerald-500',
    },
    primary: {
      wrap: 'bg-zinc-100/10 text-zinc-200 border-white/20',
      dot: 'bg-zinc-200',
    },
    neutral: {
      wrap: 'bg-white/[0.04] text-zinc-400 border-white/[0.08]',
      dot: 'bg-zinc-500',
    },
  };

  const style = variants[variant] || variants.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] text-[11px] font-mono tracking-wider uppercase border select-none ${style.wrap} ${className}`}
    >
      {showDot && <span className={`h-1 w-1 rounded-full ${style.dot}`} />}
      <span>{children}</span>
    </span>
  );
}

export default Badge;

