/**
 * EvidenceStrip
 * Clean, de-boxed metric strip displaying the 3 primary empirical findings.
 * No card backgrounds, no gray border boxes. Pure typographic hierarchy.
 * Zero em dashes used.
 */
export default function EvidenceStrip() {
  const metrics = [
    {
      title: 'ROC-AUC Discrimination',
      inDomain: '0.838',
      inDomainSplit: 'Kaggle (N=1,533)',
      external: '0.713',
      externalSplit: 'NHANES (N=3,167)',
      delta: '-14.9%',
      caption: 'Logistic Regression discriminative capacity decreases under external transfer.',
      targetAnchor: '#evidence'
    },
    {
      title: 'Precision-Recall AUC (PR-AUC)',
      inDomain: '0.214',
      inDomainSplit: 'Kaggle (N=1,533)',
      external: '0.079',
      externalSplit: 'NHANES (N=3,167)',
      delta: '-63.1%',
      caption: 'Severe retrieval collapse toward the 0.041 NHANES target prevalence baseline.',
      targetAnchor: '#evidence'
    },
    {
      title: 'Domain-Classifier AUC',
      inDomain: '0.500',
      inDomainSplit: 'Theoretical null',
      external: '0.858',
      externalSplit: 'Random Forest (±0.014)',
      delta: 'p < 0.001',
      caption: 'Adversarial classifier easily separates the cohorts; label shift ruled out (p=0.149).',
      targetAnchor: '#dataset-shift'
    }
  ];

  const handleScrollTo = (anchor) => {
    if (window.__lenis) {
      window.__lenis.scrollTo(anchor, { offset: -70, duration: 1.1 });
    } else {
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 sm:py-18 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Open 3-Column Grid without Box Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              onClick={() => handleScrollTo(m.targetAnchor)}
              className="cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Metric Label */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#55635E] group-hover:text-[#1B5E54] transition-colors font-medium">
                    {m.title}
                  </span>
                  <span className="font-mono text-[11px] text-[#1B5E54] opacity-0 group-hover:opacity-100 transition-opacity">
                    Inspect →
                  </span>
                </div>

                {/* Numbers Row */}
                <div className="flex items-baseline gap-3 mb-2 font-mono">
                  <div>
                    <span className="text-3xl sm:text-4xl font-normal text-[#1B5E54] tracking-tight">
                      {m.inDomain}
                    </span>
                  </div>
                  <span className="text-[#9AA39E] text-xl">→</span>
                  <div>
                    <span className="text-3xl sm:text-4xl font-normal text-[#A33B20] tracking-tight">
                      {m.external}
                    </span>
                  </div>
                  <div className="ml-auto">
                    <span className="font-mono text-xs font-semibold text-[#A33B20] bg-[#FAF0EC] px-2 py-0.5 rounded-xs">
                      {m.delta}
                    </span>
                  </div>
                </div>

                {/* Caption Narrative */}
                <p className="text-xs sm:text-sm text-[#55635E] leading-relaxed mt-3">
                  {m.caption}
                </p>
              </div>

              {/* Sample Attribution */}
              <div className="text-[11px] text-[#9AA39E] font-mono mt-4 pt-3 border-t border-[#E2E0D8]">
                {m.inDomainSplit} vs {m.externalSplit}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
