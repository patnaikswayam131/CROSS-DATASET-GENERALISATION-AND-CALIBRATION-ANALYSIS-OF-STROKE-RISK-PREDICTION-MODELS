import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import SiteHeader from './components/editorial/SiteHeader';
import HeroResearchSummary from './components/editorial/HeroResearchSummary';
import EvidenceStrip from './components/editorial/EvidenceStrip';
import QuestionSection from './components/editorial/QuestionSection';
import StudyDesignFlow from './components/editorial/StudyDesignFlow';
import DatasetComparison from './components/editorial/DatasetComparison';
import ResultsFigure from './components/editorial/ResultsFigure';
import ShiftAnalysis from './components/editorial/ShiftAnalysis';
import InteractiveSimulator from './components/editorial/InteractiveSimulator';
import CalibrationSection from './components/editorial/CalibrationSection';
import InterpretationSection from './components/editorial/InterpretationSection';
import LimitationsSection from './components/editorial/LimitationsSection';
import ReproducibilityLinks from './components/editorial/ReproducibilityLinks';
import SiteFooter from './components/editorial/SiteFooter';
import { ArrowUp } from 'lucide-react';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Apple-style momentum inertial scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#111816] font-sans antialiased selection:bg-[#EDF3F0] selection:text-[#111816] relative">
      {/* 1. Masthead Navigation */}
      <SiteHeader />

      <main id="main-content">
        {/* 2. Hero: Establish Question, Models, and Visual Evidence */}
        <HeroResearchSummary />

        {/* 3. Evidence Strip: 3 Primary Empirical Metrics */}
        <EvidenceStrip />

        {/* 4. Section 01: The Question */}
        <QuestionSection />

        {/* 5. Section 02: Study Design Flow */}
        <StudyDesignFlow />

        {/* 6. Section 03: Datasets and Harmonisation */}
        <DatasetComparison />

        {/* 7. Section 04: Empirical Evidence and Curves */}
        <ResultsFigure />

        {/* 8. Section 05: Dataset Shift & Domain Classifier */}
        <ShiftAnalysis />

        {/* 9. Section 06: Interactive Risk & Shift Simulator */}
        <InteractiveSimulator />

        {/* 10. Section 07: Calibration & Probability Fidelity */}
        <CalibrationSection />

        {/* 11. Section 08: Interpretation (What did not transfer cleanly?) */}
        <InterpretationSection />

        {/* 12. Section 09: Methodological Scope & Rigour */}
        <LimitationsSection />

        {/* 13. Section 10: Reproducibility, Code and Data */}
        <ReproducibilityLinks />
      </main>

      {/* 14. Colophon / Footer */}
      <SiteFooter />

      {/* Tactile Back-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-2 bg-white border border-[#E2E0D8] text-[#111816] hover:bg-[#FAF9F5] rounded-xs shadow-[0_2px_8px_rgba(0,0,0,0.04)] btn-tactile cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1D6ED8]"
          aria-label="Back to top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export default App;
