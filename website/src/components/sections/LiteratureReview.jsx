/**
 * LiteratureReview  -  Section 2 of the manuscript.
 * Thematic literature taxonomy comparing prior in-domain stroke models, class imbalance literature, and domain adaptation.
 */

const AREAS = [
  {
    id: 'stroke',
    number: 'SEC. 2.1',
    title: 'Stroke Prediction & In-Domain Evaluation Precedents',
    summary:
      'Multiple studies achieve high in-domain ROC-AUC (0.80–0.98) on the Kaggle Stroke Prediction Dataset but share a critical limitation: evaluation is restricted strictly to held-out splits of the same source population.',
    papers: [
      { ref: 'Sutcu et al. (2025)', finding: 'Multi-method Kaggle analysis; XGBoost is best-performing classifier on in-domain metrics.' },
      { ref: 'Chakraborty et al. (2024)', finding: '98.6% accuracy via stacked ensemble + PCA dimensionality reduction.' },
      { ref: 'Hassan et al. (2024)', finding: 'Identifies age, glucose, and cardiovascular history as dominant predictors across classifiers.' },
      { ref: 'Chun et al. (2021)', finding: 'Stroke risk models from 0.5 million Chinese adults; evaluation restricted to development population.' },
      { ref: 'Huang & Liu (2025)', finding: 'NHANES-based workflow  -  trains and validates within the same survey cycle without external testing.' },
      { ref: 'Saleem et al. (2025)', finding: 'CBDA-ResNet50 with augmentation improves minority-class recall, same in-domain evaluation constraint.' },
    ],
  },
  {
    id: 'imbalance',
    number: 'SEC. 2.2',
    title: 'Class Imbalance & Calibration Trade-offs in Clinical Prediction',
    summary:
      'Clinical stroke datasets exhibit extreme class imbalance (<5% positive prevalence). Balancing interventions boost minority recall but can distort posterior probabilities  -  introducing miscalibration prior to domain transfer.',
    papers: [
      { ref: 'Melnykova et al. (2025)', finding: 'Standard classifiers fail stroke-case detection under imbalance; recommends cost-sensitive alternatives.' },
      { ref: 'Araf et al. (2024)', finding: 'Cost-sensitive learning improves recall but may compromise calibration quality.' },
      { ref: 'Salmi et al. (2024)', finding: '10-year systematic review: ROC-AUC routinely masks minority-class detection failure.' },
      { ref: 'Carriero et al. (2024)', finding: 'Simulation shows imbalance corrections can harm performance  -  especially distorting predicted probabilities.' },
      { ref: 'Sheetal et al. (2025)', finding: 'Cardiovascular prediction: high accuracy co-exists with clinically significant failure on positive cases.' },
    ],
  },
  {
    id: 'domain',
    number: 'SEC. 2.3',
    title: 'Cross-Dataset Generalisation & Domain Adaptation Paradigms',
    summary:
      'Existing adaptation frameworks assume covariate shift is the dominant degradation mechanism. This study provides empirical counter-evidence showing concurrent concept shift renders post-hoc calibration ineffective.',
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
    <section id="literature" className="py-24 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
            02B / LITERATURE TAXONOMY & PRIOR STUDIES
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            Systematic Prior Literature Review
          </h2>
          <p className="text-sm text-zinc-400 max-w-3xl mt-3 leading-relaxed">
            Prior literature on machine learning for stroke risk divides into three dominant pillars: 
            benchmark algorithmic development, class imbalance handling, and dataset shift adaptation.
          </p>
        </div>

        {/* Structured Thematic Dossiers */}
        <div className="space-y-12">
          {AREAS.map((area) => (
            <div
              key={area.id}
              className="border border-white/[0.08] bg-[#111114] rounded-md overflow-hidden"
            >
              {/* Dossier Header */}
              <div className="p-6 border-b border-white/[0.08] bg-[#0c0c0e]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
                    {area.number}
                  </span>
                  <h3 className="text-base font-semibold text-zinc-100">
                    {area.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans mt-2 max-w-4xl">
                  {area.summary}
                </p>
              </div>

              {/* Citations Table / Ledger */}
              <div className="divide-y divide-white/[0.04]">
                {area.papers.map((p) => (
                  <div
                    key={p.ref}
                    className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 hover:bg-white/[0.015] transition-colors"
                  >
                    <span className="font-mono text-xs text-zinc-200 font-semibold w-56 flex-shrink-0">
                      {p.ref}
                    </span>
                    <span className="text-xs text-zinc-400 leading-relaxed font-sans flex-1">
                      {p.finding}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LiteratureReview;
