'use client';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface TabData {
  id: string;
  label: string;
  content: string;
}

interface EquipmentSolutionsData {
  enabled: boolean;
  title: string;
  subtitle: string;
  generalDescription: string;
  tabsHeader: string;
  tabs: TabData[];
}

export default function EquipmentSolutions({ data }: { data: EquipmentSolutionsData }) {
  if (!data || !data.enabled || !data.tabs || data.tabs.length === 0) return null;

  const [activeTab, setActiveTab] = useState(data.tabs[0].id);

  const activeContent = data.tabs.find(t => t.id === activeTab)?.content;

  return (
    <div className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-12">
          {data.title && (
            <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-2">
              {data.title}
            </h3>
          )}
          {data.subtitle && (
            <h2 className="text-3xl md:text-4xl font-bold text-[#323373] mb-6">
              {data.subtitle}
            </h2>
          )}
          {data.generalDescription && (
            <div 
              className={`text-gray-600 leading-relaxed max-w-4xl ${data.generalDescription.includes('style=') ? '' : 'prose'}`}
              ref={(el) => { if (el) console.log("RAW HTML PASSED TO INNERHTML:", data.generalDescription, "ACTUAL INNERHTML:", el.innerHTML) }}
              dangerouslySetInnerHTML={{ __html: data.generalDescription }}
            />
          )}
        </div>

        {/* Two-Column Tabs Section */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Left Column: Navigation */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            {data.tabsHeader && (
              <h4 className="font-bold text-lg text-[#323373] mb-4 pb-2 border-b-2 border-blue-600 inline-block">
                {data.tabsHeader}
              </h4>
            )}
            <div className="flex flex-col space-y-1 mt-2">
              {data.tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      text-left px-4 py-3 rounded-md transition-all duration-300 flex items-center justify-between
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-md font-semibold' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium border border-gray-100'
                      }
                    `}
                  >
                    <span>{tab.label}</span>
                    <ChevronRight size={16} className={`transition-transform duration-300 ${isActive ? 'translate-x-1' : 'opacity-0'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-gray-50/50 rounded-xl p-6 md:p-8 border border-gray-100 h-full">
              {activeContent ? (
                <div 
                  className={`max-w-none ${activeContent.includes('style=') ? '' : 'prose prose-blue prose-headings:text-[#323373] prose-a:text-blue-600'}`}
                  dangerouslySetInnerHTML={{ __html: activeContent }}
                />
              ) : (
                <p className="text-gray-500 italic">Select a category on the left to view details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
