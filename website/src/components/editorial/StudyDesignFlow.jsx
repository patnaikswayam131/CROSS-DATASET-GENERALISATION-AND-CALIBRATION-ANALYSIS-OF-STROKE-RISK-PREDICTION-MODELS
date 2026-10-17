import { useState } from 'react';
import { studyDesignStages } from '../../data/researchData';

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
    params: 'Confound: Fasting plasma glucose vs unspecified glucose protocol'
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
    <section id="study-design" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            02 / STUDY DESIGN & FLOW
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-4">
            A frozen pipeline evaluated against an independent national cohort.
          </h2>
          <p className="text-base text-[#55635E] leading-relaxed">
            Every transformation, imputer, and classifier decision boundary was frozen on the Kaggle training set before evaluating against NHANES 2021-2023. Select any phase to inspect technical execution parameters.
          </p>
        </div>

        {/* Clean Linear Milestone Nav (Horizontal Line with Ticks) */}
        <div className="border-t border-[#E2E0D8] pt-6 mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {studyDesignStages.map((stg, idx) => {
              const isSelected = activeStageIdx === idx;
              return (
                <button
                  key={stg.number}
                  onClick={() => setActiveStageIdx(idx)}
                  className={`text-left p-3 rounded-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B5E54] text-white'
                      : 'hover:bg-[#EDF3F0] text-[#111816]'
                  }`}
                >
                  <div className={`font-mono text-xs font-semibold mb-1 ${isSelected ? 'text-white' : 'text-[#1B5E54]'}`}>
                    PHASE 0{stg.number}
                  </div>
                  <div className="text-xs font-medium line-clamp-1">
                    {stg.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detail (Open & Spacious, No Card Boxing) */}
        {(() => {
          const currentStage = studyDesignStages[activeStageIdx];
          const extra = STAGE_EXTRAS[activeStageIdx];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Stage Summary */}
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-xs text-[#1B5E54] font-semibold tracking-wider uppercase block">
                  PHASE 0{currentStage.number}: {currentStage.title}
                </span>
                <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#111816] leading-snug">
                  {currentStage.subtitle}
                </h3>
                <p className="text-sm text-[#55635E] leading-relaxed">
                  {currentStage.narrative}
                </p>
              </div>

              {/* Right Column: Technical Parameters (Booktabs-Style Spec List) */}
              <div className="lg:col-span-7 border-t border-[#E2E0D8] lg:border-t-0 lg:border-l lg:border-[#E2E0D8] lg:pl-10 pt-6 lg:pt-0">
                <span className="font-mono text-xs uppercase tracking-wider text-[#9AA39E] font-medium block mb-4">
                  EXECUTION PARAMETERS
                </span>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-[#E2E0D8]">
                    <span className="text-[#55635E]">Input Specimen:</span>
                    <span className="text-[#111816] font-medium sm:text-right mt-1 sm:mt-0">{extra.input}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-[#E2E0D8]">
                    <span className="text-[#55635E]">Output Manifest:</span>
                    <span className="text-[#1B5E54] font-medium sm:text-right mt-1 sm:mt-0">{extra.output}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-[#E2E0D8]">
                    <span className="text-[#55635E]">Partitioning:</span>
                    <span className="text-[#111816] font-medium sm:text-right mt-1 sm:mt-0">{extra.split}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-[#E2E0D8]">
                    <span className="text-[#55635E]">Methodological Control:</span>
                    <span className="text-[#111816] font-medium sm:text-right mt-1 sm:mt-0">{extra.params}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#55635E]">
                  <span>Step {activeStageIdx + 1} of 6</span>
                  <div className="flex gap-2">
                    <button
                      disabled={activeStageIdx === 0}
                      onClick={() => setActiveStageIdx(Math.max(0, activeStageIdx - 1))}
                      className="px-2.5 py-1 border border-[#E2E0D8] rounded-xs disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:bg-[#FAF9F5]"
                    >
                      ← Previous
                    </button>
                    <button
                      disabled={activeStageIdx === 5}
                      onClick={() => setActiveStageIdx(Math.min(5, activeStageIdx + 1))}
                      className="px-2.5 py-1 border border-[#E2E0D8] rounded-xs disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:bg-[#FAF9F5]"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
}
