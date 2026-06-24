'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, X, Layers, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

interface IndustryFormProps {
  initialData?: any;
}

export default function IndustryForm({ initialData }: IndustryFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const isEditMode = !!initialData;

  const parseJson = (data: any, fallback: any) => {
    if (!data) return fallback;
    if (typeof data === 'object') return data;
    try {
      return JSON.parse(data);
    } catch (e) {
      return fallback;
    }
  };

  const defaultEquipmentSolutions = {
    enabled: false,
    title: '',
    subtitle: '',
    generalDescription: '',
    tabsHeader: '',
    tabs: []
  };

  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    image: initialData?.image || '/segments/dairy.png',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    equipmentSolutions: parseJson(initialData?.equipmentSolutions, defaultEquipmentSolutions),
    faqs: parseJson(initialData?.faqs, []),
  });

  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  // Predefined segments list for easy drop-down select
  const segmentImages = [
    { name: 'Dairy', value: '/segments/dairy.png' },
    // { name: 'Fruits & Vegetables', value: '/segments/fruits.png' },
    { name: 'Food', value: '/segments/food.png' },
    { name: 'Cosmetics', value: '/segments/cosmetics.png' },
    { name: 'Beverages', value: '/segments/beverages.png' },
    { name: 'Allied Industry', value: '/segments/allied.png' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?limit=100');
        if (res.ok) {
          const json = await res.json();
          setProducts(json.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (initialData?.products) {
      setSelectedProductIds(initialData.products.map((p: any) => p.id));
    }
  }, [initialData]);

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

  const handleRemoveTab = async (index: number) => {
    const result = await Swal.fire({
      title: 'Remove Tab?',
      text: "Are you sure you want to remove this tab?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    });

    if (result.isConfirmed) {
      const newTabs = [...formData.equipmentSolutions.tabs];
      newTabs.splice(index, 1);
      setFormData({
        ...formData,
        equipmentSolutions: { ...formData.equipmentSolutions, tabs: newTabs }
      });
    }
  };

  const handleTabChange = (index: number, field: string, value: string) => {
    const newTabs = [...formData.equipmentSolutions.tabs];
    newTabs[index] = { ...newTabs[index], [field]: value };
    setFormData({
      ...formData,
      equipmentSolutions: { ...formData.equipmentSolutions, tabs: newTabs }
    });
  };

  const handleAddFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: '', answer: '' }]
    });
  };

  const handleRemoveFaq = (index: number) => {
    const newFaqs = [...formData.faqs];
    newFaqs.splice(index, 1);
    setFormData({ ...formData, faqs: newFaqs });
  };

  const handleFaqChange = (index: number, field: string, value: string) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: newFaqs });
  };

  const handleProductToggle = (productId: number) => {
    setSelectedProductIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const url = !isEditMode ? '/api/industries' : `/api/industries/${formData.id}`;
      const method = !isEditMode ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          image: formData.image,
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription,
          equipmentSolutions: formData.equipmentSolutions,
          faqs: formData.faqs,
          productIds: selectedProductIds
        }),
      });
      
      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: !isEditMode ? 'Industry Created!' : 'Industry Updated!',
          text: 'Your changes have been saved successfully.',
          timer: 1500,
          showConfirmButton: false
        });
        router.push('/admin/industries');
        router.refresh();
      } else {
        const errorData = await res.json();
        Swal.fire('Error!', errorData.error || 'Failed to save industry', 'error');
      }
    } catch (error) {
      console.error('Error saving industry:', error);
      Swal.fire('Error!', 'An error occurred while saving', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-5xl bg-white rounded-2xl border border-gray-100 shadow-sm">
      
      {/* Name and Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Industry Name *</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={handleNameChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[#323373] font-semibold"
            placeholder="e.g. Dairy"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug *</label>
          <input 
            type="text" 
            required
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 transition-all text-gray-700"
            placeholder="e.g. dairy-processing-equipment-manufacturers"
          />
          <p className="text-xs text-gray-500 mt-2">This will map to public URL: /industries/[slug]</p>
        </div>
      </div>

      {/* Description and Image selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Industry Description (Intro)</label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            placeholder="Introduce this industry segment..."
            rows={4}
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Industry Icon / Image Selection</label>
          <select 
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all mb-4 text-gray-800 font-medium"
          >
            {segmentImages.map((img) => (
              <option key={img.value} value={img.value}>{img.name} ({img.value})</option>
            ))}
            <option value="">Custom Path (Enter Below)</option>
          </select>

          {formData.image === '' && (
            <input 
              type="text" 
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="e.g. /images/custom-icon.png"
            />
          )}

          {/* Simple Image preview box */}
          {formData.image && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl mt-2 w-fit">
              <span className="text-xs text-gray-500">Preview:</span>
              <img src={formData.image} alt="Icon Preview" className="w-8 h-8 object-contain bg-white rounded border border-slate-100 p-0.5" />
            </div>
          )}
        </div>
      </div>

      {/* Associated Products Checkboxes */}
      <div className="pt-6 border-t border-gray-100">
        <h3 className="text-lg font-bold text-[#323373] mb-4">Associate Products with this Industry</h3>
        {loadingProducts ? (
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-sm text-gray-500 italic">No products available in database. Add products first.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50/50 p-6 rounded-2xl border border-gray-100 shadow-sm max-h-60 overflow-y-auto">
            {products.map((prod) => {
              const isChecked = selectedProductIds.includes(prod.id);
              return (
                <label 
                  key={prod.id} 
                  className={`flex items-center gap-3 cursor-pointer p-2.5 rounded-lg border transition-all ${isChecked ? 'bg-blue-50/50 border-blue-200 text-blue-700 font-semibold' : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'}`}
                >
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => handleProductToggle(prod.id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm truncate" title={prod.name}>{prod.name}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Equipment & Solutions tabs section (matches Category editing) */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#323373]">Equipment & Solutions Tabs (HTML Detail Content)</h3>
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
                  placeholder="e.g. Dairy Processing Solutions"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Section Subtitle</label>
                <input 
                  type="text" 
                  value={formData.equipmentSolutions.subtitle}
                  onChange={(e) => setFormData({...formData, equipmentSolutions: {...formData.equipmentSolutions, subtitle: e.target.value}})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="e.g. Technologically Advanced Equipment"
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
                placeholder="e.g. Equipment & Systems We Offer:"
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
                        placeholder="e.g. Milk Pasteurization"
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

      {/* FAQs Section */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#323373]">Industry FAQs</h3>
          <button 
            type="button" 
            onClick={handleAddFaq}
            className="text-sm bg-white border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-300 px-4 py-2 rounded-lg font-medium shadow-sm transition-all"
          >
            + Add FAQ
          </button>
        </div>

        <div className="space-y-4">
          {formData.faqs.map((faq: any, idx: number) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-gray-200 relative group shadow-sm flex flex-col gap-3">
              <button 
                type="button"
                onClick={() => handleRemoveFaq(idx)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600 bg-red-50 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                title="Remove FAQ"
              >
                <Trash2 size={16} />
              </button>
              <div className="pr-10">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Question</label>
                <input 
                  type="text" 
                  value={faq.question}
                  onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                  placeholder="FAQ Question..."
                />
              </div>
              <div className="pr-10">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Answer</label>
                <textarea 
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500 text-sm text-gray-600"
                  placeholder="FAQ Answer..."
                  rows={2}
                />
              </div>
            </div>
          ))}
          {formData.faqs.length === 0 && (
            <div className="text-sm text-gray-500 italic text-center py-6 bg-slate-50/50 rounded-xl border border-dashed border-gray-200">
              No FAQs added yet.
            </div>
          )}
        </div>
      </div>

      {/* SEO Settings */}
      <div className="pt-6 border-t border-gray-100 space-y-4">
        <h3 className="text-lg font-bold text-[#323373]">SEO Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Title</label>
            <input 
              type="text" 
              value={formData.metaTitle}
              onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="e.g. Dairy Processing Equipment Manufacturers | NK Dairy"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
            <textarea 
              value={formData.metaDescription}
              onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="Short SEO snippet..."
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
        <Link 
          href="/admin/industries"
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
          {isEditMode ? 'Save Industry Changes' : 'Create Industry'}
        </button>
      </div>
    </form>
  );
}
