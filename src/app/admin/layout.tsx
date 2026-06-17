'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  FolderTree
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
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
    { name: 'SEO Settings', href: '/admin/seo', icon: Globe },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
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
      <aside className={`bg-slate-900 text-white w-64 flex-shrink-0 transition-transform duration-300 fixed inset-y-0 left-0 z-50 lg:relative ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 overflow-hidden lg:opacity-0'}`}>
        <div className="h-16 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800 w-64">
          <span className="font-bold text-lg tracking-widest text-blue-400">NK ADMIN</span>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
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
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                  >
                    <item.icon size={18} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="absolute bottom-0 w-64 p-4 border-t border-slate-800">
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-10 z-10">
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-900 lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 truncate">
              {navItems.find(i => i.href === pathname)?.name || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-4 lg:pl-6 border-gray-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
