import { useState } from 'react';
import { datasetComparisonRows, harmonisationMapping } from '../../data/researchData';
import { ChevronDown, ChevronUp, AlertCircle, FileText, Download, Search, Check, Copy } from 'lucide-react';

export default function DatasetComparison() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  const filteredRows = datasetComparisonRows.filter(
    (r) =>
      r.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadHarmonisationCsv = () => {
    const headers = "Kaggle Feature,NHANES Variable,Operational Definition,Harmonisation Protocol\n";
    const rows = harmonisationMapping
      .map(
        (m) =>
          `"${m.kaggleFeature}","${m.nhanesVariable}","${m.description}","${m.notes.replace(/"/g, '""')}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "harmonisation_codebook_kaggle_nhanes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyVariable = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <section id="datasets" className="py-16 sm:py-24 border-b border-[#C9D0C6]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            03 / TWO DATA SOURCES
          </span>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#172B29] leading-tight mb-4">
              Source and target: cohort characteristics and harmonisation.
            </h2>
            <p className="text-base text-[#4D5D57] leading-relaxed">
              Comparing the training environment against the external evaluation target. Differences in sampling design, inclusion criteria, and laboratory measurement protocols shape the observed cross-dataset gap.
            </p>
          </div>

          {/* Search Input Filter */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-[#858E88] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter dimensions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FCFBF7] border border-[#C9D0C6] pl-9 pr-3 py-1.5 font-mono text-xs text-[#172B29] rounded-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1D6ED8]"
            />
          </div>
        </div>

        {/* Comparison Table */}
        <div className="table-container mb-8">
          <table className="academic-table" aria-label="Comparison of Kaggle and NHANES datasets">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Cohort Dimension</th>
                <th style={{ width: '37.5%' }}>Source: Kaggle Dataset</th>
                <th style={{ width: '37.5%' }}>Target: NHANES 2021-2023</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="text-col font-medium text-[#172B29]">
                      {row.property}
                    </td>
                    <td className="text-col text-[#23645A]">
                      {row.source}
                    </td>
                    <td className="text-col text-[#994524]">
                      {row.target}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-xs text-[#4D5D57]">
                    No cohort dimensions match "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Primary Harmonisation Confound Callout */}
        <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-5 sm:p-6 rounded-xs mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#994524] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#994524] mb-1">
                Definitional Confound: Glucose Protocol Divergence
              </h3>
              <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed">
                The primary source of covariate divergence is glucose measurement: Kaggle contains unspecified glucose readings (potentially random or non-fasting), whereas NHANES records standardized fasting plasma glucose (LBXGLU). This protocol mismatch accounts for a Population Stability Index (PSI) of 1.495, highlighting that measurement definitions can introduce severe covariate shift even when variable names appear identical.
              </p>
            </div>
          </div>
        </div>

        {/* Harmonisation Mapping Drawer Toggle */}
        <div className="border border-[#C9D0C6] bg-[#FCFBF7] rounded-xs overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-[#FCFBF7] hover:bg-[#F5F3EB] transition-colors">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="flex items-center gap-2 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6ED8]"
              aria-expanded={drawerOpen}
            >
              <FileText className="w-4 h-4 text-[#23645A]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29]">
                View Feature Harmonisation Codebook and Mapping Rules
              </span>
              {drawerOpen ? <ChevronUp className="w-4 h-4 text-[#4D5D57]" /> : <ChevronDown className="w-4 h-4 text-[#4D5D57]" />}
            </button>

            <button
              onClick={downloadHarmonisationCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs bg-white border border-[#C9D0C6] hover:bg-[#E6ECE4] rounded-xs cursor-pointer btn-tactile text-[#172B29]"
              title="Download codebook as CSV"
            >
              <Download className="w-3.5 h-3.5 text-[#23645A]" />
              <span>Export CSV</span>
            </button>
          </div>

          {drawerOpen && (
            <div className="p-4 sm:p-6 border-t border-[#C9D0C6] bg-white">
              <div className="table-container">
                <table className="academic-table" aria-label="Feature Harmonisation Codebook">
                  <thead>
                    <tr>
                      <th>Kaggle Feature</th>
                      <th>NHANES Variable</th>
                      <th>Operational Definition</th>
                      <th>Harmonisation Protocol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {harmonisationMapping.map((map, idx) => (
                      <tr key={idx}>
                        <td className="font-mono text-xs text-[#23645A] font-semibold">
                          <button
                            onClick={() => copyVariable(map.kaggleFeature)}
                            className="inline-flex items-center gap-1 hover:underline cursor-pointer"
                            title="Click to copy variable name"
                          >
                            <span>{map.kaggleFeature}</span>
                            {copiedKey === map.kaggleFeature ? (
                              <Check className="w-3 h-3 text-[#23645A]" />
                            ) : (
                              <Copy className="w-3 h-3 text-[#858E88] opacity-60" />
                            )}
                          </button>
                        </td>
                        <td className="font-mono text-xs text-[#994524] font-semibold">
                          <button
                            onClick={() => copyVariable(map.nhanesVariable)}
                            className="inline-flex items-center gap-1 hover:underline cursor-pointer"
                            title="Click to copy variable name"
                          >
                            <span>{map.nhanesVariable}</span>
                            {copiedKey === map.nhanesVariable ? (
                              <Check className="w-3 h-3 text-[#994524]" />
                            ) : (
                              <Copy className="w-3 h-3 text-[#858E88] opacity-60" />
                            )}
                          </button>
                        </td>
                        <td className="text-col text-xs text-[#172B29]">{map.description}</td>
                        <td className="text-col text-xs text-[#4D5D57]">{map.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
