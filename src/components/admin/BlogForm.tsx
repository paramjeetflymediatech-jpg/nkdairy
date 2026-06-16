'use client';
import { useState } from 'react';
import { Loader2, ArrowLeft, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import CKEditor to avoid SSR issues
const CustomEditor = dynamic(() => {
  return import('@ckeditor/ckeditor5-react').then((mod) => {
    return import('@ckeditor/ckeditor5-build-classic').then((ClassicEditor) => {
      return function Editor(props: any) {
        return <mod.CKEditor editor={ClassicEditor.default} {...props} />;
      };
    });
  });
}, { ssr: false, loading: () => <div className="p-8 text-center text-gray-400 border rounded-lg">Loading Editor...</div> });

interface Category {
  id: number;
  name: string;
}

interface BlogFormProps {
  initialData?: any;
  categories: Category[];
  isEdit?: boolean;
}

export default function BlogForm({ initialData, categories, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    categoryId: initialData?.categoryId?.toString() || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    metaKeywords: initialData?.metaKeywords || '',
    ogTitle: initialData?.ogTitle || '',
    ogDescription: initialData?.ogDescription || '',
    ogImage: initialData?.ogImage || '',
    twitterTitle: initialData?.twitterTitle || '',
    twitterDescription: initialData?.twitterDescription || '',
    twitterImage: initialData?.twitterImage || '',
    headScripts: initialData?.headScripts || '',
    image: initialData?.image || ''
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData({
      ...formData,
      title: newTitle,
      slug: !isEdit ? generateSlug(newTitle) : formData.slug,
      metaTitle: !isEdit ? newTitle : formData.metaTitle
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploadingImage(true);
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const json = await res.json();

      if (res.ok) {
        setFormData(prev => ({ ...prev, image: json.url }));
      } else {
        alert(json.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Upload error', err);
      alert('Failed to upload image due to network error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const url = isEdit ? `/api/blogs/${initialData.id}` : '/api/blogs';
      const method = isEdit ? 'PUT' : 'POST';

      const payload: any = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        metaKeywords: formData.metaKeywords,
        ogTitle: formData.ogTitle,
        ogDescription: formData.ogDescription,
        ogImage: formData.ogImage,
        twitterTitle: formData.twitterTitle,
        twitterDescription: formData.twitterDescription,
        twitterImage: formData.twitterImage,
        headScripts: formData.headScripts,
        image: formData.image
      };

      if (formData.categoryId) {
        payload.categoryId = parseInt(formData.categoryId, 10);
      } else {
        payload.categoryId = null;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/blogs');
        router.refresh();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to save blog');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      setError('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/blogs" className="text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Blog Post' : 'Compose New Blog Post'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage your blog content and SEO data.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      <form id="blog-form" onSubmit={handleSubmit} className="space-y-8">

        {/* Main Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">Basic Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Post Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Benefits of Eating Paneer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
              <div className="flex items-center gap-4">
                {formData.image && (
                  <div className="w-16 h-16 rounded overflow-hidden border border-gray-200">
                    <img src={formData.image} alt="Featured" className="w-full h-full object-cover" />
                  </div>
                )}
                <label className="cursor-pointer bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700 relative">
                  {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                  <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">Content</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Description)</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Brief summary displayed on the blog list page..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Article Content *</label>
            <div className="border border-gray-300 rounded-lg overflow-hidden prose max-w-none">
              <CustomEditor
                data={formData.content}
                onChange={(event: any, editor: any) => {
                  const data = editor.getData();
                  setFormData({ ...formData, content: data });
                }}
                config={{
                  toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo']
                }}
              />
            </div>
          </div>
        </div>

        {/* SEO Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">Full SEO Configuration</h2>

          <div className="space-y-6">
            <h3 className="text-md font-medium text-gray-700">Standard Meta Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Defaults to post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                <input
                  type="text"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. dairy, processing, equipment"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Brief summary for search engines"
                />
              </div>
            </div>

            <h3 className="text-md font-medium text-gray-700 pt-4 border-t border-gray-100">Open Graph (Facebook / LinkedIn)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
                <input
                  type="text"
                  value={formData.ogTitle}
                  onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Social media share title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://.../image.jpg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
                <textarea
                  value={formData.ogDescription}
                  onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Social media share description"
                />
              </div>
            </div>

            <h3 className="text-md font-medium text-gray-700 pt-4 border-t border-gray-100">Advanced</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Head Scripts (e.g. JSON-LD Schema)</label>
              <textarea
                value={formData.headScripts}
                onChange={(e) => setFormData({ ...formData, headScripts: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                rows={4}
                placeholder="<script type='application/ld+json'>{...}</script>"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/blogs"
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-70 shadow-sm"
          >
            {saving && <Loader2 size={18} className="animate-spin" />}
            {isEdit ? 'Save Changes' : 'Publish Blog Post'}
          </button>
        </div>

      </form>
    </div>
  );
}
