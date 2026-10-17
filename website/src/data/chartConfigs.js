/**
 * @fileoverview Recharts-ready data arrays and configuration objects for the
 * stroke-prediction research showcase. Every numeric value is taken verbatim
 * from the research outputs  -  do NOT round or approximate.
 *
 * @module chartConfigs
 */

// ---------------------------------------------------------------------------
// Design-token colour palette
// ---------------------------------------------------------------------------

/** @type {Record<string, string>} Shared colour constants used across all charts. */
const COLORS = {
  kaggle: '#94a3b8',      // Slate / Cool Platinum (Source In-Domain)
  nhanes: '#f43f5e',      // Clinical Crimson / Rose (Target Cross-Domain Collapse)
  kaggleAlt: '#71717a',
  nhanesAlt: '#fb7185',
  danger: '#f43f5e',
  success: '#10b981',
  warning: '#f59e0b',
  neutral: '#71717a',
  surface: '#111114',
  border: 'rgba(255, 255, 255, 0.08)',
  text: '#f4f4f6',
  textSecondary: '#a1a1aa',
};
export { COLORS };

// ---------------------------------------------------------------------------
// 1. ROC-AUC Bar Chart Data
// ---------------------------------------------------------------------------

/**
 * ROC-AUC scores per model on both datasets.
 * @type {Array<{model: string, kaggle: number, nhanes: number}>}
 */
export const rocAucBarData = [
  { model: 'Logistic Regression', kaggle: 0.838, nhanes: 0.713 },
  { model: 'Random Forest', kaggle: 0.824, nhanes: 0.725 },
  { model: 'XGBoost', kaggle: 0.808, nhanes: 0.709 },
];

// ---------------------------------------------------------------------------
// 2. PR-AUC Bar Chart Data
// ---------------------------------------------------------------------------

/**
 * PR-AUC scores per model on both datasets.
 * @type {Array<{model: string, kaggle: number, nhanes: number}>}
 */
export const prAucBarData = [
  { model: 'Logistic Regression', kaggle: 0.214, nhanes: 0.079 },
  { model: 'Random Forest', kaggle: 0.179, nhanes: 0.078 },
  { model: 'XGBoost', kaggle: 0.158, nhanes: 0.077 },
];

// ---------------------------------------------------------------------------
// 3. PSI Horizontal Bar Data
// ---------------------------------------------------------------------------

/**
 * Population Stability Index values per feature.
 * @type {Array<{feature: string, value: number, severity: string}>}
 */
export const psiBarData = [
  { feature: 'avg_glucose_level', value: 1.495, severity: 'Severe' },
  { feature: 'age', value: 1.007, severity: 'Severe' },
  { feature: 'bmi', value: 0.105, severity: 'Moderate' },
  { feature: 'gender', value: 0.004, severity: 'Stable' },
];

/** @type {number} PSI threshold above which distribution shift is "severe". */
export const PSI_SEVERE_THRESHOLD = 0.20;

// ---------------------------------------------------------------------------
// 4. KS Statistics Horizontal Bar Data
// ---------------------------------------------------------------------------

/**
 * Kolmogorov–Smirnov statistic per feature.
 * @type {Array<{feature: string, value: number}>}
 */
export const ksBarData = [
  { feature: 'avg_glucose_level', value: 0.362 },
  { feature: 'age', value: 0.207 },
  { feature: 'bmi', value: 0.088 },
  { feature: 'gender', value: 0.032 },
];

// ---------------------------------------------------------------------------
// 5. Ablation Chart Data
// ---------------------------------------------------------------------------

/**
 * XGBoost ROC-AUC under leave-one-out ablation configurations.
 * @type {Array<{config: string, kaggle: number, nhanes: number, gap: number, isFullModel: boolean}>}
 */
export const ablationChartData = [
  { config: 'Full model', kaggle: 0.808, nhanes: 0.709, gap: 0.099, isFullModel: true },
  { config: 'w/o age', kaggle: 0.602, nhanes: 0.535, gap: 0.067, isFullModel: false },
  { config: 'w/o gender', kaggle: 0.793, nhanes: 0.702, gap: 0.091, isFullModel: false },
  { config: 'w/o bmi', kaggle: 0.805, nhanes: 0.692, gap: 0.113, isFullModel: false },
  { config: 'w/o glucose', kaggle: 0.780, nhanes: 0.683, gap: 0.097, isFullModel: false },
];

// ---------------------------------------------------------------------------
// 6. Concept Shift Delta Bar Data
// ---------------------------------------------------------------------------

/**
 * Change in feature–target correlation between Kaggle and NHANES.
 * @type {Array<{feature: string, delta: number}>}
 */
export const conceptShiftBarData = [
  { feature: 'age', delta: -0.200 },
  { feature: 'bmi', delta: -0.021 },
  { feature: 'avg_glucose_level', delta: -0.016 },
  { feature: 'gender', delta: -0.001 },
];

// ---------------------------------------------------------------------------
// 7. Calibration Comparison Data
// ---------------------------------------------------------------------------

/**
 * ROC-AUC on NHANES after applying different calibration methods.
 * @type {Array<{model: string, baseline: number, platt: number, isotonic: number}>}
 */
export const calibrationChartData = [
  { model: 'Logistic Regression', baseline: 0.713, platt: 0.713, isotonic: 0.713 },
  { model: 'Random Forest', baseline: 0.725, platt: 0.725, isotonic: 0.688 },
  { model: 'XGBoost', baseline: 0.709, platt: 0.709, isotonic: 0.579 },
];

// ---------------------------------------------------------------------------
// 8. Custom Tooltip Style
// ---------------------------------------------------------------------------

/**
 * Recharts `<Tooltip>` style props for the dark theme.
 * @type {{contentStyle: object, itemStyle: object, labelStyle: object}}
 */
export const tooltipStyle = {
  contentStyle: {
    backgroundColor: '#111114',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '4px',
    color: '#f4f4f6',
    fontFamily: 'var(--font-mono, monospace)',
    fontSize: '0.8rem',
    padding: '0.6rem 0.85rem',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  },
  itemStyle: { color: '#f4f4f6' },
  labelStyle: { color: '#a1a1aa', fontWeight: 600, marginBottom: '0.25rem', fontFamily: 'var(--font-mono, monospace)' },
};

// ---------------------------------------------------------------------------
// 9. Axis Style
// ---------------------------------------------------------------------------

/**
 * Shared axis styling for Recharts `<XAxis>` / `<YAxis>`.
 * @type {{tick: object, axisLine: object, tickLine: object}}
 */
export const axisStyle = {
  tick: { fill: '#71717a', fontSize: 11, fontFamily: 'var(--font-mono, monospace)' },
  axisLine: { stroke: 'rgba(255, 255, 255, 0.08)' },
  tickLine: { stroke: 'rgba(255, 255, 255, 0.08)' },
};

// ---------------------------------------------------------------------------
// 10. Grid Style
// ---------------------------------------------------------------------------

/**
 * Shared grid styling for Recharts `<CartesianGrid>`.
 * @type {{strokeDasharray: string, stroke: string, opacity: number}}
 */
export const gridStyle = {
  strokeDasharray: '2 2',
  stroke: 'rgba(255, 255, 255, 0.06)',
  opacity: 1,
};
