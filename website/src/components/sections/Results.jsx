import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts';

import { coreMetrics, shiftAnalysis, ablationStudy, resultsCallouts } from '../../data/projectData';
import {
  rocAucBarData, prAucBarData, psiBarData, PSI_SEVERE_THRESHOLD,
  ksBarData, ablationChartData, conceptShiftBarData, calibrationChartData,
  tooltipStyle, axisStyle, gridStyle,
} from '../../data/chartConfigs';

import { BarChartComparison } from '../charts/BarChartComparison';
import { HorizontalBarChart } from '../charts/HorizontalBarChart';
import { DumbbellChart } from '../charts/DumbbellChart';
import { DeltaBarChart } from '../charts/DeltaBarChart';
import { Badge } from '../ui/Badge';
import { Tabs } from '../ui/Tabs';
import { CalloutBox } from '../ui/CalloutBox';
import { LightboxModal } from '../ui/LightboxModal';

// ─── Severity badge variant mapping ──────────────────────────
const severityVariant = {
  Severe: 'severe',
  Moderate: 'moderate',
  Stable: 'stable',
};

/** Return true when the NHANES value represents degradation for ROC/PR (lower = worse) */
const isDegraded = (nVal, kVal, higherBetter) =>
  higherBetter ? nVal < kVal : nVal > kVal;

// ─── Tab definitions ─────────────────────────────────────────
const TABS = [
  { id: 'performance', label: 'Discrimination (ROC vs PR-AUC)' },
  { id: 'shift', label: 'Distribution Shift (PSI & KS)' },
  { id: 'ablation', label: 'Feature Ablation Matrix' },
  { id: 'concept', label: 'Concept Shift & Post-Hoc Recalibration' },
];

const CAL_COLORS = {
  baseline: '#94a3b8',
  platt: '#10b981',
  isotonic: '#f43f5e',
};

const FigureIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 flex-shrink-0">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// ═════════════════════════════════════════════════════════════
//  Performance Tab
// ═════════════════════════════════════════════════════════════
function PerformanceTab({ onOpenFigure }) {
  const tintClass = 'bg-rose-500/[0.08] text-rose-400 font-semibold font-mono';

  return (
    <div className="space-y-8">
      {/* Core metrics table */}
      <div className="rounded-md border border-white/[0.08] overflow-hidden bg-[#111114]">
        <div className="px-5 py-3 border-b border-white/[0.08] bg-[#0c0c0e] flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-zinc-400">TABLE 1: CROSS-DOMAIN VALIDATION MATRIX</span>
          <span className="text-[11px] font-mono text-zinc-400">N_test(Source)=1,533 · N(Target)=3,167</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#0e0e11] text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Classifier Architecture</th>
                <th className="py-3 px-2 text-center text-zinc-400">ROC-AUC (Kaggle)</th>
                <th className="py-3 px-2 text-center text-zinc-400">ROC-AUC (NHANES)</th>
                <th className="py-3 px-2 text-center text-zinc-400 font-semibold">PR-AUC (Kaggle)</th>
                <th className="py-3 px-2 text-center text-zinc-400 font-semibold">PR-AUC (NHANES)</th>
                <th className="py-3 px-2 text-center text-zinc-400">Brier (K)</th>
                <th className="py-3 px-2 text-center text-zinc-400">Brier (N)</th>
                <th className="py-3 px-2 text-center text-zinc-400">ECE (K)</th>
                <th className="py-3 px-2 text-center text-zinc-400">ECE (N)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {coreMetrics.map((row) => (
                <tr key={row.model} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 text-zinc-200 font-medium whitespace-nowrap">{row.model}</td>
                  <td className="py-3.5 px-2 text-center text-zinc-400 font-mono">{row.rocK.toFixed(3)}</td>
                  <td className={`py-3.5 px-2 text-center font-mono ${isDegraded(row.rocN, row.rocK, true) ? tintClass : 'text-zinc-200'}`}>
                    {row.rocN.toFixed(3)}
                  </td>
                  <td className="py-3.5 px-2 text-center text-zinc-300 font-mono font-semibold">{row.prK.toFixed(3)}</td>
                  <td className={`py-3.5 px-2 text-center font-mono ${isDegraded(row.prN, row.prK, true) ? tintClass : 'text-zinc-200'}`}>
                    {row.prN.toFixed(3)}
                  </td>
                  <td className="py-3.5 px-2 text-center text-zinc-400 font-mono">{row.brierK.toFixed(3)}</td>
                  <td className={`py-3.5 px-2 text-center font-mono ${isDegraded(row.brierN, row.brierK, false) ? tintClass : 'text-zinc-200'}`}>
                    {row.brierN.toFixed(3)}
                  </td>
                  <td className="py-3.5 px-2 text-center text-zinc-400 font-mono">{row.eceK.toFixed(3)}</td>
                  <td className={`py-3.5 px-2 text-center font-mono ${isDegraded(row.eceN, row.eceK, false) ? tintClass : 'text-zinc-200'}`}>
                    {row.eceN.toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROC-AUC & PR-AUC side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-md bg-[#111114] border border-white/[0.08]">
          <BarChartComparison data={rocAucBarData} title="ROC-AUC Comparison (Apparent Resilience)" yDomain={[0.5, 1]} />
        </div>
        <div className="p-6 rounded-md bg-[#111114] border border-white/[0.08]">
          <BarChartComparison data={prAucBarData} title="PR-AUC Comparison (Severe 51–63% Collapse)" yDomain={[0, 0.3]} />
        </div>
      </div>

      {/* Inspection buttons */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => onOpenFigure(
            '/figures/fig2_prauc_collapse (1).png',
            'Figure 2: Precision-Recall AUC Collapse',
            'Precision-Recall curves comparing Kaggle in-domain test set (slate) against NHANES held-out target cohort (crimson). 1,000 bootstrap iterations confirm non-overlapping 95% confidence intervals across Logistic Regression, Random Forest, and XGBoost.'
          )}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] text-xs font-mono bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <FigureIcon />
          <span>[INSPECT FIG 2: PR-AUC COLLAPSE CURVES]</span>
        </button>

        <button
          onClick={() => onOpenFigure(
            '/figures/fig1_performance_summary (1).png',
            'Figure 1: Cross-Domain Performance Summary',
            'Multi-metric comparison matrix illustrating the contrast between resilient ROC-AUC and degraded PR-AUC and Brier scores.'
          )}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] text-xs font-mono bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <FigureIcon />
          <span>[INSPECT FIG 1: MULTI-METRIC RADAR]</span>
        </button>
      </div>

      <CalloutBox variant="danger">
        {resultsCallouts.performance}
      </CalloutBox>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
//  Shift Analysis Tab
// ═════════════════════════════════════════════════════════════
function ShiftAnalysisTab({ onOpenFigure }) {
  return (
    <div className="space-y-8">
      {/* Shift analysis table */}
      <div className="rounded-md border border-white/[0.08] overflow-hidden bg-[#111114]">
        <div className="px-5 py-3 border-b border-white/[0.08] bg-[#0c0c0e] flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-zinc-400">TABLE 2: COVARIATE DISTRIBUTION SHIFT METRICS</span>
          <span className="text-[11px] font-mono text-zinc-400">Threshold: PSI &gt; 0.25 (Severe Action Required)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#0e0e11] text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Biomarker Feature</th>
                <th className="py-3 px-2 text-center text-zinc-400">KS Statistic</th>
                <th className="py-3 px-2 text-center text-zinc-400">KS p-value</th>
                <th className="py-3 px-2 text-center text-zinc-400">Population Stability Index (PSI)</th>
                <th className="py-3 px-2 text-center text-zinc-400">Shift Severity Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {shiftAnalysis.map((row) => (
                <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 text-zinc-200 font-semibold font-mono text-xs">{row.feature}</td>
                  <td className="py-3.5 px-2 text-center text-zinc-300 font-mono">{row.ksStatistic.toFixed(3)}</td>
                  <td className="py-3.5 px-2 text-center text-zinc-400 font-mono text-xs">{row.ksPValue}</td>
                  <td className="py-3.5 px-2 text-center text-rose-400 font-mono font-bold">{row.psi.toFixed(3)}</td>
                  <td className="py-3.5 px-2 text-center">
                    <Badge variant={severityVariant[row.severity] || 'neutral'}>{row.severity}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PSI & KS charts side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-md bg-[#111114] border border-white/[0.08]">
          <HorizontalBarChart
            data={psiBarData}
            title="Population Stability Index (PSI)"
            referenceLine={PSI_SEVERE_THRESHOLD}
            referenceLabel="Severe Shift (&gt;0.25)"
            colorByValue={true}
          />
        </div>
        <div className="p-6 rounded-md bg-[#111114] border border-white/[0.08]">
          <HorizontalBarChart
            data={ksBarData}
            title="Kolmogorov-Smirnov Distance (KS)"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => onOpenFigure(
            '/figures/fig3_shift_analysis (1).png',
            'Figure 3: Empirical Feature Distribution Shift',
            'Density distributions for Age, Glucose, and BMI across Kaggle (slate) vs NHANES (crimson). Highlights the severe rightward shift in glucose and older age skew in NHANES.'
          )}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] text-xs font-mono bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <FigureIcon />
          <span>[INSPECT FIG 3: EMPIRICAL DENSITY OVERLAYS]</span>
        </button>

        <button
          onClick={() => onOpenFigure(
            '/figures/cluster_plot.png',
            'PCA & Latent Cluster Shift Analysis',
            'Two-dimensional PCA projection showing non-overlapping manifold clusters between the Kaggle benchmark sample and the NHANES multi-ethnic target domain.'
          )}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] text-xs font-mono bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <FigureIcon />
          <span>[INSPECT MANIFOLD: 2D LATENT SPACE PROJECTION]</span>
        </button>
      </div>

      <CalloutBox variant="warning">
        {resultsCallouts.shiftAnalysis}
      </CalloutBox>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
//  Ablation Tab
// ═════════════════════════════════════════════════════════════
function AblationTab({ onOpenFigure }) {
  return (
    <div className="space-y-8">
      {/* Ablation table */}
      <div className="rounded-md border border-white/[0.08] overflow-hidden bg-[#111114]">
        <div className="px-5 py-3 border-b border-white/[0.08] bg-[#0c0c0e] flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-zinc-400">TABLE 3: SYSTEMATIC FEATURE ABLATION (XGBOOST)</span>
          <span className="text-[11px] font-mono text-zinc-400">Δ = Kaggle AUC − NHANES AUC</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#0e0e11] text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Feature Configuration</th>
                <th className="py-3 px-2 text-center text-zinc-400">Kaggle ROC-AUC</th>
                <th className="py-3 px-2 text-center text-zinc-400">NHANES ROC-AUC</th>
                <th className="py-3 px-2 text-center text-zinc-400 font-semibold">Generalisation Gap (Δ)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {ablationStudy.map((row) => (
                <tr key={row.configuration} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 text-zinc-200 font-medium font-mono text-xs">{row.configuration}</td>
                  <td className="py-3.5 px-2 text-center text-zinc-400 font-mono">{row.kaggleAuc.toFixed(3)}</td>
                  <td className="py-3.5 px-2 text-center text-rose-400 font-mono font-medium">{row.nhanesAuc.toFixed(3)}</td>
                  <td className="py-3.5 px-2 text-center text-amber-400 font-mono font-bold">{row.gap.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 rounded-md bg-[#111114] border border-white/[0.08]">
        <DumbbellChart data={ablationChartData} title="Ablation Analysis: ROC-AUC Sensitivity by Feature Subset" />
      </div>

      <div>
        <button
          onClick={() => onOpenFigure(
            '/figures/fig4_ablation (1).png',
            'Figure 4: Systematic Feature Ablation Matrix',
            'Ablation analysis demonstrating that removing Age causes the largest single drop in performance, while glucose and bmi removal highlight disproportionate dependency under covariate shift.'
          )}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] text-xs font-mono bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <FigureIcon />
          <span>[INSPECT FIG 4: SYSTEMATIC FEATURE ABLATION HEATMAP]</span>
        </button>
      </div>

      <CalloutBox variant="primary">
        {resultsCallouts.ablation}
      </CalloutBox>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
//  Concept Shift & Calibration Tab
// ═════════════════════════════════════════════════════════════
function ConceptShiftTab({ onOpenFigure }) {
  return (
    <div className="space-y-8">
      {/* Feature patching delta chart */}
      <div className="p-6 rounded-md bg-[#111114] border border-white/[0.08]">
        <DeltaBarChart data={conceptShiftBarData} title="Feature Patching: Conditional Concept Shift (δ = ROC-AUC Change)" />
      </div>

      <p className="text-xs font-mono text-zinc-400 leading-relaxed bg-[#0c0c0e] p-4 rounded-md border border-white/[0.06]">
        * METHODOLOGICAL NOTE: Feature patching replaces one empirical marginal distribution at a time with source-domain values. 
        Uniformly negative deltas across all features confirm concurrent conditional concept shift: 
        the underlying P(Y | X) mapping diverges fundamentally between populations, ruling out pure covariate shift.
      </p>

      {/* Calibration grouped bar chart */}
      <div className="p-6 rounded-md bg-[#111114] border border-white/[0.08]">
        <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-6 text-center">
          POST-HOC RECALIBRATION ON NHANES TARGET DOMAIN
        </h4>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={calibrationChartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            barCategoryGap="25%"
            barGap={4}
          >
            <CartesianGrid {...gridStyle} vertical={false} />
            <XAxis
              dataKey="model"
              {...axisStyle}
              tick={{ ...axisStyle.tick, fontSize: 11 }}
              interval={0}
            />
            <YAxis
              domain={[0.5, 0.8]}
              {...axisStyle}
              tickFormatter={(v) => v.toFixed(2)}
            />
            <Tooltip
              {...tooltipStyle}
              formatter={(value, name) => {
                const labels = { baseline: 'Baseline (Uncalibrated)', platt: 'Platt Scaling (Sigmoid)', isotonic: 'Isotonic Regression' };
                return [value.toFixed(3), labels[name] || name];
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#a1a1aa' }}
              formatter={(value) => {
                const labels = { baseline: 'Baseline', platt: 'Platt Scaling', isotonic: 'Isotonic' };
                return labels[value] || value;
              }}
            />
            <Bar dataKey="baseline" fill={CAL_COLORS.baseline} radius={[2, 2, 0, 0]} maxBarSize={36} />
            <Bar dataKey="platt" fill={CAL_COLORS.platt} radius={[2, 2, 0, 0]} maxBarSize={36} />
            <Bar dataKey="isotonic" fill={CAL_COLORS.isotonic} radius={[2, 2, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => onOpenFigure(
            '/figures/fig7_calibration (1).png',
            'Figure 7: Reliability Diagrams & Calibration Curves',
            'Reliability curves showing expected vs observed stroke fraction. Post-hoc Platt scaling and isotonic regression fail to restore calibration due to high baseline ECE (0.445).'
          )}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] text-xs font-mono bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <FigureIcon />
          <span>[INSPECT FIG 7: RELIABILITY DIAGRAMS & ECE CURVES]</span>
        </button>

        <button
          onClick={() => onOpenFigure(
            '/figures/fig5_concept_shift (1).png',
            'Figure 5: Concept Shift & Feature Patching',
            'Empirical verification of concept drift showing negative deltas across all patched covariates.'
          )}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] text-xs font-mono bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <FigureIcon />
          <span>[INSPECT FIG 5: FEATURE PATCHING SENSITIVITY]</span>
        </button>
      </div>

      <CalloutBox variant="danger">
        Isotonic regression on XGBoost caused a catastrophic −0.130 ROC-AUC drop (0.709 → 0.579), 
        demonstrating that non-parametric post-hoc calibration overfits to target label noise when applied 
        across divergent feature spaces without joint domain-invariant representation learning.
      </CalloutBox>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
//  Results Section
// ═════════════════════════════════════════════════════════════
export function Results() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    imageSrc: '',
    title: '',
    caption: '',
  });

  const handleOpenFigure = (imageSrc, title, caption) => {
    setModalState({
      isOpen: true,
      imageSrc,
      title,
      caption,
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <section id="results" className="py-24 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
            04 / EMPIRICAL AUDIT RESULTS
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            Performance Breakdown Under Domain Shift
          </h2>
          <p className="text-sm text-zinc-400 max-w-3xl mt-3 leading-relaxed">
            Multi-metric empirical evaluation proving that standard hold-out ROC-AUC conceals severe PR-AUC collapse (51–63%), 
            accompanied by severe covariate shift in glucose (PSI = 1.495) and catastrophic post-hoc calibration degradation.
          </p>
        </div>

        {/* Tabs */}
        <Tabs tabs={TABS}>
          {(activeTab) => {
            switch (activeTab) {
              case 'performance':
                return <PerformanceTab onOpenFigure={handleOpenFigure} />;
              case 'shift':
                return <ShiftAnalysisTab onOpenFigure={handleOpenFigure} />;
              case 'ablation':
                return <AblationTab onOpenFigure={handleOpenFigure} />;
              case 'concept':
                return <ConceptShiftTab onOpenFigure={handleOpenFigure} />;
              default:
                return null;
            }
          }}
        </Tabs>

        {/* Lightbox Modal for Full-Screen Figure Inspection */}
        <LightboxModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          imageSrc={modalState.imageSrc}
          title={modalState.title}
          caption={modalState.caption}
        />
      </div>
    </section>
  );
}

export default Results;
