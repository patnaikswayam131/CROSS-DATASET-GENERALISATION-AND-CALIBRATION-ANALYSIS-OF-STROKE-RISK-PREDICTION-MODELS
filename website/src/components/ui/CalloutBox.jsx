/**
 * CalloutBox  -  Swiss Editorial scientific takeaway annotation.
 * Crisp 1px border, 3px indicator edge, obsidian background, zero bubbly corners.
 * @param {{ children: React.ReactNode, variant: 'danger'|'primary'|'warning'|'success', className: string }} props
 */
export function CalloutBox({ children, variant = 'danger', className = '' }) {
  const styles = {
    danger: {
      border: 'border-l-rose-500',
      bg: 'bg-rose-500/[0.04]',
      badge: 'text-rose-400',
      label: 'CRITICAL STATISTICAL FINDING',
    },
    primary: {
      border: 'border-l-zinc-200',
      bg: 'bg-white/[0.03]',
      badge: 'text-zinc-300',
      label: 'ABLATION TAKEAWAY',
    },
    warning: {
      border: 'border-l-amber-500',
      bg: 'bg-amber-500/[0.04]',
      badge: 'text-amber-400',
      label: 'COVARIATE MISMATCH NOTE',
    },
    success: {
      border: 'border-l-emerald-500',
      bg: 'bg-emerald-500/[0.04]',
      badge: 'text-emerald-400',
      label: 'VERIFICATION PASSED',
    },
  };

  const current = styles[variant] || styles.danger;

  return (
    <div
      className={`
        bg-[#111114] border border-white/[0.08] border-l-2
        ${current.border}
        rounded-md p-5
        ${className}
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${current.badge}`}>
          [ {current.label} ]
        </span>
      </div>
      <div className="text-sm text-zinc-300 leading-relaxed font-sans">
        {children}
      </div>
    </div>
  );
}

export default CalloutBox;
