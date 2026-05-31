/**
 * Card component with dark surface background and subtle border.
 * Supports hover lift effect and optional accent border.
 */
export function Card({ children, className = '', accent = null, hover = true, padding = true }) {
  const accentBorders = {
    danger: 'border-l-4 border-l-[#e05c5c]',
    primary: 'border-l-4 border-l-[#4f8ef7]',
    warning: 'border-l-4 border-l-[#e8a838]',
    success: 'border-l-4 border-l-[#4caf82]',
  };

  return (
    <div
      className={`
        bg-[#1a1d27] border border-[#2e3248] rounded-lg
        ${padding ? 'p-6' : ''}
        ${hover ? 'transition-colors duration-200 hover:bg-[#22263a]' : ''}
        ${accent ? accentBorders[accent] || '' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
