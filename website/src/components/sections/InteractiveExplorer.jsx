import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

import { getChartData, getMetricData, getModelDisplayName, getMetricDisplayName, isHigherBetter } from '../../data/interactiveLogic';
import { dynamicSummaries, metricExplanations } from '../../data/projectData';
import { gridStyle, axisStyle, tooltipStyle } from '../../data/chartConfigs';
import { Card } from '../ui/Card';

// ─── Constants ───────────────────────────────────────────────
const MODEL_OPTIONS = [
  { value: 'lr', label: 'Logistic Regression' },
  { value: 'rf', label: 'Random Forest' },
  { value: 'xgb', label: 'XGBoost' },
];

const METRIC_OPTIONS = [
  { value: 'roc', label: 'ROC-AUC' },
  { value: 'pr', label: 'PR-AUC' },
  { value: 'brier', label: 'Brier Score' },
  { value: 'ece', label: 'ECE' },
];

// ═════════════════════════════════════════════════════════════
//  Interactive Explorer Section
// ═════════════════════════════════════════════════════════════
export function InteractiveExplorer() {
  const [model, setModel] = useState('xgb');
  const [metric, setMetric] = useState('pr');
  const [showCI, setShowCI] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const ciAvailable = metric === 'roc' || metric === 'pr';
  const chartData = getChartData(model, metric);
  const metricData = getMetricData(model, metric);
  const summaryKey = `${model}_${metric}`;
  const summary = dynamicSummaries[summaryKey];
  const explanation = metricExplanations[metric];

  return (
    <section id="explorer" className="max-w-7xl py-20 px-6 mx-auto">
      {/* Section label */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4f8ef7] mb-3">
        Interactive
      </p>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-10">
        Explore the Generalisation Gap
      </h2>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ─── Left panel: Controls ─────────────────────────── */}
        <div className="lg:col-span-2">
          <Card hover={false}>
            {/* Model selector */}
            <label className="block text-sm font-medium text-[#e8eaf0] mb-2">
              Select Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-[#22263a] border border-[#2e3248] text-[#e8eaf0] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#4f8ef7] cursor-pointer"
            >
              {MODEL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Metric toggle */}
            <label className="block text-sm font-medium text-[#e8eaf0] mb-2 mt-5">
              Metric
            </label>
            <div className="grid grid-cols-2 gap-2">
              {METRIC_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMetric(opt.value)}
                  className={`rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors duration-200 ${
                    metric === opt.value
                      ? 'bg-[#4f8ef7] text-white'
                      : 'bg-[#22263a] text-[#8b90a4] border border-[#2e3248] hover:text-[#e8eaf0]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* CI toggle */}
            <div className="flex items-center justify-between mt-5">
              <label className="text-sm font-medium text-[#e8eaf0]">
                Show Confidence Intervals
              </label>
              <button
                type="button"
                onClick={() => ciAvailable && setShowCI(!showCI)}
                disabled={!ciAvailable}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  !ciAvailable
                    ? 'opacity-40 cursor-not-allowed bg-[#22263a]'
                    : showCI
                      ? 'bg-[#4f8ef7] cursor-pointer'
                      : 'bg-[#22263a] cursor-pointer'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
                    showCI ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {!ciAvailable && (
              <p className="text-xs text-[#8b90a4] mt-1">CIs not available for this metric</p>
            )}
          </Card>
        </div>

        {/* ─── Right panel: Output ──────────────────────────── */}
        <div className="lg:col-span-3">
          {/* Chart title */}
          <h3 className="text-sm font-semibold text-[#e8eaf0] mb-4 text-center">
            {getModelDisplayName(model)} — {getMetricDisplayName(metric)}
          </h3>

          {/* Bar chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid {...gridStyle} vertical={false} />
              <XAxis dataKey="domain" {...axisStyle} tick={{ ...axisStyle.tick, fontSize: 11 }} />
              <YAxis {...axisStyle} tickFormatter={(v) => v.toFixed(2)} />
              <Tooltip
                {...tooltipStyle}
                formatter={(value) => [value.toFixed(3), getMetricDisplayName(metric)]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={64}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* CI annotation */}
          {showCI && ciAvailable && metricData.ciIn && metricData.ciCross && (
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-[#8b90a4]">
              <span>In-Domain 95% CI: {metricData.ciIn}</span>
              <span>Cross-Domain 95% CI: {metricData.ciCross}</span>
            </div>
          )}

          {/* Dynamic summary */}
          {summary && (
            <p className="text-sm text-[#8b90a4] leading-relaxed mt-4 p-4 bg-[#1a1d27] border border-[#2e3248] rounded-lg">
              {summary}
            </p>
          )}

          {/* What does this mean? */}
          <div className="mt-4">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-2 text-sm text-[#4f8ef7] hover:text-[#7eb3ff] transition-colors duration-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-200 ${showExplanation ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              What does this mean?
            </button>

            {showExplanation && explanation && (
              <div className="bg-[#1a1d27] border border-[#2e3248] rounded-lg p-4 mt-4">
                <h4 className="text-base font-semibold text-[#e8eaf0]">{explanation.name}</h4>
                <p className="text-xs text-[#8b90a4] mt-1">{explanation.full}</p>
                <p className="text-sm text-[#8b90a4] mt-3 leading-relaxed">{explanation.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveExplorer;
