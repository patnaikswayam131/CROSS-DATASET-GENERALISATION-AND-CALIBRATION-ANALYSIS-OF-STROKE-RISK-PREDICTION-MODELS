import { GlassCard } from '../ui/GlassCard';

/**
 * LiteratureReview — Prior studies section from Section 2 of the manuscript.
 * Three thematic areas: stroke prediction, class imbalance, cross-domain generalisation.
 */

const AREAS = [
  {
    id: 'stroke',
    number: '2.1',
    title: 'Stroke Prediction & In-Domain Evaluation',
    accent: 'primary',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#4f8ef7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    summary:
      'Multiple studies achieve high in-domain ROC-AUC (0.80–0.98) on the Kaggle Stroke Prediction Dataset but share a critical limitation: evaluation is restricted to held-out splits of the same source population.',
    papers: [
      { ref: 'Sutcu et al. (2025)', finding: 'Multi-method Kaggle analysis; XGBoost is best-performing classifier on in-domain metrics.' },
      { ref: 'Chakraborty et al. (2024)', finding: '98.6% accuracy via stacked ensemble + PCA dimensionality reduction.' },
      { ref: 'Hassan et al. (2024)', finding: 'Identifies age, glucose, and cardiovascular history as dominant predictors across classifiers.' },
      { ref: 'Chun et al. (2021)', finding: 'Stroke risk models from 0.5 million Chinese adults; evaluation restricted to development population.' },
      { ref: 'Huang & Liu (2025)', finding: 'NHANES-based workflow — trains and validates within the same survey cycle without external testing.' },
      { ref: 'Saleem et al. (2025)', finding: 'CBDA-ResNet50 with augmentation improves minority-class recall, same in-domain evaluation constraint.' },
    ],
  },
  {
    id: 'imbalance',
    number: '2.2',
    title: 'Class Imbalance in Clinical Prediction',
    accent: 'warning',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#e8a838" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    summary:
      'Stroke datasets present fewer than 5% positive cases. Balancing methods improve recall but can distort calibration — a confound present before any domain shift occurs.',
    papers: [
      { ref: 'Melnykova et al. (2025)', finding: 'Standard classifiers fail stroke-case detection under imbalance; recommends cost-sensitive alternatives.' },
      { ref: 'Araf et al. (2024)', finding: 'Cost-sensitive learning improves recall but may compromise calibration quality.' },
      { ref: 'Salmi et al. (2024)', finding: '10-year systematic review: ROC-AUC routinely masks minority-class detection failure.' },
      { ref: 'Carriero et al. (2024)', finding: 'Simulation shows imbalance corrections can harm performance — especially distorting predicted probabilities.' },
      { ref: 'Sheetal et al. (2025)', finding: 'Cardiovascular prediction: high accuracy co-exists with clinically significant failure on positive cases.' },
    ],
  },
  {
    id: 'domain',
    number: '2.3',
    title: 'Cross-Dataset Generalisation & Domain Adaptation',
    accent: 'success',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#4caf82" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    summary:
      'Domain adaptation methods achieve modest AUC recovery under moderate covariate shift, but assume covariate shift as the primary mechanism — a premise this study directly challenges through concept shift analysis.',
    papers: [
      { ref: 'Silva et al. (2025)', finding: 'Systematic review of dataset shift detection; identifies PSI and KS tests as operationally useful diagnostics.' },
      { ref: 'Lee et al. (2023)', finding: 'Standard ERM produces fragile EHR models; proposes stable prediction under distributional change.' },
      { ref: 'Ryu et al. (2022)', finding: 'Same model across emergency departments shows site-to-site performance variation despite identical weights.' },
      { ref: 'Guo et al. (2021)', finding: 'Temporal shift within a single institute degrades output beyond what label shift alone explains.' },
      { ref: 'Lu et al. (2025)', finding: 'PSI values may be dominated by measurement protocol variation rather than demographic change.' },
      { ref: 'Fan et al. (2025)', finding: 'Stroke survival models show substantial degradation outside the development site.' },
      { ref: 'Akinwumi et al. (2025)', finding: 'Metric selection substantially changes conclusions about relative model utility.' },
    ],
  },
];

export function LiteratureReview() {
  return (
    <section id="literature" className="max-w-7xl py-20 px-6 mx-auto">
      {/* Section label */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4f8ef7] mb-3">
        Prior Studies
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-4">
        Literature Review
      </h2>
      <p className="text-sm text-[#8b90a4] mb-12 max-w-3xl leading-relaxed">
        The existing work on machine learning for stroke prediction spans three areas: benchmark model
        development and evaluation, class imbalance management, and cross-dataset generalisation with
        domain adaptation.
      </p>

      <div className="space-y-10">
        {AREAS.map((area) => (
          <GlassCard key={area.id} accent={area.accent} maxTilt={4}>
            {/* Area header */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="flex-shrink-0 p-2.5 rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {area.icon}
              </div>
              <div>
                <span className="text-xs font-mono text-[#8b90a4]">{area.number}</span>
                <h3 className="text-lg font-semibold text-[#e8eaf0] mt-0.5">{area.title}</h3>
                <p className="text-sm text-[#8b90a4] mt-2 leading-relaxed max-w-3xl">{area.summary}</p>
              </div>
            </div>

            {/* Paper cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {area.papers.map((p) => (
                <div
                  key={p.ref}
                  className="rounded-lg p-3.5"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <p className="text-xs font-semibold text-[#e8eaf0] mb-1">{p.ref}</p>
                  <p className="text-xs text-[#8b90a4] leading-relaxed">{p.finding}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export default LiteratureReview;
