import { GlassCard } from '../ui/GlassCard';

/**
 * ConclusionFuture — Section 6 & 7 of the manuscript.
 * Conclusion findings + future research directions.
 */

const CONCLUSIONS = [
  {
    number: '01',
    accent: 'danger',
    title: 'External Validation Is Non-Negotiable',
    body: 'In-domain hold-out evaluation is insufficient to establish clinical applicability. External validation against an independent, population-representative dataset is a necessary condition — not an optional supplement.',
    stat: '12–15%',
    statLabel: 'ROC-AUC decline',
  },
  {
    number: '02',
    accent: 'warning',
    title: 'Report PR-AUC as Primary Metric',
    body: 'PR-AUC should be reported as the primary metric for rare-event prediction tasks. It is sensitive to the failure mode that domain shift induces while ROC-AUC is not — and the 51–63% PR-AUC collapse is entirely invisible to ROC-AUC analysis alone.',
    stat: '51–63%',
    statLabel: 'PR-AUC collapse',
  },
  {
    number: '03',
    accent: 'primary',
    title: 'Document Measurement Protocols Rigorously',
    body: 'Feature-level measurement documentation — specifying the exact measurement protocol for every variable — is a methodological prerequisite for valid cross-dataset comparisons. The glucose PSI of 1.495 reflects a definitional mismatch that no adaptation technique can remediate.',
    stat: 'PSI 1.495',
    statLabel: 'glucose shift (irremediable)',
  },
];

const FUTURE_DIRECTIONS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#4f8ef7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Broader Cohort Coverage',
    body: 'Extend the NHANES cohort to include non-fasting participants and alternative surveys, exposing cross-domain failure patterns across more diverse demographics and measurement contexts.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#e8a838" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: 'Feature Provenance Protocol',
    body: 'Develop a structured harmonisation protocol formally mapping clinical measurement definitions across widely used stroke and cardiovascular benchmarks — enabling reproducible, scientifically defensible cross-dataset comparisons.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#4caf82" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Representation-Level Adaptation',
    body: 'Post-hoc calibration proves ineffective under concept shift. Density ratio estimation and importance reweighting offer potential cross-domain performance recovery without requiring labelled target data.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#7c6af7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: 'Causal Stability Analysis',
    body: 'Causal stability analysis (Subbaswamy & Saria, 2020) provides a principled path toward identifying features whose relationship with stroke outcomes remains invariant across populations — enabling models that generalise by construction rather than coincidence.',
  },
];

export function ConclusionFuture() {
  return (
    <section id="conclusion" className="max-w-7xl py-20 px-6 mx-auto">
      {/* ── Conclusion ── */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4f8ef7] mb-3">
        Conclusion
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-4">
        What This Study Demonstrates
      </h2>
      <p className="text-sm text-[#8b90a4] mb-12 max-w-3xl leading-relaxed">
        Stroke risk classifiers trained on the Kaggle benchmark exhibit statistically significant
        and practically consequential performance degradation when applied without retraining to
        NHANES 2021–2023. Feature-patching confirms concurrent concept shift, and post-hoc
        calibration provides no recovery under these conditions. Three conclusions follow:
      </p>

      {/* Conclusion cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {CONCLUSIONS.map((c) => (
          <GlassCard key={c.number} accent={c.accent} maxTilt={7}>
            <div className="flex items-start justify-between mb-4">
              <span
                className="text-3xl font-black"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: c.accent === 'danger' ? 'rgba(224,92,92,0.25)' :
                         c.accent === 'warning' ? 'rgba(232,168,56,0.25)' :
                         'rgba(79,142,247,0.25)',
                }}
              >
                {c.number}
              </span>
              <div className="text-right">
                <p
                  className="text-xl font-bold"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: c.accent === 'danger' ? '#e05c5c' :
                           c.accent === 'warning' ? '#e8a838' :
                           '#4f8ef7',
                  }}
                >
                  {c.stat}
                </p>
                <p className="text-xs text-[#8b90a4]">{c.statLabel}</p>
              </div>
            </div>
            <h3 className="text-base font-semibold text-[#e8eaf0] mb-3">{c.title}</h3>
            <p className="text-sm text-[#8b90a4] leading-relaxed">{c.body}</p>
          </GlassCard>
        ))}
      </div>

      {/* ── Future Work ── */}
      <div className="border-t border-[#2e3248] pt-16">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4caf82] mb-3">
          Future Scope
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-4">
          Open Research Directions
        </h2>
        <p className="text-sm text-[#8b90a4] mb-10 max-w-3xl leading-relaxed">
          These findings collectively point toward a standard where clinical prediction models are
          evaluated and deployed with the rigour applied to pharmaceutical trials — where independent
          external validation is a prerequisite, not an afterthought.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FUTURE_DIRECTIONS.map((dir) => (
            <div
              key={dir.title}
              className="flex gap-4 p-5 rounded-xl transition-colors duration-200"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="flex-shrink-0 mt-0.5 p-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {dir.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#e8eaf0] mb-1.5">{dir.title}</h4>
                <p className="text-xs text-[#8b90a4] leading-relaxed">{dir.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ConclusionFuture;
