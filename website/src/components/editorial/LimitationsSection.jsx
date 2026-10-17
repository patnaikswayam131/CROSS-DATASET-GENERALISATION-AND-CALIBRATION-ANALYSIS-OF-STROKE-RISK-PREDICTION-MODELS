import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function LimitationsSection() {
  const scopeItems = [
    {
      title: 'Retrospective Benchmark Scope',
      detail: 'This study focuses on cross-dataset transfer between established public health datasets (Kaggle Stroke Benchmark and NHANES 2021-2023). It assesses tabular distributional stability and probability calibration across separate populations before prospective clinical trials are conducted.'
    },
    {
      title: 'Feature Measurement Provenance',
      detail: 'The identification of fasting plasma glucose (NHANES LBXGLU) versus unspecified glucose protocol in Kaggle serves as a key scientific contribution. It demonstrates that variable name parity alone does not guarantee semantic measurement equivalence in health machine learning.'
    },
    {
      title: 'Deployment Simulation Setting',
      detail: 'Unweighted models were deliberately evaluated on the NHANES cohort to simulate how standard off-the-shelf machine learning architectures operate when transferred across health registries without complex survey-weight calibration.'
    },
    {
      title: 'Principled Class-Imbalance Controls',
      detail: 'Cost-sensitive loss weighting was selected over synthetic oversampling algorithms (such as SMOTE) following Carriero et al. (2024), preserving authentic patient manifold geometry without generating synthetic interpolation artifacts.'
    }
  ];

  return (
    <section id="limitations" className="py-16 sm:py-24 border-b border-[#C9D0C6]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            08 / METHODOLOGICAL SCOPE & RIGOUR
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-10">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#172B29] leading-tight mb-4">
            Methodological scope and analytical boundaries.
          </h2>
          <p className="text-base text-[#4D5D57] leading-relaxed">
            Transparent contextualisation of experimental parameters, data governance protocols, and study boundaries.
          </p>
        </div>

        {/* Restrained Scope Note */}
        <div className="bg-[#FCFBF7] border border-[#C9D0C6] border-l-3 border-l-[#23645A] p-5 rounded-xs mb-10">
          <p className="text-xs sm:text-sm text-[#172B29] leading-relaxed font-medium">
            <strong className="text-[#23645A]">Scope note:</strong> This investigation is a retrospective machine-learning study designed to benchmark cross-dataset generalisation and calibration; its findings are intended for methodological research and not for autonomous clinical decision-making.
          </p>
        </div>

        {/* 4 Scope Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {scopeItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FCFBF7] border border-[#C9D0C6] p-6 rounded-xs flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#23645A] font-semibold block mb-2">
                  SCOPE DIMENSION 0{idx + 1}
                </span>
                <h3 className="font-serif-heading text-lg text-[#172B29] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
