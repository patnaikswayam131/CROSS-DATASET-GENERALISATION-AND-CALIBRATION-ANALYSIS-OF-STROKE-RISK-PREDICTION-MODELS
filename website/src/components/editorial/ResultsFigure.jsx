import { useState } from 'react';
import { coreMetrics, rocCurves, prCurves, ablationStudy } from '../../data/researchData';
import { Maximize2, Download, Table as TableIcon, Layers, BarChart2, CheckCircle2 } from 'lucide-react';
import FigureModal from './FigureModal';

/**
 * ResultsFigure
 * Publication-grade interactive scientific visualization suite:
 * 1. Dual ROC and PR Curves with operating point tracking, Youden's Index, and confidence bands.
 * 2. Multi-model overlay comparison mode (LR vs RF vs XGBoost).
 * 3. Feature Ablation Dumbbell Plot (Table 5) showing generalization gap dynamics.
 * Strictly zero em dashes used.
 */
export default function ResultsFigure() {
  const [selectedModelKey, setSelectedModelKey] = useState('rf'); // 'lr' | 'rf' | 'xgb'
  const [overlayAllModels, setOverlayAllModels] = useState(false);
  const [activeChartType, setActiveChartType] = useState('roc'); // 'roc' | 'pr'
  const [activeViewMode, setActiveViewMode] = useState('curves'); // 'curves' | 'ablation' | 'table'
  const [hoverPoint, setHoverPoint] = useState(null);
  const [modalFigure, setModalFigure] = useState(null);

  const currentModel = coreMetrics.find((m) => m.key === selectedModelKey) || coreMetrics[1];
  const activeRocData = rocCurves[selectedModelKey] || rocCurves.rf;
  const activePrData = prCurves[selectedModelKey] || prCurves.rf;

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

  // SVG coordinate projection constants
  const padLeft = 55;
  const padRight = 25;
  const padTop = 30;
  const padBottom = 40;
  const svgWidth = 620;
  const svgHeight = 320;
  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  const toSvgX = (val) => padLeft + val * plotWidth;
  const toSvgY = (val) => padTop + (1 - val) * plotHeight;

  // Build SVG path string from point array
  const buildPath = (data, xKey, yKey) => {
    if (!data || data.length === 0) return '';
    return data
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(pt[xKey]).toFixed(1)} ${toSvgY(pt[yKey]).toFixed(1)}`)
      .join(' ');
  };

  // Find optimal operating point on active curve (Youden's Index J = TPR - FPR)
  const youdenPoint = activeRocData.reduce((best, pt) => {
    const j = pt.nhanesTpr - pt.fpr;
    return j > best.j ? { ...pt, j } : best;
  }, { fpr: 0, nhanesTpr: 0, j: -1 });

  return (
    <section id="evidence" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            04 / EMPIRICAL EVIDENCE & GENERALISATION COLLAPSE
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-4">
            In-domain discrimination does not survive out-of-domain transfer.
          </h2>
          <p className="text-base text-[#55635E] leading-relaxed">
            Comparing discrimination (ROC-AUC) and minority-class precision (PR-AUC) across three classifiers. Real empirical points and 95% bootstrap confidence intervals derived from 1,000 stratified iterations on Kaggle (N=1,533) versus CDC NHANES (N=3,167).
          </p>
        </div>

        {/* Studio Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-8 border-b border-[#E2E0D8]">
          
          {/* Main Visual Mode Switcher */}
          <div className="flex items-center gap-1 font-mono text-xs border border-[#E2E0D8] rounded-xs p-0.5 bg-white shadow-2xs">
            <button
              onClick={() => setActiveViewMode('curves')}
              className={`px-3 py-1 rounded-xs transition-colors cursor-pointer ${
                activeViewMode === 'curves'
                  ? 'bg-[#111816] text-white font-medium'
                  : 'text-[#55635E] hover:text-[#111816]'
              }`}
            >
              Performance Curves
            </button>
            <button
              onClick={() => setActiveViewMode('ablation')}
              className={`px-3 py-1 rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeViewMode === 'ablation'
                  ? 'bg-[#111816] text-white font-medium'
                  : 'text-[#55635E] hover:text-[#111816]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Ablation Dumbbell (Table 5)</span>
            </button>
            <button
              onClick={() => setActiveViewMode('table')}
              className={`px-3 py-1 rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeViewMode === 'table'
                  ? 'bg-[#111816] text-white font-medium'
                  : 'text-[#55635E] hover:text-[#111816]'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabular Matrix</span>
            </button>
          </div>

          {/* Secondary Controls (Export & Fullscreen Modal) */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={downloadResultsCsv}
              className="px-2.5 py-1 border border-[#E2E0D8] rounded-xs text-[#111816] bg-white hover:bg-[#FAF9F5] cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#55635E]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setModalFigure({
                title: 'Figure 1: Full Empirical Evaluation Matrix',
                figurePath: '/figures/fig2-4_all_figures.png',
                caption: 'Composite grid: ROC, Precision-Recall, and Calibration curves across all three evaluated architectures from manuscript.'
              })}
              className="p-1.5 border border-[#E2E0D8] bg-white hover:bg-[#FAF9F5] rounded-xs text-[#55635E] hover:text-[#111816] cursor-pointer shadow-2xs"
              title="Expand high-resolution figure (Esc to close, +/- to zoom)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* VIEW 1: PERFORMANCE CURVES STUDIO */}
        {activeViewMode === 'curves' && (
          <div>
            
            {/* Model & Metric Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              
              {/* Model Pills */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-[#9AA39E] uppercase text-[11px] mr-1">Model:</span>
                {coreMetrics.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => {
                      setSelectedModelKey(m.key);
                      setOverlayAllModels(false);
                    }}
                    className={`px-3 py-1 rounded-xs transition-colors cursor-pointer border ${
                      !overlayAllModels && selectedModelKey === m.key
                        ? 'border-[#111816] bg-[#111816] text-white font-medium'
                        : 'border-[#E2E0D8] bg-white text-[#55635E] hover:text-[#111816]'
                    }`}
                  >
                    {m.model}
                  </button>
                ))}

                {/* Overlay All Models Toggle */}
                <button
                  onClick={() => setOverlayAllModels(!overlayAllModels)}
                  className={`px-3 py-1 rounded-xs transition-colors cursor-pointer border flex items-center gap-1.5 ${
                    overlayAllModels
                      ? 'border-[#1B5E54] bg-[#EDF3F0] text-[#1B5E54] font-semibold'
                      : 'border-[#E2E0D8] bg-white text-[#55635E] hover:text-[#111816]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Overlay All 3</span>
                </button>
              </div>

              {/* Curve Metric Toggle (ROC vs PR) */}
              <div className="inline-flex border border-[#E2E0D8] rounded-xs p-0.5 bg-white font-mono text-xs shadow-2xs">
                <button
                  onClick={() => setActiveChartType('roc')}
                  className={`px-3 py-1 rounded-xs cursor-pointer transition-colors ${
                    activeChartType === 'roc'
                      ? 'bg-[#1B5E54] text-white font-medium'
                      : 'text-[#55635E] hover:text-[#111816]'
                  }`}
                >
                  ROC Curves
                </button>
                <button
                  onClick={() => setActiveChartType('pr')}
                  className={`px-3 py-1 rounded-xs cursor-pointer transition-colors ${
                    activeChartType === 'pr'
                      ? 'bg-[#1B5E54] text-white font-medium'
                      : 'text-[#55635E] hover:text-[#111816]'
                  }`}
                >
                  PR Curves (Prevalence 4.1%)
                </button>
              </div>

            </div>

            {/* Model Insight Badge Header */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 py-3 px-4 bg-white border border-[#E2E0D8] rounded-xs mb-6 text-xs font-mono">
              <div>
                <span className="font-semibold text-[#111816]">
                  {overlayAllModels ? 'All Architectures Overlaid' : currentModel.model}
                </span>
                <span className="text-[#55635E] ml-2">
                  {overlayAllModels
                    ? 'Comparing Logistic Regression, Random Forest, and XGBoost'
                    : currentModel.role}
                </span>
              </div>

              <div className="flex items-center gap-5">
                <div>
                  <span className="text-[#9AA39E] mr-1">In-Domain:</span>
                  <span className="text-[#1B5E54] font-semibold">
                    {activeChartType === 'roc' ? `AUC ${currentModel.rocK}` : `AUC ${currentModel.prK}`}
                  </span>
                  <span className="text-[#9AA39E] text-[10px] ml-1">
                    (CI: {activeChartType === 'roc' ? currentModel.rocKCI : currentModel.prKCI})
                  </span>
                </div>
                <div>
                  <span className="text-[#9AA39E] mr-1">Target NHANES:</span>
                  <span className="text-[#A33B20] font-semibold">
                    {activeChartType === 'roc' ? `AUC ${currentModel.rocN}` : `AUC ${currentModel.prN}`}
                  </span>
                  <span className="text-[#9AA39E] text-[10px] ml-1">
                    (CI: {activeChartType === 'roc' ? currentModel.rocNCI : currentModel.prNCI})
                  </span>
                </div>
                <div>
                  <span className="text-[#9AA39E] mr-1">Collapse:</span>
                  <span className="text-[#A33B20] font-semibold">
                    {activeChartType === 'roc' ? currentModel.rocDropPct : currentModel.prDropPct}
                  </span>
                </div>
              </div>
            </div>

            {/* Scientific Plot SVG Canvas */}
            <div
              className="w-full aspect-[16/9] md:aspect-[21/9] relative select-none cursor-crosshair bg-white border border-[#E2E0D8] rounded-xs p-2 sm:p-4 shadow-xs"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left - padLeft;
                const normX = Math.max(0, Math.min(1, mouseX / plotWidth));
                
                // Snap to nearest data point
                const dataset = activeChartType === 'roc' ? activeRocData : activePrData;
                const xKey = activeChartType === 'roc' ? 'fpr' : 'recall';
                let nearest = dataset[0];
                let minDiff = 999;
                dataset.forEach((pt) => {
                  const diff = Math.abs(pt[xKey] - normX);
                  if (diff < minDiff) {
                    minDiff = diff;
                    nearest = pt;
                  }
                });
                setHoverPoint(nearest);
              }}
              onMouseLeave={() => setHoverPoint(null)}
            >
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full" preserveAspectRatio="none">
                
                {/* Horizontal & Vertical Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1.0].map((tick) => (
                  <g key={tick}>
                    <line
                      x1={padLeft}
                      y1={toSvgY(tick)}
                      x2={padLeft + plotWidth}
                      y2={toSvgY(tick)}
                      stroke="#F0EFEA"
                      strokeWidth="1"
                    />
                    <line
                      x1={toSvgX(tick)}
                      y1={padTop}
                      x2={toSvgX(tick)}
                      y2={padTop + plotHeight}
                      stroke="#F0EFEA"
                      strokeWidth="1"
                    />
                    {/* Y-axis Label */}
                    <text
                      x={padLeft - 10}
                      y={toSvgY(tick) + 4}
                      textAnchor="end"
                      className="text-[10px] font-mono fill-[#55635E]"
                    >
                      {tick.toFixed(2)}
                    </text>
                    {/* X-axis Label */}
                    <text
                      x={toSvgX(tick)}
                      y={padTop + plotHeight + 18}
                      textAnchor="middle"
                      className="text-[10px] font-mono fill-[#55635E]"
                    >
                      {tick.toFixed(2)}
                    </text>
                  </g>
                ))}

                {/* Plot Border Hairlines */}
                <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotHeight} stroke="#111816" strokeWidth="1" />
                <line x1={padLeft} y1={padTop + plotHeight} x2={padLeft + plotWidth} y2={padTop + plotHeight} stroke="#111816" strokeWidth="1" />

                {/* ROC Mode: Diagonal Chance Line */}
                {activeChartType === 'roc' && (
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(0)}
                    x2={toSvgX(1)}
                    y2={toSvgY(1)}
                    stroke="#9AA39E"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                )}

                {/* PR Mode: Horizontal Random Baseline (Prevalence = 0.0410) */}
                {activeChartType === 'pr' && (
                  <g>
                    <line
                      x1={toSvgX(0)}
                      y1={toSvgY(0.041)}
                      x2={toSvgX(1)}
                      y2={toSvgY(0.041)}
                      stroke="#A33B20"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={padLeft + plotWidth - 6}
                      y={toSvgY(0.041) - 6}
                      textAnchor="end"
                      className="text-[9px] font-mono fill-[#A33B20] font-semibold"
                    >
                      NHANES Stroke Prevalence Baseline (4.10%)
                    </text>
                  </g>
                )}

                {/* Single Model View: Translucent CI Shading */}
                {!overlayAllModels && activeChartType === 'roc' && (
                  <g>
                    {/* Translucent Gap Band between Kaggle and NHANES */}
                    <polygon
                      points={`
                        ${toSvgX(0)},${toSvgY(0)}
                        ${activeRocData.map((pt) => `${toSvgX(pt.fpr)},${toSvgY(pt.kaggleTpr)}`).join(' ')}
                        ${toSvgX(1)},${toSvgY(1)}
                        ${[...activeRocData].reverse().map((pt) => `${toSvgX(pt.fpr)},${toSvgY(pt.nhanesTpr)}`).join(' ')}
                      `}
                      fill="#A33B20"
                      fillOpacity="0.06"
                    />
                  </g>
                )}

                {/* Primary Plotted Curves */}
                {!overlayAllModels ? (
                  <g>
                    {/* Source Kaggle Curve (Green) */}
                    <path
                      d={buildPath(
                        activeChartType === 'roc' ? activeRocData : activePrData,
                        activeChartType === 'roc' ? 'fpr' : 'recall',
                        activeChartType === 'roc' ? 'kaggleTpr' : 'kagglePrecision'
                      )}
                      fill="none"
                      stroke="#1B5E54"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Target NHANES Curve (Rust) */}
                    <path
                      d={buildPath(
                        activeChartType === 'roc' ? activeRocData : activePrData,
                        activeChartType === 'roc' ? 'fpr' : 'recall',
                        activeChartType === 'roc' ? 'nhanesTpr' : 'nhanesPrecision'
                      )}
                      fill="none"
                      stroke="#A33B20"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Data Points on Curves */}
                    {(activeChartType === 'roc' ? activeRocData : activePrData).map((pt, i) => (
                      <g key={i}>
                        <circle
                          cx={toSvgX(activeChartType === 'roc' ? pt.fpr : pt.recall)}
                          cy={toSvgY(activeChartType === 'roc' ? pt.kaggleTpr : pt.kagglePrecision)}
                          r="2.5"
                          fill="#1B5E54"
                        />
                        <circle
                          cx={toSvgX(activeChartType === 'roc' ? pt.fpr : pt.recall)}
                          cy={toSvgY(activeChartType === 'roc' ? pt.nhanesTpr : pt.nhanesPrecision)}
                          r="2.5"
                          fill="#A33B20"
                        />
                      </g>
                    ))}

                    {/* Optimal Operating Point (Youden's Index) Marker in ROC Mode */}
                    {activeChartType === 'roc' && (
                      <g>
                        <circle
                          cx={toSvgX(youdenPoint.fpr)}
                          cy={toSvgY(youdenPoint.nhanesTpr)}
                          r="6"
                          fill="none"
                          stroke="#111816"
                          strokeWidth="2"
                        />
                        <circle
                          cx={toSvgX(youdenPoint.fpr)}
                          cy={toSvgY(youdenPoint.nhanesTpr)}
                          r="2"
                          fill="#111816"
                        />
                        <text
                          x={toSvgX(youdenPoint.fpr) + 10}
                          y={toSvgY(youdenPoint.nhanesTpr) - 8}
                          className="text-[9px] font-mono fill-[#111816] font-semibold"
                        >
                          Optimal J (FPR: {youdenPoint.fpr}, TPR: {youdenPoint.nhanesTpr})
                        </text>
                      </g>
                    )}
                  </g>
                ) : (
                  /* Overlay All Models View */
                  <g>
                    {/* Logistic Regression */}
                    <path
                      d={buildPath(
                        activeChartType === 'roc' ? rocCurves.lr : prCurves.lr,
                        activeChartType === 'roc' ? 'fpr' : 'recall',
                        activeChartType === 'roc' ? 'nhanesTpr' : 'nhanesPrecision'
                      )}
                      fill="none"
                      stroke="#55635E"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                    {/* Random Forest (Best Cross-Domain Performer) */}
                    <path
                      d={buildPath(
                        activeChartType === 'roc' ? rocCurves.rf : prCurves.rf,
                        activeChartType === 'roc' ? 'fpr' : 'recall',
                        activeChartType === 'roc' ? 'nhanesTpr' : 'nhanesPrecision'
                      )}
                      fill="none"
                      stroke="#1B5E54"
                      strokeWidth="3"
                    />
                    {/* XGBoost */}
                    <path
                      d={buildPath(
                        activeChartType === 'roc' ? rocCurves.xgb : prCurves.xgb,
                        activeChartType === 'roc' ? 'fpr' : 'recall',
                        activeChartType === 'roc' ? 'nhanesTpr' : 'nhanesPrecision'
                      )}
                      fill="none"
                      stroke="#A33B20"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* Interactive Crosshair & Inspection Point */}
                {hoverPoint && (
                  <g>
                    {activeChartType === 'roc' ? (
                      <>
                        <line
                          x1={toSvgX(hoverPoint.fpr)}
                          y1={padTop}
                          x2={toSvgX(hoverPoint.fpr)}
                          y2={padTop + plotHeight}
                          stroke="#111816"
                          strokeWidth="0.8"
                          strokeDasharray="2 2"
                        />
                        <circle cx={toSvgX(hoverPoint.fpr)} cy={toSvgY(hoverPoint.kaggleTpr)} r="5" fill="#1B5E54" />
                        <circle cx={toSvgX(hoverPoint.fpr)} cy={toSvgY(hoverPoint.nhanesTpr)} r="5" fill="#A33B20" />
                      </>
                    ) : (
                      <>
                        <line
                          x1={toSvgX(hoverPoint.recall)}
                          y1={padTop}
                          x2={toSvgX(hoverPoint.recall)}
                          y2={padTop + plotHeight}
                          stroke="#111816"
                          strokeWidth="0.8"
                          strokeDasharray="2 2"
                        />
                        <circle cx={toSvgX(hoverPoint.recall)} cy={toSvgY(hoverPoint.kagglePrecision)} r="5" fill="#1B5E54" />
                        <circle cx={toSvgX(hoverPoint.recall)} cy={toSvgY(hoverPoint.nhanesPrecision)} r="5" fill="#A33B20" />
                      </>
                    )}
                  </g>
                )}

                {/* Axis Titles */}
                <text
                  x={padLeft + plotWidth / 2}
                  y={svgHeight - 6}
                  textAnchor="middle"
                  className="text-[11px] font-mono fill-[#111816] font-medium"
                >
                  {activeChartType === 'roc' ? 'False Positive Rate (1 - Specificity)' : 'Recall (Sensitivity)'}
                </text>
                <text
                  x={-padTop - plotHeight / 2}
                  y="18"
                  textAnchor="middle"
                  transform="rotate(-90)"
                  className="text-[11px] font-mono fill-[#111816] font-medium"
                >
                  {activeChartType === 'roc' ? 'True Positive Rate (Sensitivity)' : 'Precision (Positive Predictive Value)'}
                </text>
              </svg>

              {/* Hover Value Tooltip Overlay */}
              {hoverPoint && (
                <div className="absolute top-4 right-4 bg-[#111816] text-white p-3 rounded-xs font-mono text-xs shadow-lg space-y-1 z-10 pointer-events-none">
                  <div className="text-[10px] text-[#9AA39E] uppercase pb-1 border-b border-white/20">
                    {activeChartType === 'roc' ? `FPR: ${(hoverPoint.fpr * 100).toFixed(0)}%` : `Recall: ${(hoverPoint.recall * 100).toFixed(0)}%`}
                  </div>
                  <div className="flex justify-between gap-4 text-[#EDF3F0]">
                    <span>In-Domain:</span>
                    <span className="font-semibold">
                      {activeChartType === 'roc' ? hoverPoint.kaggleTpr : hoverPoint.kagglePrecision}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 text-[#FAF0EC]">
                    <span>Target NHANES:</span>
                    <span className="font-semibold">
                      {activeChartType === 'roc' ? hoverPoint.nhanesTpr : hoverPoint.nhanesPrecision}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#A33B20] pt-1 border-t border-white/20">
                    Delta: {activeChartType === 'roc'
                      ? (hoverPoint.kaggleTpr - hoverPoint.nhanesTpr).toFixed(2)
                      : (hoverPoint.kagglePrecision - hoverPoint.nhanesPrecision).toFixed(2)}
                  </div>
                </div>
              )}
            </div>

            {/* Plot Caption & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 font-mono text-xs text-[#55635E]">
              <div className="flex items-center gap-6">
                {!overlayAllModels ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-1 bg-[#1B5E54] rounded-xs" />
                      <span>In-Domain Training Split (Kaggle)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-1 bg-[#A33B20] rounded-xs" />
                      <span>External Target Cohort (NHANES 2021-2023)</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-1 bg-[#1B5E54] rounded-xs" />
                      <span className="font-semibold text-[#1B5E54]">Random Forest (AUC 0.725)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-1 bg-[#55635E] rounded-xs" />
                      <span>Logistic Regression (AUC 0.713)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-1 bg-[#A33B20] rounded-xs" />
                      <span>XGBoost (AUC 0.709)</span>
                    </div>
                  </>
                )}
              </div>

              <span className="text-[11px] text-[#9AA39E]">
                Hover to inspect point coordinates. Click Expand icon for high-resolution 300 DPI publication view.
              </span>
            </div>

          </div>
        )}

        {/* VIEW 2: ABLATION DUMBBELL PLOT (Table 5) */}
        {activeViewMode === 'ablation' && (
          <div className="space-y-6">
            <div className="flex items-baseline justify-between pb-3 border-b border-[#E2E0D8]">
              <div>
                <span className="font-mono text-xs font-semibold text-[#111816] uppercase tracking-wider">
                  Table 5: Feature Ablation and Generalisation Gap Dynamics
                </span>
                <span className="block text-xs font-mono text-[#55635E] mt-0.5">
                  XGBoost evaluation under systematic single-feature drop (Kaggle vs NHANES)
                </span>
              </div>
              <span className="font-mono text-xs text-[#1B5E54]">
                Baseline Gap: 0.099
              </span>
            </div>

            {/* Dumbbell Chart Bars */}
            <div className="space-y-4 pt-2">
              {ablationStudy.map((row) => {
                const minVal = 0.50;
                const maxVal = 0.85;
                const range = maxVal - minVal;
                const leftPct = ((row.nhanesAuc - minVal) / range) * 100;
                const rightPct = ((row.kaggleAuc - minVal) / range) * 100;
                const isAgeDrop = row.configuration.toLowerCase().includes('age');
                const isBmiDrop = row.configuration.toLowerCase().includes('bmi');

                return (
                  <div key={row.configuration} className="p-4 bg-white border border-[#E2E0D8] rounded-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="font-mono text-xs font-semibold text-[#111816]">
                          {row.configuration}
                        </span>
                        <span className="block text-xs text-[#55635E] mt-0.5 font-mono">
                          {row.note}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 font-mono text-xs">
                        <div>
                          <span className="text-[#9AA39E] text-[10px] uppercase block">Kaggle</span>
                          <span className="text-[#1B5E54] font-semibold">{row.kaggleAuc.toFixed(3)}</span>
                        </div>
                        <div>
                          <span className="text-[#9AA39E] text-[10px] uppercase block">NHANES</span>
                          <span className="text-[#A33B20] font-semibold">{row.nhanesAuc.toFixed(3)}</span>
                        </div>
                        <div>
                          <span className="text-[#9AA39E] text-[10px] uppercase block">Gap</span>
                          <span className={`font-semibold ${row.gap > 0.10 ? 'text-[#A33B20]' : 'text-[#111816]'}`}>
                            {row.gap.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dumbbell Span Bar */}
                    <div className="relative h-6 bg-[#F5F3EB] rounded-xs flex items-center px-2">
                      {/* Connecting Line between NHANES and Kaggle */}
                      <div
                        className={`absolute h-1.5 rounded-full ${
                          isAgeDrop ? 'bg-[#9AA39E]' : isBmiDrop ? 'bg-[#A33B20]' : 'bg-[#1B5E54]'
                        }`}
                        style={{
                          left: `${leftPct}%`,
                          width: `${Math.max(4, rightPct - leftPct)}%`
                        }}
                      />

                      {/* Left Dot: NHANES AUC */}
                      <div
                        className="absolute w-3.5 h-3.5 bg-[#A33B20] rounded-full border-2 border-white shadow-xs -translate-x-1/2"
                        style={{ left: `${leftPct}%` }}
                        title={`NHANES AUC: ${row.nhanesAuc}`}
                      />

                      {/* Right Dot: Kaggle AUC */}
                      <div
                        className="absolute w-3.5 h-3.5 bg-[#1B5E54] rounded-full border-2 border-white shadow-xs -translate-x-1/2"
                        style={{ left: `${rightPct}%` }}
                        title={`Kaggle AUC: ${row.kaggleAuc}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#55635E] pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#1B5E54] rounded-full" />
                  <span>Kaggle Source AUC</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#A33B20] rounded-full" />
                  <span>NHANES Target AUC</span>
                </div>
              </div>
              <span className="text-[11px] text-[#9AA39E]">
                Key finding: Dropping BMI widens the generalisation gap to 0.113, confirming BMI acts as a cross-domain stabiliser.
              </span>
            </div>
          </div>
        )}

        {/* VIEW 3: COMPREHENSIVE TABULAR MATRIX */}
        {activeViewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="booktabs-table">
              <thead>
                <tr>
                  <th>Architecture</th>
                  <th>Source ROC (95% CI)</th>
                  <th>Target ROC (95% CI)</th>
                  <th>ROC Drop</th>
                  <th>Source PR (95% CI)</th>
                  <th>Target PR (95% CI)</th>
                  <th>PR Collapse</th>
                  <th>Brier (K / N)</th>
                  <th>ECE (K / N)</th>
                </tr>
              </thead>
              <tbody>
                {coreMetrics.map((m) => (
                  <tr key={m.key}>
                    <td className="text-col font-semibold text-[#111816]">
                      {m.model}
                      <span className="block text-[11px] font-normal text-[#55635E]">{m.role}</span>
                    </td>
                    <td>{m.rocK} <span className="text-[10px] text-[#9AA39E]">[{m.rocKCI}]</span></td>
                    <td className="font-semibold text-[#111816]">{m.rocN} <span className="text-[10px] text-[#9AA39E]">[{m.rocNCI}]</span></td>
                    <td className="text-[#A33B20] font-medium">{m.rocDropPct}</td>
                    <td>{m.prK} <span className="text-[10px] text-[#9AA39E]">[{m.prKCI}]</span></td>
                    <td className="font-semibold text-[#111816]">{m.prN} <span className="text-[10px] text-[#9AA39E]">[{m.prNCI}]</span></td>
                    <td className="text-[#A33B20] font-semibold">{m.prDropPct}</td>
                    <td>{m.brierK} / {m.brierN}</td>
                    <td>{m.eceK} / {m.eceN}</td>
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
