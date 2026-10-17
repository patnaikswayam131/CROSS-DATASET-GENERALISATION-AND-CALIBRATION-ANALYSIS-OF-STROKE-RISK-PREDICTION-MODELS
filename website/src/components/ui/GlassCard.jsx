/**
 * GlassCard  -  Swiss Editorial scientific surface card with crisp hairlines.
 * Free of bubbly corners and neon halos, providing a precise, monograph-grade presentation.
 *
 * @param {{ children: React.ReactNode, className?: string, accent?: string }} props
 */
export function GlassCard({ children, className = '', accent = 'neutral' }) {
  const borderColors = {
    primary: 'border-white/[0.12] hover:border-white/25',
    danger:  'border-rose-500/30 hover:border-rose-500/50',
    warning: 'border-amber-500/30 hover:border-amber-500/50',
    success: 'border-emerald-500/30 hover:border-emerald-500/50',
    neutral: 'border-white/[0.08] hover:border-white/20',
  };

  const topAccents = {
    primary: 'bg-white/20',
    danger:  'bg-rose-500',
    warning: 'bg-amber-500',
    success: 'bg-emerald-500',
    neutral: 'bg-white/10',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-md bg-[#111114] border transition-all duration-150 hover:bg-[#141418] ${borderColors[accent] || borderColors.neutral} ${className}`}
    >
      {/* Subtle top edge accent hairline */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[1.5px] ${topAccents[accent] || topAccents.neutral}`}
      />
      {/* Content */}
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
}

export default GlassCard;
