/**
 * ConclusionFuture  -  Section 6 & 7 of the manuscript.
 * Swiss Editorial synthesis: Empirical conclusions + future research directions.
 */

const CONCLUSIONS = [
  {
    number: '01',
    title: 'External Validation Is Non-Negotiable',
    body: 'In-domain hold-out evaluation is fundamentally insufficient to establish clinical applicability. External validation against an independent, population-representative dataset is a necessary condition  -  not an optional supplement.',
    stat: '12–15%',
    statLabel: 'ROC-AUC absolute decline',
    highlight: false,
  },
  {
    number: '02',
    title: 'Report PR-AUC as Primary Metric',
    body: 'PR-AUC must be reported as the primary metric for rare-event prediction tasks. It is sensitive to minority-class detection collapse under domain shift while ROC-AUC is not  -  and the 51–63% PR-AUC collapse is entirely invisible to ROC-AUC analysis alone.',
    stat: '51–63%',
    statLabel: 'PR-AUC catastrophic collapse',
    highlight: true,
  },
  {
    number: '03',
    title: 'Document Measurement Protocols Rigorously',
    body: 'Feature-level measurement provenance  -  specifying the exact clinical protocol for every variable  -  is a methodological prerequisite for valid cross-dataset comparisons. The glucose PSI of 1.495 reflects a definitional mismatch that no statistical adaptation can remediate.',
    stat: 'PSI 1.495',
    statLabel: 'Measurement protocol shift',
    highlight: false,
  },
];

const FUTURE_DIRECTIONS = [
  {
    number: '01',
    title: 'Broader Population Cohort Coverage',
    body: 'Extend the NHANES cohort extraction to include non-fasting participants and secondary health surveys (e.g., UK Biobank, BRFSS), testing cross-domain failure patterns across wider multi-ethnic demographic strata.',
  },
  {
    number: '02',
    title: 'Standardised Feature Provenance Protocol',
    body: 'Develop a structured ontology formally mapping clinical measurement protocols across widely used cardiovascular benchmarks  -  enabling reproducible, scientifically verifiable cross-dataset evaluations.',
  },
  {
    number: '03',
    title: 'Representation-Level Domain Adaptation',
    body: 'Given that post-hoc calibration fails under concept shift, explore representation-level domain adaptation (density ratio estimation, kernel mean matching, and adversarial feature alignment) without requiring target outcome labels.',
  },
  {
    number: '04',
    title: 'Causal Invariance & Structural Stability',
    body: 'Apply invariant causal prediction (Subbaswamy & Saria, 2020) to identify feature subsets whose conditional relationship with stroke outcomes remains invariant across populations  -  constructing models that generalise by design.',
  },
];

export function ConclusionFuture() {
  return (
    <section id="conclusion" className="py-24 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl px-6 mx-auto">
        {/* ── Conclusion Header ── */}
        <div className="mb-14">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
            11 / SYNTHESIS & FUTURE RESEARCH
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            What This Study Demonstrates
          </h2>
          <p className="text-sm text-zinc-400 max-w-3xl mt-3 leading-relaxed">
            Classifiers trained on curated hospital EHR benchmarks exhibit statistically significant 
            and clinically consequential degradation when evaluated zero-shot against CDC national surveillance data. 
            Empirical feature-patching confirms concurrent concept shift, and post-hoc calibration fails to restore reliability.
          </p>
        </div>

        {/* Conclusion panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {CONCLUSIONS.map((c) => (
            <div
              key={c.number}
              className={`p-7 rounded-md border flex flex-col justify-between ${
                c.highlight 
                  ? 'bg-rose-500/[0.04] border-rose-500/30' 
                  : 'bg-[#111114] border-white/[0.08]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-5 pb-4 border-b border-white/[0.08]">
                  <span className="text-xs font-mono text-zinc-400">
                    FINDING {c.number}
                  </span>
                  <div className="text-right">
                    <p className={`text-xl font-bold font-mono ${c.highlight ? 'text-rose-400' : 'text-zinc-100'}`}>
                      {c.stat}
                    </p>
                    <p className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">{c.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-3">{c.title}</h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Future Work ── */}
        <div className="pt-12 border-t border-white/[0.08]">
          <div className="mb-10">
            <span className="text-xs font-mono tracking-widest uppercase text-zinc-400 block mb-2">
              ROADMAP · CLINICAL BENCHMARKING
            </span>
            <h3 className="text-2xl font-semibold text-zinc-100">
              Open Research Directions
            </h3>
            <p className="text-sm text-zinc-400 max-w-2xl mt-2 leading-relaxed">
              These findings motivate a standard where clinical prediction algorithms are audited with the rigor 
              of prospective clinical trials  -  where external domain validation is mandatory prior to deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FUTURE_DIRECTIONS.map((dir) => (
              <div
                key={dir.title}
                className="p-6 rounded-md bg-[#111114] border border-white/[0.08]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-zinc-400 px-2 py-0.5 rounded-[2px] bg-white/[0.04] border border-white/[0.06]">
                    {dir.number}
                  </span>
                  <h4 className="text-sm font-semibold text-zinc-200">{dir.title}</h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{dir.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConclusionFuture;
