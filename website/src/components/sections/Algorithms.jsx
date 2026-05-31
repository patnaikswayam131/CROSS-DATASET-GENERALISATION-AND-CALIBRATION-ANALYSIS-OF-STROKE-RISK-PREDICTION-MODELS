import { useState } from 'react';

/**
 * Algorithms — Section 4.10 of the manuscript.
 * Two pseudocode algorithms in styled, copyable code boxes.
 */

const ALG1 = `Input:
  Kaggle dataset, NHANES dataset
  features = {age, gender, bmi, avg_glucose_level}
  classifiers = {Logistic Regression, Random Forest, XGBoost}

Output:
  ROC-AUC, PR-AUC, Brier Score, ECE
  (with 95% confidence intervals for both domains)

─────────────────────────────────────────────────────────
1.  Map shared features across Kaggle and NHANES

2.  Split Kaggle: 70% training, 30% test
      (stratified, seed = 42)

3.  Fit imputer and scaler on Kaggle training set ONLY

4.  Apply fitted imputer and scaler to:
      - Kaggle test set
      - NHANES cohort  ← no parameters re-estimated

5.  for each classifier:
      Train on Kaggle training set with class balancing

6.  for each classifier:
      Generate predicted probabilities on:
        - Kaggle test set
        - NHANES cohort
      Compute ROC-AUC, PR-AUC, Brier Score, ECE
      Compute 95% confidence intervals
        via 1,000 bootstrap resamples (seed = 42)
      Compute generalisation gap
        = Kaggle AUC − NHANES AUC

7.  for each feature:
      Compute KS statistic and PSI
        between Kaggle train and NHANES
      Train domain classifier
        (Kaggle vs. NHANES samples)

8.  for each classifier:
      Apply Platt scaling on Kaggle training set
        → evaluate on NHANES
      Apply isotonic regression on Kaggle training set
        → evaluate on NHANES

Return: all metrics, confidence intervals,
        shift statistics, adaptation results`;

const ALG2 = `Input:
  Trained XGBoost model  f_S
  Kaggle training set (scaled)
  NHANES test set (scaled)
  NHANES labels

Output:
  ΔAUC per feature when covariate shift is corrected

─────────────────────────────────────────────────────────
1.  Compute baseline AUC on NHANES using f_S

2.  for each feature f in {age, gender, bmi, glucose}:
      Copy the NHANES test set → X_patched
      Replace column f in X_patched with values
        sampled from the Kaggle training distribution
      Compute patched_AUC = AUC(f_S, X_patched)
      Compute delta = patched_AUC − baseline_AUC

3.  if ALL delta values are negative:
      → Concept shift confirmed
        (correcting covariate shift WORSENS performance,
         meaning P_S(Y|X) ≠ P_T(Y|X))

Return:
  feature_name, patched_AUC, delta  for each feature`;

const RESULTS_ALG2 = [
  { feature: 'age', baseline: 0.709, patched: 0.509, delta: '−0.200' },
  { feature: 'bmi', baseline: 0.709, patched: 0.688, delta: '−0.021' },
  { feature: 'avg_glucose_level', baseline: 0.709, patched: 0.693, delta: '−0.016' },
  { feature: 'gender', baseline: 0.709, patched: 0.708, delta: '−0.001' },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-xs text-[#8b90a4] hover:text-[#e8eaf0] transition-colors duration-200 cursor-pointer px-2 py-1 rounded"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="#4caf82" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
          Copied!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          Copy
        </>
      )}
    </button>
  );
}

function AlgoBox({ number, title, description, code, children }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid #2e3248', background: 'rgba(26,29,39,0.80)' }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b border-[#2e3248]"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      >
        <div className="flex items-center gap-3">
          {/* Traffic-light dots */}
          <span className="h-3 w-3 rounded-full bg-[#e05c5c] opacity-70" />
          <span className="h-3 w-3 rounded-full bg-[#e8a838] opacity-70" />
          <span className="h-3 w-3 rounded-full bg-[#4caf82] opacity-70" />
          <span className="ml-2 text-xs font-mono text-[#8b90a4]">{number}</span>
          <span className="text-sm font-semibold text-[#e8eaf0]">{title}</span>
        </div>
        <CopyButton text={code} />
      </div>

      {/* Description */}
      <p className="text-xs text-[#8b90a4] leading-relaxed px-5 pt-4 pb-2">{description}</p>

      {/* Code block */}
      <pre
        className="text-xs leading-relaxed overflow-x-auto px-5 pb-5 pt-2"
        style={{
          fontFamily: 'var(--font-mono)',
          color: '#c5c8d6',
          tabSize: 2,
        }}
      >
        <code>{code}</code>
      </pre>

      {/* Optional children (result table etc.) */}
      {children && (
        <div className="border-t border-[#2e3248] px-5 py-4">
          {children}
        </div>
      )}
    </div>
  );
}

export function Algorithms() {
  return (
    <section id="algorithms" className="max-w-7xl py-20 px-6 mx-auto">
      {/* Section label */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4f8ef7] mb-3">
        Algorithms
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-4">
        Experimental Pipeline Pseudocode
      </h2>
      <p className="text-sm text-[#8b90a4] mb-12 max-w-3xl leading-relaxed">
        Two algorithms govern the experimental pipeline. Algorithm 1 covers the complete evaluation
        workflow. Algorithm 2 isolates each feature's contribution to the generalisation gap and
        provides empirical evidence of concept shift.
      </p>

      <div className="space-y-8">
        <AlgoBox
          number="Algorithm 1"
          title="Cross-Domain Generalisation Evaluation"
          description="Covers the complete pipeline: source-domain preprocessing and classifier training, cross-domain performance measurement (ROC-AUC, PR-AUC, Brier, ECE with bootstrap CIs), distributional shift quantification, and post-hoc calibration testing. All parameters are fitted on Kaggle training data only."
          code={ALG1}
        />

        <AlgoBox
          number="Algorithm 2"
          title="Shift Contribution Analysis (Feature Patching)"
          description="Implements feature patching to isolate each feature's contribution to the generalisation gap. For each feature, NHANES values are replaced with Kaggle-distribution samples and NHANES AUC is re-evaluated. All-negative deltas confirm concurrent concept shift."
          code={ALG2}
        >
          {/* Inline result table for Algorithm 2 */}
          <div>
            <p className="text-xs font-semibold text-[#8b90a4] mb-3 uppercase tracking-wide">
              Empirical Results — XGBoost Feature Patching
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#2e3248]">
                    <th className="text-left text-[#8b90a4] font-medium py-2 pr-6">Feature</th>
                    <th className="text-center text-[#8b90a4] font-medium py-2 pr-6">Baseline AUC</th>
                    <th className="text-center text-[#8b90a4] font-medium py-2 pr-6">Patched AUC</th>
                    <th className="text-center text-[#8b90a4] font-medium py-2">Δ</th>
                  </tr>
                </thead>
                <tbody>
                  {RESULTS_ALG2.map((row) => (
                    <tr key={row.feature} className="border-t border-[#2e3248]">
                      <td className="py-2 pr-6 font-mono text-[#4f8ef7]">{row.feature}</td>
                      <td className="py-2 pr-6 text-center text-[#e8eaf0]">{row.baseline.toFixed(3)}</td>
                      <td className="py-2 pr-6 text-center text-[#e8eaf0]">{row.patched.toFixed(3)}</td>
                      <td className="py-2 text-center font-semibold text-[#e05c5c]">{row.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#8b90a4] mt-3 leading-relaxed">
              <span className="text-[#e05c5c] font-semibold">All deltas are negative</span> — confirming concurrent concept shift.
              Correcting covariate shift in every feature worsens cross-domain performance,
              proving that P_S(Y|X) ≠ P_T(Y|X).
            </p>
          </div>
        </AlgoBox>
      </div>
    </section>
  );
}

export default Algorithms;
