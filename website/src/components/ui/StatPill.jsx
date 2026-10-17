/**
 * StatPill  -  crisp technical parameter tag with solid indicator dot.
 * @param {{ text: string, color: 'danger'|'primary'|'neutral'|'success'|'warning' }} props
 */
export function StatPill({ text, color = 'neutral' }) {
  const styles = {
    danger: {
      bg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      dot: 'bg-rose-500',
    },
    primary: {
      bg: 'bg-white/[0.06] text-zinc-200 border-white/20',
      dot: 'bg-zinc-300',
    },
    neutral: {
      bg: 'bg-white/[0.03] text-zinc-400 border-white/[0.08]',
      dot: 'bg-zinc-500',
    },
    success: {
      bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      dot: 'bg-emerald-500',
    },
    warning: {
      bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      dot: 'bg-amber-500',
    },
  };

  const current = styles[color] || styles.neutral;

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] text-xs font-mono 
        border select-none ${current.bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
      <span>{text}</span>
    </span>
  );
}

export default StatPill;

