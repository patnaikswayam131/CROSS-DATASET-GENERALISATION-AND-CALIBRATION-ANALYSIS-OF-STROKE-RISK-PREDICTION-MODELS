/**
 * InterpretationSection
 * Section 08 / INTERPRETATION
 * Open, 3-column editorial text columns. No container boxes.
 * Zero em dashes used.
 */
export default function InterpretationSection() {
  const lessons = [
    {
      num: '01',
      title: 'The dataset boundary matters.',
      text1: 'The external result is substantially weaker than the in-domain result, serving as a practical warning against relying solely on random held-out splits from the source dataset.',
      text2: 'Random splits within the same data source inevitably share recruitment protocols, institutional selection filters, and geographic homogeneity. A model that achieves an in-domain ROC-AUC of 0.838 can experience an immediate 63% collapse in precision-recall retrieval the moment it crosses into an independently collected survey.',
      metric: 'LR ROC-AUC: 0.838 → 0.713 · PR-AUC: 0.214 → 0.079'
    },
    {
      num: '02',
      title: 'Harmonisation is part of the model.',
      text1: 'Feature definitions, coding schemes, missingness semantics, and laboratory measurement protocols dictate what numerical inputs the model actually receives.',
      text2: 'Even when variables share identical clinical labels like "average glucose level", underlying measurement protocols can diverge sharply. NHANES requires a rigorous morning fasting plasma glucose specimen (LBXGLU), while Kaggle records unspecified glucose. Harmonisation is never just table renaming; it actively defines domain shift.',
      metric: 'Glucose protocol mismatch drives severe PSI of 1.495'
    },
    {
      num: '03',
      title: 'Calibration fails under concept shift.',
      text1: 'Standard post-hoc calibration methods (Platt scaling and isotonic regression) are fundamentally limited when covariate distributions P(X) and conditional relationships P(Y|X) diverge.',
      text2: 'Platt scaling yielded 0.000 improvement across all evaluated architectures, while isotonic regression caused catastrophic drops on tree-based models. Calibration assumes monotonic mapping consistency; when the underlying feature-outcome geometry changes, recalibration cannot restore clinical safety.',
      metric: 'Platt scaling: 0.000 gain · Isotonic on XGB: drops to 0.579'
    }
  ];

  return (
    <section id="interpretation" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            08 / CLINICAL & METHODOLOGICAL LESSONS
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-4">
            What did not transfer cleanly?
          </h2>
          <p className="text-base text-[#55635E] leading-relaxed">
            Interpreting the observed performance drop through three scientific lessons about machine learning validation across independent health datasets.
          </p>
        </div>

        {/* 3 Open Editorial Columns (No Boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {lessons.map((l) => (
            <div key={l.num} className="border-t border-[#111816] pt-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-semibold text-[#1B5E54] tracking-widest block mb-3">
                  LESSON {l.num}
                </span>
                <h3 className="font-serif-heading text-2xl text-[#111816] mb-4 leading-snug">
                  {l.title}
                </h3>
                <p className="text-sm text-[#55635E] leading-relaxed mb-4">
                  {l.text1}
                </p>
                <p className="text-sm text-[#55635E] leading-relaxed">
                  {l.text2}
                </p>
              </div>

              <div className="pt-4 mt-8 border-t border-[#E2E0D8] font-mono text-[11px] text-[#111816]">
                {l.metric}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
