'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, ChevronDown, Check } from 'lucide-react';

export default function ProductFilter({ categories }: { categories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (slug: string | null) => {
    setIsOpen(false);
    if (slug) {
      router.push(`/products?category=${slug}`);
    } else {
      router.push(`/products`);
    }
  };

  const activeCategoryName = currentCategory 
    ? categories.find(c => c.slug === currentCategory)?.name || 'Filter Categories'
    : 'All Products';

  return (
    <div className="relative mt-6 lg:mt-0" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3.5 rounded-full hover:bg-white/20 transition-all font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-white w-full md:w-auto justify-between group"
      >
        <div className="flex items-center gap-2">
          <Filter size={18} className={currentCategory ? "text-[#00b4d8]" : "text-white/70"} />
          <span>{activeCategoryName}</span>
        </div>
        <ChevronDown size={18} className={`text-white/50 transition-transform duration-300 group-hover:text-white ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-3 right-0 w-full md:w-72 bg-white rounded-2xl shadow-[0_20px_50px_rgba(13,27,46,0.2)] z-50 py-3 max-h-96 overflow-y-auto border border-gray-100 origin-top-right animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => handleSelect(null)}
            className="w-full text-left px-5 py-3 text-sm hover:bg-slate-50 flex items-center justify-between transition-colors"
          >
            <span className={!currentCategory ? "font-extrabold text-[#0077b6]" : "text-slate-700 font-medium"}>All Products</span>
            {!currentCategory && <Check size={18} className="text-[#0077b6]" />}
          </button>
          
          <div className="h-px bg-slate-100 my-2 mx-4" />
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.slug)}
              className="w-full text-left px-5 py-3 text-sm hover:bg-slate-50 flex items-center justify-between transition-colors group"
            >
              <span className={currentCategory === cat.slug ? "font-extrabold text-[#0077b6]" : "text-slate-700 font-medium group-hover:text-[#0d1b2e]"}>
                {cat.name}
              </span>
              {currentCategory === cat.slug && <Check size={18} className="text-[#0077b6]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
