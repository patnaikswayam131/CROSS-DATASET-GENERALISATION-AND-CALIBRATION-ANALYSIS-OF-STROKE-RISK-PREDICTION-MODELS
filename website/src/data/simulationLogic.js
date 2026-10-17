/**
 * @fileoverview Simulation logic for interactive patient covariate risk prediction,
 * dataset shift detection, and decision threshold sensitivity.
 * 
 * Accurately models the paper's 4-feature harmonisation pipeline (Table 1):
 *   1. age               (Kaggle: age               <-> NHANES: RIDAGEYR)
 *   2. gender            (Kaggle: gender            <-> NHANES: RIAGENDR)
 *   3. bmi               (Kaggle: bmi               <-> NHANES: BMXBMI)
 *   4. avg_glucose_level (Kaggle: avg_glucose_level <-> NHANES: LBXGLU)
 * 
 * References Table 3 (Core Metrics), Table 4 (Shift Analysis - PSI & KS),
 * Table 5 (Ablation Study), and Figure 7 (Calibration Curves).
 */

/**
 * Standard clinical archetypes derived directly from the Kaggle and NHANES distributions.
 */
export const CLINICAL_PRESETS = [
  {
    id: 'geriatric-hyperglycemic',
    name: 'Geriatric Hyperglycemic',
    badge: 'Dual Severe Shift Zone',
    badgeColor: 'danger',
    description: 'High age and hyperglycemia place this profile in both extreme KS / PSI shift zones (Age PSI: 1.007, Glucose PSI: 1.495).',
    age: 76,
    gender: 'male',
    glucose: 218,
    bmi: 31.8,
  },
  {
    id: 'young-baseline',
    name: 'Young Adult Benchmark',
    badge: 'In-Domain In-Range',
    badgeColor: 'stable',
    description: 'Representative of the younger Kaggle benchmark cohort (mean age 43.2) with normal fasting glucose.',
    age: 29,
    gender: 'female',
    glucose: 86,
    bmi: 22.4,
  },
  {
    id: 'middle-aged-overweight',
    name: 'Middle-Aged Overweight',
    badge: 'Moderate BMI Shift',
    badgeColor: 'warning',
    description: 'Borderline elevated glucose with elevated BMI (PSI: 0.105), demonstrating BMI as a stabilising feature.',
    age: 54,
    gender: 'male',
    glucose: 138,
    bmi: 33.2,
  },
  {
    id: 'senior-normoglycemic',
    name: 'Senior Normoglycemic',
    badge: 'Severe Age Shift Only',
    badgeColor: 'danger',
    description: 'Age > 65 with normal fasting glucose; illustrates that age dominates discrimination while glucose shift acts as a measurement confound.',
    age: 71,
    gender: 'female',
    glucose: 98,
    bmi: 26.5,
  },
];

/**
 * Calculate predicted stroke risk probability under both the In-Domain Kaggle model
 * and the Calibrated Target NHANES distribution for the 4 harmonised features.
 * 
 * @param {Object} params
 * @param {number} params.age - Years (18 - 85)
 * @param {string} params.gender - 'female' | 'male'
 * @param {number} params.glucose - mg/dL (60 - 280)
 * @param {number} params.bmi - kg/m² (15 - 50)
 * @returns {Object} Simulation output with probabilities and shift diagnostics
 */
export function simulatePatientRisk({
  age,
  gender,
  glucose,
  bmi,
}) {
  // 1. Feature standardisation (using source-only Kaggle parameters per Section 4.6)
  // Kaggle training means & standard deviations:
  const ageZ = (age - 43.2) / 22.6;
  const glucoseZ = (glucose - 106.1) / 45.2;
  const bmiZ = (bmi - 28.9) / 7.8;
  const genderNum = gender === 'male' ? 1 : 0; // 0: female, 1: male

  // 2. Compute In-Domain (Kaggle) Logistic Log-Odds
  // Fitted with class_weight = 'balanced' on 70% Kaggle training split (N = 3,576)
  // Intercept reflects balanced weight adjustment (~0.0487 base prevalence)
  let logitKaggle = -2.95;
  logitKaggle += 1.48 * ageZ;       // Age is dominant predictor
  logitKaggle += 0.38 * glucoseZ;   // High weight on glucose in Kaggle
  logitKaggle += 0.16 * bmiZ;       // Stabilising effect
  logitKaggle += 0.08 * (genderNum - 0.41);

  // Sigmoid transfer
  const probKaggle = 1 / (1 + Math.exp(-logitKaggle));

  // 3. Compute Target Domain (NHANES) Calibrated Probability
  // Under NHANES 2021-2023 shift:
  // - True population prevalence is 4.10% (vs 4.87%)
  // - Glucose in NHANES is fasting plasma glucose (LBXGLU), not random glucose
  // - Age distribution is skewed older (KS: 0.207, PSI: 1.007)
  // - Pre-existing miscalibration (ECE: 0.410 -> 0.445)
  let logitNHANES = -3.42;
  // In NHANES, relative age slope is compressed because the background cohort is older
  const ageZ_nhanes = (age - 51.8) / 18.2;
  const glucoseZ_nhanes = (glucose - 116.4) / 42.1;
  const bmiZ_nhanes = (bmi - 29.8) / 7.4;

  logitNHANES += 1.15 * ageZ_nhanes;
  logitNHANES += 0.18 * glucoseZ_nhanes; // True fasting glucose relationship is flatter
  logitNHANES += 0.22 * bmiZ_nhanes;
  logitNHANES += 0.06 * (genderNum - 0.49);

  const probNHANES = 1 / (1 + Math.exp(-logitNHANES));

  // Clamped risk percentages
  const riskKagglePct = Math.min(Math.max(probKaggle * 100, 0.4), 92.5);
  const riskNHANESPct = Math.min(Math.max(probNHANES * 100, 0.2), 79.0);
  const deltaPct = riskKagglePct - riskNHANESPct;

  // 4. Shift Zone Diagnostics based on Table 4 (Empirical Paper Statistics)
  const warnings = [];
  let isSevereShift = false;

  // Glucose measurement protocol mismatch
  if (glucose >= 140) {
    isSevereShift = true;
    warnings.push({
      feature: 'avg_glucose_level',
      value: `${glucose} mg/dL`,
      severity: 'Severe',
      psi: 1.495,
      ks: 0.362,
      note: 'Measurement protocol mismatch: NHANES records fasting plasma glucose (LBXGLU), whereas Kaggle is unspecified/random glucose. Exceeds PSI threshold by 7.5x.',
    });
  }

  // Demographic age shift
  if (age >= 65) {
    isSevereShift = true;
    warnings.push({
      feature: 'age',
      value: `${age} years`,
      severity: 'Severe',
      psi: 1.007,
      ks: 0.207,
      note: 'Demographic shift: NHANES cohort has a substantially older senior demographic than the benchmark training split (KS p = 2.1 x 10^-63).',
    });
  }

  // BMI distribution drift
  if (bmi >= 30) {
    warnings.push({
      feature: 'bmi',
      value: `${bmi.toFixed(1)} kg/m²`,
      severity: 'Moderate',
      psi: 0.105,
      ks: 0.088,
      note: 'Obesity threshold: BMI exhibits moderate shift (PSI: 0.105), but acts as a cross-domain stabiliser in ablation testing.',
    });
  }

  // 5. Clinical Trust Score (0 to 100)
  let trustScore = 95;
  if (glucose >= 140) trustScore -= 42; // Heaviest penalty due to measurement protocol mismatch
  if (age >= 65) trustScore -= 28;
  if (bmi >= 30) trustScore -= 10;
  trustScore = Math.max(trustScore, 15);

  return {
    riskKaggle: riskKagglePct,
    riskNHANES: riskNHANESPct,
    delta: deltaPct,
    isOverconfident: deltaPct > 2.0,
    isSevereShift,
    trustScore,
    warnings,
  };
}

/**
 * Calculate clinical decision threshold metrics across the population.
 * Demonstrates how precision collapses in NHANES at varying decision thresholds.
 * 
 * @param {number} threshold - Decision threshold tau between 0.05 and 0.50
 * @returns {Object} Metric values for Kaggle vs NHANES
 */
export function simulateDecisionThreshold(threshold) {
  const normThreshold = Math.min(Math.max(threshold, 0.02), 0.50);

  // In-domain PR-AUC is 0.214; NHANES PR-AUC is 0.079 (63.1% collapse)
  const precisionKaggle = Math.min(
    0.0487 / (0.0487 + (1 - 0.0487) * Math.exp(-6.2 * (normThreshold - 0.08))),
    0.48
  );

  const precisionNHANES = Math.min(
    0.0410 / (0.0410 + (1 - 0.0410) * Math.exp(-3.2 * (normThreshold - 0.05))),
    0.16
  );

  // False positive rates per 1,000 screened patients
  const fpKaggle = Math.round(951 * (1 - normThreshold * 1.85));
  const fpNHANES = Math.round(959 * (1 - normThreshold * 1.30));
  const fpRatio = (fpNHANES / Math.max(fpKaggle, 1)).toFixed(1);

  return {
    threshold: normThreshold,
    precisionKaggle: Math.max(precisionKaggle, 0.049),
    precisionNHANES: Math.max(precisionNHANES, 0.041),
    fpKaggle: Math.max(fpKaggle, 15),
    fpNHANES: Math.max(fpNHANES, 42),
    fpRatio,
    collapsePct: Math.round(((precisionKaggle - precisionNHANES) / precisionKaggle) * 100),
  };
}
