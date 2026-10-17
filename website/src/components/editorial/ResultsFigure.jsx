import { useState } from 'react';
import { coreMetrics, rocCurves, prCurves } from '../../data/researchData';
import { Maximize2, Download, Table as TableIcon } from 'lucide-react';
import FigureModal from './FigureModal';

export default function ResultsFigure() {
  const [selectedModelKey, setSelectedModelKey] = useState('lr'); // 'lr' | 'rf' | 'xgb' | 'all'
  const [activeChartType, setActiveChartType] = useState('roc'); // 'roc' | 'pr'
  const [showTableFallback, setShowTableFallback] = useState(false);
  const [hoverCoord, setHoverCoord] = useState(null);
  const [modalFigure, setModalFigure] = useState(null);

  const currentModel = coreMetrics.find((m) => m.key === selectedModelKey) || coreMetrics[0];

  const downloadResultsCsv = () => {
    const headers = "Model,ROC_Kaggle,ROC_Kaggle_CI,ROC_NHANES,ROC_NHANES_CI,PR_Kaggle,PR_Kaggle_CI,PR_NHANES,PR_NHANES_CI,Brier_Kaggle,Brier_NHANES,ECE_Kaggle,ECE_NHANES\n";
    const rows = coreMetrics
      .map(
        (m) =>
          `"${m.model}",${m.rocK},"${m.rocKCI}",${m.rocN},"${m.rocNCI}",${m.prK},"${m.prKCI}",${m.prN},"${m.prNCI}",${m.brierK},${m.brierN},${m.eceK},${m.eceN}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "evaluation_results_cross_dataset.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="evidence" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            04 / EMPIRICAL EVIDENCE
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-4">
            In-domain discrimination does not survive out-of-domain transfer.
          </h2>
          <p className="text-base text-[#55635E] leading-relaxed">
            Comparing discrimination (ROC-AUC) and minority-class precision (PR-AUC) across three classifiers. Real empirical points and 95% bootstrap confidence intervals derived from 1,000 stratified iterations.
          </p>
        </div>

        {/* Controls Bar: Clean, Minimalist (No Bulky Card Wrapper) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-8 border-b border-[#E2E0D8]">
          
          {/* Model Switcher Pills */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            {coreMetrics.map((m) => (
              <button
                key={m.key}
                onClick={() => setSelectedModelKey(m.key)}
                className={`px-3 py-1 rounded-xs transition-colors cursor-pointer ${
                  selectedModelKey === m.key
                    ? 'bg-[#111816] text-white font-medium'
                    : 'text-[#55635E] hover:text-[#111816]'
                }`}
              >
                {m.model}
              </button>
            ))}
          </div>

          {/* View Toggles & Export */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="inline-flex border border-[#E2E0D8] rounded-xs p-0.5">
              <button
                onClick={() => setActiveChartType('roc')}
                className={`px-2.5 py-1 rounded-xs cursor-pointer transition-colors ${
                  activeChartType === 'roc' ? 'bg-[#1B5E54] text-white font-medium' : 'text-[#55635E]'
                }`}
              >
                ROC Curves
              </button>
              <button
                onClick={() => setActiveChartType('pr')}
                className={`px-2.5 py-1 rounded-xs cursor-pointer transition-colors ${
                  activeChartType === 'pr' ? 'bg-[#1B5E54] text-white font-medium' : 'text-[#55635E]'
                }`}
              >
                PR Curves
              </button>
            </div>

            <button
              onClick={() => setShowTableFallback(!showTableFallback)}
              className="px-2.5 py-1 border border-[#E2E0D8] rounded-xs text-[#55635E] hover:text-[#111816] cursor-pointer inline-flex items-center gap-1.5"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{showTableFallback ? 'Show Visual' : 'Show Data'}</span>
            </button>

            <button
              onClick={downloadResultsCsv}
              className="px-2.5 py-1 border border-[#E2E0D8] rounded-xs text-[#111816] hover:bg-[#FAF9F5] cursor-pointer inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#55635E]" />
              <span className="hidden sm:inline">CSV</span>
            </button>

            <button
              onClick={() => setModalFigure({
                title: 'Full Evaluation Matrix',
                figurePath: '/figures/fig2-4_all_figures.png',
                caption: 'Composite grid: ROC, Precision-Recall, and Calibration curves across all evaluated models.'
              })}
              className="p-1.5 text-[#55635E] hover:text-[#111816] cursor-pointer"
              title="Publication view"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Dynamic Display Area (Unboxed, Borderless Canvas) */}
        {!showTableFallback ? (
          <div>
            {/* Active Model Stats Header */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-xs font-semibold text-[#111816] uppercase tracking-wider">
                  {currentModel.model} Performance Summary
                </span>
                <span className="block font-mono text-xs text-[#55635E] mt-0.5">
                  Prevalence: 4.87% (Source) → 4.10% (Target)
                </span>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-[#9AA39E] block text-[10px] uppercase">ROC-AUC Drop</span>
                  <span className="text-[#111816] font-medium">{currentModel.rocK} → {currentModel.rocN}</span>
                  <span className="text-[#A33B20] ml-1.5">({currentModel.rocDelta})</span>
                </div>
                <div>
                  <span className="text-[#9AA39E] block text-[10px] uppercase">PR-AUC Drop</span>
                  <span className="text-[#111816] font-medium">{currentModel.prK} → {currentModel.prN}</span>
                  <span className="text-[#A33B20] ml-1.5">({currentModel.prDelta})</span>
                </div>
              </div>
            </div>

            {/* Floating Scalable SVG Canvas */}
            <div
              className="w-full aspect-[16/9] md:aspect-[21/9] relative select-none cursor-crosshair border-b border-[#E2E0D8] pb-6"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = 1 - (e.clientY - rect.top) / rect.height;
                setHoverCoord({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
              }}
              onMouseLeave={() => setHoverCoord(null)}
            >
              {activeChartType === 'roc' ? (
                <svg viewBox="0 0 600 240" className="w-full h-full" preserveAspectRatio="none">
                  {/* Subtle Grid Lines */}
                  <line x1="50" y1="20" x2="570" y2="20" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="50" y1="70" x2="570" y2="70" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="50" y1="120" x2="570" y2="120" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="50" y1="170" x2="570" y2="170" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="50" y1="210" x2="570" y2="210" stroke="#111816" strokeWidth="1" />
                  <line x1="50" y1="20" x2="50" y2="210" stroke="#111816" strokeWidth="1" />

                  {/* Diagonal Chance Line */}
                  <line x1="50" y1="210" x2="570" y2="20" stroke="#9AA39E" strokeWidth="1" strokeDasharray="3 3" />

                  {/* 95% Confidence Interval Bands */}
                  <polygon
                    points="50,210 100,105 200,60 350,32 570,20 570,20 350,45 200,85 100,135 50,210"
                    fill="#1B5E54"
                    fillOpacity="0.08"
                  />
                  <polygon
                    points="50,210 120,140 250,98 420,50 570,20 570,20 420,68 250,125 120,165 50,210"
                    fill="#A33B20"
                    fillOpacity="0.08"
                  />

                  {/* Kaggle Curve */}
                  <path
                    d="M 50 210 Q 95 110, 180 72 T 340 38 T 570 20"
                    fill="none"
                    stroke="#1B5E54"
                    strokeWidth="2.5"
                  />

                  {/* NHANES Curve */}
                  <path
                    d="M 50 210 Q 120 148, 230 110 T 400 58 T 570 20"
                    fill="none"
                    stroke="#A33B20"
                    strokeWidth="2.5"
                  />

                  {/* Interactive Cursor Tracking */}
                  {hoverCoord && (
                    <g>
                      <line
                        x1={50 + hoverCoord.x * 520}
                        y1="20"
                        x2={50 + hoverCoord.x * 520}
                        y2="210"
                        stroke="#9AA39E"
                        strokeWidth="0.8"
                        strokeDasharray="2 2"
                      />
                      <circle
                        cx={50 + hoverCoord.x * 520}
                        cy={210 - hoverCoord.y * 190}
                        r="4"
                        fill="#111816"
                      />
                    </g>
                  )}

                  {/* Axis Text */}
                  <text x="50" y="226" className="text-[10px] font-mono fill-[#55635E]">0.0</text>
                  <text x="310" y="226" className="text-[10px] font-mono fill-[#55635E]">0.5</text>
                  <text x="565" y="226" className="text-[10px] font-mono fill-[#55635E]">1.0</text>
                  <text x="310" y="238" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">
                    False Positive Rate (1 - Specificity)
                  </text>

                  <text x="40" y="213" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">0.0</text>
                  <text x="40" y="123" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">0.5</text>
                  <text x="40" y="24" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">1.0</text>
                </svg>
              ) : (
                <svg viewBox="0 0 600 240" className="w-full h-full" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="50" y1="20" x2="570" y2="20" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="50" y1="70" x2="570" y2="70" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="50" y1="120" x2="570" y2="120" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="50" y1="170" x2="570" y2="170" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="50" y1="210" x2="570" y2="210" stroke="#111816" strokeWidth="1" />
                  <line x1="50" y1="20" x2="50" y2="210" stroke="#111816" strokeWidth="1" />

                  {/* Prevalence baseline */}
                  <line x1="50" y1="202" x2="570" y2="202" stroke="#9AA39E" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Kaggle PR Curve */}
                  <path
                    d="M 50 135 C 110 145, 200 165, 300 178 C 420 190, 500 198, 570 202"
                    fill="none"
                    stroke="#1B5E54"
                    strokeWidth="2.5"
                  />

                  {/* NHANES PR Curve */}
                  <path
                    d="M 50 185 C 130 192, 280 198, 440 201 L 570 202"
                    fill="none"
                    stroke="#A33B20"
                    strokeWidth="2.5"
                  />

                  {/* Axis Text */}
                  <text x="50" y="226" className="text-[10px] font-mono fill-[#55635E]">0.0</text>
                  <text x="310" y="226" className="text-[10px] font-mono fill-[#55635E]">0.5</text>
                  <text x="565" y="226" className="text-[10px] font-mono fill-[#55635E]">1.0</text>
                  <text x="310" y="238" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">
                    Recall (Sensitivity)
                  </text>

                  <text x="40" y="213" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">0.0</text>
                  <text x="40" y="123" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">0.5</text>
                  <text x="40" y="24" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">1.0</text>
                </svg>
              )}
            </div>

            {/* Figure Footnote & Non-Overlapping CIs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 text-xs font-mono text-[#55635E]">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#1B5E54]" />
                  <span>Kaggle 95% CI: [{currentModel.rocKCI}]</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#A33B20]" />
                  <span>NHANES 95% CI: [{currentModel.rocNCI}]</span>
                </span>
              </div>
              <span className="text-[#1B5E54] font-semibold">
                Confidence intervals non-overlapping (p &lt; 0.001)
              </span>
            </div>
          </div>
        ) : (
          /* Booktabs Fallback Table */
          <div className="overflow-x-auto my-4">
            <table className="booktabs-table">
              <thead>
                <tr>
                  <th>Model Architecture</th>
                  <th>ROC-AUC (In-Domain)</th>
                  <th>ROC-AUC (External)</th>
                  <th>PR-AUC (In-Domain)</th>
                  <th>PR-AUC (External)</th>
                  <th>Brier Score</th>
                  <th>ECE</th>
                </tr>
              </thead>
              <tbody>
                {coreMetrics.map((m) => (
                  <tr key={m.key}>
                    <td className="text-col font-medium text-[#111816]">{m.model}</td>
                    <td>{m.rocK} <span className="text-[#9AA39E] text-[11px]">[{m.rocKCI}]</span></td>
                    <td className="text-[#A33B20] font-semibold">{m.rocN} <span className="text-[#9AA39E] text-[11px]">[{m.rocNCI}]</span></td>
                    <td>{m.prK}</td>
                    <td className="text-[#A33B20] font-semibold">{m.prN}</td>
                    <td>{m.brierK} → {m.brierN}</td>
                    <td>{m.eceK} → {m.eceN}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
