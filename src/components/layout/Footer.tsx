import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#323373] text-white pt-20 pb-10 border-t border-[#292a5d]">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center mb-6">
            <Image src="/logo.png" alt="NK Dairy Logo" width={180} height={60} className="object-contain bg-white/10 p-2 rounded-lg" />
          </Link>
          <p className="text-sm leading-relaxed mb-6 text-white">
            We are running a dairy equipment company located at 119, Ishopur, Delhi Road, Near Radha Swami Sat Sang Bhawan, Yamuna Nagar, Haryana which is certified with ISO:9001:2015. We offer Dairy Equipment for the clients, which are manufactured with consideration and accuracy. Our products are well-renowned for offering high performance even in tough and serious conditions.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/nkdairyequipments" target="_blank" className="hover:text-blue-200 transition-colors text-white"><FaFacebook size={20} /></a>
            <a href="https://www.youtube.com/@NKDairyEquipments" target="_blank" className="hover:text-blue-200 transition-colors text-white"><FaYoutube size={20} /></a>
            <a href="https://www.instagram.com/nkdairyequipments/" target="_blank" className="hover:text-blue-200 transition-colors text-white"><FaInstagram size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="text-white hover:text-blue-200 transition-colors">Home</Link></li>
            <li><Link href="/gallery" className="text-white hover:text-blue-200 transition-colors">Gallery</Link></li>
            <li><Link href="/blogs" className="text-white hover:text-blue-200 transition-colors">Blog</Link></li>
            <li><Link href="/videos" className="text-white hover:text-blue-200 transition-colors">Videos</Link></li>
            <li><Link href="/certificates" className="text-white hover:text-blue-200 transition-colors">Certificates</Link></li>
            <li><Link href="/contact" className="text-white hover:text-blue-200 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider">Products</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/khoya-mawa-making-machine" className="text-white hover:text-blue-200 transition-colors">Khoya or Mawa Making Machines</Link></li>
            <li><Link href="/cream-separator" className="text-white hover:text-blue-200 transition-colors">Cream Separator</Link></li>
            <li><Link href="/dairy-processing-plant-in-india" className="text-white hover:text-blue-200 transition-colors">Dairy Processing Plant</Link></li>
            <li><Link href="/milk-storage-tank" className="text-white hover:text-blue-200 transition-colors">Milk Storage Tank</Link></li>
            <li><Link href="/paneer-press" className="text-white hover:text-blue-200 transition-colors">Paneer Press</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider">Contact Info</h4>
          <ul className="space-y-4 text-sm text-white">
            <li className="flex items-start gap-3">
              <MapPin className="text-blue-400 shrink-0 mt-1" size={18} />
              <span>NK Dairy Equipments, 119, Ishopur, Delhi Road, Near Radha Swami Sat Sang Bhawan, Yamuna Nagar, Haryana 135001</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-blue-400 shrink-0" size={18} />
              <div className="flex flex-col">
                <span>+91-93550-13913</span>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-blue-400 shrink-0" size={18} />
              <span>info@nkdairyequipments.com</span>
            </li>
            <li className="flex items-start gap-3 mt-4 pt-4 border-t border-[#292a5d]">
              <Clock className="text-blue-400 shrink-0 mt-1" size={18} />
              <div className="flex flex-col">
                <span className="font-semibold text-white">Timings : 9 AM to 6:00 PM</span>
                <span className="text-white mt-0.5">Weekly Off : SUNDAY</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 border-t border-[#292a5d] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white">
        <p>&copy; {new Date().getFullYear()} NK Dairy Equipments. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-blue-200 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-blue-200 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
