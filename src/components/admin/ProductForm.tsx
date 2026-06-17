'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Image as ImageIcon, X, ChevronUp, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Swal from 'sweetalert2';

// Dynamically import CKEditor to avoid SSR issues
const CustomEditor = dynamic(() => {
  return import('@ckeditor/ckeditor5-react').then((mod) => {
    return import('@ckeditor/ckeditor5-build-classic').then((ClassicEditor) => {
      return function Editor(props: any) {
        return <mod.CKEditor editor={ClassicEditor.default} {...props} />;
      };
    });
  });
}, { ssr: false, loading: () => <div className="p-8 text-center text-gray-500 border rounded-lg">Loading Editor...</div> });

export default function ProductForm({ initialData = null, mode = 'create' }: { initialData?: any, mode?: 'create' | 'edit' }) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const parseEquipmentSolutions = (data: any) => {
    if (!data) return { enabled: false, title: '', subtitle: '', generalDescription: '', tabsHeader: '', tabs: [] };
    if (typeof data === 'object') return data;
    try {
      return JSON.parse(data);
    } catch (e) {
      return { enabled: false, title: '', subtitle: '', generalDescription: '', tabsHeader: '', tabs: [] };
    }
  };

  const parsePageSections = (data: any) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    try {
      return JSON.parse(data) || [];
    } catch (e) {
      return [];
    }
  };

  const parseFaqs = (data: any) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    try {
      return JSON.parse(data) || [];
    } catch (e) {
      return [];
    }
  };

  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    categoryId: initialData?.categoryId?.toString() || '',
    description: initialData?.description || '',
    heroSubtitle: initialData?.heroSubtitle || '',
    capacity: initialData?.capacity || '',
    images: initialData?.images ? (typeof initialData.images === 'string' ? JSON.parse(initialData.images) : initialData.images) : [],
    equipmentSolutions: parseEquipmentSolutions(initialData?.equipmentSolutions),
    pageSections: parsePageSections(initialData?.pageSections),
    faqs: parseFaqs(initialData?.faqs)
  });

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    parsePageSections(initialData?.pageSections).forEach((s: any) => {
      if (s.id) initial[s.id] = true;
    });
    return initial;
  });

  const [collapsedFaqs, setCollapsedFaqs] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    parseFaqs(initialData?.faqs).forEach((f: any) => {
      if (f.id) initial[f.id] = true;
    });
    return initial;
  });

  const toggleSection = (id: string) => setCollapsedSections(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleFaq = (id: string) => setCollapsedFaqs(prev => ({ ...prev, [id]: !prev[id] }));

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
      slug: mode === 'create' ? generateSlug(newName) : formData.slug
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form
      });
      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, images: [...formData.images, data.url] });
      } else {
        Swal.fire('Error', 'Image upload failed', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Error uploading image', 'error');
    } finally {
      setUploadingImage(false);
      // reset input
      e.target.value = '';
    }
  };

  const removeImage = async (indexToRemove: number) => {
    const result = await Swal.fire({
      title: 'Remove Image?',
      text: "Are you sure you want to remove this image?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    });
    
    if (result.isConfirmed) {
      setFormData({
        ...formData,
        images: formData.images.filter((_: any, i: number) => i !== indexToRemove)
      });
    }
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

  const handleSectionImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');

    setUploadingImage(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      if (res.ok) {
        const data = await res.json();
        const newSections = [...formData.pageSections];
        newSections[index].image = data.url;
        newSections[index].mediaType = isVideo ? 'video' : 'image';
        setFormData({ ...formData, pageSections: newSections });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleAddSection = () => {
    setFormData({
      ...formData,
      pageSections: [...formData.pageSections, { id: Date.now().toString(), title: '', content: '', image: '', mediaType: 'image', alignment: 'left', backgroundColor: 'white' }]
    });
  };

  const handleRemoveSection = async (index: number) => {
    const result = await Swal.fire({
      title: 'Remove Section?',
      text: "Are you sure you want to remove this dynamic section?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    });

    if (result.isConfirmed) {
      const newSections = [...formData.pageSections];
      newSections.splice(index, 1);
      setFormData({ ...formData, pageSections: newSections });
    }
  };

  const handleSectionChange = (index: number, field: string, value: string) => {
    const newSections = [...formData.pageSections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData({ ...formData, pageSections: newSections });
  };

  const handleAddFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { id: Date.now().toString(), question: '', answer: '' }]
    });
  };

  const handleRemoveFaq = async (index: number) => {
    const result = await Swal.fire({
      title: 'Remove FAQ?',
      text: "Are you sure you want to remove this FAQ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    });

    if (result.isConfirmed) {
      const newFaqs = [...formData.faqs];
      newFaqs.splice(index, 1);
      setFormData({ ...formData, faqs: newFaqs });
    }
  };

  const handleFaqChange = (index: number, field: string, value: string) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: newFaqs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const url = mode === 'create' ? '/api/products' : `/api/products/${formData.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      
      const payload = {
        name: formData.name,
        slug: formData.slug,
        categoryId: parseInt(formData.categoryId, 10),
        description: formData.description,
        capacity: formData.capacity,
        images: formData.images,
        equipmentSolutions: formData.equipmentSolutions,
        pageSections: formData.pageSections,
        faqs: formData.faqs
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: mode === 'create' ? 'Product Created!' : 'Product Updated!',
          text: 'Your changes have been saved successfully.',
          timer: 1500,
          showConfirmButton: false
        });
        router.push('/admin/products');
        router.refresh();
      } else {
        const errorData = await res.json();
        Swal.fire('Error!', errorData.error || 'Failed to save product', 'error');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      Swal.fire('Error!', 'An error occurred while saving', 'error');
    } finally {
      setSaving(false);
    }
  };

  const renderCategoryOptions = (cats: any[], prefix = '') => {
    let options: React.ReactNode[] = [];
    for (const cat of cats) {
      options.push(<option key={cat.id} value={cat.id}>{prefix}{cat.name}</option>);
      if (cat.subcategories && cat.subcategories.length > 0) {
        options = options.concat(renderCategoryOptions(cat.subcategories, prefix + '-- '));
      }
    }
    return options;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Info Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={handleNameChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-colors"
                placeholder="e.g. 500L Milk Pasteurizer"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug *</label>
              <input 
                type="text" 
                required
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              >
                <option value="">Select a category...</option>
                {renderCategoryOptions(categories)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity</label>
              <input 
                type="text" 
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-colors"
                placeholder="e.g. 500L - 1000L/hr"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Subtitle</label>
            <input 
              type="text" 
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({...formData, heroSubtitle: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-colors"
              placeholder="e.g. Designed For Food, Milk Processing..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description *</label>
            <div className="border border-gray-200 rounded-lg overflow-hidden prose max-w-none">
              <CustomEditor
                data={formData.description}
                onChange={(event: any, editor: any) => {
                  const data = editor.getData();
                  setFormData({...formData, description: data});
                }}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#323373]">Dynamic Page Sections (Zig-Zag Layout)</h3>
              <button 
                type="button" 
                onClick={handleAddSection}
                className="text-sm bg-[#323373] text-white hover:bg-blue-800 px-4 py-2 rounded-lg font-medium shadow-sm transition-all"
              >
                + Add Section
              </button>
            </div>

            <div className="space-y-6">
              {formData.pageSections.map((section: any, idx: number) => {
                const isCollapsed = collapsedSections[section.id];
                return (
                <div key={section.id} className="bg-white border border-gray-200 rounded-2xl relative shadow-sm overflow-hidden">
                  <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-b border-gray-100 cursor-pointer" onClick={() => toggleSection(section.id)}>
                    <h4 className="font-bold text-gray-700 flex items-center gap-2">
                      {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                      Section {idx + 1} {section.title ? `- ${section.title}` : ''}
                    </h4>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleRemoveSection(idx); }}
                      className="text-sm text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-all font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                  
                  {!isCollapsed && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Section Title</label>
                        <input 
                          type="text" 
                          value={section.title}
                          onChange={(e) => handleSectionChange(idx, 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                          placeholder="e.g. Pasteurizing Milk Machine"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Image Align</label>
                          <select 
                            value={section.alignment}
                            onChange={(e) => handleSectionChange(idx, 'alignment', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                          >
                            <option value="left">Image on Left</option>
                            <option value="right">Image on Right</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Background</label>
                          <select 
                            value={section.backgroundColor}
                            onChange={(e) => handleSectionChange(idx, 'backgroundColor', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                          >
                            <option value="white">White</option>
                            <option value="gray">Light Gray</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Section Content (HTML)</label>
                      <div className="border border-gray-200 rounded-lg overflow-hidden prose max-w-none">
                        <CustomEditor
                          data={section.content}
                          onChange={(event: any, editor: any) => {
                            const data = editor.getData();
                            handleSectionChange(idx, 'content', data);
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Section Media (Image or Video)</label>
                        <input 
                          type="file" 
                          accept="image/*,video/*"
                          onChange={(e) => handleSectionImageUpload(idx, e)}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-200 rounded-lg"
                        />
                      </div>
                      {section.image && (
                        <div className="w-24 h-24 relative rounded-lg border border-gray-200 overflow-hidden bg-gray-50 shrink-0">
                          {section.mediaType === 'video' ? (
                            <video src={section.image} className="w-full h-full object-cover" muted autoPlay loop />
                          ) : (
                            <img src={section.image} alt="Section" className="w-full h-full object-contain" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  )}
                </div>
              )})}
              {formData.pageSections.length === 0 && (
                <div className="text-sm text-gray-500 italic text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                  No dynamic sections added. The default layout will be used.
                </div>
              )}
            </div>
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
                  <div className="border border-gray-200 rounded-lg overflow-hidden prose max-w-none">
                    <CustomEditor
                      data={formData.equipmentSolutions.generalDescription}
                      onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        setFormData({...formData, equipmentSolutions: {...formData.equipmentSolutions, generalDescription: data}});
                      }}
                    />
                  </div>
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
                          <div className="border border-gray-200 rounded-lg overflow-hidden prose max-w-none bg-white">
                            <CustomEditor
                              data={tab.content}
                              onChange={(event: any, editor: any) => {
                                const data = editor.getData();
                                handleTabChange(idx, 'content', data);
                              }}
                            />
                          </div>
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
        </div>

        {/* Sidebar Image Upload Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
            <label className="block text-sm font-semibold text-gray-700 mb-4">Product Images</label>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {formData.images.map((img: string, i: number) => (
                <div key={i} className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
                  <Image src={img} alt={`Preview ${i}`} fill className="object-cover" />
                  <button 
                    type="button" 
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 transition-colors bg-white cursor-pointer min-h-[150px]">
              {uploadingImage ? (
                <div className="flex flex-col items-center text-blue-500">
                  <Loader2 className="animate-spin mb-2" size={24} />
                  <span className="text-sm font-medium">Uploading...</span>
                </div>
              ) : (
                <>
                  <ImageIcon className="text-gray-400 mb-3" size={32} />
                  <span className="text-sm text-gray-600 font-medium">Click to upload image</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </>
              )}
            </div>
        </div>
      </div>

      </div>

      {/* Dynamic FAQs Section */}
      <div className="border-t border-gray-100 pt-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#323373]">Frequently Asked Questions (FAQs)</h3>
          <button 
            type="button" 
            onClick={handleAddFaq}
            className="text-sm bg-[#323373] text-white hover:bg-blue-800 px-4 py-2 rounded-lg font-medium shadow-sm transition-all"
          >
            + Add FAQ
          </button>
        </div>

        <div className="space-y-6">
          {formData.faqs.map((faq: any, idx: number) => {
            const isCollapsed = collapsedFaqs[faq.id];
            return (
            <div key={faq.id} className="relative bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(faq.id)}>
                <span className="font-semibold text-gray-700 flex items-center gap-2">
                  {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                  FAQ Item {idx + 1} {faq.question ? `- ${faq.question}` : ''}
                </span>
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemoveFaq(idx); }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                >
                  <X size={14} /> Remove
                </button>
              </div>
              {!isCollapsed && (
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Question</label>
                  <input 
                    type="text" 
                    value={faq.question}
                    onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. What is the warranty period?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Answer</label>
                  <textarea 
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide the answer here..."
                    rows={3}
                  />
                </div>
              </div>
              )}
            </div>
          )})}
          {formData.faqs.length === 0 && (
            <div className="text-sm text-gray-500 italic text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              No FAQs added yet. Click "+ Add FAQ" to start.
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6 flex items-center justify-end gap-4 mt-6">
        <button 
          type="button" 
          onClick={() => router.push('/admin/products')}
          className="px-6 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={saving}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 shadow-lg shadow-blue-500/30"
        >
          {saving && <Loader2 size={18} className="animate-spin" />}
          {mode === 'create' ? 'Publish Product' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
