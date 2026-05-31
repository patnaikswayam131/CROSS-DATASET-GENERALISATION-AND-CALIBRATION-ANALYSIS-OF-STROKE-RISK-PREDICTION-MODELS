import './index.css';
import { navLinks } from './data/siteConfig';

// ── Original sections ────────────────────────────────────────
import Hero from './components/sections/Hero';
import Problem from './components/sections/Problem';
import Datasets from './components/sections/Datasets';
import Results from './components/sections/Results';
import InteractiveExplorer from './components/sections/InteractiveExplorer';
import Takeaways from './components/sections/Takeaways';
import Methodology from './components/sections/Methodology';
import AboutCitation from './components/sections/AboutCitation';
import Footer from './components/sections/Footer';

// ── New sections ─────────────────────────────────────────────
import WorkflowDiagram from './components/sections/WorkflowDiagram';
import LiteratureReview from './components/sections/LiteratureReview';
import ResearchGaps from './components/sections/ResearchGaps';
import MathFormulation from './components/sections/MathFormulation';
import ConclusionFuture from './components/sections/ConclusionFuture';
import Algorithms from './components/sections/Algorithms';
import ComparativeAnalysis from './components/sections/ComparativeAnalysis';

const NAV_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Literature', href: '#literature' },
  { label: 'Results', href: '#results' },
  { label: 'Explorer', href: '#explorer' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Math', href: '#math' },
  { label: 'Conclusion', href: '#conclusion' },
  { label: 'About', href: '#about' },
];

/** Alternating background section wrapper */
function SectionWrapper({ id, alt, children }) {
  return (
    <div
      id={id}
      className="border-t border-[#2e3248]"
      style={{ backgroundColor: alt ? '#1a1d27' : '#0f1117' }}
    >
      {children}
    </div>
  );
}

function App() {
  return (
    <div style={{ backgroundColor: '#0f1117', minHeight: '100vh' }}>
      {/* ─── Navigation ────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b border-[#2e3248]"
        style={{ backgroundColor: 'rgba(15,17,23,0.92)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#hero"
            className="text-xs font-semibold tracking-widest uppercase text-[#4f8ef7] hidden sm:block"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Stroke Risk · Cross-Domain
          </a>
          <div className="flex items-center gap-4 md:gap-6 overflow-x-auto">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs md:text-sm text-[#8b90a4] hover:text-[#e8eaf0] transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Workflow Diagram — directly after hero */}
        <SectionWrapper id="workflow-wrap" alt>
          <WorkflowDiagram />
        </SectionWrapper>

        {/* 3. Problem */}
        <SectionWrapper id="problem">
          <Problem />
        </SectionWrapper>

        {/* 4. Literature Review */}
        <SectionWrapper id="literature" alt>
          <LiteratureReview />
        </SectionWrapper>

        {/* 5. Research Gaps */}
        <SectionWrapper id="gaps">
          <ResearchGaps />
        </SectionWrapper>

        {/* 6. Datasets */}
        <SectionWrapper id="datasets" alt>
          <Datasets />
        </SectionWrapper>

        {/* 7. Results */}
        <SectionWrapper id="results">
          <Results />
        </SectionWrapper>

        {/* 8. Interactive Explorer */}
        <SectionWrapper id="explorer" alt>
          <InteractiveExplorer />
        </SectionWrapper>

        {/* 9. Comparative Analysis */}
        <SectionWrapper id="comparative">
          <ComparativeAnalysis />
        </SectionWrapper>

        {/* 10. Takeaways */}
        <SectionWrapper id="takeaways" alt>
          <Takeaways />
        </SectionWrapper>

        {/* 11. Methodology */}
        <SectionWrapper id="methodology">
          <Methodology />
        </SectionWrapper>

        {/* 12. Math Formulation */}
        <SectionWrapper id="math" alt>
          <MathFormulation />
        </SectionWrapper>

        {/* 13. Algorithms */}
        <SectionWrapper id="algorithms">
          <Algorithms />
        </SectionWrapper>

        {/* 14. Conclusion & Future Work */}
        <SectionWrapper id="conclusion" alt>
          <ConclusionFuture />
        </SectionWrapper>

        {/* 15. About & Citation */}
        <SectionWrapper id="about">
          <AboutCitation />
        </SectionWrapper>
      </main>

      <Footer />
    </div>
  );
}

export default App;
