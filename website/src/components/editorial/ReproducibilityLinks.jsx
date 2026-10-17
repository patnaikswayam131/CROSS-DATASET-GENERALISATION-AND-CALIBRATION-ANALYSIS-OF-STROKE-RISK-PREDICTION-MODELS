import { useState } from 'react';
import { projectMeta, coreMetrics, shiftAnalysis } from '../../data/researchData';
import { Copy, Check, Terminal, FileCode2, ExternalLink, Download } from 'lucide-react';

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function ReproducibilityLinks() {
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);

  const cloneCommand = `git clone ${projectMeta.repositoryUrl}.git`;

  const copyBibtex = () => {
    navigator.clipboard.writeText(projectMeta.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const copyCloneCommand = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const downloadMetadataJson = () => {
    const data = {
      project: projectMeta.title,
      version: projectMeta.experimentVersion,
      author: projectMeta.author,
      core_metrics: coreMetrics,
      shift_statistics: shiftAnalysis,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "stroke_risk_research_metadata.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="reproducibility" className="py-16 sm:py-24 border-b border-[#C9D0C6]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            09 / REPRODUCIBILITY
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#172B29] leading-tight mb-4">
            Code, artifacts, and verification.
          </h2>
          <p className="text-base text-[#4D5D57] leading-relaxed">
            All code, data extraction pipelines, harmonisation logic, and trained model weights are organized for independent reproduction.
          </p>
        </div>

        {/* Two-Column Grid: Repository Panel & Citation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Repository Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Repo Card */}
            <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-6 rounded-xs shadow-[0_2px_8px_rgba(23,43,41,0.03)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#C9D0C6]">
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-5 h-5 text-[#172B29]" />
                  <span className="font-mono text-xs font-semibold text-[#172B29]">
                    GitHub Research Repository
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#23645A] bg-[#E6ECE4] px-2 py-0.5 rounded-xs font-semibold">
                  {projectMeta.experimentVersion}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#4D5D57] leading-relaxed mb-6">
                Contains complete Jupyter notebooks, data pre-processing scripts, bootstrap confidence interval generators, and evaluation metrics reported on this site.
              </p>

              {/* Working Copyable Clone Command Bar */}
              <div className="mb-6 bg-[#F5F3EB] border border-[#C9D0C6] p-3 rounded-xs flex items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2 overflow-x-auto text-[#172B29]">
                  <Terminal className="w-3.5 h-3.5 text-[#23645A] shrink-0" />
                  <span className="select-all text-[11px] whitespace-nowrap">{cloneCommand}</span>
                </div>
                <button
                  onClick={copyCloneCommand}
                  className="px-2.5 py-1 bg-white border border-[#C9D0C6] hover:bg-[#E6ECE4] text-[#172B29] rounded-xs cursor-pointer btn-tactile shrink-0 flex items-center gap-1 text-[11px]"
                  title="Copy git clone command"
                >
                  {copiedClone ? (
                    <>
                      <Check className="w-3 h-3 text-[#23645A]" />
                      <span className="text-[#23645A]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#4D5D57]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Environment Specifications */}
              <div className="space-y-2.5 font-mono text-xs mb-6 bg-white p-3.5 border border-[#E6ECE4] rounded-xs text-[#172B29]">
                <div className="flex items-center justify-between">
                  <span className="text-[#4D5D57]">Python Environment:</span>
                  <span>Python 3.10+ (scikit-learn 1.4, XGBoost 2.0)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#4D5D57]">Seed Configuration:</span>
                  <span>seed = 42 (Stratified splits)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#4D5D57]">Bootstrap Iterations:</span>
                  <span>1,000 stratified resamples</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={projectMeta.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#23645A] text-white px-4 py-2 font-mono text-xs font-medium rounded-xs hover:bg-[#1b4d45] btn-tactile cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6ED8]"
                >
                  <span>Explore Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={downloadMetadataJson}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-[#C9D0C6] font-mono text-xs text-[#172B29] hover:bg-[#F5F3EB] rounded-xs cursor-pointer btn-tactile"
                >
                  <Download className="w-3.5 h-3.5 text-[#23645A]" />
                  <span>Download Metadata JSON</span>
                </button>
              </div>
            </div>

            {/* Data Access Policy Box */}
            <div className="bg-[#FCFBF7] border border-[#C9D0C6] p-5 rounded-xs text-xs text-[#4D5D57] leading-relaxed">
              <span className="font-mono text-xs font-semibold text-[#172B29] block mb-1">
                Data Access and Terms of Governance
              </span>
              Source dataset files remain subject to their respective institutional terms. The Kaggle Stroke dataset is distributed under Open Data Commons (ODC-By). NHANES survey cycles (2021-2023) are public domain health surveillance files provided by the National Center for Health Statistics (CDC/NCHS).
            </div>
          </div>

          {/* Right Column: BibTeX Citation Block (5 cols) */}
          <div className="lg:col-span-5 bg-[#FCFBF7] border border-[#C9D0C6] p-6 rounded-xs flex flex-col justify-between shadow-[0_2px_8px_rgba(23,43,41,0.03)]">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#C9D0C6]">
                <div className="flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-[#23645A]" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#172B29]">
                    BibTeX Citation
                  </span>
                </div>
                <button
                  onClick={copyBibtex}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] bg-white border border-[#C9D0C6] rounded-xs text-[#172B29] hover:bg-[#F5F3EB] btn-tactile cursor-pointer"
                  aria-label="Copy BibTeX citation"
                >
                  {copiedBibtex ? (
                    <>
                      <Check className="w-3 h-3 text-[#23645A]" />
                      <span className="text-[#23645A] font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#4D5D57]" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="font-mono text-[11px] leading-relaxed bg-white border border-[#E6ECE4] p-3.5 rounded-xs text-[#172B29] overflow-x-auto whitespace-pre-wrap selection:bg-[#E6ECE4]">
                {projectMeta.bibtex}
              </pre>
            </div>

            <div className="pt-4 mt-4 border-t border-[#C9D0C6] text-[11px] text-[#4D5D57] font-mono leading-relaxed">
              Manuscript under review for Scopus-indexed dissemination. Last verified: {projectMeta.lastUpdated}.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
