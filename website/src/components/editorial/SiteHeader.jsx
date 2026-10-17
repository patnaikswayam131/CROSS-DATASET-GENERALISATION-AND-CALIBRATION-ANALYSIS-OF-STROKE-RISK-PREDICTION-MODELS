import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'question', label: 'Question' },
  { id: 'study-design', label: 'Design' },
  { id: 'datasets', label: 'Data' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'dataset-shift', label: 'Shift' },
  { id: 'simulator', label: 'Simulator' },
  { id: 'calibration', label: 'Calibration' },
  { id: 'interpretation', label: 'Lessons' },
  { id: 'limitations', label: 'Scope' },
  { id: 'reproducibility', label: 'Reproduce' }
];

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState('question');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(`#${id}`, { offset: -70, duration: 1.1 });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/90 backdrop-blur-xs border-b border-[#E2E0D8] transition-colors">
      {/* Scroll Progress Hairline */}
      <div
        className="h-[1.5px] bg-[#1B5E54] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Masthead Title */}
        <a
          href="#"
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1D6ED8]"
        >
          <span className="font-mono text-[11px] font-semibold tracking-widest text-[#1B5E54] uppercase">
            NOTE 01
          </span>
          <span className="text-[#9AA39E]">/</span>
          <span className="font-serif-heading text-sm text-[#111816] tracking-tight">
            Cross-Dataset Stroke Analysis
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-[12px] font-mono tracking-wide transition-colors duration-150 cursor-pointer py-1 ${
                  isActive
                    ? 'text-[#1B5E54] font-semibold'
                    : 'text-[#55635E] hover:text-[#111816]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-[#111816] hover:text-[#1B5E54] cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E0D8] bg-[#FAF9F5] px-5 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-left py-2 font-mono text-xs cursor-pointer ${
                activeSection === item.id
                  ? 'text-[#1B5E54] font-semibold'
                  : 'text-[#55635E]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
