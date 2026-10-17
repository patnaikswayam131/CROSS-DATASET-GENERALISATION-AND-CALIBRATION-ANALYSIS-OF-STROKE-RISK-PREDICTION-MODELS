import { useState } from 'react';
import { simulatePatientRisk, simulateDecisionThreshold, CLINICAL_PRESETS } from '../../data/simulationLogic';

export default function InteractiveSimulator() {
  const [activeTab, setActiveTab] = useState('patient'); // 'patient' | 'threshold'

  // Patient Simulator State
  const [age, setAge] = useState(72);
  const [gender, setGender] = useState('male');
  const [glucose, setGlucose] = useState(210);
  const [bmi, setBmi] = useState(31.5);

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
    <section id="simulator" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            06 / CLINICAL RISK & SHIFT SIMULATOR
          </span>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-4">
              Simulating patient risk under cross-domain covariate shift.
            </h2>
            <p className="text-base text-[#55635E] leading-relaxed">
              Adjust individual patient parameters to observe how model overconfidence manifests across the Kaggle and NHANES boundaries, or test decision threshold sensitivity.
            </p>
          </div>

          {/* Minimalist Tab Selector */}
          <div className="inline-flex border border-[#E2E0D8] rounded-xs p-0.5 font-mono text-xs">
            <button
              onClick={() => setActiveTab('patient')}
              className={`px-3 py-1 cursor-pointer rounded-xs transition-colors ${
                activeTab === 'patient'
                  ? 'bg-[#111816] text-white font-medium'
                  : 'text-[#55635E] hover:text-[#111816]'
              }`}
            >
              Patient Covariates
            </button>
            <button
              onClick={() => setActiveTab('threshold')}
              className={`px-3 py-1 cursor-pointer rounded-xs transition-colors ${
                activeTab === 'threshold'
                  ? 'bg-[#111816] text-white font-medium'
                  : 'text-[#55635E] hover:text-[#111816]'
              }`}
            >
              Decision Threshold
            </button>
          </div>
        </div>

        {/* TAB 1: Patient Covariate Risk (Unboxed 2-Column Workbench) */}
        {activeTab === 'patient' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Sliders & Presets (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Presets Row */}
              <div className="pb-4 border-b border-[#E2E0D8]">
                <span className="font-mono text-xs uppercase text-[#9AA39E] font-medium block mb-2">
                  CLINICAL PRESETS
                </span>
                <div className="flex flex-wrap gap-2">
                  {CLINICAL_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p)}
                      className="px-2.5 py-1 font-mono text-xs border border-[#E2E0D8] hover:border-[#111816] transition-colors rounded-xs cursor-pointer text-[#111816]"
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
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className="font-medium text-[#111816]">Age</span>
                    <span className="font-semibold text-[#1B5E54]">{age} years</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="85"
                    step="1"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full cursor-pointer h-1.5 bg-[#E2E0D8] rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[#9AA39E] mt-1">
                    <span>18</span>
                    <span>50</span>
                    <span>85</span>
                  </div>
                </div>

                {/* Glucose Slider */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className="font-medium text-[#111816]">Glucose Level</span>
                    <span className={`font-semibold ${glucose >= 180 ? 'text-[#A33B20]' : 'text-[#1B5E54]'}`}>
                      {glucose} mg/dL
                    </span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="280"
                    step="1"
                    value={glucose}
                    onChange={(e) => setGlucose(Number(e.target.value))}
                    className="w-full cursor-pointer h-1.5 bg-[#E2E0D8] rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[#9AA39E] mt-1">
                    <span>Normal: 80-120</span>
                    <span className="text-[#A33B20]">Fasting shift &gt; 160</span>
                    <span>280</span>
                  </div>
                </div>

                {/* BMI Slider */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className="font-medium text-[#111816]">Body Mass Index (BMI)</span>
                    <span className="font-semibold text-[#1B5E54]">{bmi.toFixed(1)} kg/m²</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="50"
                    step="0.5"
                    value={bmi}
                    onChange={(e) => setBmi(Number(e.target.value))}
                    className="w-full cursor-pointer h-1.5 bg-[#E2E0D8] rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[#9AA39E] mt-1">
                    <span>15</span>
                    <span>25 (Normal)</span>
                    <span>30+ (Obese)</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Biological Sex */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className="font-medium text-[#111816]">Biological Sex</span>
                    <span className="text-[#55635E] capitalize">{gender}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <button
                      onClick={() => setGender('male')}
                      className={`py-2 text-center rounded-xs border cursor-pointer transition-colors ${
                        gender === 'male'
                          ? 'border-[#111816] bg-[#111816] text-white font-medium'
                          : 'border-[#E2E0D8] text-[#55635E]'
                      }`}
                    >
                      Male (1)
                    </button>
                    <button
                      onClick={() => setGender('female')}
                      className={`py-2 text-center rounded-xs border cursor-pointer transition-colors ${
                        gender === 'female'
                          ? 'border-[#111816] bg-[#111816] text-white font-medium'
                          : 'border-[#E2E0D8] text-[#55635E]'
                      }`}
                    >
                      Female (0)
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Clean Numerical Readout (5 cols) */}
            <div className="lg:col-span-5 border-t border-[#E2E0D8] lg:border-t-0 lg:border-l lg:border-[#E2E0D8] lg:pl-10 pt-8 lg:pt-0">
              
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA39E] font-medium block mb-3">
                MODEL RISK ESTIMATION
              </span>

              {/* Large Output Percentage */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-light text-[#111816] tracking-tight font-mono">
                    {sim.predictedRiskPct}%
                  </span>
                  <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded-xs ${
                    sim.riskTier === 'High'
                      ? 'bg-[#FAF0EC] text-[#A33B20]'
                      : sim.riskTier === 'Moderate'
                      ? 'bg-[#FAF9F5] text-[#111816] border border-[#E2E0D8]'
                      : 'bg-[#EDF3F0] text-[#1B5E54]'
                  }`}>
                    {sim.riskTier} Risk
                  </span>
                </div>
                <span className="font-mono text-xs text-[#55635E] block mt-1">
                  95% Bootstrap CI: [{sim.ciLowPct}% - {sim.ciHighPct}%]
                </span>
              </div>

              {/* Minimalist Horizontal Probability Bar */}
              <div className="w-full h-2 bg-[#E2E0D8] rounded-xs mb-8 overflow-hidden">
                <div
                  className="h-full bg-[#1B5E54] transition-all duration-200"
                  style={{ width: `${Math.min(100, Math.max(2, parseFloat(sim.predictedRiskPct || 0) * 2.5))}%` }}
                />
              </div>

              {/* Diagnostic Comparison */}
              <div className="space-y-4 font-mono text-xs border-t border-[#E2E0D8] pt-6">
                <div className="flex justify-between py-1">
                  <span className="text-[#55635E]">Uncalibrated XGBoost:</span>
                  <span className="text-[#111816] font-medium">{sim.rawRiskPct}%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#55635E]">Platt Calibrated:</span>
                  <span className="text-[#111816] font-medium">{sim.calibratedRiskPct}%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#55635E]">Overconfidence Gap:</span>
                  <span className="text-[#A33B20] font-semibold">{sim.distortionGapPct}%</span>
                </div>
                <div className="flex justify-between py-1 border-t border-[#E2E0D8] pt-3">
                  <span className="text-[#55635E]">Distribution Shift Status:</span>
                  <span className={sim.inShiftZone ? 'text-[#A33B20] font-semibold' : 'text-[#1B5E54] font-medium'}>
                    {sim.inShiftZone ? 'Severe Covariate Shift' : 'In-Distribution'}
                  </span>
                </div>
              </div>

              {/* Shift Warning Note */}
              {sim.inShiftZone && (
                <div className="mt-6 text-xs text-[#A33B20] font-mono leading-relaxed">
                  Notice: Patient parameters fall in the tail of the NHANES distribution (Glucose &gt; 180 or Age &gt; 70). Predictions in this region exhibit high variance and calibration degradation.
                </div>
              )}

            </div>

          </div>
        )}

        {/* TAB 2: Decision Threshold Sensitivity */}
        {activeTab === 'threshold' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Threshold Slider */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className="font-medium text-[#111816]">Decision Threshold (τ)</span>
                  <span className="font-semibold text-[#1B5E54] font-mono">{threshold.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.02"
                  max="0.40"
                  step="0.01"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full cursor-pointer h-1.5 bg-[#E2E0D8] rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#9AA39E] mt-1">
                  <span>0.02 (High Sensitivity)</span>
                  <span>0.10 (Clinical Standard)</span>
                  <span>0.40 (High Specificity)</span>
                </div>
              </div>

              <div className="text-sm text-[#55635E] leading-relaxed space-y-2 pt-4">
                <p>
                  At a standard clinical threshold of <strong>τ = {threshold.toFixed(2)}</strong>, transferring the model to the target domain produces an immediate change in operating characteristics.
                </p>
                <p className="text-xs font-mono text-[#111816]">
                  Because the target prevalence is 4.10%, lower thresholds cause an exponential increase in false positives, burdening downstream clinical workflows.
                </p>
              </div>
            </div>

            {/* Right Column: Comparative Operational Stats */}
            <div className="lg:col-span-6 border-t border-[#E2E0D8] lg:border-t-0 lg:border-l lg:border-[#E2E0D8] lg:pl-10 pt-8 lg:pt-0">
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA39E] font-medium block mb-4">
                OPERATING METRICS (PER 1,000 PATIENTS)
              </span>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-[#E2E0D8]">
                  <span className="text-[#55635E]">False Positive Rate:</span>
                  <span className="text-[#111816] font-medium">{thresh.fprPct}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E2E0D8]">
                  <span className="text-[#55635E]">Sensitivity (True Positive Rate):</span>
                  <span className="text-[#1B5E54] font-medium">{thresh.tprPct}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E2E0D8]">
                  <span className="text-[#55635E]">Positive Predictive Value (PPV):</span>
                  <span className="text-[#A33B20] font-semibold">{thresh.ppvPct}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E2E0D8]">
                  <span className="text-[#55635E]">Number Needed to Screen:</span>
                  <span className="text-[#111816] font-medium">{thresh.nns} patients</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
