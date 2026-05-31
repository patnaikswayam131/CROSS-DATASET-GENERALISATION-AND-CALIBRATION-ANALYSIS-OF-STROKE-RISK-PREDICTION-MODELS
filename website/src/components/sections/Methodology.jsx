import { methodologyItems } from '../../data/projectData';
import Accordion from '../ui/Accordion';

/**
 * Methodology — collapsible study-design and evaluation-protocol details.
 */
export function Methodology() {
  return (
    <section id="methodology" className="py-20 px-6" style={{ backgroundColor: '#0f1117' }}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <p className="section-label">METHODOLOGY</p>
        <h2
          className="text-3xl font-bold text-[#e8eaf0] mt-3 mb-10"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Study Design and Evaluation Protocol
        </h2>

        {/* Accordion */}
        <Accordion items={methodologyItems} />
      </div>
    </section>
  );
}

export default Methodology;
