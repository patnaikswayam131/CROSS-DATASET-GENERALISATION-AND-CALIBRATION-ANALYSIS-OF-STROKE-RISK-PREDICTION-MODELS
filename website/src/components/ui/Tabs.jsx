import { useState } from 'react';

/**
 * Tab interface component.
 * @param {{ tabs: Array<{id: string, label: string}>, children: (activeTab: string) => React.ReactNode, defaultTab?: string }} props
 */
export function Tabs({ tabs, children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-[#2e3248] mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative px-5 py-3 text-sm font-medium whitespace-nowrap
              transition-colors duration-200 cursor-pointer
              ${activeTab === tab.id
                ? 'text-[#4f8ef7]'
                : 'text-[#8b90a4] hover:text-[#e8eaf0]'
              }
            `}
          >
            {tab.label}
            {/* Active indicator */}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4f8ef7] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>{children(activeTab)}</div>
    </div>
  );
}

export default Tabs;
