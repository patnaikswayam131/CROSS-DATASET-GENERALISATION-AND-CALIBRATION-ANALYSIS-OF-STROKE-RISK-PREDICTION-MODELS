import { useState } from 'react';
import { shiftAnalysis, domainClassifier } from '../../data/researchData';
import { Maximize2 } from 'lucide-react';
import FigureModal from './FigureModal';

export default function ShiftAnalysis() {
  const [modalFigure, setModalFigure] = useState(null);

  const conceptShiftDeltas = [
    { feature: 'Age', delta: '-0.200', err: '±0.021', severity: 'Severe', desc: 'Replacing NHANES age with Kaggle-matched values drops AUC by 0.200.' },
    { feature: 'Gender', delta: '-0.001', err: '±0.009', severity: 'Negligible', desc: 'Gender distributions are nearly identical; minimal impact.' },
    { feature: 'BMI', delta: '-0.021', err: '±0.014', severity: 'Moderate', desc: 'BMI distribution shift is minor (KS=0.088); slight negative impact.' },
    { feature: 'Glucose', delta: '-0.016', err: '±0.016', severity: 'Moderate', desc: 'Patching does not recover performance, confirming concept shift.' }
  ];

  return (
    <section id="dataset-shift" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            05 / DATASET SHIFT & DISCRIMINATION
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-4">
            Quantifying covariate shift, label shift, and concept drift.
          </h2>
          <p className="text-base text-[#55635E] leading-relaxed">
            Using two-sample Kolmogorov-Smirnov (KS) tests, Population Stability Index (PSI), adversarial domain classification, and counterfactual feature-patching to diagnose why transfer failed.
          </p>
        </div>

        {/* 2-Column Split: KS/PSI Table on Left, Domain Classifier on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Covariate Shift Booktabs Table (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E2E0D8]">
              <span className="font-mono text-xs font-semibold text-[#111816] uppercase tracking-wider">
                Feature Drift: KS Statistics and PSI
              </span>
              <span className="font-mono text-[11px] text-[#55635E]">
                N_source = 3,576 vs N_target = 3,167
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="booktabs-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>KS Stat</th>
                    <th>p-value</th>
                    <th>PSI</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {shiftAnalysis.map((m) => (
                    <tr key={m.feature}>
                      <td className="text-col">
                        <code className="text-[#1B5E54] font-semibold">{m.label || m.feature}</code>
                      </td>
                      <td>{m.ksStatistic}</td>
                      <td>{m.ksPValue}</td>
                      <td className={m.psi > 0.2 ? 'text-[#A33B20] font-semibold' : ''}>{m.psi}</td>
                      <td>
                        <span
                          className={`font-mono text-[11px] px-2 py-0.5 rounded-xs ${
                            m.severity === 'Severe'
                              ? 'bg-[#FAF0EC] text-[#A33B20] font-semibold'
                              : m.severity === 'Moderate'
                              ? 'bg-[#EDF3F0] text-[#1B5E54]'
                              : 'text-[#9AA39E]'
                          }`}
                        >
                          {m.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-[#55635E] font-mono mt-3">
              PSI &gt; 0.2 indicates severe distributional shift requiring model refitting.
            </p>
          </div>

          {/* Right Column: Adversarial Domain Classifier (5 cols) */}
          <div className="lg:col-span-5 border-t border-[#E2E0D8] lg:border-t-0 lg:border-l lg:border-[#E2E0D8] lg:pl-10 pt-8 lg:pt-0">
            <span className="font-mono text-xs uppercase tracking-wider text-[#1B5E54] font-semibold block mb-2">
              ADVERSARIAL DOMAIN DISCRIMINATOR
            </span>
            <h3 className="font-serif-heading text-2xl text-[#111816] mb-3 leading-snug">
              Cohorts are completely separable in feature space.
            </h3>
            <p className="text-sm text-[#55635E] leading-relaxed mb-6">
              A Random Forest domain discriminator trained solely to distinguish between Kaggle and NHANES patients achieves an AUC of <strong>0.858 ± 0.014</strong>. If the distributions were exchangeable, the AUC would be 0.500.
            </p>

            <div className="border-t border-[#E2E0D8] pt-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#55635E]">Domain Classifier AUC:</span>
                <span className="text-[#111816] font-semibold">{domainClassifier.rocAuc} (5-fold CV)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#55635E]">Label Shift (Prevalence):</span>
                <span className="text-[#111816] font-medium">Chi2 p = 0.149 (Not significant)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#55635E]">Primary Driver:</span>
                <span className="text-[#A33B20] font-semibold">Joint Age & Fasting Glucose Drift</span>
              </div>
            </div>

            <button
              onClick={() => setModalFigure({
                title: 'PCA Projection: Dataset Shift vs Stroke Labels',
                figurePath: '/figures/fig8_pca_shift.png',
                caption: 'Left: Kaggle (blue) vs NHANES (red) in PC space (clear separation). Right: Stroke event distribution (homogeneously dispersed).'
              })}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono text-[#1B5E54] hover:underline cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Inspect PCA shift scatter (Figure 8)</span>
            </button>
          </div>

        </div>

        {/* Counterfactual Shift Patching: Concept Shift Proof */}
        <div className="pt-12 border-t border-[#E2E0D8]">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A33B20] block mb-1">
              COUNTERFACTUAL FEATURE PATCHING
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#111816] leading-tight mb-2">
              Correcting covariate shift reduces performance: concept shift confirmed.
            </h3>
            <p className="text-sm text-[#55635E] leading-relaxed">
              When NHANES feature distributions are replaced with Kaggle-matched values (simulating a zero-shift counterfactual), performance degrades further. This mathematically demonstrates that the relationship between features and stroke outcomes P(Y|X) has changed, not just the covariate frequencies P(X).
            </p>
          </div>

          {/* Clean 4-Column Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-mono">
            {conceptShiftDeltas.map((c) => (
              <div key={c.feature} className="border-t border-[#E2E0D8] pt-3">
                <span className="text-xs text-[#55635E] block mb-1">{c.feature} Patching</span>
                <div className="text-2xl font-normal text-[#A33B20] mb-1">
                  {c.delta} <span className="text-xs text-[#9AA39E]">{c.err}</span>
                </div>
                <p className="text-xs text-[#55635E] font-sans leading-normal">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {modalFigure && (
        <FigureModal
          isOpen={true}
          onClose={() => setModalFigure(null)}
          title={modalFigure.title}
          figurePath={modalFigure.figurePath}
          caption={modalFigure.caption}
        />
      )}
    </section>
  );
}
