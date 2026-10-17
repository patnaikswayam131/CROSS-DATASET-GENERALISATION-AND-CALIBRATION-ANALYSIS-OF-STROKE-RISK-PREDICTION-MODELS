import { useState } from 'react';
import { coreMetrics, rocCurves, prCurves, ablationStudy, praucCollapseData } from '../../data/researchData';
import { Maximize2, Download, Table as TableIcon, Layers, BarChart2, CheckCircle2 } from 'lucide-react';
import FigureModal from './FigureModal';

/**
 * ResultsFigure
 * Publication-grade interactive scientific visualization suite:
 * 1. Dual ROC and PR Curves with operating point tracking, Youden's Index, and confidence bands.
 * 2. Dedicated Figure 2 view: PR-AUC Collapse and Lift Ratio dual bar chart matching publication figure.
 * 3. Multi-model overlay comparison mode (LR vs RF vs XGBoost).
 * 4. Feature Ablation Dumbbell Plot (Table 5) showing generalization gap dynamics.
 * Strictly zero em dashes used.
 */
export default function ResultsFigure() {
  const [selectedModelKey, setSelectedModelKey] = useState('rf'); // 'lr' | 'rf' | 'xgb'
  const [overlayAllModels, setOverlayAllModels] = useState(false);
  const [activeChartType, setActiveChartType] = useState('pr'); // 'roc' | 'pr' | 'fig2'
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
  const padTop = 36;
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
              Performance Curves Studio
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
              onClick={() => {
                if (activeChartType === 'fig2') {
                  setModalFigure({
                    title: 'Figure 2: PR-AUC Collapse & Lift Ratio',
                    figurePath: '/figures/fig2_prauc_collapse (1).png',
                    caption: 'Manuscript Figure 2: (A) PR-AUC collapse under domain shift with percentage drops, and (B) lift ratio over random 4.10% baseline.'
                  });
                } else {
                  setModalFigure({
                    title: 'Figure 2-4: Composite Evaluation Matrix',
                    figurePath: '/figures/fig2-4_all_figures.png',
                    caption: 'Full 3x3 ROC, Precision-Recall, and Calibration curve grid across all three architectures from manuscript.'
                  });
                }
              }}
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
              
              {/* Model Pills (Only active in ROC / PR curve views) */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-[#9AA39E] uppercase text-[11px] mr-1">Model:</span>
                {coreMetrics.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => {
                      setSelectedModelKey(m.key);
                      setOverlayAllModels(false);
                      if (activeChartType === 'fig2') setActiveChartType('pr');
                    }}
                    className={`px-3 py-1 rounded-xs transition-colors cursor-pointer border ${
                      activeChartType !== 'fig2' && !overlayAllModels && selectedModelKey === m.key
                        ? 'border-[#111816] bg-[#111816] text-white font-medium'
                        : 'border-[#E2E0D8] bg-white text-[#55635E] hover:text-[#111816]'
                    }`}
                  >
                    {m.model}
                  </button>
                ))}

                {/* Overlay All Models Toggle */}
                {activeChartType !== 'fig2' && (
                  <button
                    onClick={() => setOverlayAllModels(!overlayAllModels)}
                    className={`px-3 py-1 rounded-xs transition-colors cursor-pointer border flex items-center gap-1.5 ${
                      overlayAllModels
                        ? 'border-[#1565C0] bg-[#EFF6FF] text-[#1565C0] font-semibold'
                        : 'border-[#E2E0D8] bg-white text-[#55635E] hover:text-[#111816]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Overlay All 3</span>
                  </button>
                )}
              </div>

              {/* Curve Metric & Figure 2 Toggle Pills */}
              <div className="inline-flex border border-[#E2E0D8] rounded-xs p-0.5 bg-white font-mono text-xs shadow-2xs">
                <button
                  onClick={() => setActiveChartType('pr')}
                  className={`px-3 py-1 rounded-xs cursor-pointer transition-colors ${
                    activeChartType === 'pr'
                      ? 'bg-[#111816] text-white font-medium'
                      : 'text-[#55635E] hover:text-[#111816]'
                  }`}
                >
                  PR Curves (Empirical)
                </button>
                <button
                  onClick={() => setActiveChartType('fig2')}
                  className={`px-3 py-1 rounded-xs cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeChartType === 'fig2'
                      ? 'bg-[#1565C0] text-white font-medium'
                      : 'text-[#55635E] hover:text-[#1565C0]'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Figure 2: Collapse & Lift</span>
                </button>
                <button
                  onClick={() => setActiveChartType('roc')}
                  className={`px-3 py-1 rounded-xs cursor-pointer transition-colors ${
                    activeChartType === 'roc'
                      ? 'bg-[#111816] text-white font-medium'
                      : 'text-[#55635E] hover:text-[#111816]'
                  }`}
                >
                  ROC Curves
                </button>
              </div>

            </div>

            {/* Model Insight Badge Header */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 py-3 px-4 bg-white border border-[#E2E0D8] rounded-xs mb-6 text-xs font-mono">
              {activeChartType === 'fig2' ? (
                <>
                  <div>
                    <span className="font-semibold text-[#111816]">
                      Figure 2: Cross-Domain PR-AUC Collapse & Lift Ratio Comparison
                    </span>
                    <span className="text-[#55635E] ml-2">
                      Kaggle benchmark vs CDC NHANES cohort (Prevalence 4.10%)
                    </span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div>
                      <span className="text-[#9AA39E] mr-1">Prevalence Baseline:</span>
                      <span className="text-[#71717A] font-semibold">0.041 (1.0x)</span>
                    </div>
                    <div>
                      <span className="text-[#9AA39E] mr-1">Maximum Collapse:</span>
                      <span className="text-[#B71C1C] font-semibold">LR -63% (4.4x to 1.9x)</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                      <span className="text-[#1565C0] font-semibold">
                        {activeChartType === 'roc' ? `AUC ${currentModel.rocK}` : `AP ${currentModel.prK}`}
                      </span>
                      <span className="text-[#9AA39E] text-[10px] ml-1">
                        (CI: {activeChartType === 'roc' ? currentModel.rocKCI : currentModel.prKCI})
                      </span>
                    </div>
                    <div>
                      <span className="text-[#9AA39E] mr-1">Target NHANES:</span>
                      <span className="text-[#B71C1C] font-semibold">
                        {activeChartType === 'roc' ? `AUC ${currentModel.rocN}` : `AP ${currentModel.prN}`}
                      </span>
                      <span className="text-[#9AA39E] text-[10px] ml-1">
                        (CI: {activeChartType === 'roc' ? currentModel.rocNCI : currentModel.prNCI})
                      </span>
                    </div>
                    <div>
                      <span className="text-[#9AA39E] mr-1">Collapse:</span>
                      <span className="text-[#B71C1C] font-semibold">
                        {activeChartType === 'roc' ? currentModel.rocDropPct : currentModel.prDropPct}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* CHART VIEW A: FIGURE 2 DUAL-PANEL COMPONENT (RECREATES fig2_prauc_collapse.png) */}
            {activeChartType === 'fig2' ? (
              <div className="w-full bg-white border border-[#E2E0D8] rounded-xs p-3 sm:p-5 shadow-xs">
                {/* Header row with Figure 2 expand action */}
                <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[#F0EFEA] font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#111816]">
                      Manuscript Figure 2: (A) PR-AUC Collapse & (B) Lift Ratio Over Baseline
                    </span>
                  </div>
                  <button
                    onClick={() => setModalFigure({
                      title: 'Figure 2: PR-AUC Collapse & Lift Ratio',
                      figurePath: '/figures/fig2_prauc_collapse (1).png',
                      caption: 'Manuscript Figure 2: (A) PR-AUC collapse under domain shift with drop percentage arrows, and (B) lift ratio over the 4.10% random prevalence baseline.'
                    })}
                    className="px-2.5 py-1 border border-[#E2E0D8] rounded-xs text-[#1565C0] bg-white hover:bg-[#F8FAFC] cursor-pointer inline-flex items-center gap-1.5 shadow-2xs text-[11px]"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#1565C0]" />
                    <span>Expand Manuscript PNG</span>
                  </button>
                </div>

                {/* SVG Dual Panel Visualization */}
                <div className="w-full aspect-[16/9] sm:aspect-[2.2/1] relative select-none">
                  <svg viewBox="0 0 900 340" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    {/* PANEL A: PR-AUC Collapse */}
                    <g>
                      {/* Title */}
                      <text x="50" y="24" className="text-[13px] font-mono font-bold fill-[#111816]">
                        (A) PR-AUC Collapse Under Domain Shift
                      </text>
                      
                      {/* Axes Hairlines */}
                      <line x1="60" y1="38" x2="60" y2="270" stroke="#111816" strokeWidth="1" />
                      <line x1="60" y1="270" x2="430" y2="270" stroke="#111816" strokeWidth="1" />
                      
                      {/* Y-axis label */}
                      <text x="-154" y="18" transform="rotate(-90)" textAnchor="middle" className="text-[11px] font-mono fill-[#111816]">
                        PR-AUC (Average Precision)
                      </text>
                      
                      {/* Grid lines and Y ticks [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35] */}
                      {[0.00, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35].map((val) => {
                        const yPos = 270 - (val / 0.35) * 232;
                        return (
                          <g key={val}>
                            <line x1="60" y1={yPos} x2="430" y2={yPos} stroke="#F0EFEA" strokeWidth="0.8" />
                            <line x1="56" y1={yPos} x2="60" y2={yPos} stroke="#111816" strokeWidth="1" />
                            <text x="52" y={yPos + 3.5} textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">
                              {val.toFixed(2)}
                            </text>
                          </g>
                        );
                      })}
                      
                      {/* Random Baseline Line at 0.041 */}
                      <line
                        x1="60"
                        y1={270 - (0.041 / 0.35) * 232}
                        x2="430"
                        y2={270 - (0.041 / 0.35) * 232}
                        stroke="#71717A"
                        strokeWidth="1.2"
                        strokeDasharray="4 4"
                      />

                      {/* Legend A */}
                      <g transform="translate(290, 40)">
                        <rect x="0" y="0" width="135" height="54" fill="white" fillOpacity="0.92" stroke="#E2E0D8" strokeWidth="0.8" rx="2" />
                        <line x1="8" y1="12" x2="24" y2="12" stroke="#71717A" strokeWidth="1.2" strokeDasharray="3 3" />
                        <text x="28" y="15" className="text-[9px] font-mono fill-[#55635E]">Random baseline</text>
                        <rect x="8" y="24" width="14" height="10" fill="#3B77AF" rx="1" />
                        <text x="28" y="32" className="text-[9px] font-mono fill-[#111816]">Kaggle</text>
                        <rect x="8" y="38" width="14" height="10" fill="#D4705D" rx="1" />
                        <text x="28" y="46" className="text-[9px] font-mono fill-[#111816]">NHANES</text>
                      </g>

                      {/* Model Bars */}
                      {praucCollapseData.models.map((m, idx) => {
                        const centerX = 125 + idx * 115;
                        const barW = 28;
                        const gap = 4;
                        const kX = centerX - barW - gap / 2;
                        const nX = centerX + gap / 2;
                        const kH = (m.kagglePrAuc / 0.35) * 232;
                        const nH = (m.nhanesPrAuc / 0.35) * 232;
                        const kY = 270 - kH;
                        const nY = 270 - nH;
                        
                        return (
                          <g key={m.shortName}>
                            {/* Kaggle Bar */}
                            <rect x={kX} y={kY} width={barW} height={kH} fill="#3B77AF" rx="1" />
                            <text x={kX + barW / 2} y={kY - 5} textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#1E40AF]">
                              {m.kagglePrAuc.toFixed(3)}
                            </text>

                            {/* NHANES Bar */}
                            <rect x={nX} y={nY} width={barW} height={nH} fill="#D4705D" rx="1" />
                            <text x={nX + barW / 2} y={nY - 5} textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#B91C1C]">
                              {m.nhanesPrAuc.toFixed(3)}
                            </text>

                            {/* Drop Arrow and Percentage */}
                            <path
                              d={`M ${kX + barW / 2 + 2} ${kY + 12} L ${nX + barW / 2 - 2} ${nY - 2}`}
                              stroke="#7E22CE"
                              strokeWidth="1.8"
                              fill="none"
                              markerEnd="url(#arrow-purple)"
                            />
                            <text x={centerX} y={(kY + nY) / 2 + 4} textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#7E22CE]">
                              ↓{m.dropPct}
                            </text>

                            {/* X Category Label */}
                            {m.name === 'Logistic Regression' ? (
                              <>
                                <text x={centerX} y="286" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">Logistic</text>
                                <text x={centerX} y="298" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">Regression</text>
                              </>
                            ) : m.name === 'Random Forest' ? (
                              <>
                                <text x={centerX} y="286" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">Random</text>
                                <text x={centerX} y="298" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">Forest</text>
                              </>
                            ) : (
                              <text x={centerX} y="288" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">XGBoost</text>
                            )}
                          </g>
                        );
                      })}
                    </g>

                    {/* PANEL B: Lift Ratio */}
                    <g transform="translate(460, 0)">
                      {/* Title */}
                      <text x="50" y="24" className="text-[13px] font-mono font-bold fill-[#111816]">
                        (B) Lift Ratio - PR-AUC ÷ Prevalence Baseline
                      </text>
                      
                      {/* Axes Hairlines */}
                      <line x1="60" y1="38" x2="60" y2="270" stroke="#111816" strokeWidth="1" />
                      <line x1="60" y1="270" x2="420" y2="270" stroke="#111816" strokeWidth="1" />
                      
                      {/* Y-axis label */}
                      <text x="-154" y="18" transform="rotate(-90)" textAnchor="middle" className="text-[11px] font-mono fill-[#111816]">
                        Lift over random classifier (x)
                      </text>
                      
                      {/* Grid lines and Y ticks [0, 1, 2, 3, 4, 5, 6] */}
                      {[0, 1, 2, 3, 4, 5, 6].map((val) => {
                        const yPos = 270 - (val / 6.0) * 232;
                        return (
                          <g key={val}>
                            <line x1="60" y1={yPos} x2="420" y2={yPos} stroke="#F0EFEA" strokeWidth="0.8" />
                            <line x1="56" y1={yPos} x2="60" y2={yPos} stroke="#111816" strokeWidth="1" />
                            <text x="52" y={yPos + 3.5} textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">
                              {val}
                            </text>
                          </g>
                        );
                      })}
                      
                      {/* Random Baseline Line at 1.0 */}
                      <line
                        x1="60"
                        y1={270 - (1.0 / 6.0) * 232}
                        x2="420"
                        y2={270 - (1.0 / 6.0) * 232}
                        stroke="#71717A"
                        strokeWidth="1.2"
                        strokeDasharray="4 4"
                      />

                      {/* Legend B */}
                      <g transform="translate(265, 40)">
                        <rect x="0" y="0" width="150" height="54" fill="white" fillOpacity="0.92" stroke="#E2E0D8" strokeWidth="0.8" rx="2" />
                        <line x1="8" y1="12" x2="24" y2="12" stroke="#71717A" strokeWidth="1.2" strokeDasharray="3 3" />
                        <text x="28" y="15" className="text-[9px] font-mono fill-[#55635E]">Random baseline (1x)</text>
                        <rect x="8" y="24" width="14" height="10" fill="#3B77AF" rx="1" />
                        <text x="28" y="32" className="text-[9px] font-mono fill-[#111816]">Kaggle</text>
                        <rect x="8" y="38" width="14" height="10" fill="#D4705D" rx="1" />
                        <text x="28" y="46" className="text-[9px] font-mono fill-[#111816]">NHANES</text>
                      </g>

                      {/* Model Bars */}
                      {praucCollapseData.models.map((m, idx) => {
                        const centerX = 125 + idx * 115;
                        const barW = 28;
                        const gap = 4;
                        const kX = centerX - barW - gap / 2;
                        const nX = centerX + gap / 2;
                        const kH = (m.kaggleLift / 6.0) * 232;
                        const nH = (m.nhanesLift / 6.0) * 232;
                        const kY = 270 - kH;
                        const nY = 270 - nH;
                        
                        return (
                          <g key={m.shortName}>
                            {/* Kaggle Bar */}
                            <rect x={kX} y={kY} width={barW} height={kH} fill="#3B77AF" rx="1" />
                            <text x={kX + barW / 2} y={kY - 5} textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#1E40AF]">
                              {m.kaggleLift.toFixed(1)}x
                            </text>

                            {/* NHANES Bar */}
                            <rect x={nX} y={nY} width={barW} height={nH} fill="#D4705D" rx="1" />
                            <text x={nX + barW / 2} y={nY - 5} textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#B91C1C]">
                              {m.nhanesLift.toFixed(1)}x
                            </text>

                            {/* X Category Label */}
                            {m.name === 'Logistic Regression' ? (
                              <>
                                <text x={centerX} y="286" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">Logistic</text>
                                <text x={centerX} y="298" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">Regression</text>
                              </>
                            ) : m.name === 'Random Forest' ? (
                              <>
                                <text x={centerX} y="286" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">Random</text>
                                <text x={centerX} y="298" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">Forest</text>
                              </>
                            ) : (
                              <text x={centerX} y="288" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">XGBoost</text>
                            )}
                          </g>
                        );
                      })}
                    </g>

                    {/* Arrow Marker */}
                    <defs>
                      <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 8 5 L 0 9 z" fill="#7E22CE" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>
            ) : (
              /* CHART VIEW B: SCIENTIFIC PLOT SVG CANVAS (ROC & PR EMPIRICAL TRAJECTORY) */
              <div
                className="w-full aspect-[16/9] md:aspect-[21/9] relative select-none cursor-crosshair bg-white border border-[#E2E0D8] rounded-xs p-2 sm:p-4 shadow-xs"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const mouseX = e.clientX - rect.left - padLeft;
                  const normX = Math.max(0, Math.min(1, mouseX / plotWidth));
                  
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
                  
                  {/* Grid Lines */}
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
                        stroke="#71717A"
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                      />
                      <text
                        x={padLeft + plotWidth - 6}
                        y={toSvgY(0.041) - 6}
                        textAnchor="end"
                        className="text-[9px] font-mono fill-[#71717A] font-medium"
                      >
                        Random Baseline: 4.10% (Prevalence)
                      </text>
                    </g>
                  )}

                  {/* In-Plot Publication Title and Legend (Recreates all_figures.png style) */}
                  {!overlayAllModels && (
                    <>
                      {/* Subplot Title in Top Left */}
                      <text
                        x={padLeft + 12}
                        y={padTop + 20}
                        className="text-[12px] font-mono font-bold fill-[#111816]"
                      >
                        {activeChartType === 'roc' ? `ROC: ${currentModel.model}` : `PR: ${currentModel.model}`}
                      </text>

                      {/* Subplot Legend Box */}
                      {activeChartType === 'pr' ? (
                        <g transform={`translate(${padLeft + plotWidth - 142}, ${padTop + 8})`}>
                          <rect x="0" y="0" width="138" height="46" fill="white" fillOpacity="0.92" stroke="#E2E0D8" strokeWidth="0.8" rx="2" />
                          <line x1="8" y1="14" x2="24" y2="14" stroke="#1565C0" strokeWidth="2" />
                          <text x="30" y="17" className="text-[10px] font-mono fill-[#1565C0] font-semibold">
                            Kaggle AP={currentModel.prK}
                          </text>
                          <line x1="8" y1="30" x2="24" y2="30" stroke="#B71C1C" strokeWidth="2" />
                          <text x="30" y="33" className="text-[10px] font-mono fill-[#B71C1C] font-semibold">
                            NHANES AP={currentModel.prN}
                          </text>
                        </g>
                      ) : (
                        <g transform={`translate(${padLeft + 12}, ${padTop + 30})`}>
                          <rect x="0" y="0" width="144" height="46" fill="white" fillOpacity="0.92" stroke="#E2E0D8" strokeWidth="0.8" rx="2" />
                          <line x1="8" y1="14" x2="24" y2="14" stroke="#1565C0" strokeWidth="2" />
                          <text x="30" y="17" className="text-[10px] font-mono fill-[#1565C0] font-semibold">
                            Kaggle AUC={currentModel.rocK}
                          </text>
                          <line x1="8" y1="30" x2="24" y2="30" stroke="#B71C1C" strokeWidth="2" />
                          <text x="30" y="33" className="text-[10px] font-mono fill-[#B71C1C] font-semibold">
                            NHANES AUC={currentModel.rocN}
                          </text>
                        </g>
                      )}
                    </>
                  )}

                  {/* ROC Shading Band */}
                  {!overlayAllModels && activeChartType === 'roc' && (
                    <polygon
                      points={`
                        ${toSvgX(0)},${toSvgY(0)}
                        ${activeRocData.map((pt) => `${toSvgX(pt.fpr)},${toSvgY(pt.kaggleTpr)}`).join(' ')}
                        ${toSvgX(1)},${toSvgY(1)}
                        ${[...activeRocData].reverse().map((pt) => `${toSvgX(pt.fpr)},${toSvgY(pt.nhanesTpr)}`).join(' ')}
                      `}
                      fill="#B71C1C"
                      fillOpacity="0.06"
                    />
                  )}

                  {/* Primary Plotted Curves (Single Model Mode) */}
                  {!overlayAllModels ? (
                    <g>
                      {/* Kaggle Curve (Publication Blue #1565C0) */}
                      <path
                        d={buildPath(
                          activeChartType === 'roc' ? activeRocData : activePrData,
                          activeChartType === 'roc' ? 'fpr' : 'recall',
                          activeChartType === 'roc' ? 'kaggleTpr' : 'kagglePrecision'
                        )}
                        fill="none"
                        stroke="#1565C0"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />

                      {/* Target NHANES Curve (Publication Crimson #B71C1C) */}
                      <path
                        d={buildPath(
                          activeChartType === 'roc' ? activeRocData : activePrData,
                          activeChartType === 'roc' ? 'fpr' : 'recall',
                          activeChartType === 'roc' ? 'nhanesTpr' : 'nhanesPrecision'
                        )}
                        fill="none"
                        stroke="#B71C1C"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />

                      {/* Optimal Operating Point (Youden's Index J) Marker in ROC Mode */}
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
                      {/* Random Forest */}
                      <path
                        d={buildPath(
                          activeChartType === 'roc' ? rocCurves.rf : prCurves.rf,
                          activeChartType === 'roc' ? 'fpr' : 'recall',
                          activeChartType === 'roc' ? 'nhanesTpr' : 'nhanesPrecision'
                        )}
                        fill="none"
                        stroke="#1565C0"
                        strokeWidth="2.6"
                      />
                      {/* XGBoost */}
                      <path
                        d={buildPath(
                          activeChartType === 'roc' ? rocCurves.xgb : prCurves.xgb,
                          activeChartType === 'roc' ? 'fpr' : 'recall',
                          activeChartType === 'roc' ? 'nhanesTpr' : 'nhanesPrecision'
                        )}
                        fill="none"
                        stroke="#B71C1C"
                        strokeWidth="2.2"
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
                          <circle cx={toSvgX(hoverPoint.fpr)} cy={toSvgY(hoverPoint.kaggleTpr)} r="4.5" fill="#1565C0" />
                          <circle cx={toSvgX(hoverPoint.fpr)} cy={toSvgY(hoverPoint.nhanesTpr)} r="4.5" fill="#B71C1C" />
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
                          <circle cx={toSvgX(hoverPoint.recall)} cy={toSvgY(hoverPoint.kagglePrecision)} r="4.5" fill="#1565C0" />
                          <circle cx={toSvgX(hoverPoint.recall)} cy={toSvgY(hoverPoint.nhanesPrecision)} r="4.5" fill="#B71C1C" />
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
                    {activeChartType === 'roc' ? 'False Positive Rate (FPR)' : 'Recall'}
                  </text>
                  <text
                    x={-padTop - plotHeight / 2}
                    y="18"
                    textAnchor="middle"
                    transform="rotate(-90)"
                    className="text-[11px] font-mono fill-[#111816] font-medium"
                  >
                    {activeChartType === 'roc' ? 'True Positive Rate (TPR)' : 'Precision'}
                  </text>
                </svg>

                {/* Hover Value Tooltip Overlay */}
                {hoverPoint && (
                  <div className="absolute bottom-4 right-4 bg-[#111816] text-white p-3 rounded-xs font-mono text-xs shadow-lg space-y-1 z-10 pointer-events-none">
                    <div className="text-[10px] text-[#9AA39E] uppercase pb-1 border-b border-white/20">
                      {activeChartType === 'roc' ? `FPR: ${(hoverPoint.fpr * 100).toFixed(0)}%` : `Recall: ${(hoverPoint.recall * 100).toFixed(0)}%`}
                    </div>
                    <div className="flex justify-between gap-4 text-[#BFDBFE]">
                      <span>Kaggle:</span>
                      <span className="font-semibold">
                        {activeChartType === 'roc' ? hoverPoint.kaggleTpr : hoverPoint.kagglePrecision}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 text-[#FECACA]">
                      <span>NHANES:</span>
                      <span className="font-semibold">
                        {activeChartType === 'roc' ? hoverPoint.nhanesTpr : hoverPoint.nhanesPrecision}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#F87171] pt-1 border-t border-white/20">
                      Delta: {activeChartType === 'roc'
                        ? (hoverPoint.kaggleTpr - hoverPoint.nhanesTpr).toFixed(3)
                        : (hoverPoint.kagglePrecision - hoverPoint.nhanesPrecision).toFixed(3)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Plot Caption & Legend Footer */}
            {activeChartType !== 'fig2' && (
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4 font-mono text-xs text-[#55635E]">
                <div className="flex items-center gap-6">
                  {!overlayAllModels ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-1 bg-[#1565C0] rounded-xs" />
                        <span>In-Domain Training Split (Kaggle)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-1 bg-[#B71C1C] rounded-xs" />
                        <span>External Target Cohort (NHANES 2021-2023)</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-1 bg-[#1565C0] rounded-xs" />
                        <span className="font-semibold text-[#1565C0]">Random Forest</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-1 bg-[#55635E] rounded-xs" />
                        <span>Logistic Regression</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-1 bg-[#B71C1C] rounded-xs" />
                        <span>XGBoost</span>
                      </div>
                    </>
                  )}
                </div>

                <span className="text-[11px] text-[#9AA39E]">
                  Continuous scikit-learn empirical step trajectory. Click Expand icon above for 3x3 manuscript composite.
                </span>
              </div>
            )}

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
