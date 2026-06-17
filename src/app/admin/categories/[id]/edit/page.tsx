import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import CategoryForm from '@/components/admin/CategoryForm';
import { Category } from '@/models/Category';
import { connectDB } from '@/lib/db';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  const category = await Category.findByPk(id);

  if (!category) {
    notFound();
  }

  // Convert Sequelize model to plain object for client component
  const categoryData = category.get({ plain: true });

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
          <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
          <p className="text-gray-500 text-sm mt-1">Update the details for {categoryData.name}.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <CategoryForm initialData={categoryData} />
      </div>
    </div>
  );
}
