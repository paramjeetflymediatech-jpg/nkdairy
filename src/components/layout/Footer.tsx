'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const industries = [
  { label: 'Dairy', href: '/products?category=dairy' },
  { label: 'Food', href: '/products?category=food' },
  { label: 'Beverage', href: '/products?category=beverage' },
  // { label: 'Fruits & Vegetables', href: '/products?category=fruits-vegetables' },
  { label: 'Cosmetics', href: '/products?category=cosmetics' },
  { label: 'Allied Industry', href: '/products?category=allied-industry' },
];

const equipmentCol1 = [
  { label: 'Paneer Plant', href: '/products/paneer-plant' },
  { label: 'Dairy Turnkey Projects', href: '/products/dairy-turnkey-projects' },
  { label: 'Greek Yogurt Plant in India', href: '/products/greek-yogurt-plant-in-india' },
  { label: 'Cream Pasteurizer Plant', href: '/products/cream-pasteurizer-plant' },
  { label: 'Milk Plant', href: '/products/milk-plant' },
  { label: 'Ghee Plant', href: '/products/ghee-plant' },
  { label: 'Dahi and Lassi Plant', href: '/products/dahi-and-lassi-plant' },
  { label: 'Milk Pasteurizer Plant', href: '/products/milk-pasteurizer-plant' },
];

const equipmentCol2 = [
  { label: 'Khoya Mawa Making Machine', href: '/products/khoya-mawa-making-machine' },
  { label: 'Butter Churner', href: '/products/butter-churner' },
  { label: 'Curd Making Plant Manufacturer', href: '/products/curd-making-plant-manufacturer' },
  { label: 'Dairy Plant', href: '/products/dairy-plant' },
  { label: 'Milk Chilling Plant', href: '/products/milk-chilling-plant' },
  { label: 'Cream Separator', href: '/products/cream-separator' },
  { label: 'Batch Pasteurizer (200 Ltr to 2000 Ltr)', href: '/products/batch-pasteurizer-200-ltr-to-2000-ltr' },
  { label: 'HTST Milk Processing Plant', href: '/products/htst-milk-processing-plant' },
];

const services = [
  { label: 'Spares & AMC', href: '/contact' },
  { label: 'Process Engineering & Consultancy', href: '/contact' },
  { label: 'Automation Engineering', href: '/contact' },
];

const navLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Clients', href: '/#clients' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Videos', href: '/videos' },
];

const linkCls = 'text-slate-600 hover:text-[#0077b6] transition-colors text-sm leading-relaxed';
const headingCls = 'text-[#0d1b2e] font-bold text-base mb-3 uppercase tracking-wider text-sm';

export default function Footer() {
  const [drops, setDrops] = useState<any[]>([]);
  const [gears, setGears] = useState<any[]>([]);

  useEffect(() => {
    // Generate random values only on client to avoid hydration mismatch
    setDrops([...Array(6)].map(() => ({
      width: Math.random() * 60 + 20 + 'px',
      height: Math.random() * 80 + 30 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animDuration: Math.random() * 10 + 10,
      animX: Math.random() * 50 - 25,
    })));

    setGears([...Array(4)].map(() => ({
      width: Math.random() * 200 + 100 + 'px',
      height: Math.random() * 200 + 100 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animDuration: Math.random() * 40 + 30,
    })));
  }, []);

  return (
    <footer className="relative bg-gradient-to-b from-[#f8f9fa] to-[#e0f2fe] border-t border-gray-100 overflow-hidden pt-12">

      {/* --- Animated Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Floating Milk Drops */}
        {drops.map((drop, i) => (
          <motion.div
            key={`drop-${i}`}
            className="absolute rounded-full bg-white opacity-40 blur-[2px]"
            style={{
              width: drop.width,
              height: drop.height,
              left: drop.left,
              top: drop.top,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', // Milk drop shape
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, drop.animX, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: drop.animDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Slowly Rotating Gears */}
        {gears.map((gear, i) => (
          <motion.svg
            key={`gear-${i}`}
            className="absolute opacity-[0.03]"
            style={{
              width: gear.width,
              height: gear.height,
              left: gear.left,
              top: gear.top,
            }}
            viewBox="0 0 100 100"
            fill="#0d1b2e"
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: gear.animDuration,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <path d="M50,15 A35,35 0 1,1 49.9,15 z M50,30 A20,20 0 1,0 50.1,30 z" />
            <rect x="45" y="0" width="10" height="15" />
            <rect x="45" y="85" width="10" height="15" />
            <rect x="0" y="45" width="15" height="10" />
            <rect x="85" y="45" width="15" height="10" />
            <rect x="14" y="14" width="15" height="10" transform="rotate(45 21.5 19)" />
            <rect x="71" y="71" width="15" height="10" transform="rotate(45 78.5 76)" />
            <rect x="14" y="71" width="10" height="15" transform="rotate(-45 19 78.5)" />
            <rect x="71" y="14" width="10" height="15" transform="rotate(-45 76 21.5)" />
          </motion.svg>
        ))}
      </div>

      {/* ── Main footer grid ── */}
      <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Col 1 — Industries (2 cols) */}
          <div className="md:col-span-2 lg:col-span-2">
            <h5 className={headingCls}>Industries</h5>
            {industries.map((item) => (
              <div key={item.label} className="pt-2">
                <Link href={item.href} className={linkCls}>{item.label}</Link>
              </div>
            ))}
          </div>

          {/* Col 2 — Process Equipment & Solutions (5 cols, 2 sub-cols) */}
          <div className="md:col-span-5 lg:col-span-5">
            <h5 className={headingCls}>Process Equipment &amp; Solutions</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <div>
                {equipmentCol1.map((item) => (
                  <div key={item.label} className="pt-2">
                    <Link href={item.href} className={linkCls}>{item.label}</Link>
                  </div>
                ))}
              </div>
              <div>
                {equipmentCol2.map((item) => (
                  <div key={item.label} className="pt-2">
                    <Link href={item.href} className={linkCls}>{item.label}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3 — Services + Social + ISO (2 cols) */}
          <div className="md:col-span-2 lg:col-span-2">
            <h5 className={headingCls}>Quick Links</h5>
            <div className="pt-2">
              <Link href="/our-clientele" className={linkCls}>Our Clientele</Link>
            </div>
            <div className="pt-2">
              <Link href="/blogs" className={linkCls}>Blog</Link>
            </div>
            <div className="pt-2">
              <Link href="/videos" className={linkCls}>Videos</Link>
            </div>

            {/* Social */}
            <h5 className="font-bold text-slate-800 text-sm mt-6 mb-3">Follow us on:</h5>
            <div className="flex gap-3 mb-6">
              <a href="https://www.facebook.com/nkdairyequipments" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#1877f2' }}>
                <FaFacebook size={16} color="#fff" />
              </a>
              <a href="https://www.instagram.com/nkdairyequipments/" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
                <FaInstagram size={16} color="#fff" />
              </a>
              <a href="https://www.youtube.com/@NKDairyEquipments" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#ff0000' }}>
                <FaYoutube size={16} color="#fff" />
              </a>
            </div>

            {/* ISO */}
            <p className="text-xs text-slate-500 mb-2">Standardized with</p>
            <img
              src="https://www.neologicengineers.com/images/iso-footer-logo-new.webp"
              alt="ISO Certificate"
              style={{ width: '80px', objectFit: 'contain' }}
              loading="lazy"
            />
          </div>

          {/* Col 4 — Contact Us (3 cols) */}
          <div className="md:col-span-3 lg:col-span-3">
            <h5 className={headingCls}>Contact Us</h5>
            <div className="space-y-4 pt-2">
              <div className="text-sm text-slate-600 leading-relaxed">
                <span className="font-bold block text-slate-800 mb-1">NK Dairy Equipments</span>
                119, Ishopur, Delhi Road, Near Radha Swami Sat Sang Bhawan,<br />
                Yamuna Nagar, Haryana 135001
              </div>
              <div className="text-sm text-slate-600">
                <a href="tel:+919355013913" className="block hover:text-[#0077b6] transition-colors">+91-93550-13913</a>
                <a href="tel:+919355113913" className="block hover:text-[#0077b6] transition-colors">+91-93551-13913</a>
              </div>
              <div className="text-sm text-slate-600">
                <a href="mailto:info@nkdairyequipments.com" className="hover:text-[#0077b6] transition-colors font-medium">info@nkdairyequipments.com</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#00b4d8]/20 bg-[#0d1b2e] py-6 relative z-10">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} NK Dairy Equipments. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
