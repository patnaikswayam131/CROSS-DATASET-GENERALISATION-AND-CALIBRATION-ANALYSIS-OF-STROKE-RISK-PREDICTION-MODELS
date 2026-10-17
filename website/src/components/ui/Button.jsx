import { motion } from 'motion/react';

/**
 * Button component with primary, secondary, and ghost variants.
 * Features smooth spring micro-interactions (hover, tap) and disabled tooltip.
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
      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
      : 'bg-white text-zinc-950 hover:bg-zinc-200 active:bg-zinc-300 font-semibold border border-transparent transition-all shadow-sm',
    secondary: disabled
      ? 'border border-white/5 text-zinc-600 cursor-not-allowed bg-transparent'
      : 'border border-white/15 bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08] hover:border-white/25 hover:text-white transition-all',
    ghost: disabled
      ? 'text-zinc-600 cursor-not-allowed'
      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all',
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md
    font-medium text-xs tracking-wide transition-all duration-150 cursor-pointer select-none
    ${variants[variant] || variants.primary}
    ${className}
  `;

  const content = (
    <>
      {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
      <span>{children}</span>
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
            bg-[#1e2235] border border-[#2e3248] text-[#e8eaf0] text-xs rounded-lg
            opacity-0 group-hover:opacity-100 transition-all duration-200 
            whitespace-nowrap pointer-events-none z-20 shadow-xl">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 
              border-4 border-transparent border-t-[#1e2235]" />
          </div>
        )}
      </div>
    );
  }

  if (href && href !== '#' && !href.startsWith('#')) {
    return (
      <motion.a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={baseClasses}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {content}
      </motion.a>
    );
  }

  if (href && href.startsWith('#')) {
    return (
      <motion.a 
        href={href} 
        className={baseClasses}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button 
      onClick={onClick} 
      className={baseClasses}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {content}
    </motion.button>
  );
}

export default Button;
