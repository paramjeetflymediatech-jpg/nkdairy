'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function ContactSidebar() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for now, assuming /api/contact might be built later
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Contact Us</h2>
      
      {success ? (
        <div className="bg-green-50 text-green-700 p-3 rounded-xl border border-green-200 text-center text-sm font-medium">
          Thank you for your message. We will get back to you shortly!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your name</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your email</label>
            <input 
              type="email" 
              required
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Phone No.</label>
            <input 
              type="tel" 
              required
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Place</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Country</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Please choose an option</label>
            <select 
              required
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            >
              <option value="">—Please choose an option—</option>
              <option value="Ark Plant">Ark Plant</option>
              <option value="Bulk Milk Cooler">Bulk Milk Cooler</option>
              <option value="Butter Churner">Butter Churner</option>
              <option value="Bucket Milking Machine">Bucket Milking Machine</option>
              <option value="Cream Seprator (Electric operated)">Cream Seprator (Electric operated)</option>
              <option value="Cream Seprator (Hand operated)">Cream Seprator (Hand operated)</option>
              <option value="Curd Machine">Curd Machine</option>
              <option value="Dairy Plant">Dairy Plant</option>
              <option value="Dahi & Lassi Plant">Dahi & Lassi Plant</option>
              <option value="GEA Milking Parlors">GEA Milking Parlors</option>
              <option value="GEA Milking Machine">GEA Milking Machine</option>
              <option value="Khoya Machine (Diesel model)">Khoya Machine (Diesel model)</option>
              <option value="Khoya Machine (Gas model)">Khoya Machine (Gas model)</option>
              <option value="Mobile Milking Machine">Mobile Milking Machine</option>
              <option value="Milk Analyzer">Milk Analyzer</option>
              <option value="Milk Plant">Milk Plant</option>
              <option value="Paneer / Cheese Plant">Paneer / Cheese Plant</option>
              <option value="Pasteurizer Plant">Pasteurizer Plant</option>
              <option value="Paneer Cutter">Paneer Cutter</option>
              <option value="Paneer Press">Paneer Press</option>
              <option value="Pipeline Milking System">Pipeline Milking System</option>
              <option value="Soya Milk Plant">Soya Milk Plant</option>
              <option value="Soya Curd Machine">Soya Curd Machine</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your message (optional)</label>
            <textarea 
              rows={3}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 text-sm rounded-lg transition-colors flex justify-center items-center gap-2 mt-2 shadow-sm"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Submit Form'}
          </button>
        </form>
      )}
    </div>
  );
}
