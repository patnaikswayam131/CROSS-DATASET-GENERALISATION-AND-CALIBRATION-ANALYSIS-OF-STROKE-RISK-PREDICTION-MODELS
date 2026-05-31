/**
 * StatPill — coloured stat indicators for the hero section.
 * @param {{ text: string, color: 'danger'|'primary'|'neutral' }} props
 */
export function StatPill({ text, color = 'neutral' }) {
  const colors = {
    danger: 'bg-[#e05c5c]/10 text-[#e05c5c] border-[#e05c5c]/25',
    primary: 'bg-[#4f8ef7]/10 text-[#4f8ef7] border-[#4f8ef7]/25',
    neutral: 'bg-[#8b90a4]/10 text-[#8b90a4] border-[#8b90a4]/25',
    success: 'bg-[#4caf82]/10 text-[#4caf82] border-[#4caf82]/25',
    warning: 'bg-[#e8a838]/10 text-[#e8a838] border-[#e8a838]/25',
  };

  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium 
        border tracking-wide ${colors[color] || colors.neutral}`}
    >
      {text}
    </span>
  );
}

export default StatPill;
