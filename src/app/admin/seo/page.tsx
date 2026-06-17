'use client';
import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Globe, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminSeoPage() {
  const [seoEntries, setSeoEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSeoMetadata();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    fetchSeoMetadata();
  }, []);

  const fetchSeoMetadata = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/seo?search=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setSeoEntries(data);
      }
    } catch (error) {
      console.error('Failed to fetch SEO metadata', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this SEO configuration?')) return;
    
    try {
      const res = await fetch(`/api/seo/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchSeoMetadata();
      } else {
        alert('Failed to delete SEO entry');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('An error occurred while deleting');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
          <p className="text-sm text-gray-500 mt-1">Configure global meta tags and injected scripts for specific website paths.</p>
        </div>
        <Link 
          href="/admin/seo/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} /> Add SEO Config
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search paths..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-medium whitespace-nowrap">Page Path</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Meta Title</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Scripts Configured</th>
                <th className="px-6 py-4 font-medium text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading SEO configs...</td>
                </tr>
              ) : seoEntries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 flex flex-col items-center justify-center">
                    <Globe size={48} className="text-gray-300 mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-1">No SEO configurations</p>
                    <p className="text-sm">Create configurations for paths like '/', '/about', or 'GLOBAL'.</p>
                  </td>
                </tr>
              ) : (
                seoEntries.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-blue-600 font-medium whitespace-nowrap">
                      {entry.pagePath}
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium truncate max-w-xs whitespace-nowrap">
                      {entry.metaTitle || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.metaDescription ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Meta Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Meta Missing
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {(entry.headScripts || entry.footerScripts) ? (
                        <span className="text-purple-600 font-medium text-xs bg-purple-50 px-2.5 py-0.5 rounded-full">Contains Scripts</span>
                      ) : 'None'}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-3 whitespace-nowrap">
                      <Link 
                        href={`/admin/seo/${entry.id}/edit`}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(entry.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
