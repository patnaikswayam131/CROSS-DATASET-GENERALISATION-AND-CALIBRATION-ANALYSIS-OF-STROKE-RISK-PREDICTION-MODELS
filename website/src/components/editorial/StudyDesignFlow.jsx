import { useState } from 'react';
import { studyDesignStages } from '../../data/researchData';
import { ShieldCheck, Database, Sliders, PlayCircle, BarChart3, Binary, ChevronRight } from 'lucide-react';

const STAGE_ICONS = [Database, Database, Sliders, Binary, PlayCircle, BarChart3];

const STAGE_EXTRAS = [
  {
    input: 'Raw Kaggle competition export (11 features)',
    output: '5,108 clean records (1 dropped for unverified sex)',
    split: 'N_train = 3,576, N_test = 1,533 (seed = 42)',
    params: 'Stratified 70/30 split preserving 4.87% prevalence'
  },
  {
    input: 'CDC NHANES 2021-2023 survey modules (DEMO_L, BMX_L, GLU_L, MCQ_L)',
    output: '3,167 survey participants with complete fasting labs',
    split: 'Untouched independent target evaluation cohort',
    params: 'Prevalence: 4.10% stroke (MCQ160F affirmative response)'
  },
  {
    input: 'Unstandardized feature column definitions',
    output: 'Parity schema: age, gender, bmi, avg_glucose_level',
    split: '4-dimensional feature vector X',
    params: 'Confound: Fasting plasma glucose vs unspecified glucose'
  },
  {
    input: 'Kaggle training partition only (N = 3,576)',
    output: 'Frozen IterativeImputer (max_iter=10) and StandardScaler',
    split: 'Zero target-domain label or feature leakage',
    params: 'Cost-sensitive weighting: LR, RF, XGBoost (scale_pos_weight=19.6)'
  },
  {
    input: 'Completely frozen pipeline applied to NHANES',
    output: 'Target probability predictions P(Y=1|X)',
    split: 'No parameter retuning, zero adaptation',
    params: 'Simulates real-world deployment into hospital registry'
  },
  {
    input: 'Target domain probability predictions',
    output: 'ROC-AUC, PR-AUC, Brier score, ECE, KS tests, PSI, domain classifier',
    split: '1,000 stratified bootstrap resamples',
    params: 'Feature patching tests confirming concurrent concept shift'
  }
];

export default function StudyDesignFlow() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  return (
    <section id="study-design" className="py-16 sm:py-24 border-b border-[#C9D0C6]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            02 / STUDY DESIGN
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#172B29] leading-tight mb-4">
            A frozen pipeline evaluated against a separately collected cohort.
          </h2>
          <p className="text-base text-[#4D5D57] leading-relaxed">
            The study follows a source-only training protocol: every preprocessing step, feature transformation, and model decision boundary was frozen on the Kaggle training partition before evaluating against NHANES 2021-2023. Click any stage to inspect technical execution parameters.
          </p>
        </div>

        {/* Connected Flow Diagram / Sequence */}
        <div className="relative border-l-2 border-[#C9D0C6] ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-6 my-10">
          {studyDesignStages.map((stg, idx) => {
            const Icon = STAGE_ICONS[idx] || Database;
            const isSelected = activeStageIdx === idx;
            const extra = STAGE_EXTRAS[idx];

            return (
              <div
                key={stg.number}
                className="relative group cursor-pointer"
                onClick={() => setActiveStageIdx(idx)}
              >
                {/* Node Marker */}
                <div
                  className={`absolute -left-[35px] sm:-left-[51px] top-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#23645A] border-2 border-[#23645A] text-white scale-110 shadow-sm'
                      : 'bg-[#FCFBF7] border-2 border-[#C9D0C6] text-[#4D5D57] group-hover:border-[#23645A]'
                  }`}
                >
                  <span className={`font-mono text-[10px] sm:text-xs font-semibold ${isSelected ? 'text-white' : 'text-[#23645A]'}`}>
                    {stg.number}
                  </span>
                </div>

                {/* Stage Content Card */}
                <div
                  className={`p-5 sm:p-6 rounded-xs transition-all duration-200 border ${
                    isSelected
                      ? 'bg-white border-[#23645A] shadow-[0_2px_10px_rgba(35,100,90,0.06)]'
                      : 'bg-[#FCFBF7] border-[#C9D0C6] hover:border-[#858E88]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#23645A]' : 'text-[#4D5D57]'}`} />
                      <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#172B29]">
                        Stage {stg.number}: {stg.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] text-[#23645A] opacity-80">
                      {isSelected ? 'Active view' : 'Click to inspect'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed">
                    {stg.detail}
                  </p>

                  {/* Expanded Technical Parameters if selected */}
                  {isSelected && extra && (
                    <div className="mt-4 pt-4 border-t border-[#E6ECE4] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-[#F5F3EB] p-3.5 rounded-xs">
                      <div>
                        <span className="text-[#4D5D57] block text-[10px]">INPUT / INGESTION:</span>
                        <span className="text-[#172B29]">{extra.input}</span>
                      </div>
                      <div>
                        <span className="text-[#4D5D57] block text-[10px]">OUTPUT ARTIFACT:</span>
                        <span className="text-[#23645A] font-semibold">{extra.output}</span>
                      </div>
                      <div>
                        <span className="text-[#4D5D57] block text-[10px]">SPLIT & SAMPLE:</span>
                        <span className="text-[#172B29]">{extra.split}</span>
                      </div>
                      <div>
                        <span className="text-[#4D5D57] block text-[10px]">EXECUTION PARAMETERS:</span>
                        <span className="text-[#172B29]">{extra.params}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Methodological Safeguards Note Box */}
        <div className="mt-14 bg-[#FCFBF7] border border-[#C9D0C6] border-l-4 border-l-[#23645A] p-6 rounded-xs">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-[#23645A]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29]">
              Methodological Integrity and Leakage Safeguards
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#4D5D57] leading-relaxed">
            <p>
              <strong className="text-[#172B29] font-medium">Zero Target-Domain Peeking:</strong> No preprocessing (imputation or scaling), feature selection, hyperparameter search, or threshold calibration accessed target-domain (NHANES) labels or features. The pipeline simulates deployment into an independent health registry.
            </p>
            <p>
              <strong className="text-[#172B29] font-medium">Cost-Sensitive Class Weighting:</strong> To handle severe imbalance (4-5% stroke cases) without generating synthetic instances that distort real feature manifolds across boundaries, balanced loss weighting was used following Carriero et al. (2024).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
