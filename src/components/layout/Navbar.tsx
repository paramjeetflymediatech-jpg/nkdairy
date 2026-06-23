'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Box, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileNavItem = ({ item, depth = 0, setNavOpen }: { item: any, depth?: number, setNavOpen: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubcategories = (item.subcategories && item.subcategories.length > 0) || (item.allNestedProducts && item.allNestedProducts.length > 0);
  const isHeaderOnly = hasSubcategories && (!item.href || item.href === '#');
  const href = item.href || (item.slug ? (item.slug.startsWith('/') ? item.slug : `/${item.slug}`) : '#');

  return (
    <div className={`${depth === 0 ? 'border-b border-gray-50 pb-2' : ''}`}>
      <div className={`flex justify-between items-center py-2 ${depth === 0 ? 'text-[#323373] font-semibold text-base' : 'text-[#323373] font-medium text-sm'}`}>
        {isHeaderOnly ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 flex items-center gap-2 text-left"
          >
            {depth > 0 && <span className="mr-2 text-gray-400 font-normal">-</span>}
            {item.image && <img src={item.image} alt={item.name} className="w-5 h-5 object-contain" />}
            <span className={depth > 0 ? "font-bold text-[#f3b216]" : ""}>{item.name}</span>
          </button>
        ) : (
          <Link
            href={href}
            onClick={() => { if (!hasSubcategories) setNavOpen(false); }}
            className="flex-1 flex items-center gap-2"
          >
            {depth > 0 && <span className="mr-2 text-gray-400 font-normal">-</span>}
            {item.image && <img src={item.image} alt={item.name} className="w-5 h-5 object-contain" />}
            <span className={depth > 1 ? "text-gray-600 font-normal" : ""}>{item.name}</span>
          </Link>
        )}

        {hasSubcategories && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 -mr-2 text-gray-500">
            <ChevronDown size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && hasSubcategories && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className={`mt-1 space-y-1 ${depth === 0 ? 'pl-4 border-l-2 border-gray-100' : 'pl-4'}`}>
              {item.subcategories?.map((sub: any) => (
                <MobileNavItem key={sub.id || sub.name} item={{ ...sub, href: sub.href || (sub.slug ? `/${sub.slug}` : '#') }} depth={depth + 1} setNavOpen={setNavOpen} />
              ))}
              {item.allNestedProducts?.map((prod: any) => (
                <MobileNavItem key={prod.id || prod.name} item={{ name: prod.name, href: `/products/${prod.slug}` }} depth={depth + 1} setNavOpen={setNavOpen} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await fetch('/api/industries');
        if (res.ok) {
          const data = await res.json();
          setIndustries(data);
        }
      } catch (error) {
        console.error('Failed to fetch industries', error);
      }
    };
    fetchIndustries();
  }, []);

  // Create the nav structure
  const navItems = [
    { name: 'Home', href: '/', isDynamic: false, isMegaMenu: false },
    { name: 'About Us', href: '/about', isDynamic: false, isMegaMenu: false },
    {
      name: 'Industries',
      href: '#',
      isDynamic: true,
      isMegaMenu: false,
      subcategories: industries.map(ind => ({
        id: ind.id,
        name: ind.name,
        slug: `industries/${ind.slug}`,
        image: ind.image
      }))
    },
    {
      name: 'Equipment & Solutions',
      href: '#',
      isDynamic: true,
      isMegaMenu: true,
      subcategories: categories
    },
    { name: 'Contact Us', href: '/contact', isDynamic: false, isMegaMenu: false },
  ];

  const renderMegaMenu = (categories: any[], isOpen: boolean) => {
    if (!categories || categories.length === 0) return null;

    // Filter out categories that have no products
    const validCategories = categories.filter(c => c.allNestedProducts && c.allNestedProducts.length > 0);
    if (validCategories.length === 0) return null;

    return (
      <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-max min-w-[800px] max-w-[95vw] z-50 transition-all duration-300 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'}`}>
        <div className="bg-white border-t-4 border-[#323373] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-8 relative">
          <div className="flex gap-12">
            {validCategories.map((category: any, index: number) => (
              <div key={category.id} className="flex-1">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#f3b216]">
                  {index % 2 === 0 ? <Box className="text-[#64748b]" size={22} /> : <Layers className="text-[#64748b]" size={22} />}
                  <span className="font-semibold text-[#323373] text-lg">{category.name}</span>
                </div>

                {/* Products Grid (2 columns per category) */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-0">
                  {category.allNestedProducts.map((prod: any) => (
                    <div key={prod.id} className="border-b border-gray-100 py-2.5">
                      <Link href={`/products/${prod.slug}`} className="block text-gray-600 hover:text-[#323373] hover:translate-x-1 transition-transform text-sm font-medium w-full">
                        {prod.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDropdown = (items: any[], depth: number = 0) => {
    if (!items || items.length === 0) return null;

    const wrapperClasses = depth === 0
      ? "absolute top-full left-0 pt-2 min-w-max z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform origin-top-left translate-y-2 group-hover:translate-y-0"
      : "absolute top-0 left-full pl-0 min-w-max z-50 opacity-0 group-hover/sub:opacity-100 invisible group-hover/sub:visible transition-all duration-300 transform -translate-x-2 group-hover/sub:translate-x-0";

    return (
      <div className={wrapperClasses}>
        <ul className="bg-white shadow-xl border border-gray-100 rounded-lg py-2">
          {items.map((sub: any) => (
            <li key={sub.id} className="relative group/sub">
              <Link
                href={`/${sub.slug}`}
                onClick={() => setIsOpen(false)}
                className="block px-5 py-2.5 text-sm text-[#323373] hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center gap-3 whitespace-nowrap"
              >
                {sub.image && (
                  <img src={sub.image} alt={sub.name} className="w-5 h-5 object-contain" />
                )}
                <span>{sub.name}</span>
                {sub.subcategories && sub.subcategories.length > 0 && <ChevronDown size={14} className="ml-auto -rotate-90 text-gray-400" />}
              </Link>

              {/* Infinite Recursive Dropdown */}
              {sub.subcategories && sub.subcategories.length > 0 && renderDropdown(sub.subcategories, depth + 1)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 w-full flex justify-center ${scrolled ? 'top-4 px-4 md:px-8' : 'top-0'}`}>
      <nav
        className={`w-full max-w-[1600px] transition-all duration-500 relative ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-lg py-3 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-2xl md:rounded-[2.5rem] border border-white/50' 
            : 'bg-white py-5 border-b border-gray-100'
        }`}
      >
        <div className={`w-full flex justify-between items-center relative transition-all duration-500 ${scrolled ? 'px-6 md:px-10' : 'container mx-auto px-4 md:px-8'}`}>
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image src="/logo.png" alt="NK Dairy Logo" width={220} height={75} className={`object-contain transition-all duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`} priority />
          </Link>

        {/* Desktop Nav - Centered */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-6 xl:gap-8 px-4 h-full">
          {navItems.map((link, idx) => (
            <div
              key={`${link.name}-${idx}`}
              className="relative group h-full flex items-center"
              onMouseEnter={() => link.isDynamic && setActiveDropdown(link.name)}
              onMouseLeave={() => link.isDynamic && setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                onClick={(e) => {
                  if (link.isDynamic) {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === link.name ? null : link.name);
                  }
                }}
                className={`flex items-center gap-1 text-[13px] 2xl:text-sm font-semibold tracking-wide transition-colors py-2 ${activeDropdown === link.name ? 'text-[#0077b6]' : 'text-[#0d1b2e] hover:text-[#0077b6]'}`}
              >
                {link.name}
                {link.isDynamic && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : 'group-hover:rotate-180'}`} />}
              </Link>

              {/* Dropdown for dynamic links */}
              {link.isMegaMenu
                ? renderMegaMenu(link.subcategories || [], activeDropdown === link.name)
                : (link.isDynamic && renderDropdown(link.subcategories || []))
              }
            </div>
          ))}
        </div>

        {/* Right Side Contact Info */}
        <div className="hidden lg:flex flex-col items-end flex-shrink-0 text-right min-w-[200px]">
          <div className="text-[#323373] font-bold text-sm tracking-tight flex items-center gap-2">
            <span>+91-93550-13913</span>
          </div>
          <div className="text-gray-500 text-xs mt-0.5">
            Timings: 9 AM to 6:00 PM (Sun Off)
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-[#323373]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-full shadow-lg"
          >
            <div className="flex flex-col px-6 py-4 gap-4 max-h-[80vh] overflow-y-auto">
              {navItems.map((link, idx) => (
                <MobileNavItem key={`${link.name}-${idx}`} item={link} setNavOpen={setIsOpen} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </div>
  );
}
