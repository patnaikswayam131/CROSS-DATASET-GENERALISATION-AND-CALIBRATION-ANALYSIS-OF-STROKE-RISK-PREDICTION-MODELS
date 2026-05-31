import { GlassCard } from '../ui/GlassCard';

/**
 * ResearchGaps — Section 3 of the manuscript.
 * Motivation + three specific unaddressed gaps.
 */

const GAPS = [
  {
    id: 'gap1',
    number: 'Gap 1',
    accent: 'danger',
    title: 'No Cross-Population External Validation',
    body: 'No prior study has evaluated Kaggle-trained stroke models against a nationally representative independent population survey. Even large-scale cohort studies (Chun et al., 2021; Huang & Liu, 2025) evaluate only within the development population. Held-out in-distribution evaluation cannot determine whether learned patterns transfer to populations with different demographics, sampling methods, or clinical measurement protocols.',
    highlight: 'Held-out accuracy ≠ external validity',
  },
  {
    id: 'gap2',
    number: 'Gap 2',
    accent: 'warning',
    title: 'ROC-AUC Dominates Despite Known Limitations',
    body: 'ROC-AUC dominates evaluation in this field, yet under severe class imbalance it is well established that ROC-AUC masks substantial minority-class detection failure (Salmi et al., 2024; Sheetal et al., 2025). For classifiers operating at 4–5% stroke prevalence, PR-AUC offers a more clinically meaningful criterion — and studies reporting both metrics find that rankings and conclusions can differ markedly.',
    highlight: 'PR-AUC is the appropriate metric for rare-event tasks',
  },
  {
    id: 'gap3',
    number: 'Gap 3',
    accent: 'primary',
    title: 'Measurement Protocol Mismatches Treated as Administrative Details',
    body: 'Measurement protocol differences between datasets are routinely treated as administrative details rather than scientific confounds. The glucose variable demonstrates this risk: NHANES records fasting plasma glucose under standardised conditions, while Kaggle\'s average glucose level is of unspecified collection type. The resulting PSI of 1.495 cannot be remediated by any adaptation technique and must be documented as a primary confound rather than corrected.',
    highlight: 'PSI = 1.495 for glucose — not correctable, must be documented',
  },
];

export function ResearchGaps() {
  return (
    <section id="gaps" className="max-w-7xl py-20 px-6 mx-auto">
      {/* Section label */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4f8ef7] mb-3">
        Motivation & Research Gaps
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-4">
        What Remains Unaddressed
      </h2>

      {/* Motivation callout */}
      <div
        className="rounded-xl p-6 mb-12 max-w-4xl"
        style={{
          background: 'rgba(79,142,247,0.06)',
          border: '1px solid rgba(79,142,247,0.20)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <h3 className="text-base font-semibold text-[#e8eaf0] mb-2">Motivation</h3>
        <p className="text-sm text-[#8b90a4] leading-relaxed">
          Models trained on the Kaggle Stroke Prediction Dataset have shown ROC-AUC scores up to 0.98.
          These figures are cited as supporting evidence for clinical utility — but such metrics cannot
          determine if learned decision boundaries are valid beyond the training distribution. Clinical
          decision support systems encounter patients with different demographic compositions, measurement
          instruments, and institutional practices. This gap between controlled benchmark evaluation and
          real-world deployment motivates a direct empirical test of generalisation on an independent,
          nationally representative cohort.
        </p>
      </div>

      {/* Gap cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GAPS.map((gap) => (
          <GlassCard key={gap.id} accent={gap.accent} maxTilt={6}>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs font-mono font-semibold px-2 py-0.5 rounded"
                style={{
                  background: gap.accent === 'danger' ? 'rgba(224,92,92,0.15)' :
                              gap.accent === 'warning' ? 'rgba(232,168,56,0.15)' :
                              'rgba(79,142,247,0.15)',
                  color: gap.accent === 'danger' ? '#e05c5c' :
                         gap.accent === 'warning' ? '#e8a838' :
                         '#4f8ef7',
                }}
              >
                {gap.number}
              </span>
            </div>
            <h3 className="text-base font-semibold text-[#e8eaf0] mb-3 leading-snug">{gap.title}</h3>
            <p className="text-sm text-[#8b90a4] leading-relaxed mb-4">{gap.body}</p>
            <div
              className="text-xs font-medium px-3 py-2 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#e8eaf0',
              }}
            >
              → {gap.highlight}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export default ResearchGaps;
