/**
 * QuestionSection
 * Section 01 / THE QUESTION
 * Clean, spacious editorial reading section. De-boxed, airy, and high contrast.
 * Zero em dashes used.
 */
export default function QuestionSection() {
  return (
    <section id="question" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            01 / RESEARCH QUESTION
          </span>
        </div>

        {/* Section Headline */}
        <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-12 max-w-3xl">
          Does an algorithmic risk score retain clinical validity when tested outside its training distribution?
        </h2>

        {/* 2-Column Spacious Editorial Text (No Boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 text-base text-[#55635E] leading-relaxed">
          
          <div className="space-y-5">
            <p className="text-lg text-[#111816] font-serif-heading leading-snug">
              Most clinical machine learning models are evaluated on randomly held-out test splits from the same underlying dataset on which they were developed.
            </p>
            <p>
              While this validates internal statistical consistency, it fails to evaluate generalisation across real-world hospital boundaries. In clinical deployment, models face patients recruited under distinct inclusion criteria, demographic distributions, and laboratory assay protocols.
            </p>
            <p>
              This investigation evaluates whether three standard risk architectures (Logistic Regression, Random Forest, and XGBoost) trained on the widely benchmarked Kaggle Stroke Dataset maintain discrimination and calibration when deployed against the CDC NHANES 2021-2023 cohort.
            </p>
          </div>

          <div className="space-y-5">
            <div className="border-l-2 border-[#1B5E54] pl-5 py-1">
              <span className="font-mono text-xs text-[#1B5E54] font-semibold uppercase tracking-wider block mb-1">
                THE EMPIRICAL PARADOX
              </span>
              <p className="text-[#111816] text-base leading-relaxed">
                A model can show high in-domain discrimination (ROC-AUC 0.838) yet experience an immediate 63% collapse in precision-recall retrieval and catastrophic probability distortion the moment it crosses institutional boundaries.
              </p>
            </div>
            <p>
              Crucially, this failure is not merely a reflection of differing disease prevalence. Through two-sample Kolmogorov-Smirnov tests, Population Stability Index (PSI), and counterfactual feature-patching experiments, we establish that the degradation is driven by concurrent covariate shift and underlying concept shift.
            </p>
            <p className="font-mono text-xs text-[#9AA39E] pt-2">
              Cohort sizes: Source N = 5,108 (3,576 train / 1,533 test) · Target N = 3,167 independent survey participants.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
