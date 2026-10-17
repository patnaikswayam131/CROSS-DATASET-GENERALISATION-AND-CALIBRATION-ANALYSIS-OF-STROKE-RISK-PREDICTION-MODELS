import Badge from '../ui/Badge';

/**
 * Datasets  -  Experimental Setup & Harmonisation Protocol
 * Editorial scientific specification layout comparing Source Domain (Kaggle) and Target Domain (NHANES 2021-2023).
 */
export function Datasets() {
  const mappingRows = [
    {
      feature: 'Age',
      kaggle: 'age',
      nhanes: 'RIDAGEYR',
      type: 'Continuous (Years)',
      notes: 'Source: [0.08, 82.0] vs Target: [18.0, 80.0]. Adult subset alignment.',
      psi: '0.041 (Stable)',
    },
    {
      feature: 'Gender',
      kaggle: 'gender',
      nhanes: 'RIAGENDR',
      type: 'Binary Indicator',
      notes: '1 = Male, 0 = Female. 1 record dropped in source with unspecified value.',
      psi: '0.002 (Stable)',
    },
    {
      feature: 'Body Mass Index (BMI)',
      kaggle: 'bmi',
      nhanes: 'BMXBMI',
      type: 'Continuous (kg/m²)',
      notes: 'IterativeImputer applied to missing values. Source: 28.89 vs Target: 29.83 mean.',
      psi: '0.038 (Stable)',
    },
    {
      feature: 'Blood Glucose Level',
      kaggle: 'avg_glucose_level',
      nhanes: 'LBXGLU',
      type: 'Continuous (mg/dL)',
      notes: 'Definitional mismatch: Unspecified casual reading vs Fasting plasma glucose.',
      psi: '1.495 (Severe Shift)',
      highlight: true,
    },
  ];

  return (
    <section id="datasets" className="py-24 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
            03 / EMPIRICAL COHORTS & PROTOCOL
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            Two Independent Populations, Four Harmonised Features
          </h2>
          <p className="text-sm text-zinc-400 max-w-3xl mt-3 leading-relaxed">
            Evaluating model resilience requires testing whether risk calibration derived from curated hospital records
            survives transfer to multi-stage probability sampled national surveillance data.
          </p>
        </div>

        {/* 2-Column Comparative Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Source Domain Dossier */}
          <div className="border border-white/[0.08] bg-[#111114] rounded-md p-7">
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                  COHORT A · SOURCE DOMAIN
                </span>
                <h3 className="text-xl font-semibold text-zinc-100 mt-1">
                  Kaggle Stroke Prediction
                </h3>
              </div>
              <Badge variant="neutral">TRAINING & IN-DOMAIN TEST</Badge>
            </div>

            {/* Metrics Spec Grid */}
            <div className="grid grid-cols-3 gap-4 py-5 border-b border-white/[0.08]">
              <div>
                <p className="text-[11px] font-mono uppercase text-zinc-400">Total N</p>
                <p className="text-lg font-mono font-semibold text-zinc-100 mt-0.5">5,109</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-zinc-400">Stroke Prev.</p>
                <p className="text-lg font-mono font-semibold text-zinc-100 mt-0.5">4.87%</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-zinc-400">Events (Y=1)</p>
                <p className="text-lg font-mono font-semibold text-zinc-100 mt-0.5">249</p>
              </div>
            </div>

            <div className="pt-5 space-y-4 text-sm text-zinc-400 leading-relaxed">
              <p>
                <strong className="text-zinc-200 font-medium">Split Protocol:</strong> Stratified 70/30 split 
                (<span className="font-mono text-xs text-zinc-300">N_train = 3,576</span>, <span className="font-mono text-xs text-zinc-300">N_test = 1,533</span>, seed = 42). 
                Preprocessing transformers (<span className="font-mono text-xs text-zinc-300">IterativeImputer</span> and <span className="font-mono text-xs text-zinc-300">StandardScaler</span>) 
                were fitted exclusively on the source training split to preclude data leakage.
              </p>
              <p>
                <strong className="text-zinc-200 font-medium">Cohort Profile:</strong> Clinical and demographic EHR repository with 11 original raw attributes. 
                Single record with unspecified gender was dropped prior to harmonisation.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.08]">
              <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-2.5">Harmonised Feature Set</span>
              <div className="flex flex-wrap gap-2">
                {['age', 'gender', 'bmi', 'avg_glucose_level'].map((f) => (
                  <span
                    key={f}
                    className="font-mono text-xs px-2.5 py-1 rounded-[3px] bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Target Domain Dossier */}
          <div className="border border-white/[0.08] bg-[#111114] rounded-md p-7">
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                  COHORT B · TARGET DOMAIN
                </span>
                <h3 className="text-xl font-semibold text-zinc-100 mt-1">
                  CDC NHANES 2021–2023
                </h3>
              </div>
              <Badge variant="warning">EVALUATION ONLY · UNSEEN</Badge>
            </div>

            {/* Metrics Spec Grid */}
            <div className="grid grid-cols-3 gap-4 py-5 border-b border-white/[0.08]">
              <div>
                <p className="text-[11px] font-mono uppercase text-zinc-400">Total N</p>
                <p className="text-lg font-mono font-semibold text-zinc-100 mt-0.5">3,167</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-zinc-400">Stroke Prev.</p>
                <p className="text-lg font-mono font-semibold text-zinc-100 mt-0.5">4.10%</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-zinc-400">Events (Y=1)</p>
                <p className="text-lg font-mono font-semibold text-zinc-100 mt-0.5">130</p>
              </div>
            </div>

            <div className="pt-5 space-y-4 text-sm text-zinc-400 leading-relaxed">
              <p>
                <strong className="text-zinc-200 font-medium">Evaluation Protocol:</strong> Held out strictly for zero-shot cross-dataset evaluation. 
                Zero samples or statistical summaries from NHANES were exposed to models or scalers during optimization.
              </p>
              <p>
                <strong className="text-zinc-200 font-medium">Survey Design:</strong> Multi-stage stratified probability sample of the civilian, 
                non-institutionalized US population conducted by the National Center for Health Statistics (NCHS).
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.08]">
              <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-2.5">CDC Extraction Modules</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { code: 'DEMO_L', desc: 'Demographics (Age, Gender)' },
                  { code: 'BMX_L', desc: 'Body Measures (BMI)' },
                  { code: 'GLU_L', desc: 'Laboratory Fasting Glucose' },
                  { code: 'MCQ_L', desc: 'Medical Conditions (Self-Report Stroke)' },
                ].map((m) => (
                  <span
                    key={m.code}
                    title={m.desc}
                    className="font-mono text-xs px-2.5 py-1 rounded-[3px] bg-rose-500/10 text-rose-300 border border-rose-500/20"
                  >
                    {m.code}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Harmonisation Protocol Matrix */}
        <div className="border border-white/[0.08] bg-[#111114] rounded-md overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between flex-wrap gap-2">
            <div>
              <h4 className="text-sm font-semibold text-zinc-200">
                Cross-Domain Feature Harmonisation & Confounder Ledger
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Mapping exact CDC variables to source EHR columns; measurement mismatch analysis.
              </p>
            </div>
            <span className="font-mono text-[11px] text-zinc-400">
              HARMONISED SUBSPACE DIMENSION: 4
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#0c0c0e] text-zinc-400 font-mono uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-5">Clinical Domain</th>
                  <th className="py-3 px-5">Source Variable (Kaggle)</th>
                  <th className="py-3 px-5">Target Variable (NHANES)</th>
                  <th className="py-3 px-5">Data Type</th>
                  <th className="py-3 px-5">Covariate Shift (PSI)</th>
                  <th className="py-3 px-5">Protocol Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-zinc-300">
                {mappingRows.map((row) => (
                  <tr key={row.feature} className={row.highlight ? 'bg-rose-500/[0.03]' : ''}>
                    <td className="py-3.5 px-5 font-medium text-zinc-200">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-zinc-300">
                      {row.kaggle}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-zinc-200 font-semibold">
                      {row.nhanes}
                    </td>
                    <td className="py-3.5 px-5 text-zinc-400">
                      {row.type}
                    </td>
                    <td className="py-3.5 px-5 font-mono">
                      <span className={row.highlight ? 'text-rose-400 font-semibold' : 'text-zinc-400'}>
                        {row.psi}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-zinc-400">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 border-t border-white/[0.08] bg-[#0c0c0e] text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200 font-medium">Clinical Pre-Registration Note:</strong> Variables present in Kaggle such as smoking status, work type, 
            and residence were non-harmonisable with NHANES standard CDC coding without subjective ad-hoc clustering. 
            All models were retrained strictly on the shared 4-feature subspace to ensure mathematically rigorous cross-domain validity.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Datasets;
