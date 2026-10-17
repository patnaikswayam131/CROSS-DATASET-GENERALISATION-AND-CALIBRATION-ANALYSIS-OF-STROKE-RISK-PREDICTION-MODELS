import { useState } from 'react';
import { shiftAnalysis, domainClassifier, distributionData, conceptShiftData } from '../../data/researchData';
import { Maximize2, Activity, GitCommit, Layers } from 'lucide-react';
import FigureModal from './FigureModal';

/**
 * ShiftAnalysis
 * Publication-grade dataset shift and concept drift diagnostics:
 * 1. Two-sample Kolmogorov-Smirnov (KS) and PSI Table.
 * 2. Interactive Feature Density Shift Studio (KDE profiles for Age, Glucose, BMI) with KS Max Distance Indicator.
 * 3. 2D Latent Space Projection (PCA Biplot) with Domain Separability (AUC 0.858).
 * 4. Counterfactual Feature-Patching Waterfall (Concept Shift Proof).
 * Strictly zero em dashes used.
 */
export default function ShiftAnalysis() {
  const [activeFeatureKey, setActiveFeatureKey] = useState('avg_glucose_level');
  const [modalFigure, setModalFigure] = useState(null);
  const [pcaViewMode, setPcaViewMode] = useState('domain'); // 'domain' | 'label'

  const activeShiftMeta = shiftAnalysis.find((s) => s.feature === activeFeatureKey) || shiftAnalysis[1];
  const activeDistData = distributionData[activeFeatureKey] || distributionData.avg_glucose_level;

  // SVG coordinate calculations for distribution curves
  const padLeft = 45;
  const padRight = 20;
  const padTop = 25;
  const padBottom = 35;
  const svgWidth = 560;
  const svgHeight = 220;
  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  // Compute min/max for active distribution
  const xVals = activeDistData.map((d) => d.x);
  const minX = Math.min(...xVals);
  const maxX = Math.max(...xVals);
  const maxY = Math.max(...activeDistData.map((d) => Math.max(d.kaggle, d.nhanes))) * 1.15;

  const toDistX = (x) => padLeft + ((x - minX) / (maxX - minX)) * plotWidth;
  const toDistY = (y) => padTop + (1 - y / maxY) * plotHeight;

  const kaggleAreaPath = `
    M ${toDistX(activeDistData[0].x)},${padTop + plotHeight}
    ${activeDistData.map((d) => `L ${toDistX(d.x)},${toDistY(d.kaggle)}`).join(' ')}
    L ${toDistX(activeDistData[activeDistData.length - 1].x)},${padTop + plotHeight} Z
  `;

  const nhanesAreaPath = `
    M ${toDistX(activeDistData[0].x)},${padTop + plotHeight}
    ${activeDistData.map((d) => `L ${toDistX(d.x)},${toDistY(d.nhanes)}`).join(' ')}
    L ${toDistX(activeDistData[activeDistData.length - 1].x)},${padTop + plotHeight} Z
  `;

  // Representative synthetic PCA scatter points for interactive biplot
  const pcaPoints = [
    // Kaggle cluster (centered left, slightly lower)
    { x: -1.8, y: -0.4, domain: 'kaggle', stroke: 0 },
    { x: -1.5, y: 0.3, domain: 'kaggle', stroke: 0 },
    { x: -1.2, y: -0.8, domain: 'kaggle', stroke: 0 },
    { x: -1.0, y: 0.1, domain: 'kaggle', stroke: 1 },
    { x: -0.8, y: -0.3, domain: 'kaggle', stroke: 0 },
    { x: -0.6, y: 0.6, domain: 'kaggle', stroke: 0 },
    { x: -0.4, y: -0.6, domain: 'kaggle', stroke: 0 },
    { x: -0.2, y: 0.2, domain: 'kaggle', stroke: 1 },
    { x: -1.4, y: 0.7, domain: 'kaggle', stroke: 0 },
    { x: -0.9, y: -0.1, domain: 'kaggle', stroke: 0 },
    { x: -1.6, y: -0.2, domain: 'kaggle', stroke: 0 },
    { x: -0.5, y: 0.4, domain: 'kaggle', stroke: 0 },
    { x: -1.1, y: 0.5, domain: 'kaggle', stroke: 0 },
    { x: -0.7, y: -0.5, domain: 'kaggle', stroke: 0 },
    
    // NHANES cluster (centered right, shifted higher due to Age and Glucose)
    { x: 0.3, y: 0.4, domain: 'nhanes', stroke: 0 },
    { x: 0.6, y: -0.2, domain: 'nhanes', stroke: 0 },
    { x: 0.8, y: 0.7, domain: 'nhanes', stroke: 1 },
    { x: 1.1, y: 0.2, domain: 'nhanes', stroke: 0 },
    { x: 1.3, y: -0.5, domain: 'nhanes', stroke: 0 },
    { x: 1.5, y: 0.6, domain: 'nhanes', stroke: 0 },
    { x: 1.7, y: -0.1, domain: 'nhanes', stroke: 1 },
    { x: 1.9, y: 0.5, domain: 'nhanes', stroke: 0 },
    { x: 0.5, y: 0.8, domain: 'nhanes', stroke: 0 },
    { x: 0.9, y: -0.4, domain: 'nhanes', stroke: 0 },
    { x: 1.4, y: 0.1, domain: 'nhanes', stroke: 0 },
    { x: 1.6, y: -0.6, domain: 'nhanes', stroke: 0 },
    { x: 0.7, y: 0.3, domain: 'nhanes', stroke: 0 },
    { x: 1.2, y: 0.8, domain: 'nhanes', stroke: 0 }
  ];

  return (
    <section id="dataset-shift" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            05 / DATASET SHIFT & DISCRIMINATION DYNAMICS
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-4">
            Quantifying covariate shift, label shift, and concept drift.
          </h2>
          <p className="text-base text-[#55635E] leading-relaxed">
            Using two-sample Kolmogorov-Smirnov (KS) tests, Population Stability Index (PSI), adversarial domain classification, and counterfactual feature-patching to establish why models fail across institutional boundaries.
          </p>
        </div>

        {/* 2-Column Split: KS/PSI Table on Left, Interactive Distribution Density on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Covariate Shift Booktabs Table (6 cols) */}
          <div className="lg:col-span-6">
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
                    <tr
                      key={m.feature}
                      onClick={() => {
                        if (distributionData[m.feature]) {
                          setActiveFeatureKey(m.feature);
                        }
                      }}
                      className={`cursor-pointer transition-colors ${
                        activeFeatureKey === m.feature ? 'bg-[#F5F3EB]' : 'hover:bg-white'
                      }`}
                    >
                      <td className="text-col">
                        <code className={`font-semibold ${activeFeatureKey === m.feature ? 'text-[#111816]' : 'text-[#1B5E54]'}`}>
                          {m.label || m.feature}
                        </code>
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
              Click any row above to inspect its continuous empirical density distribution. PSI &gt; 0.2 indicates severe distributional shift requiring model refitting.
            </p>
          </div>

          {/* Right Column: Interactive Density Profile & KS Marker (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-[#E2E0D8] rounded-xs p-5 shadow-xs">
            
            {/* Header with Feature Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-[#E2E0D8]">
              <div>
                <span className="font-mono text-xs font-semibold text-[#111816] uppercase tracking-wider block">
                  Empirical Probability Density (KDE)
                </span>
                <span className="text-xs font-mono text-[#55635E]">
                  {activeShiftMeta.label}: KS D = {activeShiftMeta.ksStatistic}, PSI = {activeShiftMeta.psi}
                </span>
              </div>

              {/* Feature Switcher */}
              <div className="flex items-center gap-1 font-mono text-[11px]">
                {['avg_glucose_level', 'age', 'bmi'].map((fKey) => (
                  <button
                    key={fKey}
                    onClick={() => setActiveFeatureKey(fKey)}
                    className={`px-2 py-0.5 rounded-xs cursor-pointer transition-colors ${
                      activeFeatureKey === fKey
                        ? 'bg-[#111816] text-white font-medium'
                        : 'text-[#55635E] hover:text-[#111816] bg-[#FAF9F5]'
                    }`}
                  >
                    {fKey === 'avg_glucose_level' ? 'Glucose' : fKey === 'age' ? 'Age' : 'BMI'}
                  </button>
                ))}
              </div>
            </div>

            {/* Continuous SVG Distribution Chart */}
            <div className="w-full aspect-[16/9] relative select-none">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full" preserveAspectRatio="none">
                
                {/* Horizontal Baseline & Grid */}
                <line x1={padLeft} y1={padTop + plotHeight} x2={padLeft + plotWidth} y2={padTop + plotHeight} stroke="#111816" strokeWidth="1" />
                <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotHeight} stroke="#111816" strokeWidth="1" />

                {/* Shaded Area: Kaggle Distribution (Green) */}
                <path d={kaggleAreaPath} fill="#1B5E54" fillOpacity="0.12" />
                <path
                  d={activeDistData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toDistX(d.x)},${toDistY(d.kaggle)}`).join(' ')}
                  fill="none"
                  stroke="#1B5E54"
                  strokeWidth="2.2"
                />

                {/* Shaded Area: NHANES Distribution (Rust) */}
                <path d={nhanesAreaPath} fill="#A33B20" fillOpacity="0.12" />
                <path
                  d={activeDistData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toDistX(d.x)},${toDistY(d.nhanes)}`).join(' ')}
                  fill="none"
                  stroke="#A33B20"
                  strokeWidth="2.2"
                />

                {/* KS Max Divergence Distance Marker */}
                {activeFeatureKey === 'avg_glucose_level' && (
                  <g>
                    <line x1={toDistX(100)} y1={toDistY(0.022)} x2={toDistX(100)} y2={toDistY(0.005)} stroke="#111816" strokeWidth="1.5" strokeDasharray="2 2" />
                    <circle cx={toDistX(100)} cy={toDistY(0.022)} r="3" fill="#111816" />
                    <circle cx={toDistX(100)} cy={toDistY(0.005)} r="3" fill="#111816" />
                    <text x={toDistX(100) + 8} y={toDistY(0.014)} className="text-[10px] font-mono fill-[#111816] font-semibold">
                      Max KS Divergence (D = 0.362)
                    </text>
                  </g>
                )}

                {activeFeatureKey === 'age' && (
                  <g>
                    <line x1={toDistX(60)} y1={toDistY(0.028)} x2={toDistX(60)} y2={toDistY(0.017)} stroke="#111816" strokeWidth="1.5" strokeDasharray="2 2" />
                    <circle cx={toDistX(60)} cy={toDistY(0.028)} r="3" fill="#111816" />
                    <circle cx={toDistX(60)} cy={toDistY(0.017)} r="3" fill="#111816" />
                    <text x={toDistX(60) + 8} y={toDistY(0.022)} className="text-[10px] font-mono fill-[#111816] font-semibold">
                      Max KS Divergence (D = 0.207)
                    </text>
                  </g>
                )}

                {/* X-axis Ticks */}
                {activeDistData.map((d) => (
                  <g key={d.x}>
                    <line x1={toDistX(d.x)} y1={padTop + plotHeight} x2={toDistX(d.x)} y2={padTop + plotHeight + 4} stroke="#111816" strokeWidth="1" />
                    <text x={toDistX(d.x)} y={padTop + plotHeight + 16} textAnchor="middle" className="text-[10px] font-mono fill-[#55635E]">
                      {d.x}
                    </text>
                  </g>
                ))}

                {/* Axis Label */}
                <text x={padLeft + plotWidth / 2} y={svgHeight - 4} textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">
                  {activeShiftMeta.label}
                </text>
              </svg>
            </div>

            {/* Distribution Legend & Statistical Context */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-3 border-t border-[#E2E0D8] font-mono text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-2 bg-[#1B5E54] rounded-xs" />
                  <span className="text-[#111816]">Kaggle ({activeShiftMeta.kaggleMean})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-2 bg-[#A33B20] rounded-xs" />
                  <span className="text-[#111816]">NHANES ({activeShiftMeta.nhanesMean})</span>
                </div>
              </div>
              <span className="text-[11px] text-[#A33B20] font-semibold">
                {activeShiftMeta.severity} Shift
              </span>
            </div>

            <p className="text-xs text-[#55635E] font-mono mt-3 leading-relaxed">
              {activeShiftMeta.detail}
            </p>
          </div>

        </div>

        {/* 2-Column Split: 2D PCA Biplot on Left, Concept Shift Counterfactuals on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8 border-t border-[#E2E0D8]">
          
          {/* Left Column: 2D Latent Space Projection (PCA Biplot) */}
          <div className="lg:col-span-6 bg-white border border-[#E2E0D8] rounded-xs p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E0D8]">
              <div>
                <span className="font-mono text-xs font-semibold text-[#1B5E54] uppercase tracking-wider block">
                  ADVERSARIAL DOMAIN SEPARATION (Figure 8)
                </span>
                <span className="text-xs font-mono text-[#55635E]">
                  PCA 2D Latent Space Projection (Domain Classifier AUC: 0.858 ± 0.014)
                </span>
              </div>

              {/* Color Mode Switcher */}
              <div className="inline-flex border border-[#E2E0D8] rounded-xs p-0.5 font-mono text-[11px]">
                <button
                  onClick={() => setPcaViewMode('domain')}
                  className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                    pcaViewMode === 'domain' ? 'bg-[#111816] text-white font-medium' : 'text-[#55635E]'
                  }`}
                >
                  By Dataset
                </button>
                <button
                  onClick={() => setPcaViewMode('label')}
                  className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                    pcaViewMode === 'label' ? 'bg-[#111816] text-white font-medium' : 'text-[#55635E]'
                  }`}
                >
                  By Stroke Event
                </button>
              </div>
            </div>

            {/* Scatterplot Canvas */}
            <div className="w-full aspect-[16/10] relative select-none bg-[#FAF9F5] border border-[#E2E0D8] rounded-xs">
              <svg viewBox="0 0 460 260" className="w-full h-full" preserveAspectRatio="none">
                {/* Center Crosshairs */}
                <line x1="230" y1="20" x2="230" y2="240" stroke="#E2E0D8" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="30" y1="130" x2="430" y2="130" stroke="#E2E0D8" strokeWidth="1" strokeDasharray="3 3" />

                {/* Plotted Patient Scatter Points */}
                {pcaPoints.map((pt, i) => {
                  const cx = 230 + pt.x * 85;
                  const cy = 130 - pt.y * 85;
                  const isKaggle = pt.domain === 'kaggle';
                  const isStroke = pt.stroke === 1;

                  let fillColor = isKaggle ? '#1B5E54' : '#A33B20';
                  if (pcaViewMode === 'label') {
                    fillColor = isStroke ? '#A33B20' : '#9AA39E';
                  }

                  return (
                    <g key={i}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isStroke && pcaViewMode === 'label' ? 6 : 4.5}
                        fill={fillColor}
                        fillOpacity={pcaViewMode === 'label' && !isStroke ? 0.4 : 0.85}
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                      {isStroke && pcaViewMode === 'label' && (
                        <circle cx={cx} cy={cy} r="9" fill="none" stroke="#A33B20" strokeWidth="1" strokeDasharray="2 2" />
                      )}
                    </g>
                  );
                })}

                <text x="425" y="145" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">PC1 (Age + Glucose)</text>
                <text x="235" y="32" className="text-[10px] font-mono fill-[#55635E]">PC2 (BMI)</text>
              </svg>
            </div>

            {/* Legend & Interpretation */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-[#E2E0D8] font-mono text-xs text-[#55635E]">
              {pcaViewMode === 'domain' ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#1B5E54] rounded-full" />
                    <span className="text-[#111816]">Kaggle Cohort (Left)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#A33B20] rounded-full" />
                    <span className="text-[#111816]">NHANES Cohort (Right)</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-[#A33B20] rounded-full" />
                    <span className="text-[#111816] font-semibold">Stroke Case (Target = 1)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#9AA39E] rounded-full" />
                    <span className="text-[#55635E]">Non-Stroke (Target = 0)</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setModalFigure({
                  title: 'Figure 8: Complete Latent PCA Biplot from Manuscript',
                  figurePath: '/figures/fig8_pca_shift.png',
                  caption: 'Left: Kaggle (blue) vs NHANES (red) in PC space (clear separation). Right: Stroke event distribution (homogeneously dispersed across clusters).'
                })}
                className="inline-flex items-center gap-1 text-[11px] text-[#1B5E54] hover:underline cursor-pointer font-medium"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Expand Figure 8</span>
              </button>
            </div>
          </div>

          {/* Right Column: Counterfactual Feature Patching (Waterfall Proof of Concept Shift) */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A33B20] block mb-1">
                COUNTERFACTUAL FEATURE-PATCHING
              </span>
              <h3 className="font-serif-heading text-2xl text-[#111816] mb-3 leading-snug">
                Proving concept shift: P(Y|X) has changed.
              </h3>
              <p className="text-sm text-[#55635E] leading-relaxed">
                If the performance collapse were driven exclusively by input feature shift P(X), replacing NHANES features with matched Kaggle values would restore discrimination. In counterfactual experiments, patching fails to recover discrimination, proving that the conditional disease relationship P(Y|X) has itself drifted.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {conceptShiftData.map((d) => (
                <div key={d.feature} className="p-3 bg-white border border-[#E2E0D8] rounded-xs font-mono text-xs">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="font-semibold text-[#111816] capitalize">
                      Patching: {d.feature}
                    </span>
                    <span className="font-semibold text-[#A33B20]">
                      Delta: {d.delta.toFixed(3)} AUC
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#55635E]">
                    <span>Base NHANES: {d.baseAuc.toFixed(3)}</span>
                    <span>Patched AUC: {d.patchedAuc.toFixed(3)}</span>
                  </div>
                  <p className="text-[11px] text-[#55635E] mt-1 italic font-sans">
                    {d.impact}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-[#FAF0EC] border border-[#A33B20]/20 rounded-xs text-xs font-mono text-[#A33B20] leading-relaxed">
              Clinical Takeaway: Even after adjusting for demographics and assay thresholds, the conditional probability of stroke given metabolic risk factors differs fundamentally across hospital registries and population surveys.
            </div>
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
