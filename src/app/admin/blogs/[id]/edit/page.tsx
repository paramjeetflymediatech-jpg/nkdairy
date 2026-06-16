import BlogForm from '@/components/admin/BlogForm';
import { connectDB } from '@/lib/db';
import { Blog } from '@/models/Blog';
import { BlogCategory } from '@/models/BlogCategory';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await connectDB();
  const blog = await Blog.findByPk(id);
  const categories = await BlogCategory.findAll({ order: [['name', 'ASC']] });
  
  if (!blog) {
    notFound();
  }
  
  return (
    <div className="p-6">
      <BlogForm 
        initialData={JSON.parse(JSON.stringify(blog))} 
        categories={JSON.parse(JSON.stringify(categories))}
        isEdit={true}
      />
    </div>
  );
}
