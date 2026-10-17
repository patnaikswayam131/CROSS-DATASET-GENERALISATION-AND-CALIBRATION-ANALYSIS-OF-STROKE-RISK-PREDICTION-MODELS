import { useState } from 'react';
import { projectMeta, coreMetrics, shiftAnalysis } from '../../data/researchData';
import { Copy, Check, Terminal, ExternalLink, Download } from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
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
    <section id="reproducibility" className="py-20 sm:py-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-6">
          <span className="editorial-label">
            10 / REPRODUCIBILITY & ARTIFACTS
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#111816] leading-tight mb-4">
            Code, pipelines, and replication data.
          </h2>
          <p className="text-base text-[#55635E] leading-relaxed">
            All code, data extraction pipelines, harmonisation logic, and trained model weights are publicly available for independent verification.
          </p>
        </div>

        {/* Open 2-Column Split: Terminal & Links on Left, Citation on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Repository & Direct Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E0D8]">
              <div className="flex items-center gap-2">
                <GithubIcon className="w-4 h-4 text-[#111816]" />
                <span className="font-mono text-xs font-semibold text-[#111816]">
                  GitHub Repository
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#1B5E54] font-medium">
                {projectMeta.experimentVersion}
              </span>
            </div>

            <p className="text-sm text-[#55635E] leading-relaxed">
              Contains the complete verified Jupyter notebook (<code className="font-mono text-xs text-[#111816]">stroke_pipeline.ipynb</code>), cohort extraction logic for NHANES SAS transport files, bootstrap confidence interval generators, and evaluation outputs.
            </p>

            {/* Clean Terminal Clone Strip */}
            <div className="py-2 px-3 border border-[#E2E0D8] rounded-xs flex items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 overflow-x-auto text-[#111816]">
                <Terminal className="w-3.5 h-3.5 text-[#1B5E54] shrink-0" />
                <span className="select-all text-[11px] whitespace-nowrap">{cloneCommand}</span>
              </div>
              <button
                onClick={copyCloneCommand}
                className="shrink-0 p-1 text-[#55635E] hover:text-[#111816] cursor-pointer"
                title="Copy command"
              >
                {copiedClone ? <Check className="w-3.5 h-3.5 text-[#1B5E54]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Direct Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
              <a
                href={projectMeta.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#111816] text-white px-3.5 py-2 rounded-xs hover:bg-[#222222] transition-colors"
              >
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={downloadMetadataJson}
                className="inline-flex items-center gap-1.5 border border-[#E2E0D8] px-3.5 py-2 rounded-xs text-[#111816] hover:bg-[#FAF9F5] cursor-pointer"
              >
                <Download className="w-3 h-3 text-[#55635E]" />
                <span>Export Metadata JSON</span>
              </button>
            </div>

          </div>

          {/* Right Column: BibTeX Citation (5 cols) */}
          <div className="lg:col-span-5 border-t border-[#E2E0D8] lg:border-t-0 lg:border-l lg:border-[#E2E0D8] lg:pl-10 pt-8 lg:pt-0">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E0D8]">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#111816]">
                BibTeX Citation
              </span>
              <button
                onClick={copyBibtex}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[#1B5E54] hover:underline cursor-pointer"
              >
                {copiedBibtex ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <pre className="text-[11px] font-mono text-[#55635E] leading-relaxed overflow-x-auto p-3 bg-[#FAF9F5] border border-[#E2E0D8] rounded-xs select-all">
              {projectMeta.bibtex}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
}
