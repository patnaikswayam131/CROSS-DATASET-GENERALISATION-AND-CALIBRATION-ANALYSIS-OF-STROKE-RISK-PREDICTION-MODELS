import { useState } from 'react';

/**
 * Accordion component for expandable content sections.
 * @param {{ items: Array<{title: string, content: string}> }} props
 */
export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[#2e3248] rounded-lg overflow-hidden transition-colors duration-200"
        >
          {/* Header */}
          <button
            onClick={() => toggle(index)}
            className={`
              w-full flex items-center justify-between px-5 py-4 text-left
              transition-colors duration-200 cursor-pointer
              ${openIndex === index 
                ? 'bg-[#22263a] text-[#e8eaf0]' 
                : 'bg-[#1a1d27] text-[#e8eaf0] hover:bg-[#22263a]'}
            `}
          >
            <span className="font-medium text-sm pr-4">
              <span className="text-[#8b90a4] mr-3" style={{ fontFamily: 'var(--font-mono)' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              {item.title}
            </span>
            <svg
              className={`w-4 h-4 text-[#8b90a4] transition-transform duration-200 flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Content */}
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="px-5 py-4 text-sm text-[#8b90a4] leading-relaxed bg-[#1a1d27] border-t border-[#2e3248]">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
