import { useState } from 'react';
import { simulatePatientRisk, simulateDecisionThreshold, CLINICAL_PRESETS } from '../../data/simulationLogic';
import { Sliders, AlertCircle, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function InteractiveSimulator() {
  const [activeTab, setActiveTab] = useState('patient'); // 'patient' | 'threshold'

  // Patient Simulator State
  const [age, setAge] = useState(76);
  const [gender, setGender] = useState('male');
  const [glucose, setGlucose] = useState(218);
  const [bmi, setBmi] = useState(31.8);

  // Threshold Simulator State
  const [threshold, setThreshold] = useState(0.12);

  // Compute live outputs
  const sim = simulatePatientRisk({ age, gender, glucose, bmi });
  const thresh = simulateDecisionThreshold(threshold);

  const applyPreset = (preset) => {
    setAge(preset.age);
    setGender(preset.gender);
    setGlucose(preset.glucose);
    setBmi(preset.bmi);
  };

  return (
    <section id="simulator" className="py-16 sm:py-24 border-b border-[#C9D0C6] bg-[#F5F3EB]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            06 / RISK & SHIFT SIMULATOR
          </span>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#172B29] leading-tight mb-4">
              Simulating patient risk and threshold sensitivity under domain shift.
            </h2>
            <p className="text-base text-[#4D5D57] leading-relaxed">
              Test how patient covariates trigger model overconfidence across the Kaggle and NHANES boundaries, or examine how decision thresholds affect clinical false positives.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex p-1 bg-[#FCFBF7] border border-[#C9D0C6] rounded-xs font-mono text-xs">
            <button
              onClick={() => setActiveTab('patient')}
              className={`px-3 py-1.5 transition-colors cursor-pointer rounded-xs ${
                activeTab === 'patient'
                  ? 'bg-[#23645A] text-white font-medium'
                  : 'text-[#4D5D57] hover:text-[#172B29]'
              }`}
            >
              Patient Covariate Risk
            </button>
            <button
              onClick={() => setActiveTab('threshold')}
              className={`px-3 py-1.5 transition-colors cursor-pointer rounded-xs ${
                activeTab === 'threshold'
                  ? 'bg-[#23645A] text-white font-medium'
                  : 'text-[#4D5D57] hover:text-[#172B29]'
              }`}
            >
              Threshold Sensitivity
            </button>
          </div>
        </div>

        {/* TAB 1: Patient Covariate Simulator */}
        {activeTab === 'patient' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls Column (7 cols) */}
            <div className="lg:col-span-7 bg-[#FCFBF7] border border-[#C9D0C6] p-6 rounded-xs">
              
              {/* Presets Bar */}
              <div className="mb-6 pb-4 border-b border-[#C9D0C6]">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29] block mb-2">
                  Clinical Presets (From Manuscript Cohorts)
                </span>
                <div className="flex flex-wrap gap-2">
                  {CLINICAL_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p)}
                      className="px-2.5 py-1 font-mono text-[11px] bg-white border border-[#C9D0C6] hover:bg-[#E6ECE4] hover:border-[#23645A] transition-colors rounded-xs cursor-pointer text-[#172B29]"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="space-y-6">
                
                {/* Age Slider */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                    <span className="font-medium text-[#172B29]">Age (Years)</span>
                    <span className="font-semibold text-[#23645A]">{age} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="85"
                    step="1"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-[#23645A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#858E88] mt-1">
                    <span>18</span>
                    <span className={age >= 65 ? 'text-[#994524] font-semibold' : ''}>
                      {age >= 65 ? 'Severe Shift Zone (Age >= 65, PSI: 1.007)' : 'Senior Threshold (65)'}
                    </span>
                    <span>85</span>
                  </div>
                </div>

                {/* Average Glucose Level Slider */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                    <span className="font-medium text-[#172B29]">Average Glucose Level (mg/dL)</span>
                    <span className="font-semibold text-[#23645A]">{glucose} mg/dL</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="280"
                    step="1"
                    value={glucose}
                    onChange={(e) => setGlucose(Number(e.target.value))}
                    className="w-full accent-[#23645A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#858E88] mt-1">
                    <span>60 mg/dL</span>
                    <span className={glucose >= 140 ? 'text-[#994524] font-semibold' : ''}>
                      {glucose >= 140 ? 'Severe Protocol Shift (Glucose >= 140, PSI: 1.495)' : 'Hyperglycemia Cutoff (140)'}
                    </span>
                    <span>280 mg/dL</span>
                  </div>
                </div>

                {/* BMI Slider */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                    <span className="font-medium text-[#172B29]">Body Mass Index (kg/m^2)</span>
                    <span className="font-semibold text-[#23645A]">{bmi.toFixed(1)} kg/m^2</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="50"
                    step="0.1"
                    value={bmi}
                    onChange={(e) => setBmi(Number(e.target.value))}
                    className="w-full accent-[#23645A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#858E88] mt-1">
                    <span>15</span>
                    <span className={bmi >= 30 ? 'text-[#8C6D1F] font-semibold' : ''}>
                      {bmi >= 30 ? 'Moderate Shift (BMI >= 30, PSI: 0.105)' : 'Obesity Cutoff (30)'}
                    </span>
                    <span>50</span>
                  </div>
                </div>

                {/* Gender Selector */}
                <div>
                  <span className="font-mono text-xs font-medium text-[#172B29] block mb-2">
                    Biological Sex (Stable Shift: PSI 0.004)
                  </span>
                  <div className="inline-flex gap-4 font-mono text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                        onChange={() => setGender('male')}
                        className="accent-[#23645A]"
                      />
                      <span>Male (1)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === 'female'}
                        onChange={() => setGender('female')}
                        className="accent-[#23645A]"
                      />
                      <span>Female (0)</span>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulation Results Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              
              {/* Primary Risk Output Box */}
              <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-6 rounded-xs">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#23645A] block mb-4">
                  Predicted Stroke Risk Output
                </span>

                <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-[#C9D0C6]">
                  <div>
                    <span className="text-[11px] font-mono text-[#4D5D57] block">In-Domain (Kaggle)</span>
                    <span className="font-mono text-3xl font-semibold text-[#23645A]">
                      {sim.riskKaggle.toFixed(1)}%
                    </span>
                    <span className="text-[10px] font-mono text-[#4D5D57] block mt-0.5">
                      Source log-odds model
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#4D5D57] block">Target (NHANES Cohort)</span>
                    <span className="font-mono text-3xl font-semibold text-[#994524]">
                      {sim.riskNHANES.toFixed(1)}%
                    </span>
                    <span className="text-[10px] font-mono text-[#4D5D57] block mt-0.5">
                      Calibrated target response
                    </span>
                  </div>
                </div>

                {/* Overconfidence Delta Tag */}
                <div className="flex items-center justify-between text-xs font-mono mb-4 bg-[#F5F3EB] p-2.5 rounded-xs border border-[#C9D0C6]">
                  <span className="text-[#4D5D57]">Model Risk Divergence:</span>
                  <span className={`font-semibold ${sim.delta > 0 ? 'text-[#994524]' : 'text-[#23645A]'}`}>
                    {sim.delta > 0 ? `+${sim.delta.toFixed(1)}% Overconfident` : `${sim.delta.toFixed(1)}%`}
                  </span>
                </div>

                {/* Shift Warnings */}
                {sim.warnings.length > 0 ? (
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] font-semibold uppercase text-[#994524] block">
                      Active Shift Zone Warnings
                    </span>
                    {sim.warnings.map((w, idx) => (
                      <div key={idx} className="p-2.5 bg-[#F3E6DE] border-l-3 border-[#994524] rounded-xs text-xs">
                        <div className="font-mono text-[11px] font-semibold text-[#994524] flex items-center justify-between">
                          <span>{w.feature}: {w.value}</span>
                          <span>PSI: {w.psi}</span>
                        </div>
                        <p className="text-[11px] text-[#172B29] leading-snug mt-1">
                          {w.note}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-[#E6ECE4] border-l-3 border-[#23645A] rounded-xs text-xs text-[#23645A]">
                    <div className="flex items-center gap-1.5 font-semibold font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Within-Distribution Benchmark Profile</span>
                    </div>
                    <p className="text-[11px] text-[#172B29] mt-0.5">
                      Covariates fall within the core demographic range of the training benchmark.
                    </p>
                  </div>
                )}
              </div>

              {/* Reliability Index Card */}
              <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-4 rounded-xs text-xs text-[#4D5D57] leading-relaxed">
                <div className="flex items-center justify-between font-mono text-xs mb-1">
                  <span className="font-semibold text-[#172B29]">Covariate Reliability Index:</span>
                  <span className="font-bold text-[#23645A]">{sim.trustScore} / 100</span>
                </div>
                <div className="w-full bg-[#E6ECE4] h-2 rounded-xs overflow-hidden mb-2">
                  <div
                    className={`h-full transition-all duration-300 ${
                      sim.trustScore < 50 ? 'bg-[#994524]' : sim.trustScore < 75 ? 'bg-[#8C6D1F]' : 'bg-[#23645A]'
                    }`}
                    style={{ width: `${sim.trustScore}%` }}
                  />
                </div>
                Penalized heavily when entering the high glucose mismatch zone (PSI 1.495) or senior demographic shift (PSI 1.007).
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: Threshold Sensitivity Simulator */}
        {activeTab === 'threshold' && (
          <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-6 rounded-xs">
            <div className="max-w-2xl mb-8">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#23645A] block mb-2">
                Clinical Decision Threshold Sensitivity (tau)
              </span>
              <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed">
                Move the decision threshold slider below to observe how the minority class precision collapses in the external population, and how false positive burdens scale under rare-event prevalence (4.1% in NHANES).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
              
              {/* Slider (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-medium text-[#172B29]">Decision Threshold (tau)</span>
                  <span className="font-bold text-[#23645A]">tau = {threshold.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.35"
                  step="0.01"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full accent-[#23645A] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#858E88]">
                  <span>0.05 (High Recall)</span>
                  <span>0.20 (Balanced)</span>
                  <span>0.35 (High Specificity)</span>
                </div>

                <div className="bg-[#F5F3EB] p-4 rounded-xs border border-[#C9D0C6] text-xs space-y-2 mt-4">
                  <div className="flex justify-between font-mono">
                    <span className="text-[#4D5D57]">Kaggle In-Domain Precision:</span>
                    <span className="font-semibold text-[#23645A]">{(thresh.precisionKaggle * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-[#4D5D57]">NHANES Deployed Precision:</span>
                    <span className="font-semibold text-[#994524]">{(thresh.precisionNHANES * 100).toFixed(1)}%</span>
                  </div>
                  <div className="pt-2 border-t border-[#C9D0C6] flex justify-between font-mono text-[11px]">
                    <span className="text-[#172B29]">Relative Precision Collapse:</span>
                    <span className="font-bold text-[#994524]">-{thresh.collapsePct}%</span>
                  </div>
                </div>
              </div>

              {/* False Positive Burdens (6 cols) */}
              <div className="lg:col-span-6 bg-white border border-[#E6ECE4] p-5 rounded-xs space-y-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29] block">
                  Simulated Screening Burden per 1,000 Patients
                </span>
                
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#23645A]">In-Domain False Positives:</span>
                      <span className="font-semibold">{thresh.fpKaggle} patients</span>
                    </div>
                    <div className="w-full bg-[#E6ECE4] h-2 rounded-xs overflow-hidden">
                      <div className="bg-[#23645A] h-full" style={{ width: `${(thresh.fpKaggle / 1000) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#994524]">NHANES External False Positives:</span>
                      <span className="font-semibold">{thresh.fpNHANES} patients</span>
                    </div>
                    <div className="w-full bg-[#F3E6DE] h-2 rounded-xs overflow-hidden">
                      <div className="bg-[#994524] h-full" style={{ width: `${(thresh.fpNHANES / 1000) * 100}%` }} />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#4D5D57] leading-relaxed pt-2 border-t border-[#E6ECE4]">
                  At threshold tau = {threshold.toFixed(2)}, deployed models flag {thresh.fpNHANES} false alarms per 1,000 screened individuals. This reflects the 51-63% PR-AUC collapse demonstrated in Section 5.4 of the manuscript.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
