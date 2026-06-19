'use client';
import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Layers } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const res = await fetch('/api/industries');
      if (res.ok) {
        const data = await res.json();
        setIndustries(data);
      }
    } catch (error) {
      console.error('Failed to fetch industries', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/industries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        Swal.fire('Deleted!', 'The industry has been deleted.', 'success');
        fetchIndustries();
      } else {
        Swal.fire('Error!', 'Failed to delete industry', 'error');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      Swal.fire('Error!', 'An error occurred while deleting', 'error');
    }
  };

  const filteredIndustries = industries.filter((ind) =>
    ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ind.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Industries & Segments</h1>
        <Link
          href="/admin/industries/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md shadow-blue-600/20"
        >
          <Plus size={18} /> Add Industry
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col">
          {/* Header Row */}
          <div className="bg-gray-100 p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider grid grid-cols-12">
            <div className="col-span-5">Industry Details</div>
            <div className="col-span-5">URL Path / Preview</div>
            <div className="col-span-2 text-right pr-4">Actions</div>
          </div>

          {/* List Content */}
          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading industries...</div>
            ) : industries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No industries found. Add your first industry.
              </div>
            ) : filteredIndustries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No industries found matching your search.
              </div>
            ) : (
              filteredIndustries.map((ind) => (
                <div key={ind.id} className="grid grid-cols-12 items-center p-4 hover:bg-gray-50 transition-colors">
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center p-1.5 shrink-0">
                      {ind.image ? (
                        <img src={ind.image} alt={ind.name} className="w-full h-full object-contain" />
                      ) : (
                        <Layers size={18} className="text-blue-600" />
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">{ind.name}</span>
                      <span className="text-xs text-gray-400 line-clamp-1">{ind.description || 'No description provided.'}</span>
                    </div>
                  </div>

                  <div className="col-span-5 flex flex-col gap-1">
                    <span className="text-sm text-gray-600">/industries/{ind.slug}</span>
                    <a 
                      href={`/industries/${ind.slug}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-blue-600 hover:underline hover:text-blue-700 w-fit"
                    >
                      View live page ↗
                    </a>
                  </div>

                  <div className="col-span-2 flex items-center justify-end gap-3 pr-4">
                    <Link
                      href={`/admin/industries/${ind.id}/edit`}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit Industry"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(ind.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Industry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
