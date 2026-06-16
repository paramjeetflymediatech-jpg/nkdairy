'use client';
import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, ChevronRight, FolderTree, X, Loader2 } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    description: '',
    parentId: null as string | null
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData({
      ...formData,
      name: newName,
      // Auto-generate slug only if we are in create mode
      slug: modalMode === 'create' ? generateSlug(newName) : formData.slug
    });
  };

  const openAddModal = (parentId: string | null = null) => {
    setModalMode('create');
    setFormData({ id: '', name: '', slug: '', description: '', parentId });
    setIsModalOpen(true);
  };

  const openEditModal = (category: any) => {
    setModalMode('edit');
    setFormData({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      parentId: category.parentId
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? All its subcategories will be affected.')) return;
    
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCategories();
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('An error occurred while deleting');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const url = modalMode === 'create' ? '/api/categories' : `/api/categories/${formData.id}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          parentId: formData.parentId
        }),
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchCategories();
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

  const renderCategoryRow = (category: any, level: number = 0) => {
    const isRoot = level === 0;
    return (
      <div key={category.id} className={`border-b border-gray-50 last:border-0`}>
        <div className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${isRoot ? 'bg-white font-medium' : 'bg-gray-50/50'}`}>
          <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 2}rem` }}>
            {!isRoot && <ChevronRight size={16} className="text-gray-400" />}
            {isRoot && <FolderTree size={16} className="text-blue-600" />}
            <span className="text-gray-900">{category.name}</span>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full ml-2">
              /{category.slug}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => openAddModal(category.id)}
              className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 bg-blue-50 rounded"
            >
              + Add Subcategory
            </button>
            <button 
              onClick={() => openEditModal(category)}
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => handleDelete(category.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="border-l-2 border-blue-100 ml-6">
            {category.subcategories.map((sub: any) => renderCategoryRow(sub, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Categories & Menus</h1>
        <button 
          onClick={() => openAddModal(null)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} /> Add Root Category
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-gray-100 p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider grid grid-cols-2">
            <div>Category Hierarchy</div>
            <div className="text-right pr-4">Actions</div>
          </div>
          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No categories found. Add your first root category.
                <p className="text-sm mt-2">Example: Products, Milk Plant, Vegan Plant</p>
              </div>
            ) : (
              categories.map(category => renderCategoryRow(category, 0))
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === 'create' ? 'Add New Category' : 'Edit Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formData.parentId && modalMode === 'create' && (
                <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg flex items-center gap-2">
                  <FolderTree size={16} /> Creating as a subcategory
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Milk Plant"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
                <input 
                  type="text" 
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  placeholder="e.g. milk-plant"
                />
                <p className="text-xs text-gray-500 mt-1">This will be used in the URL: /products/[slug]</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Short description of this category..."
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {modalMode === 'create' ? 'Create Category' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
