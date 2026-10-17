/**
 * EvidenceStrip
 * Quiet ruled strip displaying the 3 critical empirical findings.
 * Includes interactive smooth-scroll navigation and tactile hover states.
 * No floating cards, no trophy wall, zero em dashes.
 */
export default function EvidenceStrip() {
  const metrics = [
    {
      title: 'Logistic Regression ROC-AUC',
      inDomain: '0.838',
      inDomainSplit: 'Kaggle test (N=1,533)',
      external: '0.713',
      externalSplit: 'NHANES (N=3,167)',
      delta: '-0.125 (-14.9%)',
      caption: 'Discrimination decreases under external evaluation.',
      targetAnchor: '#evidence'
    },
    {
      title: 'Precision-Recall AUC (PR-AUC)',
      inDomain: '0.214',
      inDomainSplit: 'Kaggle test (N=1,533)',
      external: '0.079',
      externalSplit: 'NHANES (N=3,167)',
      delta: '-0.135 (-63.1%)',
      caption: 'Precision-recall drops toward the 0.041 NHANES prevalence baseline.',
      targetAnchor: '#evidence'
    },
    {
      title: 'Domain-Classifier AUC',
      inDomain: 'N/A',
      inDomainSplit: 'Within-source baseline',
      external: '0.858',
      externalSplit: '5-fold CV (±0.014)',
      delta: 'AUC = 0.858',
      caption: 'Measured features readily distinguish the two cohorts.',
      targetAnchor: '#dataset-shift'
    }
  ];

  const handleScrollTo = (anchor) => {
    if (window.__lenis) {
      window.__lenis.scrollTo(anchor, { offset: -60, duration: 1.15 });
    } else {
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#FCFBF7] border-b border-[#C9D0C6] py-8 sm:py-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#C9D0C6]">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              onClick={() => handleScrollTo(m.targetAnchor)}
              className={`pt-6 md:pt-0 ${idx === 0 ? 'md:pr-8' : idx === 1 ? 'md:px-8' : 'md:pl-8'} ${
                idx > 0 ? 'mt-6 md:mt-0' : ''
              } group cursor-pointer transition-colors p-2 rounded-xs hover:bg-[#F5F3EB]`}
            >
              {/* Measure Label with interactive indicator */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#4D5D57] group-hover:text-[#23645A] transition-colors">
                  {m.title}
                </span>
                <span className="font-mono text-[10px] text-[#23645A] opacity-0 group-hover:opacity-100 transition-opacity">
                  Inspect section →
                </span>
              </div>

              {/* Numbers Row */}
              <div className="flex items-baseline gap-4 mb-2">
                <div>
                  <span className="text-[11px] font-mono text-[#4D5D57] block">In-domain</span>
                  <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#23645A]">
                    {m.inDomain}
                  </span>
                </div>
                <div className="text-[#858E88] font-mono text-lg">→</div>
                <div>
                  <span className="text-[11px] font-mono text-[#4D5D57] block">External</span>
                  <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#994524]">
                    {m.external}
                  </span>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-[10px] font-mono uppercase text-[#4D5D57] block">Change</span>
                  <span className="font-mono text-xs font-medium text-[#994524] bg-[#F3E6DE] px-1.5 py-0.5 rounded-xs inline-block">
                    {m.delta}
                  </span>
                </div>
              </div>

              {/* Context and Caption */}
              <p className="text-xs text-[#172B29] leading-relaxed mb-1">
                {m.caption}
              </p>
              <div className="text-[11px] text-[#4D5D57] font-mono">
                {m.inDomainSplit} vs {m.externalSplit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
