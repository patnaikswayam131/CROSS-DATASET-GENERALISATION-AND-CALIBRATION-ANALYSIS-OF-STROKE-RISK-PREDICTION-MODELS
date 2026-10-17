import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  simulatePatientRisk,
  simulateDecisionThreshold,
  CLINICAL_PRESETS,
} from '../../data/simulationLogic';
import {
  getChartData,
  getMetricData,
} from '../../data/interactiveLogic';
import {
  dynamicSummaries,
  metricExplanations,
} from '../../data/projectData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const MODEL_OPTIONS = [
  { value: 'lr', label: 'Logistic Regression' },
  { value: 'rf', label: 'Random Forest' },
  { value: 'xgb', label: 'XGBoost' },
];

const METRIC_OPTIONS = [
  { value: 'pr', label: 'PR-AUC (Primary Degradation Signal)' },
  { value: 'roc', label: 'ROC-AUC (Concealed Failure)' },
  { value: 'brier', label: 'Brier Calibration Score' },
  { value: 'ece', label: 'ECE (Expected Calibration Error)' },
];

export function InteractiveExplorer() {
  const [activeTab, setActiveTab] = useState('patient-sim'); // 'patient-sim' | 'threshold-sim' | 'benchmark'

  // ─── Patient Simulation State (4 Harmonised Features - Table 1) ───
  const [age, setAge] = useState(76);
  const [gender, setGender] = useState('male');
  const [glucose, setGlucose] = useState(218);
  const [bmi, setBmi] = useState(31.8);
  const [showDetails, setShowDetails] = useState(false);

  // Compute live simulation output
  const simResult = simulatePatientRisk({
    age,
    gender,
    glucose,
    bmi,
  });

  // Apply preset profile
  const handleApplyPreset = (preset) => {
    setAge(preset.age);
    setGender(preset.gender);
    setGlucose(preset.glucose);
    setBmi(preset.bmi);
  };

  // ─── Threshold Simulation State ────────────────────────────
  const [threshold, setThreshold] = useState(0.12);
  const [showThresholdDetails, setShowThresholdDetails] = useState(false);
  const threshResult = simulateDecisionThreshold(threshold);

  // ─── Benchmark Explorer State ──────────────────────────────
  const [model, setModel] = useState('lr');
  const [metric, setMetric] = useState('pr');
  const [showCI, setShowCI] = useState(true);

  const ciAvailable = metric === 'roc' || metric === 'pr';
  const chartData = getChartData(model, metric);
  const metricData = getMetricData(model, metric);
  const summaryKey = `${model}_${metric}`;
  const summary = dynamicSummaries[summaryKey];
  const explanation = metricExplanations[metric];

  return (
    <section id="interactive" className="py-24 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
              05 / INTERACTIVE BENCHMARK & RISK SIMULATION ENGINE
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
              Simulate Generalisation & Domain Shift
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Test how patient covariates trigger model overconfidence under empirical domain shift, 
              examine decision threshold failure modes, or inspect the complete benchmark metric space.
            </p>
          </div>

          {/* Segmented Control Bar */}
          <div className="flex items-center gap-1 p-1 rounded-md bg-[#111114] border border-white/[0.08] self-start md:self-auto">
            <button
              onClick={() => setActiveTab('patient-sim')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeTab === 'patient-sim'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
              }`}
            >
              Patient Risk Shift
            </button>
            <button
              onClick={() => setActiveTab('threshold-sim')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeTab === 'threshold-sim'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
              }`}
            >
              Threshold Sensitivity
            </button>
            <button
              onClick={() => setActiveTab('benchmark')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeTab === 'benchmark'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
              }`}
            >
              Benchmark Matrix
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ============================================================== */}
          {/* TAB 1: PATIENT COVARIATE & RISK SHIFT SIMULATOR               */}
          {/* ============================================================== */}
          {activeTab === 'patient-sim' && (
            <motion.div
              key="patient-sim"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Controls Column (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-md bg-[#111114] border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.08]">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold">
                      INPUT COVARIATE VECTOR (X)
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400">
                      HARMONISED 4D
                    </span>
                  </div>

                  {/* Preset Profiles */}
                  <div className="mb-6">
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-2">
                      Clinical Presets
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {CLINICAL_PRESETS.map((p) => {
                        const isActive =
                          age === p.age &&
                          gender === p.gender &&
                          glucose === p.glucose &&
                          bmi === p.bmi;

                        return (
                          <button
                            key={p.id}
                            onClick={() => handleApplyPreset(p)}
                            className={`text-left p-2.5 rounded-[4px] border transition-all text-xs cursor-pointer ${
                              isActive
                                ? 'bg-white/[0.08] border-white/30 text-white'
                                : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="font-medium text-zinc-200 truncate">
                              {p.name}
                            </div>
                            <div className="text-[10px] font-mono text-zinc-400 mt-0.5 truncate">
                              {p.badge}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-5">
                    {/* Age */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-zinc-300 font-medium">Patient Age</span>
                        <span className="font-mono text-xs px-2 py-0.5 rounded-[3px] bg-white/[0.04] text-zinc-200 border border-white/[0.08]">
                          {age} yrs
                        </span>
                      </div>
                      <input
                        type="range"
                        min={18}
                        max={85}
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="slider-modern w-full"
                      />
                      <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
                        <span>18 yrs</span>
                        <span>85 yrs (Senior demographic)</span>
                      </div>
                    </div>

                    {/* Glucose */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-zinc-300 font-medium">Average Glucose</span>
                        <span className="font-mono text-xs px-2 py-0.5 rounded-[3px] bg-white/[0.04] text-zinc-200 border border-white/[0.08]">
                          {glucose} mg/dL
                        </span>
                      </div>
                      <input
                        type="range"
                        min={60}
                        max={280}
                        value={glucose}
                        onChange={(e) => setGlucose(Number(e.target.value))}
                        className="slider-modern w-full"
                      />
                      <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
                        <span>60 mg/dL (Normal)</span>
                        <span>280 mg/dL (Severe Mismatch PSI=1.495)</span>
                      </div>
                    </div>

                    {/* BMI */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-zinc-300 font-medium">Body Mass Index (BMI)</span>
                        <span className="font-mono text-xs px-2 py-0.5 rounded-[3px] bg-white/[0.04] text-zinc-200 border border-white/[0.08]">
                          {bmi.toFixed(1)} kg/m²
                        </span>
                      </div>
                      <input
                        type="range"
                        min={16}
                        max={48}
                        step={0.5}
                        value={bmi}
                        onChange={(e) => setBmi(Number(e.target.value))}
                        className="slider-modern w-full"
                      />
                      <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
                        <span>16.0</span>
                        <span>48.0 kg/m²</span>
                      </div>
                    </div>

                    {/* Biological Gender */}
                    <div className="pt-2 border-t border-white/[0.08]">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-zinc-300 font-medium">Biological Sex</span>
                        <span className="font-mono text-xs text-zinc-400 capitalize">{gender}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setGender('female')}
                          className={`py-2 px-3 rounded-[4px] text-xs font-mono transition-colors cursor-pointer border ${
                            gender === 'female'
                              ? 'bg-white/[0.08] border-white/30 text-white'
                              : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          Female (RIAGENDR = 2)
                        </button>
                        <button
                          type="button"
                          onClick={() => setGender('male')}
                          className={`py-2 px-3 rounded-[4px] text-xs font-mono transition-colors cursor-pointer border ${
                            gender === 'male'
                              ? 'bg-white/[0.08] border-white/30 text-white'
                              : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          Male (RIAGENDR = 1)
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] font-mono text-zinc-400 leading-relaxed pt-2">
                      * Preprocessed with parameters fitted exclusively on Kaggle training split (seed = 42).
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Output Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-7 rounded-md bg-[#111114] border border-white/[0.08]">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-100">
                        Predicted Stroke Probability
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        In-domain benchmark expectation versus representative target population reality
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded-[3px] bg-white/[0.03] text-zinc-400 border border-white/[0.08]">
                      EVALUATION DELTA
                    </span>
                  </div>

                  {/* Clean Side-by-Side Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Kaggle Estimate */}
                    <div className="p-5 rounded-md bg-white/[0.02] border border-white/[0.08]">
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                        <span className="font-mono text-[11px] uppercase">Kaggle In-Domain Model</span>
                        <span className="h-1.5 w-1.5 bg-zinc-400" />
                      </div>
                      <div className="text-3xl font-bold font-mono text-zinc-100">
                        {simResult.riskKaggle.toFixed(1)}%
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                        Predicted risk score from model calibrated on curated hospital benchmark EHR.
                      </p>
                    </div>

                    {/* NHANES Reality */}
                    <div className="p-5 rounded-md bg-rose-500/[0.03] border border-rose-500/20">
                      <div className="flex items-center justify-between text-xs text-rose-400 mb-2">
                        <span className="font-mono text-[11px] uppercase">NHANES Target Population</span>
                        <span className="h-1.5 w-1.5 bg-rose-500" />
                      </div>
                      <div className="text-3xl font-bold font-mono text-rose-400">
                        {simResult.riskNHANES.toFixed(1)}%
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                        Empirical epidemiological reality in CDC multi-stage probability survey (prevalence 4.10%).
                      </p>
                    </div>
                  </div>

                  {/* Generalisation Discrepancy Bar */}
                  <div className="p-4 rounded-md bg-white/[0.02] border border-white/[0.08] mb-6">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-zinc-400 font-mono text-[11px] uppercase">Generalisation Overconfidence Gap</span>
                      <span className="font-mono font-semibold text-rose-400">
                        +{simResult.delta.toFixed(1)} percentage points
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white/[0.05] rounded-[2px] overflow-hidden flex">
                      <div
                        className="h-full bg-zinc-400"
                        style={{ width: `${Math.min(simResult.riskNHANES, 100)}%` }}
                      />
                      <div
                        className="h-full bg-rose-500"
                        style={{ width: `${Math.min(simResult.delta, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-2">
                      <span>Target Base: {simResult.riskNHANES.toFixed(1)}%</span>
                      <span>Model Overestimation: +{simResult.delta.toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* ─── Expandable Details Button (Requested by User) ─── */}
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full py-3 px-4 rounded-md border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-rose-400 font-semibold">[?]</span>
                      <span>METHODOLOGICAL AUDIT: WHY DOES THIS DISCREPANCY OCCUR?</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                      {showDetails ? '[HIDE AUDIT]' : '[EXPAND ANALYSIS]'}
                    </span>
                  </button>

                  {/* Expandable Breakdown Drawer */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-3">
                          <div className="p-5 rounded-md bg-[#0c0c0e] border border-white/[0.08] text-xs text-zinc-300 space-y-4 leading-relaxed font-sans">
                            <div>
                              <span className="font-semibold text-zinc-100 font-mono text-[11px] uppercase block mb-1">
                                1. Glucose Measurement Protocol Mismatch (PSI = 1.495)
                              </span>
                              <p className="text-zinc-400">
                                NHANES records fasting plasma glucose (<code className="text-zinc-200 font-mono">LBXGLU</code>) under strict morning fasting protocols, whereas Kaggle contains unspecified or random glucose readings. This creates an irremediable definitional mismatch (KS statistic = 0.362, p = 1.4×10⁻¹⁹⁵), artificially inflating predicted risk when glucose exceeds 140 mg/dL.
                              </p>
                            </div>

                            <div>
                              <span className="font-semibold text-zinc-100 font-mono text-[11px] uppercase block mb-1">
                                2. Demographic Aging Shift (Age PSI = 1.007)
                              </span>
                              <p className="text-zinc-400">
                                The Kaggle benchmark cohort has a median age of 45 years, while the adult NHANES population exhibits a significantly denser senior demographic (median 56 years, KS = 0.207). Because age is the dominant predictor in stroke risk models, this demographic mismatch systematically skews calibration.
                              </p>
                            </div>

                            <div>
                              <span className="font-semibold text-zinc-100 font-mono text-[11px] uppercase block mb-1">
                                3. Concurrent Concept Shift (Table 5 Feature Patching)
                              </span>
                              <p className="text-zinc-400">
                                Feature-patching experiments proved that replacing NHANES feature distributions with Kaggle distributions resulted in universal negative deltas across all features (Age: −0.200, Glucose: −0.016, BMI: −0.021). This confirms that P(Y|X) has changed, meaning the underlying clinical decision boundary itself differs across populations.
                              </p>
                            </div>

                            <div>
                              <span className="font-semibold text-zinc-100 font-mono text-[11px] uppercase block mb-1">
                                4. Post-Hoc Recalibration Ineffectiveness
                              </span>
                              <p className="text-zinc-400">
                                Platt scaling produced zero improvement in discrimination across all models, and isotonic regression catastrophically degraded XGBoost from 0.709 to 0.579 (Δ = −0.130). Probability recalibration cannot resolve a shifted underlying feature-outcome mapping.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: DECISION THRESHOLD SENSITIVITY SIMULATOR               */}
          {/* ============================================================== */}
          {activeTab === 'threshold-sim' && (
            <motion.div
              key="threshold-sim"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-md bg-[#111114] border border-white/[0.08]">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold mb-1">
                    CLASSIFICATION CUTOFF (τ)
                  </h3>
                  <p className="text-xs text-zinc-400 mb-6">
                    Evaluate how decision thresholds calibrated on source data impact false positive rates in clinical practice.
                  </p>

                  <div className="mb-6">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-zinc-300 font-medium">Operating Cutoff (τ)</span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded-[3px] bg-white/[0.04] text-zinc-200 border border-white/[0.08]">
                        τ = {threshold.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.04}
                      max={0.45}
                      step={0.01}
                      value={threshold}
                      onChange={(e) => setThreshold(Number(e.target.value))}
                      className="slider-modern w-full"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
                      <span>τ = 0.04 (Screening Mode)</span>
                      <span>τ = 0.45 (High Specificity)</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-md bg-white/[0.02] border border-white/[0.08] text-xs space-y-2">
                    <div className="text-zinc-200 font-medium font-mono text-[11px] uppercase">Clinical Triage Consequence:</div>
                    <p className="text-zinc-400 leading-relaxed font-sans">
                      At stroke prevalence of 4.10% (NHANES), optimizing τ on the source benchmark produces{' '}
                      <strong className="text-rose-400 font-mono">{threshResult.fpRatio}× more false alarms</strong>{' '}
                      in real-world triage, overburdening neurological referral capacity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="p-7 rounded-md bg-[#111114] border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-100">
                        Precision &amp; False Positive Impact
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Expected positive predictive value vs actual target cohort yield
                      </p>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 rounded-[3px] bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      {threshResult.collapsePct}% PRECISION LOSS
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-md bg-white/[0.02] border border-white/[0.08]">
                      <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-1">In-Domain Precision</span>
                      <div className="text-2xl font-bold font-mono text-zinc-100">
                        {(threshResult.precisionKaggle * 100).toFixed(1)}%
                      </div>
                      <span className="text-[11px] text-zinc-400 mt-1 block">Expected positive predictive value</span>
                    </div>

                    <div className="p-4 rounded-md bg-rose-500/[0.03] border border-rose-500/20">
                      <span className="text-[11px] font-mono uppercase text-rose-400 block mb-1">Cross-Domain Precision</span>
                      <div className="text-2xl font-bold font-mono text-rose-400">
                        {(threshResult.precisionNHANES * 100).toFixed(1)}%
                      </div>
                      <span className="text-[11px] text-zinc-400 mt-1 block">Actual target cohort yield</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-md bg-white/[0.02] border border-white/[0.08]">
                    <span className="text-[11px] font-mono uppercase text-zinc-300 block mb-3 font-medium">
                      False Positives per 1,000 Screened Patients:
                    </span>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-mono">
                          <span className="text-zinc-400">Kaggle In-Domain Expectation:</span>
                          <span className="text-zinc-200">{threshResult.fpKaggle} false alarms</span>
                        </div>
                        <div className="h-2 w-full bg-white/[0.05] rounded-[2px] overflow-hidden">
                          <div
                            className="h-full bg-zinc-400"
                            style={{ width: `${(threshResult.fpKaggle / 1000) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1 font-mono">
                          <span className="text-zinc-400">NHANES Cross-Domain Reality:</span>
                          <span className="text-rose-400 font-semibold">{threshResult.fpNHANES} false alarms</span>
                        </div>
                        <div className="h-2 w-full bg-white/[0.05] rounded-[2px] overflow-hidden">
                          <div
                            className="h-full bg-rose-500"
                            style={{ width: `${(threshResult.fpNHANES / 1000) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowThresholdDetails(!showThresholdDetails)}
                    className="w-full mt-4 py-2.5 px-4 rounded-md border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>WHY DOES THRESHOLD TUNING FAIL UNDER SHIFT?</span>
                    <span className="text-zinc-400 font-mono text-[11px]">
                      {showThresholdDetails ? '[HIDE]' : '[DETAILS]'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showThresholdDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-3"
                      >
                        <div className="p-4 rounded-md bg-[#0c0c0e] border border-white/[0.08] text-xs text-zinc-400 leading-relaxed font-sans">
                          Under extreme class imbalance, decision threshold tuning trades off false alarms against false negatives based on the source empirical distribution. When the target population exhibits different marginal feature distributions and severe probability miscalibration (ECE &gt; 0.40), the operating point set on source data fails to preserve either specificity or clinical utility.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: BENCHMARK MODEL MATRIX                                 */}
          {/* ============================================================== */}
          {activeTab === 'benchmark' && (
            <motion.div
              key="benchmark"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left selector */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-md bg-[#111114] border border-white/[0.08]">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Classifier Architecture
                  </label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-[#0c0c0e] border border-white/[0.08] text-zinc-200 rounded-[4px] px-3.5 py-2.5 text-xs focus:outline-none focus:border-zinc-400 cursor-pointer mb-5 font-mono"
                  >
                    {MODEL_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Statistical Metric
                  </label>
                  <div className="space-y-1.5 mb-6">
                    {METRIC_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setMetric(opt.value)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-[4px] text-xs font-mono transition-colors cursor-pointer border ${
                          metric === opt.value
                            ? 'bg-white/[0.08] border-white/30 text-white font-medium'
                            : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {ciAvailable && (
                    <div className="pt-4 border-t border-white/[0.08]">
                      <label className="flex items-center gap-2.5 text-xs text-zinc-300 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={showCI}
                          onChange={(e) => setShowCI(e.target.checked)}
                          className="rounded-[2px] border-white/20 bg-white/5 text-rose-500 focus:ring-0 cursor-pointer"
                        />
                        <span>Display 95% Bootstrap Confidence Intervals</span>
                      </label>
                      <span className="text-[10px] text-zinc-400 block mt-1 font-mono">
                        B = 1,000 stratified resamples (seed = 42)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right chart display */}
              <div className="lg:col-span-7">
                <div className="p-7 rounded-md bg-[#111114] border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-100">
                        {explanation.name} Comparison
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {explanation.full}
                      </p>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 rounded-[3px] bg-white/[0.03] text-zinc-200 border border-white/[0.08]">
                      Δ: {(metricData.inDomain - metricData.crossDomain).toFixed(3)}
                    </span>
                  </div>

                  {/* Recharts comparison bar */}
                  <div className="h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.06)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{ fill: '#a1a1aa', fontSize: 11, fontFamily: 'var(--font-mono, monospace)' }} />
                        <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: '#a1a1aa', fontSize: 11, fontFamily: 'var(--font-mono, monospace)' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#111114',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '12px',
                          }}
                        />
                        {metric === 'pr' && (
                          <ReferenceLine
                            y={0.041}
                            stroke="#71717a"
                            strokeDasharray="4 4"
                            label={{ value: 'Random Baseline (4.1%)', fill: '#a1a1aa', fontSize: 10, position: 'insideTopRight', fontFamily: 'var(--font-mono, monospace)' }}
                          />
                        )}
                        <Bar dataKey="value" radius={[2, 2, 0, 0]} fill="#94a3b8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Metric Summary */}
                  <div className="p-4 rounded-md bg-white/[0.02] border border-white/[0.08] text-xs text-zinc-300 leading-relaxed font-sans">
                    <p>{summary}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default InteractiveExplorer;
