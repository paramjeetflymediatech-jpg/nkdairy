'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  MessageSquare,
  Globe,
  FolderTree,
  Layers,
  HelpCircle
} from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Open sidebar by default only on desktop
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Industries', href: '/admin/industries', icon: Layers },
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
    { name: 'SEO Settings', href: '/admin/seo', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`bg-white text-slate-800 border-r border-gray-200 w-64 flex-shrink-0 transition-transform duration-300 fixed inset-y-0 left-0 z-50 lg:relative ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 overflow-hidden lg:opacity-0'}`}>
        <div className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 w-64">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/logo.png" alt="NK Dairy Logo" width={140} height={40} className="object-contain" priority />
          </Link>
          <button className="lg:hidden text-gray-500 hover:text-gray-900" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="py-6 px-4 w-64">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors font-medium ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <item.icon size={18} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Menu Toggle (Visible only on small screens without header) */}
        <div className="lg:hidden p-4 bg-white border-b border-gray-200 flex items-center justify-between z-10">
          <h1 className="text-xl font-semibold text-gray-800 truncate">
            {navItems.find(i => i.href === pathname)?.name || 'Admin'}
          </h1>
          <button className="text-gray-500 hover:text-gray-900" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
