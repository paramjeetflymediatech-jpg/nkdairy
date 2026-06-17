import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import CategoryForm from '@/components/admin/CategoryForm';

export default async function NewCategoryPage({ searchParams }: { searchParams: Promise<{ parentId?: string }> }) {
  const params = await searchParams;
  const parentId = params.parentId || null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/categories"
          className="p-2 text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {parentId ? 'Add Subcategory' : 'Add Root Category'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Fill out the details below to create a new category.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <CategoryForm parentId={parentId} />
      </div>
    </div>
  );
}
