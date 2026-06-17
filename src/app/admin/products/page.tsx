'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { Pagination } from '@/components/admin/Pagination';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?page=${page}&limit=10&search=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const json = await res.json();
        setProducts(json.data);
        setTotalPages(json.totalPages);
        setTotalItems(json.totalItems);
        setCurrentPage(json.currentPage);
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts(currentPage);
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('An error occurred while deleting');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
        <Link 
          href="/admin/products/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-600/40"
        >
          <Plus size={18} /> Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-bold whitespace-nowrap">Product Name</th>
                <th className="px-6 py-4 font-bold whitespace-nowrap">Category</th>
                <th className="px-6 py-4 font-bold whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-bold text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">No products found. Click "Add New Product" to start.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap font-medium">{product.category?.name || 'Uncategorized'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2 whitespace-nowrap transition-opacity">
                      <Link 
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors tooltip"
                        title="View Public Page"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <Link 
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalItems={totalItems} 
            onPageChange={setCurrentPage} 
          />
        </div>
      </div>
    </div>
  );
}
