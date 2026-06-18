import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';

const industries = [
  { label: 'Dairy', href: '/products?category=dairy' },
  { label: 'Food', href: '/products?category=food' },
  { label: 'Beverage', href: '/products?category=beverage' },
  { label: 'Fruits & Vegetables', href: '/products?category=fruits-vegetables' },
  { label: 'Cosmetics', href: '/products?category=cosmetics' },
  { label: 'Allied Industry', href: '/products?category=allied-industry' },
];

const equipmentCol1 = [
  { label: 'Milk Pasteurizer System', href: '/products' },
  { label: 'Juice Pasteurizer System', href: '/products' },
  { label: 'CIP Systems', href: '/products' },
  { label: 'Aseptic Storage Tank', href: '/products' },
  { label: 'Membrane Filtration System', href: '/products' },
  { label: 'UHT Steriliser Module', href: '/products' },
  { label: 'Dairy Separators', href: '/products' },
  { label: 'Spiral Cooling Solutions', href: '/products' },
  { label: 'Spiral Air Freezing Solutions', href: '/products' },
  { label: 'IQF Technology', href: '/products' },
  { label: 'Milk Reception Modules', href: '/products' },
  { label: 'Powder Mixing Systems', href: '/products' },
  { label: 'Contherm Skid', href: '/products' },
];

const equipmentCol2 = [
  { label: 'Tomato Processing', href: '/products' },
  { label: 'Mango Processing', href: '/products' },
  { label: 'Citrus Processing', href: '/products' },
  { label: 'Ice Cream Mix Processing', href: '/products' },
  { label: 'CSD Processing', href: '/products' },
  { label: 'Juice Processing', href: '/products' },
  { label: 'Honey Processing', href: '/products' },
  { label: 'Paneer & Cheese Press', href: '/products' },
  { label: 'Butter Melting Vats', href: '/products' },
  { label: 'Evaporator', href: '/products' },
  { label: 'Turbo Extractor', href: '/products' },
  { label: 'Hot Water Modules', href: '/products' },
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

const linkCls = 'text-slate-600 hover:text-[#323373] transition-colors text-sm leading-relaxed';
const headingCls = 'text-slate-800 font-bold text-base mb-3';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>

      {/* ── Top nav bar ── */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1.25rem 0' }}>
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Nav links */}
          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className="text-slate-600 hover:text-[#323373] font-medium text-sm transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* Resources button */}
          <Link href="/contact">
            <button
              className="font-bold tracking-wider text-sm px-6 py-2 rounded transition-colors"
              style={{ backgroundColor: '#323373', color: '#fff' }}
            >
              Resources
            </button>
          </Link>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Col 1 — Industries (3 cols) */}
          <div className="md:col-span-3">
            <h5 className={headingCls}>Industries</h5>
            {industries.map((item) => (
              <div key={item.label} className="pt-2">
                <Link href={item.href} className={linkCls}>{item.label}</Link>
              </div>
            ))}
          </div>

          {/* Col 2 — Process Equipment & Solutions (6 cols, 2 sub-cols) */}
          <div className="md:col-span-6">
            <h5 className={headingCls}>Process Equipment &amp; Solutions</h5>
            <div className="grid grid-cols-2 gap-x-8">
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

          {/* Col 3 — Services + Social + ISO (3 cols) */}
          <div className="md:col-span-3">
            <h5 className={headingCls}>Services</h5>
            {services.map((item) => (
              <div key={item.label} className="pt-2">
                <Link href={item.href} className={linkCls}>{item.label}</Link>
              </div>
            ))}
            <div className="pt-2">
              <Link href="/contact" className="font-semibold transition-colors text-sm" style={{ color: '#323373' }}>
                Customer Support
              </Link>
            </div>

            {/* Social */}
            <h5 className="font-bold text-slate-800 text-sm mt-6 mb-3">Follow us on:</h5>
            <div className="flex gap-4 mb-6">
              <a href="https://www.facebook.com/nkdairyequipments" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#1877f2' }}>
                <FaFacebook size={18} color="#fff" />
              </a>
              <a href="https://www.instagram.com/nkdairyequipments/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
                <FaInstagram size={18} color="#fff" />
              </a>
              <a href="https://www.youtube.com/@NKDairyEquipments" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#ff0000' }}>
                <FaYoutube size={18} color="#fff" />
              </a>
            </div>

            {/* ISO */}
            <p className="text-xs text-slate-500 mb-2">We are standardized with the certification of</p>
            <img
              src="https://www.neologicengineers.com/images/iso-footer-logo-new.webp"
              alt="ISO Certificate"
              style={{ width: '80px', objectFit: 'contain' }}
              loading="lazy"
            />
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid #e2e8f0', padding: '1rem 0', backgroundColor: '#323373' }}>
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white">
          <p>&copy; {new Date().getFullYear()} NK Dairy Equipments. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
