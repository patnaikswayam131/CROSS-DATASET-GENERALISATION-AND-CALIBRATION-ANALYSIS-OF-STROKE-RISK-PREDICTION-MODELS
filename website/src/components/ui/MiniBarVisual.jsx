/**
 * MiniBarVisual — two-bar comparison for in-domain vs cross-domain.
 * Used in the Hero section to visually show PR-AUC collapse.
 * @param {{ inDomain: number, crossDomain: number, label: string, maxValue: number }} props
 */
export function MiniBarVisual({ inDomain, crossDomain, label, maxValue = 0.3 }) {
  const inDomainWidth = (inDomain / maxValue) * 100;
  const crossDomainWidth = (crossDomain / maxValue) * 100;

  return (
    <div className="space-y-3">
      {/* In-domain bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-[#8b90a4] tracking-wide uppercase">In-Domain (Kaggle)</span>
          <span className="text-sm font-semibold text-[#4f8ef7]" style={{ fontFamily: 'var(--font-mono)' }}>
            {inDomain.toFixed(3)}
          </span>
        </div>
        <div className="w-full h-3 bg-[#1a1d27] rounded-full overflow-hidden border border-[#2e3248]">
          <div
            className="h-full rounded-full bg-[#4f8ef7] transition-all duration-1000 ease-out"
            style={{ width: `${inDomainWidth}%` }}
          />
        </div>
      </div>

      {/* Cross-domain bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-[#8b90a4] tracking-wide uppercase">Cross-Domain (NHANES)</span>
          <span className="text-sm font-semibold text-[#e05c5c]" style={{ fontFamily: 'var(--font-mono)' }}>
            {crossDomain.toFixed(3)}
          </span>
        </div>
        <div className="w-full h-3 bg-[#1a1d27] rounded-full overflow-hidden border border-[#2e3248]">
          <div
            className="h-full rounded-full bg-[#e05c5c] transition-all duration-1000 ease-out"
            style={{ width: `${crossDomainWidth}%` }}
          />
        </div>
      </div>

      {/* Label */}
      <p className="text-xs text-[#8b90a4] text-center mt-2">{label}</p>
    </div>
  );
}

export default MiniBarVisual;
