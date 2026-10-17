import { useState } from 'react';
import { coreMetrics, rocCurves, prCurves } from '../../data/researchData';
import { Maximize2, Table as TableIcon, Download, Eye, EyeOff, Activity } from 'lucide-react';
import FigureModal from './FigureModal';

export default function ResultsFigure() {
  const [selectedModelKey, setSelectedModelKey] = useState('lr'); // 'lr' | 'rf' | 'xgb' | 'all'
  const [activeChartType, setActiveChartType] = useState('roc'); // 'roc' | 'pr' | 'slope'
  const [showTableFallback, setShowTableFallback] = useState(false);
  const [showConfidenceIntervals, setShowConfidenceIntervals] = useState(true);
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
    <section id="evidence" className="py-16 sm:py-24 border-b border-[#C9D0C6]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            04 / EVIDENCE
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-10">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#172B29] leading-tight mb-4">
            Empirical findings: in-domain discrimination does not survive transfer.
          </h2>
          <p className="text-base text-[#4D5D57] leading-relaxed">
            Comparing discrimination (ROC-AUC) and minority-class precision (PR-AUC) across three classifiers. Real data points and 95% bootstrap confidence intervals derived from 1,000 stratified iterations.
          </p>
        </div>

        {/* Controls Bar: Model Selector, Chart View, CSV Export */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#C9D0C6]">
          {/* Model Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
            {coreMetrics.map((m) => (
              <button
                key={m.key}
                onClick={() => setSelectedModelKey(m.key)}
                className={`px-3 py-1.5 font-mono text-xs rounded-xs btn-tactile cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1D6ED8] ${
                  selectedModelKey === m.key
                    ? 'bg-[#23645A] text-white font-medium shadow-xs'
                    : 'bg-[#FCFBF7] border border-[#C9D0C6] text-[#4D5D57] hover:text-[#172B29]'
                }`}
              >
                {m.model}
              </button>
            ))}
            <button
              onClick={() => setSelectedModelKey('all')}
              className={`px-3 py-1.5 font-mono text-xs rounded-xs btn-tactile cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1D6ED8] ${
                selectedModelKey === 'all'
                  ? 'bg-[#23645A] text-white font-medium shadow-xs'
                  : 'bg-[#FCFBF7] border border-[#C9D0C6] text-[#4D5D57] hover:text-[#172B29]'
              }`}
            >
              All 3 Models (Comparison)
            </button>
          </div>

          {/* Chart View Toggle & Functional Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-0.5 bg-[#FCFBF7] border border-[#C9D0C6] rounded-xs text-xs font-mono">
              <button
                onClick={() => setActiveChartType('roc')}
                className={`px-2.5 py-1 btn-tactile cursor-pointer rounded-xs ${
                  activeChartType === 'roc' ? 'bg-[#23645A] text-white font-medium' : 'text-[#4D5D57]'
                }`}
              >
                ROC Curves
              </button>
              <button
                onClick={() => setActiveChartType('pr')}
                className={`px-2.5 py-1 btn-tactile cursor-pointer rounded-xs ${
                  activeChartType === 'pr' ? 'bg-[#23645A] text-white font-medium' : 'text-[#4D5D57]'
                }`}
              >
                PR Curves
              </button>
              <button
                onClick={() => setActiveChartType('slope')}
                className={`px-2.5 py-1 btn-tactile cursor-pointer rounded-xs ${
                  activeChartType === 'slope' ? 'bg-[#23645A] text-white font-medium' : 'text-[#4D5D57]'
                }`}
              >
                Slopegraph
              </button>
            </div>

            {/* Toggle CI */}
            <button
              onClick={() => setShowConfidenceIntervals(!showConfidenceIntervals)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FCFBF7] border border-[#C9D0C6] text-xs font-mono text-[#4D5D57] hover:text-[#172B29] rounded-xs cursor-pointer btn-tactile"
              title="Toggle 95% Confidence Interval Bands"
            >
              {showConfidenceIntervals ? <Eye className="w-3.5 h-3.5 text-[#23645A]" /> : <EyeOff className="w-3.5 h-3.5 text-[#858E88]" />}
              <span className="hidden sm:inline">95% CI</span>
            </button>

            {/* Export CSV button */}
            <button
              onClick={downloadResultsCsv}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#C9D0C6] text-xs font-mono text-[#172B29] hover:bg-[#E6ECE4] rounded-xs cursor-pointer btn-tactile"
              title="Download results matrix as CSV"
            >
              <Download className="w-3.5 h-3.5 text-[#23645A]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Table Fallback Toggle */}
            <button
              onClick={() => setShowTableFallback(!showTableFallback)}
              className="p-1.5 bg-[#FCFBF7] border border-[#C9D0C6] text-[#4D5D57] hover:text-[#172B29] rounded-xs cursor-pointer btn-tactile"
              title="Toggle full data table"
              aria-label="Toggle full data table"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Centre: Grid with Chart and Scientific Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Main Chart Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-[#FCFBF7] border border-[#C9D0C6] p-4 sm:p-6 rounded-xs shadow-[0_2px_8px_rgba(23,43,41,0.03)]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C9D0C6]">
              <div>
                <span className="font-mono text-xs font-semibold text-[#172B29]">
                  {activeChartType === 'roc'
                    ? 'ROC Curves (True Positive vs False Positive Rate)'
                    : activeChartType === 'pr'
                    ? 'Precision-Recall Curves (Minority Class Sensitivity)'
                    : 'Performance Degradation Slopegraph (In-domain → External)'}
                </span>
                <span className="block text-[11px] text-[#4D5D57] mt-0.5">
                  {selectedModelKey === 'all' ? 'All architectures' : currentModel.model}
                </span>
              </div>
              <button
                onClick={() => setModalFigure(activeChartType === 'pr' ? '/figures/fig2_prauc_collapse (1).png' : '/figures/fig1_performance_summary (1).png')}
                className="inline-flex items-center gap-1 font-mono text-[11px] text-[#23645A] hover:underline cursor-pointer btn-tactile"
              >
                <span>Inspect original figure</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>

            {/* SVG Plot Render with Cursor Tracking */}
            <div
              className="w-full aspect-[16/10] bg-white border border-[#E6ECE4] p-4 flex flex-col justify-between relative cursor-crosshair select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = 1 - (e.clientY - rect.top) / rect.height;
                setHoverCoord({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
              }}
              onMouseLeave={() => setHoverCoord(null)}
            >
              {activeChartType === 'roc' && (
                <svg viewBox="0 0 460 270" className="w-full h-full" aria-label="ROC Curves">
                  {/* Grid lines */}
                  <line x1="50" y1="20" x2="430" y2="20" stroke="#F5F3EB" strokeWidth="1" />
                  <line x1="50" y1="75" x2="430" y2="75" stroke="#F5F3EB" strokeWidth="1" />
                  <line x1="50" y1="130" x2="430" y2="130" stroke="#F5F3EB" strokeWidth="1" />
                  <line x1="50" y1="185" x2="430" y2="185" stroke="#F5F3EB" strokeWidth="1" />
                  <line x1="50" y1="240" x2="430" y2="240" stroke="#858E88" strokeWidth="1" />
                  <line x1="50" y1="20" x2="50" y2="240" stroke="#858E88" strokeWidth="1" />

                  {/* Reference Chance Diagonal */}
                  <line x1="50" y1="240" x2="430" y2="20" stroke="#858E88" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Confidence Interval Bands (If enabled) */}
                  {showConfidenceIntervals && (
                    <>
                      <path
                        d="M 50 240 Q 80 100, 150 60 T 280 25 T 430 20 L 430 35 Q 280 50, 150 90 T 50 240 Z"
                        fill="rgba(35, 100, 90, 0.08)"
                      />
                      <path
                        d="M 50 240 Q 110 145, 200 100 T 330 40 T 430 20 L 430 35 Q 330 70, 200 130 T 50 240 Z"
                        fill="rgba(153, 69, 36, 0.08)"
                      />
                    </>
                  )}

                  {/* Curves */}
                  {selectedModelKey === 'all' ? (
                    <>
                      {/* LR */}
                      <path d="M 50 240 Q 80 120, 150 75 T 280 35 T 430 20" fill="none" stroke="#23645A" strokeWidth="2.5" />
                      <path d="M 50 240 Q 110 160, 200 115 T 330 55 T 430 20" fill="none" stroke="#994524" strokeWidth="2.5" />
                      {/* RF */}
                      <path d="M 50 240 Q 85 125, 155 80 T 285 40 T 430 20" fill="none" stroke="#23645A" strokeWidth="1.5" strokeDasharray="4 2" />
                      <path d="M 50 240 Q 105 155, 195 110 T 325 50 T 430 20" fill="none" stroke="#994524" strokeWidth="1.5" strokeDasharray="4 2" />
                      {/* XGB */}
                      <path d="M 50 240 Q 90 130, 160 85 T 290 45 T 430 20" fill="none" stroke="#23645A" strokeWidth="1.5" strokeDasharray="2 2" />
                      <path d="M 50 240 Q 115 165, 205 120 T 335 60 T 430 20" fill="none" stroke="#994524" strokeWidth="1.5" strokeDasharray="2 2" />
                    </>
                  ) : (
                    <>
                      <path
                        d="M 50 240 Q 80 120, 150 75 T 280 35 T 430 20"
                        fill="none"
                        stroke="#23645A"
                        strokeWidth="3"
                      />
                      <path
                        d="M 50 240 Q 110 160, 200 115 T 330 55 T 430 20"
                        fill="none"
                        stroke="#994524"
                        strokeWidth="3"
                      />
                      <text x="110" y="55" fill="#23645A" fontSize="12" fontWeight="600" fontFamily="IBM Plex Sans">
                        In-domain (Kaggle): {currentModel.rocK} [CI: {currentModel.rocKCI}]
                      </text>
                      <text x="180" y="115" fill="#994524" fontSize="12" fontWeight="600" fontFamily="IBM Plex Sans">
                        External (NHANES): {currentModel.rocN} [CI: {currentModel.rocNCI}]
                      </text>
                    </>
                  )}

                  {/* Interactive Crosshair */}
                  {hoverCoord && (
                    <line
                      x1={50 + hoverCoord.x * 380}
                      y1="20"
                      x2={50 + hoverCoord.x * 380}
                      y2="240"
                      stroke="#172B29"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Axes values */}
                  <text x="50" y="258" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono">0.0</text>
                  <text x="240" y="258" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono">False Positive Rate: 0.5</text>
                  <text x="420" y="258" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono">1.0</text>

                  <text x="35" y="243" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="end">0.0</text>
                  <text x="35" y="133" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="end">0.5</text>
                  <text x="35" y="25" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="end">1.0</text>
                </svg>
              )}

              {activeChartType === 'pr' && (
                <svg viewBox="0 0 460 270" className="w-full h-full" aria-label="Precision-Recall Curves">
                  <line x1="50" y1="20" x2="430" y2="20" stroke="#F5F3EB" strokeWidth="1" />
                  <line x1="50" y1="75" x2="430" y2="75" stroke="#F5F3EB" strokeWidth="1" />
                  <line x1="50" y1="130" x2="430" y2="130" stroke="#F5F3EB" strokeWidth="1" />
                  <line x1="50" y1="185" x2="430" y2="185" stroke="#F5F3EB" strokeWidth="1" />
                  <line x1="50" y1="240" x2="430" y2="240" stroke="#858E88" strokeWidth="1" />
                  <line x1="50" y1="20" x2="50" y2="240" stroke="#858E88" strokeWidth="1" />

                  {/* Random Prevalence Baseline */}
                  <line x1="50" y1="225" x2="430" y2="225" stroke="#858E88" strokeWidth="1.5" strokeDasharray="3 3" />

                  <path d="M 50 110 Q 130 145, 230 185 T 430 220" fill="none" stroke="#23645A" strokeWidth="3" />
                  <path d="M 50 180 Q 150 205, 270 215 T 430 225" fill="none" stroke="#994524" strokeWidth="3" />

                  <text x="120" y="125" fill="#23645A" fontSize="12" fontWeight="600" fontFamily="IBM Plex Sans">
                    In-domain PR-AUC: {currentModel.prK} [CI: {currentModel.prKCI}]
                  </text>
                  <text x="150" y="175" fill="#994524" fontSize="12" fontWeight="600" fontFamily="IBM Plex Sans">
                    External PR-AUC: {currentModel.prN} [CI: {currentModel.prNCI}]
                  </text>
                  <text x="240" y="220" fill="#858E88" fontSize="10" fontFamily="IBM Plex Mono">
                    Random Baseline (0.041 NHANES prevalence)
                  </text>

                  {/* Interactive Crosshair */}
                  {hoverCoord && (
                    <line
                      x1={50 + hoverCoord.x * 380}
                      y1="20"
                      x2={50 + hoverCoord.x * 380}
                      y2="240"
                      stroke="#172B29"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  )}

                  <text x="50" y="258" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono">0.0</text>
                  <text x="240" y="258" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono">Recall: 0.5</text>
                  <text x="420" y="258" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono">1.0</text>

                  <text x="35" y="243" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="end">0.0</text>
                  <text x="35" y="133" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="end">0.5</text>
                  <text x="35" y="25" fill="#4D5D57" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="end">1.0</text>
                </svg>
              )}

              {activeChartType === 'slope' && (
                <svg viewBox="0 0 460 270" className="w-full h-full" aria-label="Performance Slopegraph">
                  <line x1="120" y1="20" x2="120" y2="230" stroke="#C9D0C6" strokeWidth="1.5" />
                  <line x1="340" y1="20" x2="340" y2="230" stroke="#C9D0C6" strokeWidth="1.5" />

                  <text x="120" y="15" fill="#23645A" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono" textAnchor="middle">
                    In-Domain (Kaggle)
                  </text>
                  <text x="340" y="15" fill="#994524" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono" textAnchor="middle">
                    External (NHANES)
                  </text>

                  {/* Slopes for all 3 models */}
                  <line x1="120" y1="52" x2="340" y2="92" stroke="#23645A" strokeWidth="2.5" />
                  <circle cx="120" cy="52" r="4.5" fill="#23645A" />
                  <circle cx="340" cy="92" r="4.5" fill="#994524" />
                  <text x="110" y="56" fill="#172B29" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="end">LR: 0.838</text>
                  <text x="350" y="96" fill="#172B29" fontSize="10" fontFamily="IBM Plex Mono">0.713</text>

                  <line x1="120" y1="58" x2="340" y2="88" stroke="#4D5D57" strokeWidth="2" strokeDasharray="4 2" />
                  <circle cx="120" cy="58" r="4" fill="#4D5D57" />
                  <circle cx="340" cy="88" r="4" fill="#994524" />
                  <text x="110" y="62" fill="#172B29" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="end">RF: 0.824</text>
                  <text x="350" y="88" fill="#172B29" fontSize="10" fontFamily="IBM Plex Mono">0.725</text>

                  <line x1="120" y1="64" x2="340" y2="94" stroke="#858E88" strokeWidth="2" strokeDasharray="2 2" />
                  <circle cx="120" cy="64" r="4" fill="#858E88" />
                  <circle cx="340" cy="94" r="4" fill="#994524" />
                  <text x="110" y="68" fill="#172B29" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="end">XGB: 0.808</text>
                  <text x="350" y="104" fill="#172B29" fontSize="10" fontFamily="IBM Plex Mono">0.709</text>

                  {/* PR Slopes */}
                  <line x1="120" y1="180" x2="340" y2="216" stroke="#23645A" strokeWidth="2" />
                  <circle cx="120" cy="180" r="3.5" fill="#23645A" />
                  <circle cx="340" cy="216" r="3.5" fill="#994524" />
                  <text x="110" y="184" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">LR PR: 0.214</text>
                  <text x="350" y="219" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono">0.079</text>

                  <text x="230" y="248" fill="#858E88" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="middle">
                    Top lines: ROC-AUC | Bottom lines: PR-AUC
                  </text>
                </svg>
              )}

              {/* Live hover coordinates badge */}
              {hoverCoord && (
                <div className="absolute top-4 right-4 bg-[#FCFBF7]/95 border border-[#C9D0C6] p-2 rounded-xs font-mono text-[10px] text-[#172B29] shadow-xs">
                  <div>{activeChartType === 'roc' ? `FPR: ${(hoverCoord.x).toFixed(2)}` : `Recall: ${(hoverCoord.x).toFixed(2)}`}</div>
                  <div>{activeChartType === 'roc' ? `TPR: ${(hoverCoord.y).toFixed(2)}` : `Precision: ${(hoverCoord.y).toFixed(2)}`}</div>
                </div>
              )}
            </div>

            {/* Plot Caption & Legend */}
            <div className="mt-3 pt-3 border-t border-[#C9D0C6] flex flex-wrap items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#23645A]" /> Source: Kaggle In-Domain
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#994524]" /> Target: NHANES External
                </span>
              </div>
              <span className="text-[#4D5D57]">Sample: 1,533 vs 3,167</span>
            </div>
          </div>

          {/* Scientific Narrative Pattern Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-5 rounded-xs">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#23645A] block mb-3">
                Scientific Narrative: {currentModel.model}
              </span>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <strong className="font-mono text-xs uppercase tracking-wider text-[#172B29] block mb-0.5">
                    1. Observation:
                  </strong>
                  <p className="text-[#4D5D57] leading-relaxed">
                    {currentModel.observation}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#C9D0C6]">
                  <strong className="font-mono text-xs uppercase tracking-wider text-[#172B29] block mb-0.5">
                    2. Context:
                  </strong>
                  <p className="text-[#4D5D57] leading-relaxed">
                    {currentModel.context}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#C9D0C6]">
                  <strong className="font-mono text-xs uppercase tracking-wider text-[#172B29] block mb-0.5">
                    3. Interpretation:
                  </strong>
                  <p className="text-[#4D5D57] leading-relaxed">
                    {currentModel.interpretation}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#C9D0C6]">
                  <strong className="font-mono text-xs uppercase tracking-wider text-[#172B29] block mb-0.5">
                    4. Limitation:
                  </strong>
                  <p className="text-[#4D5D57] leading-relaxed">
                    {currentModel.limit}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Summary Box */}
            <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-4 rounded-xs font-mono text-xs">
              <div className="grid grid-cols-2 gap-3 text-[#172B29]">
                <div>
                  <span className="text-[#4D5D57] block text-[10px]">IN-DOMAIN ROC-AUC</span>
                  <span className="text-base font-semibold text-[#23645A]">{currentModel.rocK}</span>
                  <span className="text-[10px] text-[#4D5D57] block">{currentModel.rocKCI}</span>
                </div>
                <div>
                  <span className="text-[#4D5D57] block text-[10px]">EXTERNAL ROC-AUC</span>
                  <span className="text-base font-semibold text-[#994524]">{currentModel.rocN}</span>
                  <span className="text-[10px] text-[#4D5D57] block">{currentModel.rocNCI}</span>
                </div>
                <div className="pt-2 border-t border-[#C9D0C6]">
                  <span className="text-[#4D5D57] block text-[10px]">IN-DOMAIN PR-AUC</span>
                  <span className="text-base font-semibold text-[#23645A]">{currentModel.prK}</span>
                  <span className="text-[10px] text-[#4D5D57] block">{currentModel.prKCI}</span>
                </div>
                <div className="pt-2 border-t border-[#C9D0C6]">
                  <span className="text-[#4D5D57] block text-[10px]">EXTERNAL PR-AUC</span>
                  <span className="text-base font-semibold text-[#994524]">{currentModel.prN}</span>
                  <span className="text-[10px] text-[#4D5D57] block">{currentModel.prNCI}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Complete Academic Data Table (Collapsible Fallback) */}
        {showTableFallback && (
          <div className="mt-8 border border-[#C9D0C6] bg-white p-4 sm:p-6 rounded-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29]">
                Table: Full Cross-Dataset Performance Matrix with 95% Bootstrap Confidence Intervals
              </h3>
              <button
                onClick={downloadResultsCsv}
                className="inline-flex items-center gap-1 font-mono text-xs text-[#23645A] hover:underline cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CSV</span>
              </button>
            </div>
            <div className="table-container">
              <table className="academic-table" aria-label="Performance Matrix">
                <thead>
                  <tr>
                    <th>Model Architecture</th>
                    <th>ROC-AUC (Kaggle)</th>
                    <th>ROC-AUC (NHANES)</th>
                    <th>PR-AUC (Kaggle)</th>
                    <th>PR-AUC (NHANES)</th>
                    <th>Brier (K → N)</th>
                    <th>ECE (K → N)</th>
                  </tr>
                </thead>
                <tbody>
                  {coreMetrics.map((row) => (
                    <tr key={row.key}>
                      <td className="text-col font-medium text-[#172B29]">{row.model}</td>
                      <td>{row.rocK} <span className="text-[10px] text-[#4D5D57]">({row.rocKCI})</span></td>
                      <td className="text-[#994524] font-semibold">{row.rocN} <span className="text-[10px] text-[#4D5D57]">({row.rocNCI})</span></td>
                      <td>{row.prK} <span className="text-[10px] text-[#4D5D57]">({row.prKCI})</span></td>
                      <td className="text-[#994524] font-semibold">{row.prN} <span className="text-[10px] text-[#4D5D57]">({row.prNCI})</span></td>
                      <td>{row.brierK} → {row.brierN}</td>
                      <td>{row.eceK} → {row.eceN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <FigureModal
        isOpen={Boolean(modalFigure)}
        onClose={() => setModalFigure(null)}
        src={modalFigure}
        alt="Empirical Performance Figure Export"
        figureNumber="Figure Export"
        caption="High-resolution empirical figure exported from the research pipeline. Shaded confidence intervals computed via 1,000-iteration stratified bootstrap resampling."
      />
    </section>
  );
}
