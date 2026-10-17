/**
 * MiniBarVisual  -  Swiss Editorial two-bar comparison for in-domain vs cross-domain.
 * Crisp rectangular bars, zero rounded-full bubbles.
 * @param {{ inDomain: number, crossDomain: number, label: string, maxValue: number }} props
 */
export function MiniBarVisual({ inDomain, crossDomain, label, maxValue = 0.3 }) {
  const inDomainWidth = (inDomain / maxValue) * 100;
  const crossDomainWidth = (crossDomain / maxValue) * 100;

  return (
    <div className="space-y-3 font-sans">
      {/* In-domain bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[11px] font-mono text-zinc-400 tracking-wider uppercase">In-Domain (Kaggle)</span>
          <span className="text-sm font-semibold font-mono text-zinc-100">
            {inDomain.toFixed(3)}
          </span>
        </div>
        <div className="w-full h-2.5 bg-[#09090b] rounded-[2px] overflow-hidden border border-white/[0.08]">
          <div
            className="h-full bg-zinc-400 transition-all duration-700 ease-out"
            style={{ width: `${inDomainWidth}%` }}
          />
        </div>
      </div>

      {/* Cross-domain bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[11px] font-mono text-rose-400 tracking-wider uppercase">Cross-Domain (NHANES)</span>
          <span className="text-sm font-semibold font-mono text-rose-400">
            {crossDomain.toFixed(3)}
          </span>
        </div>
        <div className="w-full h-2.5 bg-[#09090b] rounded-[2px] overflow-hidden border border-white/[0.08]">
          <div
            className="h-full bg-rose-500 transition-all duration-700 ease-out"
            style={{ width: `${crossDomainWidth}%` }}
          />
        </div>
      </div>

      {/* Label */}
      {label && <p className="text-[11px] font-mono text-zinc-400 text-center mt-2">{label}</p>}
    </div>
  );
}

export default MiniBarVisual;
