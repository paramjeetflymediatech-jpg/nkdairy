'use client';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="py-20 lg:py-28 relative bg-transparent z-10">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          {data.title && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00b4d8]/10 border border-[#00b4d8]/30 text-[#00b4d8] mb-6 font-bold text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#00b4d8]"></span>
              {data.title}
            </div>
          )}
          {data.subtitle && (
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1b2e] mb-6 tracking-tight">
              {data.subtitle}
            </h2>
          )}
          {data.generalDescription && (
            <div 
              className={`text-slate-500 font-medium text-lg mx-auto ${data.generalDescription.includes('style=') ? '' : 'prose prose-lg prose-slate'}`}
              dangerouslySetInnerHTML={{ __html: data.generalDescription }}
            />
          )}
        </div>

        {/* Interactive Tabs Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column: Navigation */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            {data.tabsHeader && (
              <h4 className="font-extrabold text-xl text-[#0d1b2e] mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-[#00b4d8] rounded-full"></span>
                {data.tabsHeader}
              </h4>
            )}
            <div className="flex flex-col space-y-3 mt-2">
              {data.tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative group text-left px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between border-2 outline-none
                      ${isActive 
                        ? 'bg-white border-[#00b4d8] text-[#0d1b2e] shadow-[0_10px_30px_rgba(0,180,216,0.15)] font-bold' 
                        : 'bg-white/60 border-transparent text-slate-500 hover:bg-white hover:border-[#00b4d8]/30 hover:text-[#0d1b2e] hover:shadow-sm font-medium'
                      }
                    `}
                  >
                    <span className="relative z-10 pr-4">{tab.label}</span>
                    <div className={`
                      shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                      ${isActive ? 'bg-[#00b4d8] text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-[#00b4d8]/10 group-hover:text-[#00b4d8]'}
                    `}>
                      <ChevronRight size={16} className={`transition-transform duration-300 ${isActive ? 'translate-x-0.5' : ''}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 min-h-[400px] shadow-[0_10px_40px_rgba(13,27,46,0.06)] relative overflow-hidden flex flex-col">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00b4d8]/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex-1"
                >
                  {activeContent ? (
                    <div 
                      className={`max-w-none ${activeContent.includes('style=') ? '' : 'prose prose-lg prose-slate prose-headings:text-[#0d1b2e] prose-headings:font-bold prose-a:text-[#00b4d8] prose-a:font-semibold hover:prose-a:text-blue-700 prose-img:rounded-2xl prose-img:shadow-lg'}`}
                      dangerouslySetInnerHTML={{ __html: activeContent }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-slate-400 italic font-medium">Select a category on the left to view detailed solutions.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
