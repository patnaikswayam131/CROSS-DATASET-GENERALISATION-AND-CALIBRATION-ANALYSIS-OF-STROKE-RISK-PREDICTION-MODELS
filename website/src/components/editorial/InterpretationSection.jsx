/**
 * InterpretationSection
 * Section 07 / INTERPRETATION
 * Reading-led section with 3 distinct subheadings.
 * Zero em dashes used.
 */
export default function InterpretationSection() {
  return (
    <section id="interpretation" className="py-16 sm:py-24 border-b border-[#C9D0C6]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            07 / INTERPRETATION
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#172B29] leading-tight mb-4">
            What did not transfer cleanly?
          </h2>
          <p className="text-base text-[#4D5D57] leading-relaxed">
            Interpreting the observed performance drop through three scientific lessons about machine learning validation across independent health datasets.
          </p>
        </div>

        {/* Three Editorial Essays */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {/* Subheading 1 */}
          <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-6 rounded-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-[#23645A] block mb-2">
                LESSON 01
              </span>
              <h3 className="font-serif-heading text-xl text-[#172B29] mb-4">
                The dataset boundary matters.
              </h3>
              <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed mb-4">
                The external result is substantially weaker than the in-domain result, serving as a practical warning against relying solely on random held-out splits from the source dataset.
              </p>
              <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed">
                Random splits within the same data source inevitably share recruitment protocols, institutional selection filters, and geographic homogeneity. A model that achieves an in-domain ROC-AUC of 0.838 can appear highly capable, yet experience a 63% collapse in precision-recall performance the moment it crosses into a separately collected cohort.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#C9D0C6] text-[11px] font-mono text-[#172B29]">
              Observation: LR ROC-AUC falls 0.838 → 0.713; PR-AUC falls 0.214 → 0.079.
            </div>
          </div>

          {/* Subheading 2 */}
          <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-6 rounded-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-[#23645A] block mb-2">
                LESSON 02
              </span>
              <h3 className="font-serif-heading text-xl text-[#172B29] mb-4">
                Harmonisation is part of the model.
              </h3>
              <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed mb-4">
                Feature definitions, coding schemes, missingness semantics, and laboratory measurement protocols dictate what numerical inputs the model actually receives.
              </p>
              <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed">
                Even when variables share identical clinical labels like "average glucose level", underlying measurement protocols can diverge sharply. NHANES requires a rigorous fasting plasma glucose specimen (LBXGLU), while Kaggle records unspecified, potentially postprandial glucose. Harmonisation is never just table renaming; it is an active model component that introduces domain shift.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#C9D0C6] text-[11px] font-mono text-[#172B29]">
              Confound: Glucose protocol mismatch drives PSI of 1.495.
            </div>
          </div>

          {/* Subheading 3 */}
          <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-6 rounded-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-[#23645A] block mb-2">
                LESSON 03
              </span>
              <h3 className="font-serif-heading text-xl text-[#172B29] mb-4">
                A shift score is not a causal explanation.
              </h3>
              <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed mb-4">
                Distributional metrics diagnose input data divergence, but they do not automatically prove why model discrimination deteriorated.
              </p>
              <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed">
                While average glucose level exhibited the highest Population Stability Index (PSI = 1.495), our feature ablation study revealed that completely removing glucose from the model reduced the generalization gap by only 0.002. High covariate shift in a specific variable does not imply that variable is the primary culprit of degradation.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#C9D0C6] text-[11px] font-mono text-[#172B29]">
              Empirical Check: Dropping glucose narrowed AUC gap from 0.099 to 0.097.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
