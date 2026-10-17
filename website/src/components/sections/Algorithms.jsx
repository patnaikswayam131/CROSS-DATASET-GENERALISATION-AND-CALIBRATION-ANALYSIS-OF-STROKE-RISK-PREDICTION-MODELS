import { useState } from 'react';

/**
 * Algorithms  -  Section 4.10 of the manuscript.
 * Two pseudocode algorithms in styled, copyable code boxes with Swiss Editorial styling.
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
      className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer px-2.5 py-1 rounded-[3px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08]"
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
          <span className="text-emerald-400">COPIED</span>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          <span>COPY</span>
        </>
      )}
    </button>
  );
}

function AlgoBox({ number, title, description, code, children }) {
  return (
    <div
      className="rounded-md overflow-hidden border border-white/[0.08] bg-[#111114]"
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-[#0c0c0e]"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded-[2px] bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
            {number}
          </span>
          <span className="text-sm font-semibold text-zinc-200">{title}</span>
        </div>
        <CopyButton text={code} />
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-400 leading-relaxed px-5 pt-4 pb-2 font-sans">{description}</p>

      {/* Code block */}
      <pre
        className="text-xs leading-relaxed overflow-x-auto px-5 pb-5 pt-2 text-zinc-300"
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          tabSize: 2,
        }}
      >
        <code>{code}</code>
      </pre>

      {/* Optional children (result table etc.) */}
      {children && (
        <div className="border-t border-white/[0.08] px-5 py-4 bg-[#0c0c0e]">
          {children}
        </div>
      )}
    </div>
  );
}

export function Algorithms() {
  return (
    <section id="algorithms" className="py-24 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
            08 / REPRODUCIBILITY & ALGORITHM SPECIFICATIONS
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            Experimental Pipeline Pseudocode
          </h2>
          <p className="text-sm text-zinc-400 max-w-3xl mt-3 leading-relaxed">
            Two algorithmic specifications formalize the experimental execution. Algorithm 1 prescribes 
            the end-to-end source-fitted evaluation harness. Algorithm 2 delineates the empirical feature-patching 
            protocol proving concurrent concept drift.
          </p>
        </div>

        <div className="space-y-8">
          <AlgoBox
            number="ALGORITHM 1"
            title="Cross-Domain Generalisation Evaluation Protocol"
            description="Covers the complete pipeline: source-domain preprocessing and classifier training, cross-domain performance measurement (ROC-AUC, PR-AUC, Brier, ECE with bootstrap CIs), distributional shift quantification, and post-hoc calibration testing. All parameters are fitted strictly on Kaggle training data."
            code={ALG1}
          />

          <AlgoBox
            number="ALGORITHM 2"
            title="Shift Contribution Analysis (Feature Patching)"
            description="Implements feature patching to isolate each feature's contribution to the generalisation gap. For each feature, NHANES values are replaced with Kaggle-distribution samples and NHANES AUC is re-evaluated. All-negative deltas confirm concurrent concept shift."
            code={ALG2}
          >
            {/* Inline result table for Algorithm 2 */}
            <div>
              <p className="text-xs font-mono font-semibold text-zinc-300 mb-3 uppercase tracking-wide">
                TABLE 5: EMPIRICAL RESULTS  -  XGBOOST FEATURE PATCHING
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                      <th className="py-2.5 px-3">Feature Replaced</th>
                      <th className="py-2.5 px-3 text-center">Baseline NHANES AUC</th>
                      <th className="py-2.5 px-3 text-center">Patched AUC</th>
                      <th className="py-2.5 px-3 text-center font-semibold">Generalisation Delta (δ)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {RESULTS_ALG2.map((row) => (
                      <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 px-3 font-mono text-zinc-200 font-medium">{row.feature}</td>
                        <td className="py-2.5 px-3 text-center text-zinc-400 font-mono">{row.baseline.toFixed(3)}</td>
                        <td className="py-2.5 px-3 text-center text-zinc-400 font-mono">{row.patched.toFixed(3)}</td>
                        <td className="py-2.5 px-3 text-center font-semibold text-rose-400 font-mono">{row.delta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-zinc-400 mt-3 leading-relaxed font-sans">
                <strong className="text-rose-400 font-semibold font-mono">ALL DELTAS ARE NEGATIVE:</strong> Correcting covariate shift in every individual feature worsens cross-domain performance, proving that P_S(Y|X) ≠ P_T(Y|X) and verifying concurrent concept shift across populations.
              </p>
            </div>
          </AlgoBox>
        </div>
      </div>
    </section>
  );
}

export default Algorithms;
