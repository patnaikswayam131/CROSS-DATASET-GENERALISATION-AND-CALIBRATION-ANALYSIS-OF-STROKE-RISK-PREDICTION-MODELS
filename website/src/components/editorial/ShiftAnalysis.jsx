import { useState } from 'react';
import { shiftAnalysis, domainClassifier, ablationStudy, conceptShiftData, distributionData } from '../../data/researchData';
import { Maximize2, GitCompare, Info } from 'lucide-react';
import FigureModal from './FigureModal';

export default function ShiftAnalysis() {
  const [selectedFeature, setSelectedFeature] = useState('avg_glucose_level'); // 'avg_glucose_level' | 'age' | 'bmi'
  const [modalFigure, setModalFigure] = useState(null);

  const activeShift = shiftAnalysis.find((s) => s.feature === selectedFeature) || shiftAnalysis[1];
  const curvePoints = distributionData[selectedFeature] || distributionData.avg_glucose_level;

  return (
    <section id="dataset-shift" className="py-16 sm:py-24 border-b border-[#C9D0C6]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            05 / DATASET SHIFT
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-8">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#172B29] leading-tight mb-4">
            Quantifying distributional divergence across the dataset boundary.
          </h2>
          <blockquote className="text-base text-[#172B29] border-l-2 border-[#23645A] pl-4 italic mb-4">
            "A performance difference tells us that model behaviour changed. Shift analysis helps characterise how the input data differ; by itself, it does not prove why performance changed."
          </blockquote>
          <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed">
            We evaluate covariate shift through Kolmogorov-Smirnov statistics, Population Stability Index (PSI), and a domain discriminability classifier.
          </p>
        </div>

        {/* Top Grid: KS & PSI Table + Domain Classifier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Table (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29]">
                Covariate Shift Quantification: KS Test and PSI
              </span>
              <button
                onClick={() => setModalFigure('/figures/fig3_shift_analysis (1).png')}
                className="inline-flex items-center gap-1 font-mono text-[11px] text-[#23645A] hover:underline cursor-pointer"
              >
                <span>Inspect shift figure</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>

            <div className="table-container">
              <table className="academic-table" aria-label="Dataset Shift Metrics">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>KS Statistic</th>
                    <th>KS p-value</th>
                    <th>PSI</th>
                    <th>Severity Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {shiftAnalysis.map((row) => (
                    <tr
                      key={row.feature}
                      className={selectedFeature === row.feature ? 'bg-[#E6ECE4]' : ''}
                      onClick={() => setSelectedFeature(row.feature)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="text-col font-medium text-[#172B29]">
                        <span className="font-mono text-xs text-[#23645A] block">{row.feature}</span>
                        <span className="text-[11px] text-[#4D5D57]">{row.label}</span>
                      </td>
                      <td>{row.ksStatistic}</td>
                      <td className="text-[11px] font-mono">{row.ksPValue}</td>
                      <td className="font-semibold">{row.psi}</td>
                      <td>
                        <span
                          className={`inline-block px-2 py-0.5 text-[11px] font-mono rounded-xs font-medium ${
                            row.severity === 'Severe'
                              ? 'bg-[#F3E6DE] text-[#994524]'
                              : row.severity === 'Moderate'
                              ? 'bg-[#FDF3D8] text-[#8C6D1F]'
                              : 'bg-[#E6ECE4] text-[#23645A]'
                          }`}
                        >
                          {row.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-2 text-[11px] text-[#4D5D57] font-mono">
              Click any feature row above to inspect its density overlay below. PSI thresholds: Stable &lt; 0.10, Moderate 0.10 - 0.25, Severe &gt; 0.25.
            </div>
          </div>

          {/* Domain Classifier Card (4 cols) */}
          <div className="lg:col-span-4 bg-[#FCFBF7] border border-[#C9D0C6] p-5 rounded-xs">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#23645A] block mb-2">
              Domain Discriminability
            </span>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-mono text-3xl font-semibold text-[#172B29]">
                {domainClassifier.rocAuc}
              </span>
              <span className="font-mono text-xs text-[#4D5D57]">
                ± {domainClassifier.rocAucStd} (5-fold CV)
              </span>
            </div>
            <p className="text-xs text-[#172B29] leading-relaxed mb-3">
              {domainClassifier.finding}
            </p>
            <div className="pt-3 border-t border-[#C9D0C6] text-[11px] text-[#4D5D57] leading-relaxed">
              <p>{domainClassifier.interpretation}</p>
            </div>
          </div>

        </div>

        {/* Middle Feature Distribution Inspector */}
        <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-5 sm:p-6 rounded-xs mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 mb-4 border-b border-[#C9D0C6]">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29]">
                Feature Density Inspection: {activeShift.label}
              </span>
              <span className="block text-xs text-[#4D5D57] mt-0.5">
                Kaggle mean: {activeShift.kaggleMean} vs NHANES mean: {activeShift.nhanesMean}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#4D5D57]">Select:</span>
              <div className="inline-flex p-0.5 bg-white border border-[#C9D0C6] rounded-xs text-xs font-mono">
                {['avg_glucose_level', 'age', 'bmi'].map((fKey) => (
                  <button
                    key={fKey}
                    onClick={() => setSelectedFeature(fKey)}
                    className={`px-2.5 py-1 transition-colors cursor-pointer ${
                      selectedFeature === fKey ? 'bg-[#23645A] text-white font-medium' : 'text-[#4D5D57]'
                    }`}
                  >
                    {fKey === 'avg_glucose_level' ? 'Glucose' : fKey === 'age' ? 'Age' : 'BMI'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SVG Density Comparison Plot */}
          <div className="w-full aspect-[21/9] bg-white border border-[#E6ECE4] p-4 flex flex-col justify-between">
            <svg viewBox="0 0 600 220" className="w-full h-full" aria-label="Feature Density Curves">
              {/* Baseline */}
              <line x1="50" y1="190" x2="570" y2="190" stroke="#858E88" strokeWidth="1" />
              <line x1="50" y1="20" x2="50" y2="190" stroke="#858E88" strokeWidth="1" />

              {/* Gridlines */}
              <line x1="50" y1="60" x2="570" y2="60" stroke="#F5F3EB" strokeWidth="1" />
              <line x1="50" y1="120" x2="570" y2="120" stroke="#F5F3EB" strokeWidth="1" />

              {/* Kaggle Density Curve */}
              <path
                d={`M 50 190 Q 150 ${selectedFeature === 'avg_glucose_level' ? '70' : selectedFeature === 'age' ? '100' : '50'}, 280 ${selectedFeature === 'avg_glucose_level' ? '40' : '80'} T 500 170 T 570 190`}
                fill="rgba(35, 100, 90, 0.12)"
                stroke="#23645A"
                strokeWidth="2.5"
              />

              {/* NHANES Density Curve */}
              <path
                d={`M 50 190 Q 170 ${selectedFeature === 'avg_glucose_level' ? '120' : selectedFeature === 'age' ? '50' : '90'}, 340 ${selectedFeature === 'avg_glucose_level' ? '60' : '40'} T 520 150 T 570 190`}
                fill="rgba(153, 69, 36, 0.10)"
                stroke="#994524"
                strokeWidth="2.5"
              />

              {/* Labels on Curve */}
              <text x="140" y="70" fill="#23645A" fontSize="11" fontWeight="600" fontFamily="IBM Plex Sans">
                Kaggle (Source)
              </text>
              <text x="360" y="65" fill="#994524" fontSize="11" fontWeight="600" fontFamily="IBM Plex Sans">
                NHANES (Target)
              </text>

              {/* X Axis */}
              <text x="50" y="208" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono">Low Value</text>
              <text x="310" y="208" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="middle">Measurement Spectrum</text>
              <text x="570" y="208" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="end">High Value</text>
            </svg>
          </div>

          {/* Context detail */}
          <div className="mt-3 text-xs text-[#4D5D57] leading-relaxed">
            <span className="font-semibold text-[#172B29]">Shift Note: </span>
            {activeShift.detail}
          </div>
        </div>

        {/* Bottom Grid: Ablation & Concept Shift Findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Ablation Card */}
          <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-5 sm:p-6 rounded-xs">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29] block mb-2">
              Feature Ablation Analysis (XGBoost)
            </span>
            <p className="text-xs text-[#4D5D57] leading-relaxed mb-4">
              Testing how removing individual covariates affects the cross-dataset gap. Note that removing glucose reduces the gap by only 0.002 despite its 1.495 PSI.
            </p>
            <div className="table-container">
              <table className="academic-table" aria-label="Feature Ablation Table">
                <thead>
                  <tr>
                    <th>Configuration</th>
                    <th>Kaggle</th>
                    <th>NHANES</th>
                    <th>Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {ablationStudy.map((row, idx) => (
                    <tr key={idx}>
                      <td className="text-col text-xs text-[#172B29]">{row.configuration}</td>
                      <td>{row.kaggleAuc}</td>
                      <td>{row.nhanesAuc}</td>
                      <td className="font-semibold text-[#994524]">{row.gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Concept Shift Feature Patching Card */}
          <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-5 sm:p-6 rounded-xs">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29] block mb-2">
              Concept Shift: Feature Patching
            </span>
            <p className="text-xs text-[#4D5D57] leading-relaxed mb-4">
              Replacing individual NHANES features with source values. All negative deltas demonstrate that the functional relationship P(Y|X) has shifted, confirming concurrent concept shift.
            </p>
            <div className="table-container">
              <table className="academic-table" aria-label="Concept Shift Patching Table">
                <thead>
                  <tr>
                    <th>Patched Feature</th>
                    <th>Base AUC</th>
                    <th>Patched AUC</th>
                    <th>Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {conceptShiftData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="text-col text-xs font-mono text-[#23645A] font-semibold">{row.feature}</td>
                      <td>{row.baseAuc}</td>
                      <td>{row.patchedAuc}</td>
                      <td className="font-semibold text-[#994524]">{row.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      <FigureModal
        isOpen={Boolean(modalFigure)}
        onClose={() => setModalFigure(null)}
        src={modalFigure}
        alt="Distribution Shift Figure"
        figureNumber="Figure 3"
        caption="Detailed distribution shift analysis showing Kolmogorov-Smirnov statistics, Population Stability Index, and covariate density overlays between Kaggle and NHANES 2021-2023 cohorts."
      />
    </section>
  );
}
