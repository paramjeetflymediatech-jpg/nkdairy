'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Image as ImageIcon, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

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
  
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    categoryId: initialData?.categoryId?.toString() || '',
    description: initialData?.description || '',
    capacity: initialData?.capacity || '',
    images: initialData?.images ? (typeof initialData.images === 'string' ? JSON.parse(initialData.images) : initialData.images) : []
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
        alert('Image upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    } finally {
      setUploadingImage(false);
      // reset input
      e.target.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_: any, i: number) => i !== indexToRemove)
    });
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
        images: formData.images
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('An error occurred while saving');
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

      <div className="border-t border-gray-100 pt-6 flex items-center justify-end gap-4">
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
