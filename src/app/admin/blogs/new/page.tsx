import BlogForm from '@/components/admin/BlogForm';
import { connectDB } from '@/lib/db';
import { BlogCategory } from '@/models/BlogCategory';

export const dynamic = 'force-dynamic';

export default async function NewBlogPage() {
  await connectDB();
  const categories = await BlogCategory.findAll({ order: [['name', 'ASC']] });
  
  return (
    <div className="p-6">
      <BlogForm categories={JSON.parse(JSON.stringify(categories))} />
    </div>
  );
}
