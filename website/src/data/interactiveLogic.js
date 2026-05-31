/**
 * @fileoverview Interactive logic helpers for the model × metric explorer.
 * Provides metric lookup, percent-change computation, Recharts-ready data
 * generation, and human-readable display-name mappings.
 *
 * @module interactiveLogic
 */

// ---------------------------------------------------------------------------
// Internal metric store — every number is exact from the research outputs
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} MetricEntry
 * @property {number}      inDomain        - Score on the in-domain (Kaggle) test set.
 * @property {number}      crossDomain     - Score on the cross-domain (NHANES) set.
 * @property {string|null} ciIn            - 95 % CI for in-domain, or null.
 * @property {string|null} ciCross         - 95 % CI for cross-domain, or null.
 * @property {number}      percentChange   - Relative change (positive = degradation).
 * @property {string}      changeDirection - Human-readable direction word.
 */

/**
 * Nested lookup keyed by `model` then `metric`.
 * @type {Record<string, Record<string, MetricEntry>>}
 */
const METRIC_STORE = {
  lr: {
    roc: {
      inDomain: 0.838,
      crossDomain: 0.713,
      ciIn: '0.788–0.878',
      ciCross: '0.680–0.753',
      percentChange: ((0.838 - 0.713) / 0.838) * 100,
      changeDirection: 'dropped',
    },
    pr: {
      inDomain: 0.214,
      crossDomain: 0.079,
      ciIn: '0.153–0.308',
      ciCross: '0.064–0.107',
      percentChange: ((0.214 - 0.079) / 0.214) * 100,
      changeDirection: 'dropped',
    },
    brier: {
      inDomain: 0.175,
      crossDomain: 0.269,
      ciIn: null,
      ciCross: null,
      percentChange: ((0.269 - 0.175) / 0.175) * 100,
      changeDirection: 'increased',
    },
    ece: {
      inDomain: 0.410,
      crossDomain: 0.445,
      ciIn: null,
      ciCross: null,
      percentChange: ((0.445 - 0.410) / 0.410) * 100,
      changeDirection: 'increased',
    },
  },

  rf: {
    roc: {
      inDomain: 0.824,
      crossDomain: 0.725,
      ciIn: '0.780–0.861',
      ciCross: '0.691–0.761',
      percentChange: ((0.824 - 0.725) / 0.824) * 100,
      changeDirection: 'dropped',
    },
    pr: {
      inDomain: 0.179,
      crossDomain: 0.078,
      ciIn: '0.129–0.251',
      ciCross: '0.063–0.101',
      percentChange: ((0.179 - 0.078) / 0.179) * 100,
      changeDirection: 'dropped',
    },
    brier: {
      inDomain: 0.132,
      crossDomain: 0.185,
      ciIn: null,
      ciCross: null,
      percentChange: ((0.185 - 0.132) / 0.132) * 100,
      changeDirection: 'increased',
    },
    ece: {
      inDomain: 0.368,
      crossDomain: 0.399,
      ciIn: null,
      ciCross: null,
      percentChange: ((0.399 - 0.368) / 0.368) * 100,
      changeDirection: 'increased',
    },
  },

  xgb: {
    roc: {
      inDomain: 0.808,
      crossDomain: 0.709,
      ciIn: '0.765–0.848',
      ciCross: '0.674–0.746',
      percentChange: ((0.808 - 0.709) / 0.808) * 100,
      changeDirection: 'dropped',
    },
    pr: {
      inDomain: 0.158,
      crossDomain: 0.077,
      ciIn: '0.115–0.224',
      ciCross: '0.061–0.107',
      percentChange: ((0.158 - 0.077) / 0.158) * 100,
      changeDirection: 'dropped',
    },
    brier: {
      inDomain: 0.098,
      crossDomain: 0.123,
      ciIn: null,
      ciCross: null,
      percentChange: ((0.123 - 0.098) / 0.098) * 100,
      changeDirection: 'increased',
    },
    ece: {
      inDomain: 0.399,
      crossDomain: 0.429,
      ciIn: null,
      ciCross: null,
      percentChange: ((0.429 - 0.399) / 0.399) * 100,
      changeDirection: 'increased',
    },
  },
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Get metric data for a specific model and metric combination.
 * @param {string} model  - 'lr', 'rf', or 'xgb'
 * @param {string} metric - 'roc', 'pr', 'brier', or 'ece'
 * @returns {{ inDomain: number, crossDomain: number, ciIn: string|null, ciCross: string|null, percentChange: number, changeDirection: string }}
 */
export function getMetricData(model, metric) {
  const entry = METRIC_STORE[model]?.[metric];
  if (!entry) {
    throw new Error(`Unknown model/metric combination: ${model}/${metric}`);
  }
  return entry;
}

/**
 * Build a Recharts-ready bar-chart array for the given model × metric.
 * @param {string} model  - 'lr', 'rf', or 'xgb'
 * @param {string} metric - 'roc', 'pr', 'brier', or 'ece'
 * @returns {Array<{domain: string, value: number, fill: string}>}
 */
export function getChartData(model, metric) {
  const { inDomain, crossDomain } = getMetricData(model, metric);
  return [
    { domain: 'In-Domain (Kaggle)', value: inDomain, fill: '#4f8ef7' },
    { domain: 'Cross-Domain (NHANES)', value: crossDomain, fill: '#7eb3ff' },
  ];
}

/**
 * Map a short model key to its full display name.
 * @param {string} model - 'lr', 'rf', or 'xgb'
 * @returns {string}
 */
export function getModelDisplayName(model) {
  /** @type {Record<string, string>} */
  const names = {
    lr: 'Logistic Regression',
    rf: 'Random Forest',
    xgb: 'XGBoost',
  };
  return names[model] ?? model;
}

/**
 * Map a short metric key to its full display name.
 * @param {string} metric - 'roc', 'pr', 'brier', or 'ece'
 * @returns {string}
 */
export function getMetricDisplayName(metric) {
  /** @type {Record<string, string>} */
  const names = {
    roc: 'ROC-AUC',
    pr: 'PR-AUC',
    brier: 'Brier Score',
    ece: 'ECE',
  };
  return names[metric] ?? metric;
}

/**
 * Whether higher values are better for a given metric.
 * @param {string} metric - 'roc', 'pr', 'brier', or 'ece'
 * @returns {boolean} `true` for ROC-AUC and PR-AUC; `false` for Brier and ECE.
 */
export function isHigherBetter(metric) {
  return metric === 'roc' || metric === 'pr';
}
