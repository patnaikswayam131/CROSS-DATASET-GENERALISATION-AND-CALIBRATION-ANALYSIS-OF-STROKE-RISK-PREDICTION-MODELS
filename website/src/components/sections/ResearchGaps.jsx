/**
 * ResearchGaps  -  Section 3 of the manuscript.
 * Motivation + three specific unaddressed gaps.
 * Formatted as an editorial research ledger with clean typographic columns.
 */

const GAPS = [
  {
    id: 'gap1',
    number: '01',
    accent: 'rose',
    title: 'Absence of Independent Population Validation',
    body: 'No prior study has evaluated Kaggle-trained stroke models against a nationally representative independent population survey. Even large-scale cohort studies evaluate only within their development population. Held-out in-distribution evaluation cannot determine whether learned patterns transfer across differing demographics, sampling designs, or clinical collection protocols.',
    highlight: 'Held-out accuracy ≠ external validity',
  },
  {
    id: 'gap2',
    number: '02',
    accent: 'amber',
    title: 'Misleading Reliance on ROC-AUC for Imbalanced Outcomes',
    body: 'ROC-AUC dominates evaluation in this literature, yet under severe class imbalance (~4–5% stroke prevalence) it masks catastrophic minority-class detection failure. High true negative counts artificially inflate ROC-AUC (0.81–0.84), concealing that precision and recall on actual stroke cases collapse by more than half upon domain transfer.',
    highlight: 'PR-AUC is the decisive clinical metric',
  },
  {
    id: 'gap3',
    number: '03',
    accent: 'zinc',
    title: 'Protocol Incompatibilities Dismissed as Administrative Details',
    body: 'Feature measurement protocol mismatches are routinely ignored or swept under generic feature harmonization. The glucose variable highlights this critical flaw: NHANES enforces strict fasting morning plasma (LBXGLU), while Kaggle uses unspecified readings. The resulting severe shift (PSI = 1.495) represents an irremediable definitional confound.',
    highlight: 'Glucose PSI = 1.495 is irremediable',
  },
];

export function ResearchGaps() {
  return (
    <div className="max-w-7xl py-20 px-6 mx-auto border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-400 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
        <span>03 / UNADDRESSED RESEARCH GAPS</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight max-w-2xl">
          Three critical methodological blindspots in the stroke prediction literature
        </h2>
        <p className="text-sm text-zinc-400 max-w-md font-mono">
          Manuscript Section 3 analysis comparing held-out benchmark assumptions against real-world epidemiologic deployment.
        </p>
      </div>

      {/* Motivation Callout  -  Clean Editorial Banner */}
      <div className="p-6 rounded-md bg-[#111114] border border-white/[0.08] mb-12">
        <div className="flex items-start gap-4">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mt-1">
            Motivation
          </span>
          <p className="text-sm text-zinc-300 leading-relaxed max-w-4xl font-normal">
            Models trained on the Kaggle Stroke Prediction Dataset have frequently reported ROC-AUC scores exceeding 0.84 to 0.98, 
            which are repeatedly cited as evidence for clinical deployment readiness. 
            However, clinical decision support tools encounter patient populations with fundamentally different age distributions, 
            co-morbidity rates, and laboratory measurement protocols. This study provides the first systematic empirical test of 
            external generalisation against an independent national survey cohort (NHANES 2021–2023).
          </p>
        </div>
      </div>

      {/* 3 Editorial Columns with Fine Dividing Borders (Not generic boxed cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {GAPS.map((gap, index) => (
          <div 
            key={gap.id} 
            className="flex flex-col justify-between border-t border-white/[0.12] pt-6"
          >
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-3xl font-mono font-bold text-zinc-600">
                  {gap.number}
                </span>
                <span className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded-[2px] border ${
                  gap.accent === 'rose' 
                    ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
                    : gap.accent === 'amber'
                      ? 'text-amber-300 border-amber-500/30 bg-amber-500/10'
                      : 'text-zinc-300 border-white/20 bg-white/5'
                }`}>
                  Critical Gap
                </span>
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-3 leading-snug">
                {gap.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                {gap.body}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] text-xs font-mono text-zinc-300 flex items-center gap-2">
              <span className="text-zinc-500">→</span>
              <span>{gap.highlight}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResearchGaps;
