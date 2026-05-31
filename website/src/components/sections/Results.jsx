import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell,
} from 'recharts';

import { coreMetrics, shiftAnalysis, ablationStudy, resultsCallouts } from '../../data/projectData';
import {
  rocAucBarData, prAucBarData, psiBarData, PSI_SEVERE_THRESHOLD,
  ksBarData, ablationChartData, conceptShiftBarData, calibrationChartData,
  COLORS, tooltipStyle, axisStyle, gridStyle,
} from '../../data/chartConfigs';

import { BarChartComparison } from '../charts/BarChartComparison';
import { HorizontalBarChart } from '../charts/HorizontalBarChart';
import { DumbbellChart } from '../charts/DumbbellChart';
import { DeltaBarChart } from '../charts/DeltaBarChart';
import { Badge } from '../ui/Badge';
import { Tabs } from '../ui/Tabs';
import { CalloutBox } from '../ui/CalloutBox';

// ─── Severity badge variant mapping ──────────────────────────
const severityVariant = {
  Severe: 'severe',
  Moderate: 'moderate',
  Stable: 'stable',
};

// ─── Helpers ─────────────────────────────────────────────────
/** Return true when the NHANES value represents degradation for ROC/PR (lower = worse) */
const isDegraded = (nVal, kVal, higherBetter) =>
  higherBetter ? nVal < kVal : nVal > kVal;

// ─── Tab definitions ─────────────────────────────────────────
const TABS = [
  { id: 'performance', label: 'Performance' },
  { id: 'shift', label: 'Shift Analysis' },
  { id: 'ablation', label: 'Ablation' },
  { id: 'concept', label: 'Concept Shift & Calibration' },
];

// ─── Calibration colours ─────────────────────────────────────
const CAL_COLORS = {
  baseline: '#4f8ef7',
  platt: '#4caf82',
  isotonic: '#e8a838',
};

// ═════════════════════════════════════════════════════════════
//  Performance Tab
// ═════════════════════════════════════════════════════════════
function PerformanceTab() {
  const tintClass = 'bg-[#e05c5c]/[0.08]';

  return (
    <div className="space-y-8">
      {/* Core metrics table */}
      <div className="table-scroll-wrapper">
        <table className="research-table w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-[#8b90a4] font-medium py-3 px-4">Model</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">ROC-AUC (K)</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">ROC-AUC (N)</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">PR-AUC (K)</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">PR-AUC (N)</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">Brier (K)</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">Brier (N)</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">ECE (K)</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">ECE (N)</th>
            </tr>
          </thead>
          <tbody>
            {coreMetrics.map((row) => (
              <tr key={row.model} className="border-t border-[#2e3248]">
                <td className="py-3 px-4 text-[#e8eaf0] font-medium whitespace-nowrap">{row.model}</td>
                <td className="py-3 px-2 text-center text-[#e8eaf0]">{row.rocK.toFixed(3)}</td>
                <td className={`py-3 px-2 text-center text-[#e8eaf0] ${isDegraded(row.rocN, row.rocK, true) ? tintClass : ''}`}>
                  {row.rocN.toFixed(3)}
                </td>
                <td className="py-3 px-2 text-center text-[#e8eaf0]">{row.prK.toFixed(3)}</td>
                <td className={`py-3 px-2 text-center text-[#e8eaf0] ${isDegraded(row.prN, row.prK, true) ? tintClass : ''}`}>
                  {row.prN.toFixed(3)}
                </td>
                <td className="py-3 px-2 text-center text-[#e8eaf0]">{row.brierK.toFixed(3)}</td>
                <td className={`py-3 px-2 text-center text-[#e8eaf0] ${isDegraded(row.brierN, row.brierK, false) ? tintClass : ''}`}>
                  {row.brierN.toFixed(3)}
                </td>
                <td className="py-3 px-2 text-center text-[#e8eaf0]">{row.eceK.toFixed(3)}</td>
                <td className={`py-3 px-2 text-center text-[#e8eaf0] ${isDegraded(row.eceN, row.eceK, false) ? tintClass : ''}`}>
                  {row.eceN.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ROC-AUC & PR-AUC side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartComparison data={rocAucBarData} title="ROC-AUC Comparison" yDomain={[0.5, 1]} />
        <BarChartComparison data={prAucBarData} title="PR-AUC Comparison" yDomain={[0, 0.3]} />
      </div>

      <CalloutBox variant="danger">
        <p className="text-sm text-[#e8eaf0] leading-relaxed">{resultsCallouts.performance}</p>
      </CalloutBox>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
//  Shift Analysis Tab
// ═════════════════════════════════════════════════════════════
function ShiftAnalysisTab() {
  return (
    <div className="space-y-8">
      {/* Shift analysis table */}
      <div className="table-scroll-wrapper">
        <table className="research-table w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-[#8b90a4] font-medium py-3 px-4">Feature</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">KS Statistic</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">KS p-value</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">PSI</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">Severity</th>
            </tr>
          </thead>
          <tbody>
            {shiftAnalysis.map((row) => (
              <tr key={row.feature} className="border-t border-[#2e3248]">
                <td className="py-3 px-4 text-[#e8eaf0] font-medium font-mono text-xs">{row.feature}</td>
                <td className="py-3 px-2 text-center text-[#e8eaf0]">{row.ksStatistic.toFixed(3)}</td>
                <td className="py-3 px-2 text-center text-[#e8eaf0] font-mono text-xs">{row.ksPValue}</td>
                <td className="py-3 px-2 text-center text-[#e8eaf0]">{row.psi.toFixed(3)}</td>
                <td className="py-3 px-2 text-center">
                  <Badge variant={severityVariant[row.severity] || 'neutral'}>{row.severity}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PSI & KS charts side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HorizontalBarChart
          data={psiBarData}
          title="Population Stability Index (PSI)"
          referenceLine={PSI_SEVERE_THRESHOLD}
          referenceLabel="Severe Threshold"
          colorByValue={true}
        />
        <HorizontalBarChart
          data={ksBarData}
          title="Kolmogorov-Smirnov Statistics"
        />
      </div>

      <CalloutBox variant="warning">
        <p className="text-sm text-[#e8eaf0] leading-relaxed">{resultsCallouts.shiftAnalysis}</p>
      </CalloutBox>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
//  Ablation Tab
// ═════════════════════════════════════════════════════════════
function AblationTab() {
  return (
    <div className="space-y-8">
      {/* Ablation table */}
      <div className="table-scroll-wrapper">
        <table className="research-table w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-[#8b90a4] font-medium py-3 px-4">Configuration</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">Kaggle AUC</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">NHANES AUC</th>
              <th className="text-center text-[#8b90a4] font-medium py-3 px-2">Gap</th>
            </tr>
          </thead>
          <tbody>
            {ablationStudy.map((row) => (
              <tr key={row.configuration} className="border-t border-[#2e3248]">
                <td className="py-3 px-4 text-[#e8eaf0] font-medium">{row.configuration}</td>
                <td className="py-3 px-2 text-center text-[#e8eaf0]">{row.kaggleAuc.toFixed(3)}</td>
                <td className="py-3 px-2 text-center text-[#e8eaf0]">{row.nhanesAuc.toFixed(3)}</td>
                <td className="py-3 px-2 text-center text-[#e8eaf0]">{row.gap.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DumbbellChart data={ablationChartData} title="Ablation Study: ROC-AUC by Configuration" />

      <CalloutBox variant="primary">
        <p className="text-sm text-[#e8eaf0] leading-relaxed">{resultsCallouts.ablation}</p>
      </CalloutBox>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
//  Concept Shift & Calibration Tab
// ═════════════════════════════════════════════════════════════
function ConceptShiftTab() {
  return (
    <div className="space-y-8">
      {/* Feature patching delta chart */}
      <DeltaBarChart data={conceptShiftBarData} title="Feature Patching: ROC-AUC Change (δ)" />

      <p className="text-sm text-[#8b90a4] my-6 leading-relaxed">
        Feature patching replaces one feature at a time with source-domain values.
        All-negative deltas confirm concurrent concept shift — the learned
        feature-outcome relationships have changed between populations, not just the
        feature distributions.
      </p>

      {/* Calibration grouped bar chart */}
      <div>
        <h4 className="text-sm font-semibold text-[#e8eaf0] mb-4 text-center">
          Post-hoc Calibration: ROC-AUC on NHANES
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
                const labels = { baseline: 'Baseline', platt: 'Platt Scaling', isotonic: 'Isotonic' };
                return [value.toFixed(3), labels[name] || name];
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '0.8rem', color: '#8b90a4' }}
              formatter={(value) => {
                const labels = { baseline: 'Baseline', platt: 'Platt Scaling', isotonic: 'Isotonic' };
                return labels[value] || value;
              }}
            />
            <Bar dataKey="baseline" fill={CAL_COLORS.baseline} radius={[4, 4, 0, 0]} maxBarSize={36} />
            <Bar dataKey="platt" fill={CAL_COLORS.platt} radius={[4, 4, 0, 0]} maxBarSize={36} />
            <Bar dataKey="isotonic" fill={CAL_COLORS.isotonic} radius={[4, 4, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <CalloutBox variant="danger">
        <p className="text-sm text-[#e8eaf0] leading-relaxed">
          Isotonic regression on XGBoost caused a catastrophic −0.130 ROC-AUC drop
          (0.709 → 0.579), demonstrating that post-hoc calibration cannot recover
          from domain shift.
        </p>
      </CalloutBox>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
//  Results Section
// ═════════════════════════════════════════════════════════════
export function Results() {
  return (
    <section id="results" className="max-w-7xl py-20 px-6 mx-auto">
      {/* Section label */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4f8ef7] mb-3">
        Results
      </p>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-10">
        Performance Under Domain Shift
      </h2>

      {/* Tabs */}
      <Tabs tabs={TABS}>
        {(activeTab) => {
          switch (activeTab) {
            case 'performance':
              return <PerformanceTab />;
            case 'shift':
              return <ShiftAnalysisTab />;
            case 'ablation':
              return <AblationTab />;
            case 'concept':
              return <ConceptShiftTab />;
            default:
              return null;
          }
        }}
      </Tabs>
    </section>
  );
}

export default Results;
