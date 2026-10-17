import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'question', num: '01', label: 'Question', title: 'Clinical Context & Benchmark Gap' },
  { id: 'study-design', num: '02', label: 'Design', title: 'Cross-Domain Study Pipeline' },
  { id: 'datasets', num: '03', label: 'Data', title: 'Feature Harmonisation & Protocol Mismatch' },
  { id: 'evidence', num: '04', label: 'Evidence', title: 'Empirical Evidence & Generalisation Collapse' },
  { id: 'dataset-shift', num: '05', label: 'Shift', title: 'Distributional Shift Decomposition' },
  { id: 'simulator', num: '06', label: 'Simulator', title: 'Interactive Deployment Risk Simulator' },
  { id: 'calibration', num: '07', label: 'Calibration', title: 'Probability Calibration & Post-Hoc Failure' },
  { id: 'interpretation', num: '08', label: 'Lessons', title: 'Actionable Lessons for Clinical ML' },
  { id: 'limitations', num: '09', label: 'Scope', title: 'Methodological Constraints' },
  { id: 'reproducibility', num: '10', label: 'Reproduce', title: 'Artifacts, Code, and Verification' }
];

// Primary landmark links visible on desktop (keeps header elegant, uncluttered, and non-overlapping)
const DESKTOP_CORE_IDS = ['study-design', 'datasets', 'evidence', 'dataset-shift', 'simulator', 'calibration'];

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState('question');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      const scrollPosition = window.scrollY + 140;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(`#${id}`, { offset: -70, duration: 1.1 });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const primaryItems = NAV_ITEMS.filter((item) => DESKTOP_CORE_IDS.includes(item.id));
  const moreItems = NAV_ITEMS.filter((item) => !DESKTOP_CORE_IDS.includes(item.id));

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/92 backdrop-blur-md border-b border-[#E2E0D8] transition-colors">
      {/* Scroll Progress Hairline */}
      <div
        className="h-[1.5px] bg-[#1B5E54] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        
        {/* Masthead Branding (Guaranteed single line, never wraps or squishes) */}
        <a
          href="#"
          className="flex items-center gap-2 shrink-0 focus:outline-none group"
        >
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#1B5E54] bg-[#EDF3F0] px-2 py-0.5 rounded-xs border border-[#D5E2DC] uppercase whitespace-nowrap">
            NOTE 01
          </span>
          <span className="text-[#C5C9C6] font-light">/</span>
          <span className="font-serif-heading text-sm font-medium text-[#111816] tracking-tight whitespace-nowrap">
            Cross-Dataset Stroke Analysis
          </span>
        </a>

        {/* Curated Desktop Navigation: Core Landmarks + All Sections Dropdown */}
        <nav className="hidden lg:flex items-center gap-1.5 font-mono text-xs shrink-0" aria-label="Main navigation">
          {primaryItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#111816] text-white font-medium shadow-2xs'
                    : 'text-[#55635E] hover:text-[#111816] hover:bg-black/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* All Sections Dropdown Menu */}
          <div className="relative ml-1" ref={dropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer flex items-center gap-1 border ${
                moreDropdownOpen || moreItems.some((m) => m.id === activeSection)
                  ? 'border-[#111816] bg-[#111816] text-white font-medium'
                  : 'border-[#E2E0D8] bg-white text-[#55635E] hover:text-[#111816] hover:bg-[#F5F4EF]'
              }`}
              aria-expanded={moreDropdownOpen}
              aria-label="Toggle section index"
            >
              <span>Index (10)</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Popover: 2-column layout (fits all 10 chapters comfortably with zero scroll needed, and data-lenis-prevent enabled) */}
            {moreDropdownOpen && (
              <div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="absolute right-0 mt-2 w-[340px] sm:w-[480px] bg-white border border-[#E2E0D8] rounded-xs shadow-xl py-2 z-50 divide-y divide-[#F0EFEA]"
              >
                <div className="px-4 py-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider text-[#9AA39E] font-semibold bg-[#FAF9F5]">
                  <span>Full Chapter Index</span>
                  <span className="text-[#1B5E54] font-mono">10 Modules</span>
                </div>
                
                <div
                  data-lenis-prevent="true"
                  className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-[75vh] sm:max-h-none overflow-y-auto"
                >
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`text-left px-3 py-2 rounded-xs flex items-start gap-2.5 transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#EDF3F0] text-[#1B5E54] font-medium'
                            : 'hover:bg-[#FAF9F5] text-[#111816]'
                        }`}
                      >
                        <span className="font-mono text-[10px] text-[#1B5E54] font-bold mt-0.5 shrink-0">
                          {item.num}
                        </span>
                        <div className="min-w-0">
                          <span className="block text-xs font-semibold leading-tight">{item.label}</span>
                          <span className="block text-[11px] text-[#55635E] truncate mt-0.5 font-sans">
                            {item.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Medium Screen View (md to lg): Show Index Button Directly */}
        <div className="hidden md:flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="px-3 py-1 border border-[#E2E0D8] bg-white hover:bg-[#F5F4EF] rounded-xs text-xs font-mono text-[#111816] flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <span>Sections (10)</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#55635E]" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle (screens < 768px) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-[#111816] hover:text-[#1B5E54] cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile / Tablet Collapsible Menu */}
      {mobileMenuOpen && (
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="border-b border-[#E2E0D8] bg-[#FAF9F5] px-4 sm:px-6 py-4 shadow-inner max-h-[80vh] overflow-y-auto"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9AA39E] font-semibold mb-2">
            Table of Contents
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-xs">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-3 py-2 rounded-xs flex items-center justify-between transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#111816] text-white font-medium'
                    : 'text-[#55635E] hover:text-[#111816] hover:bg-black/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={activeSection === item.id ? 'text-[#86EFAC]' : 'text-[#1B5E54] font-bold'}>
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] opacity-60 font-sans hidden sm:inline">
                  {item.title.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
