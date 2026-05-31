/**
 * Badge component for severity, status, and tag indicators.
 * Variants: 'severe' (red), 'moderate' (amber), 'stable' (green), 
 * 'primary' (blue), 'warning' (amber), 'neutral' (grey), 'danger' (red)
 */
export function Badge({ variant = 'neutral', children, className = '' }) {
  const variants = {
    severe: 'bg-[#e05c5c]/15 text-[#e05c5c] border-[#e05c5c]/30',
    danger: 'bg-[#e05c5c]/15 text-[#e05c5c] border-[#e05c5c]/30',
    moderate: 'bg-[#e8a838]/15 text-[#e8a838] border-[#e8a838]/30',
    warning: 'bg-[#e8a838]/15 text-[#e8a838] border-[#e8a838]/30',
    stable: 'bg-[#4caf82]/15 text-[#4caf82] border-[#4caf82]/30',
    success: 'bg-[#4caf82]/15 text-[#4caf82] border-[#4caf82]/30',
    primary: 'bg-[#4f8ef7]/15 text-[#4f8ef7] border-[#4f8ef7]/30',
    neutral: 'bg-[#8b90a4]/15 text-[#8b90a4] border-[#8b90a4]/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide ${variants[variant] || variants.neutral} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
