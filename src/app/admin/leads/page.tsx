'use client';
import { useState, useEffect } from 'react';
import { Search, Mail, Phone, ExternalLink, X, Loader2, Trash2 } from 'lucide-react';
import { Pagination } from '@/components/admin/Pagination';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLeads(currentPage);
  }, [currentPage]);

  const fetchLeads = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leads?page=${page}&limit=10`);
      if (res.ok) {
        const json = await res.json();
        setLeads(json.data);
        setTotalPages(json.totalPages);
        setTotalItems(json.totalItems);
        setCurrentPage(json.currentPage);
      }
    } catch (error) {
      console.error('Failed to fetch leads', error);
    } finally {
      setLoading(false);
    }
  };

  const openViewModal = (lead: any) => {
    setSelectedLead(lead);
    setStatus(lead.status);
    setMessage(lead.message || '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setIsModalOpen(false);
        fetchLeads(currentPage);
      } else {
        alert('Failed to delete lead');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('An error occurred while deleting');
    }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, message }),
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchLeads(currentPage);
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to update lead');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      alert('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Inquiries & Leads</h1>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search leads by name or email..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            <select className="border border-gray-200 rounded-md text-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All</option>
              <option>NEW</option>
              <option>CONTACTED</option>
              <option>QUALIFIED</option>
              <option>LOST</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-medium whitespace-nowrap">Contact Details</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Product Interest</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Date</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-medium text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading leads...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No leads found.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <div className="flex flex-col gap-1 mt-1 text-gray-500 text-xs">
                        <span className="flex items-center gap-1"><Mail size={12} /> {lead.email}</span>
                        <span className="flex items-center gap-1"><Phone size={12} /> {lead.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-gray-900 font-medium">{lead.productInterest || 'General Inquiry'}</p>
                      {lead.company && <p className="text-gray-500 text-xs mt-1">Company: {lead.company}</p>}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === 'NEW' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'CONTACTED' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'QUALIFIED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-3 whitespace-nowrap">
                      <button 
                        onClick={() => openViewModal(lead)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-end gap-1"
                      >
                        Review <ExternalLink size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(lead.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
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

      {/* View/Edit Modal */}
      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                Lead Details
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Contact Info</p>
                  <p className="font-semibold text-gray-900">{selectedLead.name}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1"><Mail size={14} /> {selectedLead.email}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1"><Phone size={14} /> {selectedLead.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Company Info</p>
                  <p className="font-semibold text-gray-900">{selectedLead.company || 'N/A'}</p>
                  <p className="text-sm text-gray-600 mt-1">Country: {selectedLead.country || 'N/A'}</p>
                  <p className="text-sm text-gray-600 mt-1">Source: {selectedLead.source}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Product Interest</p>
                <p className="font-semibold text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-md">
                  {selectedLead.productInterest || 'General Inquiry'}
                </p>
              </div>

              <form id="lead-form" onSubmit={handleUpdateStatus} className="space-y-4 border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-900"
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="QUALIFIED">Qualified</option>
                      <option value="LOST">Lost</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes / Message Log</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Add notes about this lead..."
                  />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-between gap-3 bg-gray-50">
              <button 
                type="button" 
                onClick={() => handleDelete(selectedLead.id)}
                className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete Lead
              </button>
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  form="lead-form"
                  type="submit" 
                  disabled={saving}
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
