import { useState } from 'react';
import { calibrationResults, calibrationDeciles } from '../../data/researchData';
import { Maximize2 } from 'lucide-react';
import FigureModal from './FigureModal';

export default function CalibrationSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredBin, setHoveredBin] = useState(null);

  return (
    <section id="calibration" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            07 / CALIBRATION & PROBABILITY FIDELITY
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-4">
            Discrimination versus calibration: probability fidelity under shift.
          </h2>
          <p className="text-base text-[#55635E] leading-relaxed">
            Discrimination and calibration answer fundamentally different clinical questions. A model may rank stroke patients higher than non-stroke individuals (ROC-AUC 0.713) while systematically distorting true probability estimates.
          </p>
        </div>

        {/* Side-by-Side: Reliability Diagram on Left, Adaptation Results on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Left: Reliability Diagram (6 cols) */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E0D8]">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#111816] block">
                  Reliability Diagram (10 Deciles)
                </span>
                <span className="font-mono text-[11px] text-[#55635E]">
                  Predicted Probability vs Observed Stroke Frequency
                </span>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="p-1 text-[#55635E] hover:text-[#111816] cursor-pointer"
                title="Enlarge diagram"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Unboxed SVG Reliability Plot */}
            <div className="w-full aspect-[4/3] relative select-none">
              <svg viewBox="0 0 360 260" className="w-full h-full" aria-label="Reliability Diagram">
                {/* Gridlines */}
                <line x1="45" y1="20" x2="330" y2="20" stroke="#E2E0D8" strokeWidth="0.8" />
                <line x1="45" y1="75" x2="330" y2="75" stroke="#E2E0D8" strokeWidth="0.8" />
                <line x1="45" y1="130" x2="330" y2="130" stroke="#E2E0D8" strokeWidth="0.8" />
                <line x1="45" y1="185" x2="330" y2="185" stroke="#E2E0D8" strokeWidth="0.8" />
                <line x1="45" y1="230" x2="330" y2="230" stroke="#111816" strokeWidth="1" />
                <line x1="45" y1="20" x2="45" y2="230" stroke="#111816" strokeWidth="1" />

                {/* Perfect 45-degree calibration diagonal */}
                <line x1="45" y1="230" x2="330" y2="20" stroke="#9AA39E" strokeWidth="1" strokeDasharray="3 3" />

                {/* Kaggle Calibration Line */}
                <polyline
                  points="45,230 65,220 90,205 125,185 170,150 220,110 270,70 320,30"
                  fill="none"
                  stroke="#1B5E54"
                  strokeWidth="2.2"
                />

                {/* NHANES Target Line (Severe Under-Confidence & Deviation) */}
                <polyline
                  points="45,230 60,225 80,218 110,205 150,190 200,175 260,155 315,135"
                  fill="none"
                  stroke="#A33B20"
                  strokeWidth="2.2"
                />

                {/* Decile Interactive Markers */}
                {calibrationDeciles.map((d) => {
                  const cx = 45 + d.predictedNhanes * 285;
                  const cy = 230 - d.observedNhanes * 210;
                  const isHovered = hoveredBin === d.bin;
                  return (
                    <circle
                      key={d.bin}
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 6 : 3.5}
                      fill="#A33B20"
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoveredBin(d.bin)}
                      onMouseLeave={() => setHoveredBin(null)}
                    />
                  );
                })}

                {/* Axis Labels */}
                <text x="45" y="246" className="text-[10px] font-mono fill-[#55635E]">0.0</text>
                <text x="187" y="246" className="text-[10px] font-mono fill-[#55635E]">0.5</text>
                <text x="325" y="246" className="text-[10px] font-mono fill-[#55635E]">1.0</text>
                <text x="187" y="258" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">
                  Mean Predicted Probability
                </text>

                <text x="36" y="233" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">0.0</text>
                <text x="36" y="133" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">0.5</text>
                <text x="36" y="24" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">1.0</text>
              </svg>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E2E0D8] text-xs font-mono text-[#55635E]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[#1B5E54]">
                  <span className="w-2.5 h-0.5 bg-[#1B5E54]" />
                  <span>Kaggle In-Domain (ECE = 0.368)</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#A33B20]">
                  <span className="w-2.5 h-0.5 bg-[#A33B20]" />
                  <span>NHANES External (ECE = 0.398)</span>
                </span>
              </div>
              <span>Deciles 1 - 10</span>
            </div>
          </div>

          {/* Right: Adaptation Failure Table & Explanation (6 cols) */}
          <div className="lg:col-span-6 border-t border-[#E2E0D8] lg:border-t-0 lg:border-l lg:border-[#E2E0D8] lg:pl-10 pt-8 lg:pt-0">
            <span className="font-mono text-xs uppercase tracking-wider text-[#A33B20] font-semibold block mb-2">
              POST-HOC RECALIBRATION EXPERIMENT
            </span>
            <h3 className="font-serif-heading text-2xl text-[#111816] mb-3 leading-snug">
              Standard calibration methods fail to resolve out-of-domain shift.
            </h3>
            <p className="text-sm text-[#55635E] leading-relaxed mb-6">
              Platt scaling (sigmoid fit on training logits) yields 0.000 improvement across all three architectures. Non-parametric Isotonic Regression produces catastrophic degradation on tree ensembles (dropping XGBoost NHANES AUC to 0.579).
            </p>

            {/* Booktabs Recalibration Table */}
            <div className="overflow-x-auto">
              <table className="booktabs-table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Raw NHANES</th>
                    <th>+ Platt Scaling</th>
                    <th>+ Isotonic Reg</th>
                  </tr>
                </thead>
                <tbody>
                  {calibrationResults.map((r, idx) => (
                    <tr key={idx}>
                      <td className="text-col font-medium text-[#111816]">{r.model}</td>
                      <td>{r.baselineRoc.toFixed(3)}</td>
                      <td>{r.plattRoc.toFixed(3)} <span className="text-[#9AA39E] text-[11px]">({r.plattDelta})</span></td>
                      <td className={r.isotonicDelta.startsWith('-') ? 'text-[#A33B20] font-semibold' : ''}>
                        {r.isotonicRoc.toFixed(3)} <span className="text-xs">({r.isotonicDelta})</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs font-mono text-[#55635E] mt-4 leading-relaxed">
              Takeaway: Recalibration adjusts monotonic curves but cannot repair disjoint covariate distributions or structural concept shift.
            </p>
          </div>

        </div>

      </div>

      <FigureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Figure 7: Reliability Diagram and Decile Calibration"
        figurePath="/figures/fig7_calibration (1).png"
        caption="Reliability diagrams across 10 deciles comparing predicted probabilities against observed stroke outcomes in the external NHANES cohort."
      />
    </section>
  );
}
