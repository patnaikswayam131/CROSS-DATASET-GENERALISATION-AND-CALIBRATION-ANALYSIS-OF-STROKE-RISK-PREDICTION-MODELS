import { useState } from 'react';
import { calibrationResults, calibrationDeciles } from '../../data/researchData';
import { Maximize2, AlertTriangle, CheckCircle2, Sliders } from 'lucide-react';
import FigureModal from './FigureModal';

export default function CalibrationSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeRecalibrationMethod, setActiveRecalibrationMethod] = useState('baseline'); // 'baseline' | 'platt' | 'isotonic'
  const [hoveredDecile, setHoveredDecile] = useState(null);

  return (
    <section id="calibration" className="py-16 sm:py-24 border-b border-[#C9D0C6]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            07 / CALIBRATION
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-10">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#172B29] leading-tight mb-4">
            Discrimination versus calibration: probability fidelity under shift.
          </h2>
          <p className="text-base text-[#4D5D57] leading-relaxed">
            Discrimination and calibration answer fundamentally different clinical questions. A model may rank stroke patients higher than non-stroke individuals (ROC-AUC 0.713) while simultaneously generating probabilities that systematically distort true risk.
          </p>
        </div>

        {/* Main Grid: Reliability Diagram + Post-hoc Recalibration Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Reliability Diagram (6 cols) */}
          <div className="lg:col-span-6 bg-[#FCFBF7] border border-[#C9D0C6] p-5 sm:p-6 rounded-xs shadow-[0_2px_8px_rgba(23,43,41,0.03)]">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#C9D0C6]">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29]">
                  Reliability Diagram (10 Deciles)
                </span>
                <span className="block text-[11px] text-[#4D5D57] mt-0.5">
                  Predicted Probability vs Observed Stroke Frequency
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Method Switcher */}
                <div className="inline-flex p-0.5 bg-white border border-[#C9D0C6] rounded-xs font-mono text-[10px]">
                  <button
                    onClick={() => setActiveRecalibrationMethod('baseline')}
                    className={`px-2 py-0.5 btn-tactile cursor-pointer rounded-xs ${
                      activeRecalibrationMethod === 'baseline' ? 'bg-[#23645A] text-white font-medium' : 'text-[#4D5D57]'
                    }`}
                  >
                    Raw
                  </button>
                  <button
                    onClick={() => setActiveRecalibrationMethod('platt')}
                    className={`px-2 py-0.5 btn-tactile cursor-pointer rounded-xs ${
                      activeRecalibrationMethod === 'platt' ? 'bg-[#23645A] text-white font-medium' : 'text-[#4D5D57]'
                    }`}
                  >
                    Platt
                  </button>
                  <button
                    onClick={() => setActiveRecalibrationMethod('isotonic')}
                    className={`px-2 py-0.5 btn-tactile cursor-pointer rounded-xs ${
                      activeRecalibrationMethod === 'isotonic' ? 'bg-[#994524] text-white font-medium' : 'text-[#4D5D57]'
                    }`}
                  >
                    Isotonic
                  </button>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="p-1 text-[#4D5D57] hover:text-[#172B29] hover:bg-[#E6ECE4] rounded-xs cursor-pointer btn-tactile"
                  title="Inspect publication export"
                  aria-label="Inspect publication export"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* SVG Reliability Plot */}
            <div className="w-full aspect-[4/3] bg-white border border-[#E6ECE4] p-4 flex flex-col justify-between relative select-none">
              <svg viewBox="0 0 360 260" className="w-full h-full" aria-label="Reliability Diagram">
                {/* Gridlines */}
                <line x1="45" y1="20" x2="330" y2="20" stroke="#F5F3EB" strokeWidth="1" />
                <line x1="45" y1="75" x2="330" y2="75" stroke="#F5F3EB" strokeWidth="1" />
                <line x1="45" y1="130" x2="330" y2="130" stroke="#F5F3EB" strokeWidth="1" />
                <line x1="45" y1="185" x2="330" y2="185" stroke="#F5F3EB" strokeWidth="1" />
                <line x1="45" y1="230" x2="330" y2="230" stroke="#858E88" strokeWidth="1" />
                <line x1="45" y1="20" x2="45" y2="230" stroke="#858E88" strokeWidth="1" />

                {/* 45-degree Perfect Calibration Line */}
                <line x1="45" y1="230" x2="330" y2="20" stroke="#858E88" strokeWidth="1" strokeDasharray="3 3" />

                {/* Kaggle Calibration Line */}
                <polyline
                  points="45,225 70,215 100,200 135,178 170,150 205,120 240,90 275,60 310,35"
                  fill="none"
                  stroke="#23645A"
                  strokeWidth="2.5"
                />

                {/* NHANES Calibration Line (Altered if isotonic is chosen) */}
                {activeRecalibrationMethod === 'isotonic' ? (
                  /* Severe stair-step collapse under isotonic overfitting */
                  <polyline
                    points="45,230 70,230 100,230 135,210 170,210 205,180 240,180 275,90 310,90"
                    fill="none"
                    stroke="#994524"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                ) : (
                  <polyline
                    points="45,228 70,224 100,218 135,210 170,195 205,175 240,150 275,120 310,80"
                    fill="none"
                    stroke="#994524"
                    strokeWidth="2.5"
                  />
                )}

                {/* Interactive Decile Dots */}
                {calibrationDeciles.map((dec, idx) => {
                  const cx = 45 + ((dec.predictedNhanes - 0.01) / 0.75) * 265;
                  const cy = 230 - ((dec.observedNhanes - 0.004) / 0.30) * 190;
                  const isHovered = hoveredDecile && hoveredDecile.bin === dec.bin;

                  return (
                    <circle
                      key={dec.bin}
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 6 : 4}
                      fill={isHovered ? "#172B29" : "#994524"}
                      stroke="#white"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoveredDecile(dec)}
                      onMouseLeave={() => setHoveredDecile(null)}
                    />
                  );
                })}

                {/* Labels */}
                <text x="180" y="85" fill="#858E88" fontSize="9" fontFamily="IBM Plex Mono">
                  Perfect Calibration (45°)
                </text>
                <text x="75" y="145" fill="#23645A" fontSize="10" fontWeight="600" fontFamily="IBM Plex Sans">
                  Kaggle (In-domain)
                </text>
                <text x="140" y="215" fill="#994524" fontSize="10" fontWeight="600" fontFamily="IBM Plex Sans">
                  {activeRecalibrationMethod === 'isotonic' ? 'Isotonic Overfitting (-0.130 AUC)' : 'NHANES (Severe Over-Confidence)'}
                </text>

                {/* Axes */}
                <text x="45" y="245" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono">0.0</text>
                <text x="180" y="245" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">Predicted Risk: 0.5</text>
                <text x="330" y="245" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">1.0</text>

                <text x="35" y="233" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">0.0</text>
                <text x="35" y="133" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">0.5</text>
                <text x="35" y="25" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">1.0</text>
              </svg>

              {/* Hover Decile Card */}
              {hoveredDecile && (
                <div className="absolute top-4 right-4 bg-[#FCFBF7]/95 border border-[#C9D0C6] p-2.5 rounded-xs font-mono text-[10px] text-[#172B29] shadow-xs">
                  <div className="font-semibold text-[#23645A]">Decile Bin {hoveredDecile.bin}</div>
                  <div>Predicted Risk: {(hoveredDecile.predictedNhanes * 100).toFixed(1)}%</div>
                  <div>Observed Stroke: {(hoveredDecile.observedNhanes * 100).toFixed(1)}%</div>
                  <div className="text-[#994524] font-medium pt-1 border-t border-[#E6ECE4]">
                    Overconfidence Gap: +{((hoveredDecile.predictedNhanes - hoveredDecile.observedNhanes) * 100).toFixed(1)}%
                  </div>
                </div>
              )}
            </div>

            {/* Caption */}
            <p className="mt-3 text-xs text-[#4D5D57] leading-relaxed">
              Hover over points to inspect individual risk deciles. NHANES predicted probabilities lie well below the 45-degree diagonal, indicating that the models systematically overestimate stroke risk for target patients due to unadjusted covariate divergence.
            </p>
          </div>

          {/* Post-hoc Recalibration Results (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-5 sm:p-6 rounded-xs">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29] block mb-2">
                Post-Hoc Recalibration Failure
              </span>
              <p className="text-xs text-[#4D5D57] leading-relaxed mb-4">
                We tested two standard calibration procedures (Platt scaling and isotonic regression) fitted on in-domain validation folds. Platt scaling produced no benefit, while isotonic regression caused extreme overfitting.
              </p>

              <div className="table-container mb-4">
                <table className="academic-table" aria-label="Post-hoc Calibration Table">
                  <thead>
                    <tr>
                      <th>Model</th>
                      <th>Baseline AUC</th>
                      <th>Platt Delta</th>
                      <th>Isotonic Delta</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calibrationResults.map((row) => (
                      <tr key={row.model}>
                        <td className="text-col font-medium text-[#172B29] text-xs">{row.model}</td>
                        <td className="font-mono text-xs">{row.baselineRoc}</td>
                        <td className="font-mono text-xs text-[#4D5D57]">{row.plattDelta}</td>
                        <td className={`font-mono text-xs font-semibold ${row.status === 'Catastrophic' ? 'text-[#994524]' : 'text-[#172B29]'}`}>
                          {row.isotonicDelta}
                        </td>
                        <td>
                          <span
                            className={`inline-block px-1.5 py-0.5 text-[10px] font-mono rounded-xs ${
                              row.status === 'Catastrophic'
                                ? 'bg-[#F3E6DE] text-[#994524] font-semibold'
                                : row.status === 'Degraded'
                                ? 'bg-[#FDF3D8] text-[#8C6D1F]'
                                : 'bg-[#E6ECE4] text-[#23645A]'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-[#4D5D57] leading-relaxed space-y-2">
                <p>
                  <strong className="text-[#994524]">Catastrophic XGBoost Collapse:</strong> Applying isotonic regression to XGBoost reduced its cross-domain ROC-AUC from 0.709 to 0.579 (-0.130 drop), rendering the boosted ensemble nearly uninformative.
                </p>
                <p>
                  <strong className="text-[#172B29]">Key Takeaway:</strong> Miscalibration induced by severe covariate and concept shift cannot be fixed by naive post-hoc adjustments without target-domain recalibration data.
                </p>
              </div>
            </div>

            {/* Note on ECE & Metrics */}
            <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-4 rounded-xs text-xs text-[#4D5D57] leading-relaxed">
              <span className="font-mono text-[11px] font-semibold text-[#172B29] block mb-1">
                Metric Caveat: Expected Calibration Error (ECE)
              </span>
              ECE is sensitive to the number of probability bins and outcome prevalence. While baseline in-domain ECE was 0.410 (LR) and 0.368 (RF), cross-domain ECE increased to 0.445 and 0.399. A single scalar ECE value should never substitute for a complete reliability curve.
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      <FigureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src="/figures/fig7_calibration (1).png"
        alt="Figure 7: Calibration and Recalibration Analysis"
        figureNumber="Figure 7"
        caption="Calibration analysis across 10 risk deciles comparing predicted probabilities against actual stroke frequency on Kaggle versus NHANES 2021-2023, along with Platt and isotonic recalibration assessments."
      />
    </section>
  );
}
