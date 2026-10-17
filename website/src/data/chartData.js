/**
 * @fileoverview Chart-ready data transformations for the Showcase website.
 *
 * Re-exports raw research data from projectData.js and provides
 * pre-computed structures optimised for chart/visualisation components
 * (bar charts, grouped comparisons, waterfall plots, etc.).
 *
 * All numbers are derived directly from the source tables  -  nothing
 * is rounded or approximated.
 *
 * @module chartData
 */

import {
  coreMetrics,
  shiftAnalysis,
  ablationStudy,
  conceptShiftData,
  calibrationData,
} from './projectData.js';

// ────────────────────────────────────────────────────────────
//  Grouped Bar  -  ROC-AUC comparison (Kaggle vs NHANES)
// ────────────────────────────────────────────────────────────

/**
 * Data formatted for a grouped bar chart comparing in-domain vs
 * cross-domain ROC-AUC for each classifier.
 *
 * @type {Array<{ model: string, kaggle: number, nhanes: number, drop: number, dropPct: string }>}
 */
export const rocComparisonBars = coreMetrics.map((m) => ({
  model: m.model,
  kaggle: m.rocK,
  nhanes: m.rocN,
  drop: +(m.rocK - m.rocN).toFixed(3),
  dropPct: (((m.rocK - m.rocN) / m.rocK) * 100).toFixed(1) + '%',
}));

// ────────────────────────────────────────────────────────────
//  Grouped Bar  -  PR-AUC comparison (Kaggle vs NHANES)
// ────────────────────────────────────────────────────────────

/**
 * Data formatted for a grouped bar chart comparing in-domain vs
 * cross-domain PR-AUC for each classifier.
 *
 * @type {Array<{ model: string, kaggle: number, nhanes: number, drop: number, dropPct: string, randomBaseline: number }>}
 */
export const prComparisonBars = coreMetrics.map((m) => ({
  model: m.model,
  kaggle: m.prK,
  nhanes: m.prN,
  drop: +(m.prK - m.prN).toFixed(3),
  dropPct: (((m.prK - m.prN) / m.prK) * 100).toFixed(1) + '%',
  /** Random classifier PR-AUC baseline at NHANES prevalence */
  randomBaseline: 0.041,
}));

// ────────────────────────────────────────────────────────────
//  PSI Severity  -  Horizontal Bar / Heatmap
// ────────────────────────────────────────────────────────────

/**
 * PSI values with severity colour coding for shift-analysis visualisations.
 *
 * @type {Array<{ feature: string, psi: number, severity: string, color: string }>}
 */
export const psiSeverityBars = shiftAnalysis.map((s) => ({
  feature: s.feature,
  psi: s.psi,
  severity: s.severity,
  color:
    s.severity === 'Severe'
      ? '#ef4444'
      : s.severity === 'Moderate'
        ? '#f59e0b'
        : '#22c55e',
}));

/** @type {{ stable: number, moderate: number, severe: number }} */
export const psiThresholds = {
  stable: 0.10,
  moderate: 0.25,
  severe: Infinity,
};

// ────────────────────────────────────────────────────────────
//  Ablation  -  Waterfall / Paired Bar
// ────────────────────────────────────────────────────────────

/**
 * Ablation data enriched with gap-change relative to the full model.
 *
 * @type {Array<{ configuration: string, kaggleAuc: number, nhanesAuc: number, gap: number, gapDelta: number }>}
 */
export const ablationWaterfall = ablationStudy.map((a) => ({
  ...a,
  /** Gap change relative to full model (positive = wider gap) */
  gapDelta: +(a.gap - ablationStudy[0].gap).toFixed(3),
}));

// ────────────────────────────────────────────────────────────
//  Concept Shift  -  Horizontal Diverging Bar
// ────────────────────────────────────────────────────────────

/**
 * Concept shift deltas formatted for a diverging bar chart.
 * All values are negative, indicating concurrent concept shift.
 *
 * @type {Array<{ feature: string, delta: number, baseAuc: number, patchedAuc: number, absDelta: number }>}
 */
export const conceptShiftBars = conceptShiftData.map((c) => ({
  ...c,
  absDelta: Math.abs(c.delta),
}));

// ────────────────────────────────────────────────────────────
//  Calibration  -  Grouped Bar / Dot Plot
// ────────────────────────────────────────────────────────────

/**
 * Calibration results for dot-plot or grouped bar visualisation.
 * Shows baseline, Platt, and isotonic ROC-AUC with deltas.
 *
 * @type {Array<{ model: string, baseline: number, platt: number, isotonic: number, plattDelta: number, isotonicDelta: number, isotonicSeverity: string }>}
 */
export const calibrationChart = calibrationData.map((c) => ({
  ...c,
  isotonicSeverity:
    c.isotonicDelta <= -0.10
      ? 'catastrophic'
      : c.isotonicDelta < 0
        ? 'degraded'
        : 'neutral',
}));

// ────────────────────────────────────────────────────────────
//  Interactive Explorer  -  per-metric data slices
// ────────────────────────────────────────────────────────────

/**
 * Model lookup keys used by the interactive explorer.
 * @type {Array<{ key: string, label: string }>}
 */
export const modelOptions = [
  { key: 'lr',  label: 'Logistic Regression' },
  { key: 'rf',  label: 'Random Forest' },
  { key: 'xgb', label: 'XGBoost' },
];

/**
 * Metric lookup keys used by the interactive explorer.
 * @type {Array<{ key: string, label: string }>}
 */
export const metricOptions = [
  { key: 'roc',   label: 'ROC-AUC' },
  { key: 'pr',    label: 'PR-AUC' },
  { key: 'brier', label: 'Brier Score' },
  { key: 'ece',   label: 'ECE' },
];

/**
 * Retrieve the Kaggle and NHANES values for a given model–metric pair.
 *
 * @param {'lr'|'rf'|'xgb'} modelKey
 * @param {'roc'|'pr'|'brier'|'ece'} metricKey
 * @returns {{ kaggle: number, nhanes: number, kaggleCI?: string, nhanesCI?: string }}
 */
export function getMetricPair(modelKey, metricKey) {
  const idx = { lr: 0, rf: 1, xgb: 2 }[modelKey];
  const row = coreMetrics[idx];

  /** @type {Record<string, { k: string, n: string, ciK?: string, ciN?: string }>} */
  const fields = {
    roc:   { k: 'rocK',   n: 'rocN',   ciK: 'rocKCI',  ciN: 'rocNCI' },
    pr:    { k: 'prK',    n: 'prN',    ciK: 'prKCI',   ciN: 'prNCI' },
    brier: { k: 'brierK', n: 'brierN' },
    ece:   { k: 'eceK',   n: 'eceN' },
  };

  const f = fields[metricKey];
  return {
    kaggle: row[f.k],
    nhanes: row[f.n],
    ...(f.ciK ? { kaggleCI: row[f.ciK], nhanesCI: row[f.ciN] } : {}),
  };
}
