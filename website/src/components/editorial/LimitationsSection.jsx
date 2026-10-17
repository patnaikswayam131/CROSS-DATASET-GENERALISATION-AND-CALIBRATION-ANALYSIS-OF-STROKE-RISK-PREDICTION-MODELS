export default function LimitationsSection() {
  const scopeItems = [
    {
      num: '01',
      title: 'Retrospective Benchmark Setting',
      detail: 'This study focuses on cross-dataset transfer between established public health datasets (Kaggle Stroke Benchmark and NHANES 2021-2023). It assesses tabular distributional stability and probability calibration across separate populations before prospective clinical trials are conducted.'
    },
    {
      num: '02',
      title: 'Feature Measurement Provenance',
      detail: 'The identification of fasting plasma glucose (NHANES LBXGLU) versus unspecified glucose protocol in Kaggle serves as a key scientific contribution. It demonstrates that variable name parity alone does not guarantee semantic measurement equivalence in health machine learning.'
    },
    {
      num: '03',
      title: 'Deployment Simulation Setting',
      detail: 'Unweighted models were deliberately evaluated on the NHANES cohort to simulate how standard off-the-shelf machine learning architectures operate when transferred across health registries without complex survey-weight calibration.'
    },
    {
      num: '04',
      title: 'Principled Class-Imbalance Controls',
      detail: 'Cost-sensitive loss weighting was selected over synthetic oversampling algorithms (such as SMOTE) following Carriero et al. (2024), preserving authentic patient manifold geometry without generating synthetic interpolation artifacts.'
    }
  ];

  return (
    <section id="limitations" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            09 / METHODOLOGICAL SCOPE & RIGOUR
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-4">
            Methodological scope and analytical boundaries.
          </h2>
          <p className="text-base text-[#55635E] leading-relaxed">
            Transparent contextualisation of experimental parameters, data governance protocols, and study boundaries.
          </p>
        </div>

        {/* Clean Editorial Scope Note (Border-Left Line Only, No Heavy Card Fill) */}
        <div className="border-l-2 border-[#1B5E54] pl-5 py-2 mb-14 max-w-4xl">
          <p className="text-sm text-[#111816] leading-relaxed">
            <strong className="text-[#1B5E54] font-mono text-xs uppercase tracking-wider block mb-1">Scope note:</strong>
            This investigation is a retrospective machine-learning study designed to benchmark cross-dataset generalisation and calibration; its findings are intended for methodological research and not for autonomous clinical decision-making.
          </p>
        </div>

        {/* 4 Scope Items Grid (De-Boxed with Subtle Top Rules) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {scopeItems.map((item) => (
            <div key={item.num} className="border-t border-[#E2E0D8] pt-6">
              <span className="font-mono text-xs text-[#1B5E54] font-semibold tracking-wider block mb-2">
                DIMENSION {item.num}
              </span>
              <h3 className="font-serif-heading text-xl text-[#111816] mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-[#55635E] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
