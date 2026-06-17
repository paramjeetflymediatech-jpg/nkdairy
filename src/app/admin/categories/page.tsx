'use client';
import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, ChevronRight, FolderTree } from 'lucide-react';
import Link from 'next/link';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filterCategoriesTree = (cats: any[], query: string): any[] => {
    if (!query) return cats;
    const lowerQuery = query.toLowerCase();
    
    return cats.reduce((acc: any[], cat: any) => {
      const isMatch = cat.name.toLowerCase().includes(lowerQuery) || cat.slug.toLowerCase().includes(lowerQuery);
      const filteredChildren = cat.subcategories ? filterCategoriesTree(cat.subcategories, query) : [];
      
      if (isMatch || filteredChildren.length > 0) {
        acc.push({
          ...cat,
          subcategories: isMatch ? cat.subcategories : filteredChildren
        });
      }
      return acc;
    }, []);
  };

  const displayedCategories = filterCategoriesTree(categories, searchQuery);

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
            <Link
              href={`/admin/categories/new?parentId=${category.id}`}
              className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 bg-blue-50 rounded"
            >
              + Add Subcategory
            </Link>
            <Link
              href={`/admin/categories/${category.id}/edit`}
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit2 size={16} />
            </Link>
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
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md shadow-blue-600/20"
        >
          <Plus size={18} /> Add Root Category
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            ) : displayedCategories.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No categories found matching your search.
              </div>
            ) : (
              displayedCategories.map(category => renderCategoryRow(category, 0))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
