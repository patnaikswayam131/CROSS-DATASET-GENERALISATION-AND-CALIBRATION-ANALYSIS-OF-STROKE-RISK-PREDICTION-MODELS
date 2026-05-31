/**
 * Button component with primary, secondary, and disabled variants.
 * Supports tooltip for disabled state.
 */
export function Button({ 
  variant = 'primary', 
  children, 
  href = '#', 
  disabled = false, 
  tooltip = '', 
  onClick,
  className = '',
  icon = null,
}) {
  const variants = {
    primary: disabled
      ? 'bg-[#4f8ef7]/30 text-[#8b90a4] cursor-not-allowed'
      : 'bg-[#4f8ef7] text-white hover:bg-[#3a6fd4] active:bg-[#2d5ab8]',
    secondary: disabled
      ? 'border border-[#2e3248] text-[#8b90a4] cursor-not-allowed'
      : 'border border-[#4f8ef7]/50 text-[#4f8ef7] hover:bg-[#4f8ef7]/10 hover:border-[#4f8ef7] active:bg-[#4f8ef7]/20',
  };

  const baseClasses = `
    inline-flex items-center gap-2 px-5 py-2.5 rounded-lg 
    font-medium text-sm transition-all duration-200
    ${variants[variant] || variants.primary}
    ${className}
  `;

  const content = (
    <>
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </>
  );

  if (disabled) {
    return (
      <div className="relative group inline-block">
        <span className={baseClasses}>
          {content}
        </span>
        {tooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 
            bg-[#22263a] border border-[#2e3248] text-[#e8eaf0] text-xs rounded-lg
            opacity-0 group-hover:opacity-100 transition-opacity duration-200 
            whitespace-nowrap pointer-events-none z-10">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 
              border-4 border-transparent border-t-[#22263a]" />
          </div>
        )}
      </div>
    );
  }

  if (href && href !== '#') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}

export default Button;
