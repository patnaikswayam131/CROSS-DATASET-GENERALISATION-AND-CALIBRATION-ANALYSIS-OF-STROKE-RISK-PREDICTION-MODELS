import { useState } from 'react';
import { datasetComparisonRows } from '../../data/researchData';
import { Download, Search } from 'lucide-react';

export default function DatasetComparison() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = datasetComparisonRows.filter(
    (row) =>
      row.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadComparisonCsv = () => {
    const headers = "Dimension,Kaggle_Source,NHANES_Target\n";
    const rows = datasetComparisonRows
      .map((r) => `"${r.property}","${r.source}","${r.target}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "dataset_harmonisation_manifest.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="datasets" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            03 / DATA SOURCES & HARMONISATION
          </span>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-4">
              Two distinct cohorts, mapped to a four-feature parity schema.
            </h2>
            <p className="text-base text-[#55635E] leading-relaxed">
              Kaggle represents a standard crowd-sourced hospital benchmark; NHANES 2021-2023 is a rigorous, stratified, nationally representative probability survey by the CDC.
            </p>
          </div>

          {/* Controls: Search and CSV Export */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#9AA39E] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter variables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs font-mono border border-[#E2E0D8] rounded-xs bg-transparent focus:outline-none focus:border-[#1B5E54] w-40 sm:w-48"
              />
            </div>

            <button
              onClick={downloadComparisonCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E2E0D8] rounded-xs text-xs font-mono text-[#111816] hover:bg-[#FAF9F5] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#55635E]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Booktabs Table (No Outer Box, Zero Vertical Rules) */}
        <div className="overflow-x-auto my-8">
          <table className="booktabs-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Cohort Dimension</th>
                <th style={{ width: '37%' }}>Kaggle Source (In-Domain)</th>
                <th style={{ width: '38%' }}>NHANES Target (External)</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r, idx) => (
                <tr key={idx}>
                  <td className="text-col font-medium text-[#111816]">{r.property}</td>
                  <td className="text-col text-[#55635E]">{r.source}</td>
                  <td className="text-col text-[#55635E]">{r.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Glucose Protocol Confound: Open Editorial Text Note */}
        <div className="mt-12 pt-8 border-t border-[#E2E0D8] grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A33B20] block mb-1">
              MEASUREMENT PROTOCOL DIVERGENCE
            </span>
            <h3 className="font-serif-heading text-xl text-[#111816]">
              Fasting plasma vs unspecified glucose.
            </h3>
          </div>
          <div className="md:col-span-8 text-sm text-[#55635E] leading-relaxed space-y-3">
            <p>
              In Kaggle, average glucose level is recorded without documentation of fasting duration, likely incorporating non-fasting or random clinical draws. In NHANES 2021-2023, glucose is strictly drawn from a designated morning examination session requiring a verified 9-hour fast (specimen <code className="font-mono text-[#111816] font-semibold">LBXGLU</code>).
            </p>
            <p>
              This protocol discrepancy explains the extreme covariate shift observed in glucose (Kolmogorov-Smirnov statistic = 0.362, Population Stability Index = 1.495). Even with identical variable names, clinical measurement protocols dictate the data manifold.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
