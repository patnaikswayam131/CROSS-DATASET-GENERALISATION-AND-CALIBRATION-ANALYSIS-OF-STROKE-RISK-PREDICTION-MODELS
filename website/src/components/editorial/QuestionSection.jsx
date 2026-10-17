/**
 * QuestionSection
 * Section 01 / THE QUESTION
 * Zero em dashes used.
 */
export default function QuestionSection() {
  return (
    <section id="question" className="py-16 sm:py-24 border-b border-[#C9D0C6]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            01 / THE QUESTION
          </span>
        </div>

        {/* Section Grid: Headline and Editorial Prose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Main Column */}
          <div className="lg:col-span-8">
            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-[2.65rem] leading-tight text-[#172B29] mb-8">
              The question is not whether the score is high. It is whether it holds up.
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[#172B29] leading-relaxed">
              <p>
                Models for stroke-risk prediction are often evaluated on the dataset used to train them. A strong score on that dataset does not establish that the same model will behave similarly when the population, measurements, missingness patterns, or data-collection process changes.
              </p>
              <p className="text-[#4D5D57]">
                This project examines the empirical gap between in-domain evaluation and deployment on a separately collected, harmonised dataset. We test whether three commonly deployed architectures (Logistic Regression, Random Forest, and XGBoost) retain discrimination, precision, and probability calibration when shifted from the Kaggle Stroke Prediction dataset to an independent NHANES 2021-2023 cohort.
              </p>
            </div>

            {/* Three Analytical Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#C9D0C6]">
              <div>
                <span className="font-mono text-xs font-semibold text-[#23645A] block mb-2">01 / DISCRIMINATION GAP</span>
                <p className="text-xs text-[#4D5D57] leading-relaxed">
                  Held-out random splits share underlying sampling biases and measurement conventions. External validation reveals how much predictive capacity is cohort-specific.
                </p>
              </div>
              <div>
                <span className="font-mono text-xs font-semibold text-[#23645A] block mb-2">02 / PREVALENCE REALITY</span>
                <p className="text-xs text-[#4D5D57] leading-relaxed">
                  At 4-5% stroke prevalence, ROC-AUC gives undue credit for identifying true negatives. PR-AUC reveals whether minority stroke events can actually be prioritised.
                </p>
              </div>
              <div>
                <span className="font-mono text-xs font-semibold text-[#23645A] block mb-2">03 / PROBABILITY FIDELITY</span>
                <p className="text-xs text-[#4D5D57] leading-relaxed">
                  Clinical action requires trustworthy probabilities. A model with acceptable discrimination may still output probabilities that are systematically misleading.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Note */}
          <div className="lg:col-span-4 lg:pl-6 lg:border-l lg:border-[#C9D0C6] flex flex-col justify-start">
            <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-6 rounded-xs">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#4D5D57] block mb-3">
                Research Thesis
              </span>
              <blockquote className="font-serif-heading text-xl sm:text-2xl text-[#172B29] leading-snug mb-4">
                "Same model. Different data-generating process. A more demanding test."
              </blockquote>
              <p className="text-xs text-[#4D5D57] leading-relaxed">
                We treat this as an empirical research question being tested across datasets, rather than an assertion that all published stroke models necessarily fail. The goal is transparent measurement of degradation.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
