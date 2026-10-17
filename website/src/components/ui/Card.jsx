/**
 * Card  -  clean architectural container with subtle hairline border and calm hover.
 * Zero fuzzy blue glows, true obsidian neutral surface.
 */
export function Card({ children, className = '', accent = null, hover = true, padding = true }) {
  const accentBorders = {
    danger: 'border-t-2 border-t-rose-500/80',
    primary: 'border-t-2 border-t-zinc-200/80',
    warning: 'border-t-2 border-t-amber-500/80',
    success: 'border-t-2 border-t-emerald-500/80',
  };

  const cardClasses = `
    relative overflow-hidden rounded-md bg-[#111114] border border-white/[0.08]
    ${padding ? 'p-6 md:p-7' : ''}
    ${accent ? accentBorders[accent] || '' : ''}
    ${hover ? 'transition-all duration-200 hover:border-white/20 hover:bg-[#141418]' : ''}
    ${className}
  `;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}

export default Card;

