'use client';
import { useState } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SeoFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function SeoForm({ initialData, isEdit = false }: SeoFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    pagePath: initialData?.pagePath || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    metaKeywords: initialData?.metaKeywords || '',
    ogImage: initialData?.ogImage || '',
    headScripts: initialData?.headScripts || '',
    footerScripts: initialData?.footerScripts || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      const url = isEdit ? `/api/seo/${initialData.id}` : '/api/seo';
      const method = isEdit ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        router.push('/admin/seo');
        router.refresh();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to save SEO config');
      }
    } catch (error) {
      console.error('Error saving SEO:', error);
      setError('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/seo" className="text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit SEO Configuration' : 'Add SEO Configuration'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage meta tags, Open Graph data, and global scripts.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Path Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">Target Path</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Path *</label>
            <input 
              type="text" 
              required
              value={formData.pagePath}
              onChange={(e) => setFormData({...formData, pagePath: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="e.g. /, /about, /contact, or GLOBAL"
              disabled={isEdit}
            />
            <p className="text-xs text-gray-500 mt-1">Must start with a forward slash (e.g., `/contact`). Use `GLOBAL` to apply scripts across the whole site.</p>
          </div>
        </div>

        {/* Standard SEO Data */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">Standard Meta Tags</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title *</label>
            <input 
              type="text" 
              required={formData.pagePath !== 'GLOBAL'}
              value={formData.metaTitle}
              onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="NK Dairy Equipments | Premium Manufacturers"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended length: 50-60 characters.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
            <textarea 
              value={formData.metaDescription}
              onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Brief summary of the page for search engines..."
            />
            <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
            <input 
              type="text" 
              value={formData.metaKeywords}
              onChange={(e) => setFormData({...formData, metaKeywords: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="dairy, equipment, pasteurizer, milk plant"
            />
            <p className="text-xs text-gray-500 mt-1">Comma separated list of keywords.</p>
          </div>
        </div>

        {/* Scripts Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">Injected Scripts</h2>
          <p className="text-sm text-gray-500 mb-4">Paste raw HTML/JS snippets here (e.g., Google Analytics, Facebook Pixel). Be extremely careful as invalid scripts can break the site layout.</p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Head Scripts</label>
            <textarea 
              value={formData.headScripts}
              onChange={(e) => setFormData({...formData, headScripts: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs bg-gray-50"
              rows={5}
              placeholder="<!-- Injected before </head> -->"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Footer Scripts</label>
            <textarea 
              value={formData.footerScripts}
              onChange={(e) => setFormData({...formData, footerScripts: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs bg-gray-50"
              rows={5}
              placeholder="<!-- Injected before </body> -->"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link 
            href="/admin/seo"
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={saving}
            className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-70 shadow-sm"
          >
            {saving && <Loader2 size={18} className="animate-spin" />}
            {isEdit ? 'Save Changes' : 'Create Configuration'}
          </button>
        </div>

      </form>
    </div>
  );
}
