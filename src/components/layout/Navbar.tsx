'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileNavItem = ({ item, depth = 0, setNavOpen }: { item: any, depth?: number, setNavOpen: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubcategories = item.subcategories && item.subcategories.length > 0;
  const href = item.href || `/${item.slug}`;

  return (
    <div className={`${depth === 0 ? 'border-b border-gray-50 pb-2' : ''}`}>
      <div className={`flex justify-between items-center py-2 ${depth === 0 ? 'text-[#323373] font-semibold text-base' : 'text-gray-600 text-sm'}`}>
        <Link 
          href={href} 
          onClick={() => { if (!hasSubcategories) setNavOpen(false); }}
          className="flex-1"
        >
          {depth > 0 && <span className="mr-2 opacity-50">-</span>} {item.name}
        </Link>
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
              {item.subcategories.map((sub: any) => (
                <MobileNavItem key={sub.id || sub.name} item={sub} depth={depth + 1} setNavOpen={setNavOpen} />
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

  // Create the nav structure based on DB and static requests
  const navItems = [
    { name: 'Home', href: '/', isDynamic: false },
    { name: 'About Us', href: '/about', isDynamic: false },
    ...categories.map(cat => ({
      name: cat.name,
      href: `/${cat.slug}`,
      isDynamic: true,
      subcategories: cat.subcategories || []
    })),
    { name: 'Our Clientele', href: '/our-clientele', isDynamic: false },
    { name: 'Blog', href: '/blogs', isDynamic: false },
    { name: 'Videos', href: '/videos', isDynamic: false },
    { name: 'Contact Us', href: '/contact', isDynamic: false },
  ];

  const renderDropdown = (items: any[], depth: number = 0) => {
    if (!items || items.length === 0) return null;
    
    // For root dropdown (depth 0), it goes down.
    // For sub-dropdowns (depth > 0), it goes right.
    const dropdownClasses = depth === 0 
      ? "absolute top-full left-0 mt-2 min-w-max bg-white shadow-xl border border-gray-100 rounded-lg py-2 z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform origin-top-left translate-y-2 group-hover:translate-y-0"
      : "absolute top-0 left-full ml-0 min-w-max bg-white shadow-xl border border-gray-100 rounded-lg py-2 opacity-0 group-hover/sub:opacity-100 invisible group-hover/sub:visible transition-all duration-300 transform -translate-x-2 group-hover/sub:translate-x-0 z-50";

    return (
      <ul className={dropdownClasses}>
        {items.map((sub: any) => (
          <li key={sub.id} className="relative group/sub">
            <Link href={`/${sub.slug}`} className="block px-5 py-2 text-sm text-[#323373] hover:bg-gray-50 hover:text-blue-600 transition-colors flex justify-between items-center whitespace-nowrap gap-4">
              {sub.name}
              {sub.subcategories && sub.subcategories.length > 0 && <ChevronDown size={14} className="-rotate-90 text-gray-400" />}
            </Link>
            
            {/* Infinite Recursive Dropdown */}
            {sub.subcategories && sub.subcategories.length > 0 && renderDropdown(sub.subcategories, depth + 1)}
          </li>
        ))}
      </ul>
    );
  };


  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-white py-6 border-b border-gray-100'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center w-full">
        <Link href="/" className="flex items-center group flex-shrink-0">
          <Image src="/logo.png" alt="NK Dairy Logo" width={150} height={50} className="object-contain" priority />
        </Link>

        {/* Desktop Nav - Centered */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-6 xl:gap-8 px-4">
          {navItems.map((link, idx) => (
            <div 
              key={`${link.name}-${idx}`}
              className="relative group"
              onMouseEnter={() => link.isDynamic && setActiveDropdown(link.name)}
              onMouseLeave={() => link.isDynamic && setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 text-[#323373] hover:text-blue-600 text-sm font-semibold tracking-wide transition-colors py-2"
              >
                {link.name}
                {link.isDynamic && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
              </Link>
              
              {/* Dropdown for dynamic links */}
              {link.isDynamic && renderDropdown((link as any).subcategories)}
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
  );
}
