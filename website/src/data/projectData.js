/**
 * @fileoverview Core research data for the Stroke Risk Prediction Showcase.
 *
 * Contains every research number, table, prose block, and structural
 * content item referenced by the website's section components.
 * All values are exact — nothing is rounded or approximated.
 *
 * @module projectData
 */

// ────────────────────────────────────────────────────────────
//  Table 3 — Core Performance Metrics
// ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} MetricRow
 * @property {string} model        — Classifier name
 * @property {number} rocK         — ROC-AUC on Kaggle test set
 * @property {string} rocKCI       — 95 % bootstrap CI (Kaggle)
 * @property {number} rocN         — ROC-AUC on NHANES
 * @property {string} rocNCI       — 95 % bootstrap CI (NHANES)
 * @property {number} prK          — PR-AUC on Kaggle test set
 * @property {string} prKCI        — 95 % bootstrap CI (Kaggle)
 * @property {number} prN          — PR-AUC on NHANES
 * @property {string} prNCI        — 95 % bootstrap CI (NHANES)
 * @property {number} brierK       — Brier score on Kaggle test set
 * @property {number} brierN       — Brier score on NHANES
 * @property {number} eceK         — ECE on Kaggle test set
 * @property {number} eceN         — ECE on NHANES
 */

/** @type {MetricRow[]} */
export const coreMetrics = [
  {
    model: 'Logistic Regression',
    rocK: 0.838, rocKCI: '0.788-0.878',
    rocN: 0.713, rocNCI: '0.680-0.753',
    prK: 0.214, prKCI: '0.153-0.308',
    prN: 0.079, prNCI: '0.064-0.107',
    brierK: 0.175, brierN: 0.269,
    eceK: 0.410, eceN: 0.445,
  },
  {
    model: 'Random Forest',
    rocK: 0.824, rocKCI: '0.780-0.861',
    rocN: 0.725, rocNCI: '0.691-0.761',
    prK: 0.179, prKCI: '0.129-0.251',
    prN: 0.078, prNCI: '0.063-0.101',
    brierK: 0.132, brierN: 0.185,
    eceK: 0.368, eceN: 0.399,
  },
  {
    model: 'XGBoost',
    rocK: 0.808, rocKCI: '0.765-0.848',
    rocN: 0.709, rocNCI: '0.674-0.746',
    prK: 0.158, prKCI: '0.115-0.224',
    prN: 0.077, prNCI: '0.061-0.107',
    brierK: 0.098, brierN: 0.123,
    eceK: 0.399, eceN: 0.429,
  },
];

// ────────────────────────────────────────────────────────────
//  Table 4 — Distribution Shift Analysis
// ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} ShiftRow
 * @property {string} feature       — Feature name
 * @property {number} ksStatistic   — Kolmogorov-Smirnov statistic
 * @property {string} ksPValue      — KS p-value (scientific notation string)
 * @property {number} psi           — Population Stability Index
 * @property {string} severity      — Shift severity label
 */

/** @type {ShiftRow[]} */
export const shiftAnalysis = [
  { feature: 'age',               ksStatistic: 0.207, ksPValue: '2.1×10⁻⁶³',  psi: 1.007, severity: 'Severe'   },
  { feature: 'gender',            ksStatistic: 0.032, ksPValue: '0.057',       psi: 0.004, severity: 'Stable'   },
  { feature: 'bmi',               ksStatistic: 0.088, ksPValue: '1.4×10⁻¹¹',  psi: 0.105, severity: 'Moderate' },
  { feature: 'avg_glucose_level', ksStatistic: 0.362, ksPValue: '1.4×10⁻¹⁹⁵', psi: 1.495, severity: 'Severe'   },
];

// ────────────────────────────────────────────────────────────
//  Ablation Study (XGBoost)
// ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} AblationRow
 * @property {string} configuration — Model configuration label
 * @property {number} kaggleAuc     — ROC-AUC on Kaggle test set
 * @property {number} nhanesAuc     — ROC-AUC on NHANES
 * @property {number} gap           — AUC gap (Kaggle − NHANES)
 */

/** @type {AblationRow[]} */
export const ablationStudy = [
  { configuration: 'Full model',            kaggleAuc: 0.808, nhanesAuc: 0.709, gap: 0.099 },
  { configuration: 'w/o age',               kaggleAuc: 0.602, nhanesAuc: 0.535, gap: 0.067 },
  { configuration: 'w/o gender',            kaggleAuc: 0.793, nhanesAuc: 0.702, gap: 0.091 },
  { configuration: 'w/o bmi',               kaggleAuc: 0.805, nhanesAuc: 0.692, gap: 0.113 },
  { configuration: 'w/o avg_glucose_level', kaggleAuc: 0.780, nhanesAuc: 0.683, gap: 0.097 },
];

// ────────────────────────────────────────────────────────────
//  Concept Shift — Feature Patching (XGBoost)
// ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} ConceptShiftRow
 * @property {string} feature    — Feature name
 * @property {number} delta      — Change in ROC-AUC after patching
 * @property {number} baseAuc    — Baseline cross-domain ROC-AUC
 * @property {number} patchedAuc — ROC-AUC after patching feature
 */

/** @type {ConceptShiftRow[]} */
export const conceptShiftData = [
  { feature: 'age',               delta: -0.200, baseAuc: 0.709, patchedAuc: 0.509 },
  { feature: 'gender',            delta: -0.001, baseAuc: 0.709, patchedAuc: 0.708 },
  { feature: 'bmi',               delta: -0.021, baseAuc: 0.709, patchedAuc: 0.688 },
  { feature: 'avg_glucose_level', delta: -0.016, baseAuc: 0.709, patchedAuc: 0.693 },
];

// ────────────────────────────────────────────────────────────
//  Post-hoc Calibration Results
// ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} CalibrationRow
 * @property {string} model          — Classifier name
 * @property {number} baseline       — Baseline cross-domain ROC-AUC
 * @property {number} platt          — ROC-AUC after Platt scaling
 * @property {number} isotonic       — ROC-AUC after isotonic regression
 * @property {number} plattDelta     — Change from baseline (Platt)
 * @property {number} isotonicDelta  — Change from baseline (isotonic)
 */

/** @type {CalibrationRow[]} */
export const calibrationData = [
  { model: 'Logistic Regression', baseline: 0.713, platt: 0.713, isotonic: 0.713, plattDelta: 0.000, isotonicDelta:  0.000 },
  { model: 'Random Forest',      baseline: 0.725, platt: 0.725, isotonic: 0.688, plattDelta: 0.000, isotonicDelta: -0.037 },
  { model: 'XGBoost',            baseline: 0.709, platt: 0.709, isotonic: 0.579, plattDelta: 0.000, isotonicDelta: -0.130 },
];

// ────────────────────────────────────────────────────────────
//  Problem Section — Prose & Pipeline
// ────────────────────────────────────────────────────────────

/**
 * Three-paragraph problem statement for the Problem section.
 * @type {string[]}
 */
export const problemParagraphs = [
  'Machine learning models for stroke prediction are typically evaluated on held-out splits of the same dataset they were trained on. This creates an illusion of performance: the model never encounters a distribution it has not already learned. In clinical deployment, however, the target population is almost never the same as the training population. Age distributions differ, measurement protocols vary, and disease definitions change between institutions.',
  'Dataset shift occurs when the joint distribution P(X,Y) differs between training and deployment. This encompasses covariate shift (different feature distributions), prior probability shift (different class prevalence), and concept shift (different relationships between features and outcomes). Standard held-out evaluation, no matter how rigorous the train-test split, cannot detect any of these failure modes because both sets are drawn from the same source.',
  'For rare events like stroke (4–5% prevalence), ROC-AUC is misleadingly optimistic. It credits the model for correctly identifying the overwhelming majority of non-stroke cases, which any trivial classifier can achieve. PR-AUC, by contrast, evaluates only the precision-recall trade-off for the minority class. When a model achieves PR-AUC of 0.077 on the target population, it offers only 1.9× the performance of a random classifier — a finding that ROC-AUC of 0.709 completely conceals.',
];

/**
 * Steps shown in the pipeline infographic in the Problem section.
 * @typedef {Object} PipelineStep
 * @property {string}  label       — Step heading
 * @property {string}  description — Short descriptor
 * @property {string}  icon        — Icon identifier
 * @property {boolean} [dashed]    — Whether the connector is dashed
 */

/** @type {PipelineStep[]} */
export const pipelineSteps = [
  { label: 'Kaggle Dataset',      description: 'N=5,109 · 4.87% stroke',   icon: 'database'    },
  { label: 'Train Models',        description: 'LR, RF, XGBoost',          icon: 'cpu'         },
  { label: 'Apply to NHANES',     description: 'No retraining',            icon: 'arrow-right', dashed: true },
  { label: 'Measure Degradation', description: 'ROC, PR-AUC, Brier, ECE',  icon: 'chart'       },
];

// ────────────────────────────────────────────────────────────
//  Dataset Cards
// ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} DatasetCard
 * @property {string}   title        — Card heading
 * @property {string}   [tag]        — Optional label badge
 * @property {string}   [tagColor]   — Badge colour key
 * @property {Object}   [stats]      — Key-value statistics
 * @property {string}   description  — Prose description
 * @property {string[]} [features]   — Feature list
 * @property {string[]} [modules]    — NHANES module identifiers
 * @property {Object[]} [mapping]    — Feature-name mapping (harmonisation)
 */

/** @type {DatasetCard[]} */
export const datasetCards = [
  {
    title: 'Source Domain',
    tag: 'Training Data',
    tagColor: 'primary',
    stats: { records: '5,109', prevalence: '4.87%', features: '4 harmonised features' },
    description:
      'The Kaggle Stroke Prediction Dataset is a widely-used benchmark containing demographic and clinical features. Models were trained on an 80/20 stratified split with SMOTE oversampling applied to the training fold only.',
    features: ['age', 'gender', 'bmi', 'avg_glucose_level'],
  },
  {
    title: 'Target Domain',
    tag: 'Evaluation Only · Never Seen During Training',
    tagColor: 'warning',
    stats: { records: '3,167', prevalence: '4.10%', features: 'Nationally representative' },
    description:
      'NHANES 2021–2023 is a nationally representative health survey conducted by the CDC. Data was extracted from four modules and harmonised to match the Kaggle feature schema.',
    features: ['age', 'gender', 'bmi', 'avg_glucose_level'],
    modules: ['DEMO_L', 'BMX_L', 'GLU_L', 'MCQ_L'],
  },
  {
    title: 'Harmonisation',
    description:
      'The primary confound is glucose measurement: Kaggle uses unspecified glucose readings while NHANES uses fasting plasma glucose. This definitional mismatch contributed to a PSI of 1.495, reflecting measurement protocol differences rather than a correctable population difference.',
    mapping: [
      { kaggle: 'age',               nhanes: 'RIDAGEYR' },
      { kaggle: 'gender',            nhanes: 'RIAGENDR' },
      { kaggle: 'bmi',               nhanes: 'BMXBMI'   },
      { kaggle: 'avg_glucose_level', nhanes: 'LBXGLU'   },
    ],
  },
];

// ────────────────────────────────────────────────────────────
//  Results Section Callouts
// ────────────────────────────────────────────────────────────

/**
 * Key finding callouts shown in the Results section.
 * @type {{ performance: string, shiftAnalysis: string, ablation: string }}
 */
export const resultsCallouts = {
  performance:
    'PR-AUC collapsed 51–63% under domain shift. At NHANES prevalence of 4.1%, the cross-domain models achieved only 1.9× the random classifier baseline.',
  shiftAnalysis:
    'The glucose PSI of 1.495 reflects a definitional mismatch between datasets — Kaggle uses unspecified glucose readings while NHANES uses fasting plasma glucose. This is not a correctable population difference; it is a measurement protocol incompatibility that compromises external validation.',
  ablation:
    'Removing BMI widens the gap to 0.113. Removing glucose reduces it by only 0.002 despite its PSI of 1.495. PSI magnitude does not predict gap contribution.',
};

// ────────────────────────────────────────────────────────────
//  Takeaway Cards
// ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} TakeawayCard
 * @property {string} icon  — Heroicon identifier
 * @property {string} title — Card heading
 * @property {string} body  — Card body text
 */

/** @type {TakeawayCard[]} */
export const takeawayCards = [
  {
    icon: 'shield-check',
    title: 'External Validation Is Not Optional',
    body: 'In-domain hold-out evaluation cannot establish clinical applicability. PR-AUC collapsed 51–63% on an independent population that ROC-AUC suggested was acceptable.',
  },
  {
    icon: 'chart-bar',
    title: 'Report PR-AUC for Rare Events',
    body: 'ROC-AUC is insensitive to minority-class detection failure at 4–5% prevalence. PR-AUC revealed the failure that ROC-AUC concealed entirely.',
  },
  {
    icon: 'document-text',
    title: 'Document Measurement Protocols',
    body: 'The glucose PSI of 1.495 reflects a definitional mismatch between datasets, not a correctable population difference. Feature provenance documentation is a prerequisite for valid external validation.',
  },
];

// ────────────────────────────────────────────────────────────
//  Methodology Accordion
// ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} MethodologyItem
 * @property {string} title   — Accordion heading
 * @property {string} content — Accordion body text
 */

/** @type {MethodologyItem[]} */
export const methodologyItems = [
  {
    title: 'Study Design',
    content:
      'This study follows a source-only training protocol: all three classifiers were trained exclusively on the Kaggle Stroke Prediction Dataset and evaluated on NHANES 2021–2023 without any retraining, fine-tuning, or domain adaptation. This simulates the real-world scenario where a model developed on one dataset is deployed directly to a new clinical population.',
  },
  {
    title: 'Datasets',
    content:
      'The Kaggle Stroke Prediction Dataset (N=5,109, stroke prevalence 4.87%) served as the source domain. NHANES 2021–2023 (N=3,167, stroke prevalence 4.10%) served as the target domain. NHANES is a nationally representative health survey conducted by the CDC using stratified, multi-stage probability sampling.',
  },
  {
    title: 'Feature Harmonisation',
    content:
      'Four features were harmonised across datasets: age, gender, BMI, and average glucose level. The primary confound is glucose measurement — Kaggle contains unspecified glucose readings while NHANES reports fasting plasma glucose (LBXGLU). This definitional mismatch is the primary source of the 1.495 PSI observed for glucose.',
  },
  {
    title: 'Models',
    content:
      'Three classifiers were evaluated: Logistic Regression (C=1.0, max_iter=1000), Random Forest (n_estimators=200, max_depth=10, min_samples_leaf=5), and XGBoost (n_estimators=200, max_depth=4, learning_rate=0.1, scale_pos_weight=19.5). SMOTE oversampling was applied to the training fold only.',
  },
  {
    title: 'Evaluation Protocol',
    content:
      'Models were evaluated using ROC-AUC, PR-AUC, Brier score, and Expected Calibration Error (ECE, 10 bins). 95% confidence intervals were computed via 1,000-iteration stratified bootstrap resampling. Non-overlapping CIs between Kaggle and NHANES indicate statistically significant degradation.',
  },
  {
    title: 'Shift Analysis',
    content:
      'Distribution shift was quantified using the Kolmogorov-Smirnov (KS) test for statistical significance and Population Stability Index (PSI) for magnitude. PSI thresholds: <0.10 stable, 0.10–0.25 moderate, >0.25 severe. A logistic regression domain classifier achieved 82.1% accuracy (random baseline: 50%), confirming the datasets are distinguishable.',
  },
  {
    title: 'Concept Shift Test',
    content:
      'Feature patching replaces one feature at a time in the NHANES test set with values from the Kaggle distribution, then re-evaluates model performance. If performance improves (positive delta), the shift in that feature was the cause of degradation. All-negative deltas indicate concurrent concept shift: the learned feature-outcome relationships have changed across populations.',
  },
  {
    title: 'Post-hoc Calibration',
    content:
      'Platt scaling (logistic recalibration) and isotonic regression were applied as post-hoc calibration methods. Platt scaling produced no change for any model. Isotonic regression was neutral for Logistic Regression, caused a −0.037 drop for Random Forest, and a catastrophic −0.130 drop for XGBoost (0.709 → 0.579), demonstrating that miscalibration under domain shift is not recoverable by post-hoc methods.',
  },
];

// ────────────────────────────────────────────────────────────
//  Interactive Explorer — Dynamic Summaries
// ────────────────────────────────────────────────────────────

/**
 * Pre-written analysis paragraphs for every model × metric combination.
 * Keyed as `{modelKey}_{metricKey}` where model ∈ {lr, rf, xgb}
 * and metric ∈ {roc, pr, brier, ece}.
 *
 * @type {Record<string, string>}
 */
export const dynamicSummaries = {
  lr_roc:
    'Logistic Regression achieved ROC-AUC of 0.838 in-domain (Kaggle). Under domain shift, this dropped to 0.713 on NHANES, a 14.9% reduction. The non-overlapping 95% bootstrap confidence intervals (0.788–0.878 vs 0.680–0.753) confirm this degradation is statistically significant.',
  lr_pr:
    'Logistic Regression achieved PR-AUC of 0.214 in-domain. Under domain shift, this collapsed to 0.079, a 63.1% reduction. At 4.1% NHANES prevalence, this represents only 1.9× the random baseline of 0.041.',
  lr_brier:
    'Logistic Regression achieved a Brier score of 0.175 in-domain. On NHANES, this worsened to 0.269, a 53.7% increase indicating substantially degraded probability calibration under domain shift.',
  lr_ece:
    'Logistic Regression showed ECE of 0.410 in-domain, already indicating poor calibration. On NHANES, ECE increased to 0.445, a further 8.5% degradation. Expected calibration error above 0.40 means predicted probabilities deviate from true frequencies by over 40 percentage points on average.',
  rf_roc:
    'Random Forest achieved ROC-AUC of 0.824 in-domain. Under domain shift, this dropped to 0.725 on NHANES, a 12.0% reduction. Random Forest showed the best cross-domain ROC-AUC among all three models.',
  rf_pr:
    'Random Forest achieved PR-AUC of 0.179 in-domain. Under domain shift, this collapsed to 0.078, a 56.4% reduction. Despite having the best cross-domain ROC-AUC, its PR-AUC performance is essentially indistinguishable from the other models on NHANES.',
  rf_brier:
    'Random Forest achieved a Brier score of 0.132 in-domain. On NHANES, this worsened to 0.185, a 40.2% increase. The degradation is more moderate than Logistic Regression but still clinically significant.',
  rf_ece:
    'Random Forest showed ECE of 0.368 in-domain, the best calibration among all models. On NHANES, ECE increased to 0.399, an 8.4% degradation that brings it closer to the other models\' calibration levels.',
  xgb_roc:
    'XGBoost achieved ROC-AUC of 0.808 in-domain. Under domain shift, this dropped to 0.709 on NHANES, a 12.3% reduction. While this appears comparable to other models, XGBoost showed the most dramatic failure in other metrics.',
  xgb_pr:
    'XGBoost achieved PR-AUC of 0.158 in-domain. Under domain shift, this collapsed to 0.077, a 51.3% reduction. At 4.1% prevalence, this offers only 1.9× the random classifier baseline — near-trivial minority-class detection.',
  xgb_brier:
    'XGBoost achieved the best Brier score of 0.098 in-domain. On NHANES, this worsened to 0.123, a 25.5% increase. Despite being the least degraded Brier score, the calibration analysis reveals this masks severe issues.',
  xgb_ece:
    'XGBoost showed ECE of 0.399 in-domain. On NHANES, ECE increased to 0.429, a 7.5% degradation. Post-hoc calibration via isotonic regression catastrophically worsened ROC-AUC from 0.709 to 0.579 (δ = −0.130), demonstrating that miscalibration under domain shift is not recoverable.',
};

// ────────────────────────────────────────────────────────────
//  Metric Explanations (Interactive Explorer)
// ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} MetricExplanation
 * @property {string} name        — Short display name
 * @property {string} full        — Full metric name
 * @property {string} explanation — Multi-sentence plain-language explanation
 */

/** @type {Record<string, MetricExplanation>} */
export const metricExplanations = {
  roc: {
    name: 'ROC-AUC',
    full: 'Area Under the Receiver Operating Characteristic Curve',
    explanation:
      'ROC-AUC measures the probability that a randomly chosen positive example receives a higher predicted score than a randomly chosen negative example. It ranges from 0.5 (random) to 1.0 (perfect). For imbalanced datasets with rare positive events (like stroke at 4–5% prevalence), ROC-AUC can be misleadingly high because it credits the model for correctly ranking the vast majority of negative cases. A model can achieve ROC-AUC of 0.70+ while having near-trivial ability to actually identify stroke patients.',
  },
  pr: {
    name: 'PR-AUC',
    full: 'Area Under the Precision-Recall Curve',
    explanation:
      'PR-AUC evaluates only the precision-recall trade-off for the positive (minority) class. The random baseline for PR-AUC equals the class prevalence (0.041 for NHANES), making it far more sensitive to minority-class detection failure than ROC-AUC. When PR-AUC approaches the prevalence rate, the model offers essentially no benefit over random prediction for the minority class. This is the recommended metric for rare-event prediction tasks.',
  },
  brier: {
    name: 'Brier Score',
    full: 'Brier Score (Mean Squared Error of Probabilities)',
    explanation:
      'The Brier score measures the mean squared difference between predicted probabilities and actual outcomes. It ranges from 0 (perfect calibration) to 1 (worst). A well-calibrated model should produce predicted probabilities that match observed frequencies — e.g., among patients assigned 20% stroke risk, approximately 20% should actually have strokes. Lower Brier scores indicate better calibrated probability estimates.',
  },
  ece: {
    name: 'ECE',
    full: 'Expected Calibration Error',
    explanation:
      'Expected Calibration Error divides predictions into bins by predicted probability, then measures the average absolute difference between predicted probability and actual frequency within each bin. ECE of 0.40 means predicted probabilities deviate from true frequencies by 40 percentage points on average. For clinical decision-making, well-calibrated probabilities are essential — a clinician needs to trust that a 15% predicted risk actually corresponds to roughly 15% true risk.',
  },
};

// ────────────────────────────────────────────────────────────
//  Re-exports from siteConfig.js
//  Allows section components to import everything from one module.
// ────────────────────────────────────────────────────────────

export {
  heroContent,
  statPills,
  heroMetric,
  heroMiniBar,
  navLinks,
  aboutContent,
  footerContent,
} from './siteConfig.js';
