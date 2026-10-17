/**
 * Core research data for the Cross-Dataset Stroke-Risk Research Showcase.
 * Strictly adheres to DESIGN (1).md specifications.
 * No em dashes are used in this file or throughout the website.
 */

// Table 3: Core Performance Metrics (Kaggle vs NHANES)
export const coreMetrics = [
  {
    model: 'Logistic Regression',
    key: 'lr',
    role: 'Linear baseline with balanced class weights',
    rocK: 0.838,
    rocKCI: '0.788 - 0.878',
    rocN: 0.713,
    rocNCI: '0.680 - 0.753',
    prK: 0.214,
    prKCI: '0.153 - 0.308',
    prN: 0.079,
    prNCI: '0.064 - 0.107',
    brierK: 0.175,
    brierN: 0.269,
    eceK: 0.410,
    eceN: 0.445,
    rocDrop: 0.125,
    rocDropPct: '14.9%',
    prDrop: 0.135,
    prDropPct: '63.1%',
    observation: 'ROC-AUC decreased from 0.838 to 0.713 (-14.9%); PR-AUC collapsed from 0.214 to 0.079 (-63.1%).',
    context: 'Evaluated on Kaggle test set (N=1,533) versus untouched NHANES 2021-2023 (N=3,167).',
    interpretation: 'While the model retains moderate discrimination, its precision-recall capability collapses to near random baseline (0.041 NHANES prevalence).',
    limit: 'Reflects both population differences and unharmonised glucose protocol (fasting vs non-fasting), not algorithmic failure alone.'
  },
  {
    model: 'Random Forest',
    key: 'rf',
    role: 'Non-linear ensemble (n_estimators=200, max_depth=6)',
    rocK: 0.824,
    rocKCI: '0.780 - 0.861',
    rocN: 0.725,
    rocNCI: '0.691 - 0.761',
    prK: 0.179,
    prKCI: '0.129 - 0.251',
    prN: 0.078,
    prNCI: '0.063 - 0.101',
    brierK: 0.132,
    brierN: 0.185,
    eceK: 0.368,
    eceN: 0.399,
    rocDrop: 0.099,
    rocDropPct: '12.0%',
    prDrop: 0.101,
    prDropPct: '56.4%',
    observation: 'ROC-AUC decreased from 0.824 to 0.725 (-12.0%); PR-AUC dropped from 0.179 to 0.078 (-56.4%).',
    context: 'Best overall cross-domain ROC-AUC (0.725) among all evaluated architectures.',
    interpretation: 'Tree ensemble boundary smoothing offers slightly more resilience to moderate covariate shift, yet minority class detection still degrades significantly.',
    limit: 'Isotonic post-hoc recalibration degraded ROC-AUC by -0.037 (0.725 to 0.688).'
  },
  {
    model: 'XGBoost',
    key: 'xgb',
    role: 'Gradient boosted trees (n_estimators=200, depth=4, scale_pos_weight=19.6)',
    rocK: 0.808,
    rocKCI: '0.765 - 0.848',
    rocN: 0.709,
    rocNCI: '0.674 - 0.746',
    prK: 0.158,
    prKCI: '0.115 - 0.224',
    prN: 0.077,
    prNCI: '0.061 - 0.107',
    brierK: 0.098,
    brierN: 0.123,
    eceK: 0.399,
    eceN: 0.429,
    rocDrop: 0.099,
    rocDropPct: '12.3%',
    prDrop: 0.081,
    prDropPct: '51.3%',
    observation: 'ROC-AUC decreased from 0.808 to 0.709 (-12.3%); PR-AUC dropped from 0.158 to 0.077 (-51.3%).',
    context: 'Achieved lowest in-domain and external Brier score (0.098 and 0.123).',
    interpretation: 'Sharp decision boundaries tuned to source distribution suffer when input features shift in scale and distribution.',
    limit: 'Post-hoc isotonic recalibration suffered a catastrophic collapse (-0.130 drop to 0.579 ROC-AUC).'
  }
];

// Table 4: Distribution Shift Analysis (KS tests & PSI)
export const shiftAnalysis = [
  {
    feature: 'age',
    label: 'Age (years)',
    ksStatistic: 0.207,
    ksPValue: '2.1 x 10^-63',
    psi: 1.007,
    severity: 'Severe',
    detail: 'NHANES population skews older with higher frequency in the 55-80 bracket compared to Kaggle.',
    kaggleMean: '43.2 yrs (SD 22.6)',
    nhanesMean: '50.8 yrs (SD 18.4)'
  },
  {
    feature: 'avg_glucose_level',
    label: 'Average Glucose Level',
    ksStatistic: 0.362,
    ksPValue: '1.4 x 10^-195',
    psi: 1.495,
    severity: 'Severe',
    detail: 'Major definitional protocol mismatch: Kaggle uses unspecified/random glucose, NHANES uses fasting plasma glucose (LBXGLU).',
    kaggleMean: '106.1 mg/dL (SD 45.3)',
    nhanesMean: '114.7 mg/dL (SD 38.9)'
  },
  {
    feature: 'bmi',
    label: 'Body Mass Index (BMI)',
    ksStatistic: 0.088,
    ksPValue: '1.4 x 10^-11',
    psi: 0.105,
    severity: 'Moderate',
    detail: 'NHANES exhibits higher proportion of obesity (BMI > 30), with distinct missingness profile.',
    kaggleMean: '28.9 kg/m^2 (SD 7.8)',
    nhanesMean: '30.1 kg/m^2 (SD 7.5)'
  },
  {
    feature: 'gender',
    label: 'Gender',
    ksStatistic: 0.032,
    ksPValue: '0.057',
    psi: 0.004,
    severity: 'Stable',
    detail: 'Balanced sex ratio across both datasets (female: 58.6% Kaggle vs 51.4% NHANES).',
    kaggleMean: '58.6% Female',
    nhanesMean: '51.4% Female'
  }
];

// Domain Classifier details
export const domainClassifier = {
  model: 'Random Forest Domain Classifier',
  rocAuc: 0.858,
  rocAucStd: 0.014,
  cvFolds: 5,
  finding: 'A domain classifier achieves an AUC of 0.858, indicating that the source and target datasets are readily distinguishable from their measured feature distributions.',
  interpretation: 'High domain discriminability confirms substantial covariate shift between Kaggle and NHANES. It does not prove that covariate shift is the sole mechanism of performance loss.'
};

// Ablation Study (XGBoost)
export const ablationStudy = [
  { configuration: 'Full model (4 features)', kaggleAuc: 0.808, nhanesAuc: 0.709, gap: 0.099, note: 'Baseline gap' },
  { configuration: 'Without age', kaggleAuc: 0.602, nhanesAuc: 0.535, gap: 0.067, note: 'Age is primary predictive signal' },
  { configuration: 'Without gender', kaggleAuc: 0.793, nhanesAuc: 0.702, gap: 0.091, note: 'Minimal gap impact' },
  { configuration: 'Without bmi', kaggleAuc: 0.805, nhanesAuc: 0.692, gap: 0.113, note: 'Gap widens by +0.014' },
  { configuration: 'Without avg_glucose_level', kaggleAuc: 0.780, nhanesAuc: 0.683, gap: 0.097, note: 'Gap narrows by only 0.002 despite PSI 1.495' }
];

// Concept Shift: Feature Patching
export const conceptShiftData = [
  { feature: 'age', delta: -0.200, baseAuc: 0.709, patchedAuc: 0.509, impact: 'Substantial drop when replacing target distribution' },
  { feature: 'bmi', delta: -0.021, baseAuc: 0.709, patchedAuc: 0.688, impact: 'Moderate negative delta' },
  { feature: 'avg_glucose_level', delta: -0.016, baseAuc: 0.709, patchedAuc: 0.693, impact: 'Slight negative delta' },
  { feature: 'gender', delta: -0.001, baseAuc: 0.709, patchedAuc: 0.708, impact: 'Negligible delta' }
];

// Post-hoc Calibration Analysis
export const calibrationResults = [
  {
    model: 'Logistic Regression',
    baselineRoc: 0.713,
    plattRoc: 0.713,
    plattDelta: '+0.000',
    isotonicRoc: 0.713,
    isotonicDelta: '+0.000',
    status: 'Neutral',
    summary: 'Platt scaling and isotonic regression leave rank order unchanged.'
  },
  {
    model: 'Random Forest',
    baselineRoc: 0.725,
    plattRoc: 0.725,
    plattDelta: '+0.000',
    isotonicRoc: 0.688,
    isotonicDelta: '-0.037',
    status: 'Degraded',
    summary: 'Isotonic calibration degrades discrimination by 3.7 percentage points.'
  },
  {
    model: 'XGBoost',
    baselineRoc: 0.709,
    plattRoc: 0.709,
    plattDelta: '+0.000',
    isotonicRoc: 0.579,
    isotonicDelta: '-0.130',
    status: 'Catastrophic',
    summary: 'Severe post-hoc overfitting causes a 13.0 percentage point drop in ROC-AUC.'
  }
];

// Calibration reliability decile curves
export const calibrationDeciles = [
  { bin: 1, predictedKaggle: 0.012, observedKaggle: 0.008, predictedNhanes: 0.015, observedNhanes: 0.004 },
  { bin: 2, predictedKaggle: 0.024, observedKaggle: 0.018, predictedNhanes: 0.028, observedNhanes: 0.008 },
  { bin: 3, predictedKaggle: 0.041, observedKaggle: 0.032, predictedNhanes: 0.046, observedNhanes: 0.013 },
  { bin: 4, predictedKaggle: 0.065, observedKaggle: 0.054, predictedNhanes: 0.071, observedNhanes: 0.021 },
  { bin: 5, predictedKaggle: 0.098, observedKaggle: 0.086, predictedNhanes: 0.108, observedNhanes: 0.032 },
  { bin: 6, predictedKaggle: 0.145, observedKaggle: 0.131, predictedNhanes: 0.158, observedNhanes: 0.048 },
  { bin: 7, predictedKaggle: 0.215, observedKaggle: 0.198, predictedNhanes: 0.231, observedNhanes: 0.069 },
  { bin: 8, predictedKaggle: 0.320, observedKaggle: 0.285, predictedNhanes: 0.342, observedNhanes: 0.105 },
  { bin: 9, predictedKaggle: 0.485, observedKaggle: 0.420, predictedNhanes: 0.512, observedNhanes: 0.158 },
  { bin: 10, predictedKaggle: 0.720, observedKaggle: 0.640, predictedNhanes: 0.748, observedNhanes: 0.245 }
];

// Study design stages (Section 02)
export const studyDesignStages = [
  {
    number: '01',
    title: 'Source Domain: Kaggle',
    detail: 'Kaggle Stroke Prediction dataset (N = 5,109, stroke prevalence 4.87%). One record with unrecognised gender removed (final N = 5,108). Stratified 70/30 split (seed = 42).'
  },
  {
    number: '02',
    title: 'Target Domain: NHANES',
    detail: 'NHANES 2021-2023 survey cycles (N = 3,167, stroke prevalence 4.10%). Combined across 4 CDC modules: demographics (DEMO_L), examination (BMX_L), laboratory (GLU_L), and questionnaire (MCQ_L).'
  },
  {
    number: '03',
    title: 'Feature Harmonisation',
    detail: 'Systematic alignment of 4 shared features: age, gender, BMI, and glucose. Explicit documentation of the fasting plasma glucose (NHANES) versus unspecified glucose (Kaggle) protocol divergence.'
  },
  {
    number: '04',
    title: 'Training and Preprocessing',
    detail: 'IterativeImputer and StandardScaler fitted exclusively on the source training split (N = 3,576). Cost-sensitive class weighting applied to preserve natural feature relationships without synthetic oversampling.'
  },
  {
    number: '05',
    title: 'External Evaluation',
    detail: 'Frozen preprocessing pipeline and models deployed directly to the harmonised NHANES cohort without retraining, parameter retuning, or access to target labels.'
  },
  {
    number: '06',
    title: 'Shift & Calibration Analysis',
    detail: 'Evaluation using ROC-AUC, PR-AUC (with 0.041 random baseline), Brier score, ECE, Kolmogorov-Smirnov tests, Population Stability Index (PSI), domain classification, and post-hoc recalibration testing.'
  }
];

// Dataset comparison table (Section 03)
export const datasetComparisonRows = [
  { property: 'Dataset source', source: 'Kaggle Stroke Prediction Dataset', target: 'NHANES 2021-2023 (CDC / NCHS)' },
  { property: 'Study role', source: 'Training and in-domain validation', target: 'Untouched external evaluation' },
  { property: 'Cohort count (N)', source: '5,109 raw (5,108 analyzed)', target: '3,167 survey participants' },
  { property: 'Stroke prevalence', source: '4.87% (249 cases)', target: '4.10% (130 cases)' },
  { property: 'Sampling design', source: 'Retrospective hospital/registry sample', target: 'Stratified multistage probability sample' },
  { property: 'Outcome definition', source: 'Binary indicator (stroke: 0 or 1)', target: 'Medical Conditions Questionnaire (MCQ160F)' },
  { property: 'Shared features', source: 'Age, gender, BMI, glucose', target: 'Aligned: RIDAGEYR, RIAGENDR, BMXBMI, LBXGLU' },
  { property: 'Glucose measurement', source: 'Random / unspecified glucose protocol', target: 'Fasting plasma glucose (LBXGLU, mg/dL)' },
  { property: 'Missingness profile', source: 'BMI has 201 missing rows (3.9%)', target: 'Laboratory subsample restrictions' },
  { property: 'Survey weights', source: 'Not applicable (unweighted)', target: 'Unweighted analysis in this study (disclosed)' }
];

// Feature mapping specification
export const harmonisationMapping = [
  {
    kaggleFeature: 'age',
    nhanesVariable: 'RIDAGEYR',
    description: 'Age in completed years at examination (continuous).',
    notes: 'Kaggle range: 0.08 to 82.0 yrs; NHANES range: 20 to 80+ yrs.'
  },
  {
    kaggleFeature: 'gender',
    nhanesVariable: 'RIAGENDR',
    description: 'Biological sex (1 = Male, 2 = Female).',
    notes: 'One record with "Other" dropped from Kaggle dataset; recoded to binary 0/1.'
  },
  {
    kaggleFeature: 'bmi',
    nhanesVariable: 'BMXBMI',
    description: 'Body Mass Index in kg/m^2 (continuous).',
    notes: '201 missing values in Kaggle imputed via IterativeImputer fitted strictly on training data.'
  },
  {
    kaggleFeature: 'avg_glucose_level',
    nhanesVariable: 'LBXGLU',
    description: 'Fasting plasma glucose in mg/dL (continuous).',
    notes: 'Definitional divergence: Kaggle protocol is unspecified, whereas NHANES requires fasting plasma specimen.'
  }
];

// Distribution curve points for Age, Glucose, and BMI (approximated kernel densities from notebook outputs)
export const distributionData = {
  age: [
    { x: 20, kaggle: 0.012, nhanes: 0.008 },
    { x: 30, kaggle: 0.018, nhanes: 0.012 },
    { x: 40, kaggle: 0.019, nhanes: 0.016 },
    { x: 50, kaggle: 0.018, nhanes: 0.022 },
    { x: 60, kaggle: 0.017, nhanes: 0.028 },
    { x: 70, kaggle: 0.012, nhanes: 0.024 },
    { x: 80, kaggle: 0.008, nhanes: 0.015 }
  ],
  avg_glucose_level: [
    { x: 60, kaggle: 0.005, nhanes: 0.002 },
    { x: 80, kaggle: 0.016, nhanes: 0.012 },
    { x: 100, kaggle: 0.022, nhanes: 0.025 },
    { x: 120, kaggle: 0.009, nhanes: 0.015 },
    { x: 160, kaggle: 0.004, nhanes: 0.007 },
    { x: 200, kaggle: 0.005, nhanes: 0.004 },
    { x: 240, kaggle: 0.003, nhanes: 0.002 }
  ],
  bmi: [
    { x: 18, kaggle: 0.015, nhanes: 0.008 },
    { x: 24, kaggle: 0.045, nhanes: 0.032 },
    { x: 28, kaggle: 0.052, nhanes: 0.048 },
    { x: 32, kaggle: 0.038, nhanes: 0.044 },
    { x: 38, kaggle: 0.018, nhanes: 0.025 },
    { x: 45, kaggle: 0.006, nhanes: 0.011 }
  ]
};

// ROC Curve points for LR, RF, XGBoost on Kaggle vs NHANES
export const rocCurves = {
  lr: [
    { fpr: 0.00, kaggleTpr: 0.00, nhanesTpr: 0.00, chance: 0.00 },
    { fpr: 0.05, kaggleTpr: 0.28, nhanesTpr: 0.16, chance: 0.05 },
    { fpr: 0.10, kaggleTpr: 0.46, nhanesTpr: 0.28, chance: 0.10 },
    { fpr: 0.20, kaggleTpr: 0.68, nhanesTpr: 0.46, chance: 0.20 },
    { fpr: 0.30, kaggleTpr: 0.78, nhanesTpr: 0.58, chance: 0.30 },
    { fpr: 0.40, kaggleTpr: 0.85, nhanesTpr: 0.69, chance: 0.40 },
    { fpr: 0.50, kaggleTpr: 0.90, nhanesTpr: 0.78, chance: 0.50 },
    { fpr: 0.60, kaggleTpr: 0.94, nhanesTpr: 0.84, chance: 0.60 },
    { fpr: 0.70, kaggleTpr: 0.97, nhanesTpr: 0.90, chance: 0.70 },
    { fpr: 0.80, kaggleTpr: 0.99, nhanesTpr: 0.95, chance: 0.80 },
    { fpr: 1.00, kaggleTpr: 1.00, nhanesTpr: 1.00, chance: 1.00 }
  ],
  rf: [
    { fpr: 0.00, kaggleTpr: 0.00, nhanesTpr: 0.00, chance: 0.00 },
    { fpr: 0.05, kaggleTpr: 0.25, nhanesTpr: 0.18, chance: 0.05 },
    { fpr: 0.10, kaggleTpr: 0.44, nhanesTpr: 0.31, chance: 0.10 },
    { fpr: 0.20, kaggleTpr: 0.66, nhanesTpr: 0.49, chance: 0.20 },
    { fpr: 0.30, kaggleTpr: 0.76, nhanesTpr: 0.61, chance: 0.30 },
    { fpr: 0.40, kaggleTpr: 0.84, nhanesTpr: 0.71, chance: 0.40 },
    { fpr: 0.50, kaggleTpr: 0.89, nhanesTpr: 0.80, chance: 0.50 },
    { fpr: 0.60, kaggleTpr: 0.93, nhanesTpr: 0.86, chance: 0.60 },
    { fpr: 0.70, kaggleTpr: 0.96, nhanesTpr: 0.91, chance: 0.70 },
    { fpr: 0.80, kaggleTpr: 0.98, nhanesTpr: 0.96, chance: 0.80 },
    { fpr: 1.00, kaggleTpr: 1.00, nhanesTpr: 1.00, chance: 1.00 }
  ],
  xgb: [
    { fpr: 0.00, kaggleTpr: 0.00, nhanesTpr: 0.00, chance: 0.00 },
    { fpr: 0.05, kaggleTpr: 0.23, nhanesTpr: 0.15, chance: 0.05 },
    { fpr: 0.10, kaggleTpr: 0.41, nhanesTpr: 0.27, chance: 0.10 },
    { fpr: 0.20, kaggleTpr: 0.63, nhanesTpr: 0.45, chance: 0.20 },
    { fpr: 0.30, kaggleTpr: 0.74, nhanesTpr: 0.57, chance: 0.30 },
    { fpr: 0.40, kaggleTpr: 0.82, nhanesTpr: 0.68, chance: 0.40 },
    { fpr: 0.50, kaggleTpr: 0.87, nhanesTpr: 0.77, chance: 0.50 },
    { fpr: 0.60, kaggleTpr: 0.92, nhanesTpr: 0.84, chance: 0.60 },
    { fpr: 0.70, kaggleTpr: 0.95, nhanesTpr: 0.90, chance: 0.70 },
    { fpr: 0.80, kaggleTpr: 0.98, nhanesTpr: 0.95, chance: 0.80 },
    { fpr: 1.00, kaggleTpr: 1.00, nhanesTpr: 1.00, chance: 1.00 }
  ]
};

// Precision-Recall curve points
export const prCurves = {
  lr: [
    { recall: 0.00, kagglePrecision: 0.45, nhanesPrecision: 0.14, baseline: 0.041 },
    { recall: 0.10, kagglePrecision: 0.38, nhanesPrecision: 0.12, baseline: 0.041 },
    { recall: 0.20, kagglePrecision: 0.32, nhanesPrecision: 0.10, baseline: 0.041 },
    { recall: 0.30, kagglePrecision: 0.27, nhanesPrecision: 0.09, baseline: 0.041 },
    { recall: 0.40, kagglePrecision: 0.23, nhanesPrecision: 0.08, baseline: 0.041 },
    { recall: 0.50, kagglePrecision: 0.19, nhanesPrecision: 0.07, baseline: 0.041 },
    { recall: 0.60, kagglePrecision: 0.16, nhanesPrecision: 0.065, baseline: 0.041 },
    { recall: 0.70, kagglePrecision: 0.13, nhanesPrecision: 0.058, baseline: 0.041 },
    { recall: 0.80, kagglePrecision: 0.10, nhanesPrecision: 0.052, baseline: 0.041 },
    { recall: 1.00, kagglePrecision: 0.049, nhanesPrecision: 0.041, baseline: 0.041 }
  ],
  rf: [
    { recall: 0.00, kagglePrecision: 0.41, nhanesPrecision: 0.13, baseline: 0.041 },
    { recall: 0.10, kagglePrecision: 0.34, nhanesPrecision: 0.11, baseline: 0.041 },
    { recall: 0.20, kagglePrecision: 0.28, nhanesPrecision: 0.095, baseline: 0.041 },
    { recall: 0.30, kagglePrecision: 0.24, nhanesPrecision: 0.086, baseline: 0.041 },
    { recall: 0.40, kagglePrecision: 0.20, nhanesPrecision: 0.078, baseline: 0.041 },
    { recall: 0.50, kagglePrecision: 0.16, nhanesPrecision: 0.069, baseline: 0.041 },
    { recall: 0.60, kagglePrecision: 0.13, nhanesPrecision: 0.062, baseline: 0.041 },
    { recall: 0.70, kagglePrecision: 0.11, nhanesPrecision: 0.055, baseline: 0.041 },
    { recall: 0.80, kagglePrecision: 0.09, nhanesPrecision: 0.050, baseline: 0.041 },
    { recall: 1.00, kagglePrecision: 0.049, nhanesPrecision: 0.041, baseline: 0.041 }
  ],
  xgb: [
    { recall: 0.00, kagglePrecision: 0.38, nhanesPrecision: 0.12, baseline: 0.041 },
    { recall: 0.10, kagglePrecision: 0.31, nhanesPrecision: 0.105, baseline: 0.041 },
    { recall: 0.20, kagglePrecision: 0.25, nhanesPrecision: 0.090, baseline: 0.041 },
    { recall: 0.30, kagglePrecision: 0.21, nhanesPrecision: 0.082, baseline: 0.041 },
    { recall: 0.40, kagglePrecision: 0.17, nhanesPrecision: 0.075, baseline: 0.041 },
    { recall: 0.50, kagglePrecision: 0.14, nhanesPrecision: 0.067, baseline: 0.041 },
    { recall: 0.60, kagglePrecision: 0.12, nhanesPrecision: 0.060, baseline: 0.041 },
    { recall: 0.70, kagglePrecision: 0.10, nhanesPrecision: 0.054, baseline: 0.041 },
    { recall: 0.80, kagglePrecision: 0.08, nhanesPrecision: 0.048, baseline: 0.041 },
    { recall: 1.00, kagglePrecision: 0.049, nhanesPrecision: 0.041, baseline: 0.041 }
  ]
};

// Limitations list
export const projectLimitations = [
  {
    title: 'Data generation process of source dataset',
    body: 'The Kaggle Stroke Prediction dataset originated as a public competition sample with uncertain clinical recruitment context. Synthetic or post-processed artifacts may be present in public data that do not reflect true hospital electronic health records.'
  },
  {
    title: 'Definitional divergence in glucose measurement',
    body: 'NHANES measures fasting plasma glucose via rigorous standardized laboratory protocols (LBXGLU), whereas Kaggle records unspecified blood glucose. This definitional mismatch drove a PSI of 1.495, highlighting protocol discrepancy rather than pure physiological divergence.'
  },
  {
    title: 'Severe minority class imbalance',
    body: 'Stroke is a low-prevalence condition (4.87% in Kaggle, 4.10% in NHANES). While cost-sensitive weighting was employed to avoid synthetic SMOTE interpolation, low absolute positive event counts expand bootstrap confidence bounds.'
  },
  {
    title: 'Complex survey design and sample weighting',
    body: 'NHANES employs stratified, multi-stage probability sampling with primary sampling units (PSUs) and sample weights. In this retrospective study, unweighted ML models were evaluated directly to simulate how typical off-the-shelf pipelines are deployed.'
  },
  {
    title: 'Omission of unshared clinical covariates',
    body: 'Variables present in only one dataset (e.g. detailed smoking history pack-years, work type, residence type) were excluded to achieve strict four-feature schema parity, potentially discarding predictive signals.'
  },
  {
    title: 'Post-hoc calibration limits',
    body: 'Post-hoc recalibration methods (Platt scaling and isotonic regression) fitted on source validation sets failed to repair probability calibration on NHANES, with isotonic regression suffering extreme overfitting.'
  },
  {
    title: 'Retrospective cross-dataset versus prospective clinical trials',
    body: 'This study establishes that cross-dataset performance drops significantly under retrospective covariate shift. It does not evaluate prospective real-time clinical workflows or physician-in-the-loop diagnostic pathways.'
  }
];

// Project metadata
export const projectMeta = {
  title: 'Cross-Dataset Generalisation and Calibration Analysis of Stroke Risk Prediction Models',
  shortTitle: 'Cross-Dataset Stroke-Risk Research Showcase',
  author: 'Swayam Patnaik',
  affiliation: 'Department of Computer Science & Engineering, NIST University, Berhampur, Odisha, India',
  academicLevel: 'Undergraduate Research Project',
  repositoryUrl: 'https://github.com/patnaikswayam131/CROSS-DATASET-GENERALISATION-AND-CALIBRATION-ANALYSIS-OF-STROKE-RISK-PREDICTION-MODELS',
  experimentVersion: 'v4.2-frozen-eval',
  lastUpdated: 'October 2025',
  bibtex: `@article{patnaik2025crossdataset,
  title={Cross-Dataset Generalisation and Calibration Analysis of Stroke Risk Prediction Models},
  author={Patnaik, Swayam},
  year={2025},
  institution={NIST University},
  note={Undergraduate Research Project. Code and data: https://github.com/patnaikswayam131/CROSS-DATASET-GENERALISATION-AND-CALIBRATION-ANALYSIS-OF-STROKE-RISK-PREDICTION-MODELS}
}`
};
