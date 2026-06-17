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
    <div className="relative mt-6 md:mt-0" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold shadow-sm text-slate-700 w-full md:w-auto justify-between"
      >
        <div className="flex items-center gap-2">
          <Filter size={18} className={currentCategory ? "text-blue-600" : "text-gray-500"} />
          <span className={currentCategory ? "text-blue-700" : ""}>{activeCategoryName}</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-full md:w-64 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 max-h-80 overflow-y-auto">
          <button
            onClick={() => handleSelect(null)}
            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between transition-colors"
          >
            <span className={!currentCategory ? "font-semibold text-blue-600" : "text-gray-700"}>All Products</span>
            {!currentCategory && <Check size={16} className="text-blue-600" />}
          </button>
          
          <div className="h-px bg-gray-100 my-1 mx-2" />
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.slug)}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between transition-colors"
            >
              <span className={currentCategory === cat.slug ? "font-semibold text-blue-600" : "text-gray-700"}>
                {cat.name}
              </span>
              {currentCategory === cat.slug && <Check size={16} className="text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
