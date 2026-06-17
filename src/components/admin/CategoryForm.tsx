'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, X, FolderTree } from 'lucide-react';
import Link from 'next/link';

interface CategoryFormProps {
  initialData?: any;
  parentId?: string | null;
}

export default function CategoryForm({ initialData, parentId = null }: CategoryFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const isEditMode = !!initialData;

  const parseEquipmentSolutions = (data: any) => {
    if (!data) return { enabled: false, title: '', subtitle: '', generalDescription: '', tabsHeader: '', tabs: [] };
    if (typeof data === 'object') return data;
    try {
      return JSON.parse(data);
    } catch (e) {
      return { enabled: false, title: '', subtitle: '', generalDescription: '', tabsHeader: '', tabs: [] };
    }
  };

  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    parentId: initialData?.parentId || parentId || null,
    equipmentSolutions: parseEquipmentSolutions(initialData?.equipmentSolutions)
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData({
      ...formData,
      name: newName,
      slug: !isEditMode ? generateSlug(newName) : formData.slug
    });
  };

  const handleAddTab = () => {
    setFormData({
      ...formData,
      equipmentSolutions: {
        ...formData.equipmentSolutions,
        tabs: [...formData.equipmentSolutions.tabs, { id: Date.now().toString(), label: '', content: '' }]
      }
    });
  };

  const handleRemoveTab = (index: number) => {
    const newTabs = [...formData.equipmentSolutions.tabs];
    newTabs.splice(index, 1);
    setFormData({
      ...formData,
      equipmentSolutions: { ...formData.equipmentSolutions, tabs: newTabs }
    });
  };

  const handleTabChange = (index: number, field: string, value: string) => {
    const newTabs = [...formData.equipmentSolutions.tabs];
    newTabs[index] = { ...newTabs[index], [field]: value };
    setFormData({
      ...formData,
      equipmentSolutions: { ...formData.equipmentSolutions, tabs: newTabs }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const url = !isEditMode ? '/api/categories' : `/api/categories/${formData.id}`;
      const method = !isEditMode ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          parentId: formData.parentId,
          equipmentSolutions: formData.equipmentSolutions
        }),
      });
      
      if (res.ok) {
        router.push('/admin/categories');
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to save category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {formData.parentId && !isEditMode && (
        <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-xl flex items-center gap-2 border border-blue-100">
          <FolderTree size={18} /> Creating as a subcategory
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name *</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={handleNameChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            placeholder="e.g. Milk Plant"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug *</label>
          <input 
            type="text" 
            required
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 transition-all"
            placeholder="e.g. milk-plant"
          />
          <p className="text-xs text-gray-500 mt-2">This will be used in the URL: /products/[slug]</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          placeholder="Short description of this category..."
          rows={3}
        />
      </div>

      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#323373]">Equipment & Solutions Section</h3>
          <label className="flex items-center gap-3 cursor-pointer p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <input 
              type="checkbox" 
              checked={formData.equipmentSolutions.enabled}
              onChange={(e) => setFormData({...formData, equipmentSolutions: {...formData.equipmentSolutions, enabled: e.target.checked}})}
              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-all"
            />
            <span className="text-sm font-semibold text-gray-700">Enable Section</span>
          </label>
        </div>

        {formData.equipmentSolutions.enabled && (
          <div className="space-y-6 bg-slate-50/50 p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Section Main Title</label>
                <input 
                  type="text" 
                  value={formData.equipmentSolutions.title}
                  onChange={(e) => setFormData({...formData, equipmentSolutions: {...formData.equipmentSolutions, title: e.target.value}})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="e.g. Tomato Processing"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Section Subtitle</label>
                <input 
                  type="text" 
                  value={formData.equipmentSolutions.subtitle}
                  onChange={(e) => setFormData({...formData, equipmentSolutions: {...formData.equipmentSolutions, subtitle: e.target.value}})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="e.g. Equipment & Solutions"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">General Description</label>
              <textarea 
                value={formData.equipmentSolutions.generalDescription}
                onChange={(e) => setFormData({...formData, equipmentSolutions: {...formData.equipmentSolutions, generalDescription: e.target.value}})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Introductory text before the tabs..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tabs Header (Left Column)</label>
              <input 
                type="text" 
                value={formData.equipmentSolutions.tabsHeader}
                onChange={(e) => setFormData({...formData, equipmentSolutions: {...formData.equipmentSolutions, tabsHeader: e.target.value}})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="e.g. We offer Plant Lines for:"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-bold text-gray-700">Content Tabs</label>
                <button 
                  type="button" 
                  onClick={handleAddTab}
                  className="text-sm bg-white border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-300 px-4 py-2 rounded-lg font-medium shadow-sm transition-all"
                >
                  + Add New Tab
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.equipmentSolutions.tabs.map((tab: any, idx: number) => (
                  <div key={tab.id} className="bg-white border border-gray-200 p-4 rounded-xl relative group shadow-sm">
                    <button 
                      type="button"
                      onClick={() => handleRemoveTab(idx)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-600 bg-red-50 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                      title="Remove Tab"
                    >
                      <X size={16} />
                    </button>
                    <div className="pr-10">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tab Label</label>
                      <input 
                        type="text" 
                        value={tab.label}
                        onChange={(e) => handleTabChange(idx, 'label', e.target.value)}
                        className="w-full mb-3 px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold text-[#323373]"
                        placeholder="e.g. Tomato Paste"
                      />
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tab HTML Content</label>
                      <textarea 
                        value={tab.content}
                        onChange={(e) => handleTabChange(idx, 'content', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-gray-600 bg-gray-50"
                        placeholder="HTML or Text content for this tab..."
                        rows={5}
                      />
                    </div>
                  </div>
                ))}
                {formData.equipmentSolutions.tabs.length === 0 && (
                  <div className="text-sm text-gray-500 italic text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                    No tabs added yet. Click "+ Add New Tab" to start.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end gap-4">
        <Link 
          href="/admin/categories"
          className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
        >
          Cancel
        </Link>
        <button 
          type="submit" 
          disabled={saving}
          className="px-6 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors shadow-md shadow-blue-600/20 flex items-center gap-2 disabled:opacity-70 disabled:shadow-none"
        >
          {saving && <Loader2 size={18} className="animate-spin" />}
          {isEditMode ? 'Save Category Changes' : 'Create Category'}
        </button>
      </div>
    </form>
  );
}
