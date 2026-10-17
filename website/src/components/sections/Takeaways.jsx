import { takeawayCards } from '../../data/projectData';

/**
 * Takeaways  -  Editorial Research Thesis Ledger.
 * Replaces repetitive cards with an elegant horizontal architectural thesis ledger.
 */
export function Takeaways() {
  return (
    <section id="takeaways" className="py-24 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
            10 / SCIENTIFIC CONTRIBUTIONS & IMPLICATIONS
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            What This Research Establishes
          </h2>
          <p className="text-sm text-zinc-400 max-w-3xl mt-3 leading-relaxed">
            Three fundamental methodological principles derived from empirical cross-dataset analysis 
            for the deployment of clinical risk prediction algorithms.
          </p>
        </div>

        {/* Editorial Architectural Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {takeawayCards.map((card, index) => (
            <div
              key={card.title}
              className="pt-6 border-t border-white/[0.12] flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-mono text-zinc-600 font-light block mb-4">
                  0{index + 1}
                </span>
                <h3 className="text-lg font-semibold text-zinc-100 mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                  {card.body}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.04]">
                <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                  {index === 0 && 'CORE FINDING · SEC. 5.1'}
                  {index === 1 && 'METRIC SELECTION · SEC. 5.2'}
                  {index === 2 && 'DATA PROVENANCE · SEC. 5.3'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Takeaways;
