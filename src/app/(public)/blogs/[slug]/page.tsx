import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { connectDB } from '@/lib/db';
import { Blog } from '@/models/Blog';
import { Metadata } from 'next';
import ContactSidebar from '@/components/shared/ContactSidebar';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ where: { slug } });
  
  if (!blog) return { title: 'Not Found' };
  
  return {
    title: blog.metaTitle || `${blog.title} | NK Dairy Equipments`,
    description: blog.metaDescription || blog.excerpt || `Read ${blog.title} on NK Dairy Equipments blog.`,
    keywords: blog.metaKeywords ? blog.metaKeywords.split(',').map(k => k.trim()) : undefined,
    openGraph: {
      title: blog.ogTitle || blog.metaTitle || blog.title,
      description: blog.ogDescription || blog.metaDescription || blog.excerpt || '',
      images: blog.ogImage || blog.image ? [{ url: blog.ogImage || blog.image || '' }] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.twitterTitle || blog.ogTitle || blog.metaTitle || blog.title,
      description: blog.twitterDescription || blog.ogDescription || blog.metaDescription || blog.excerpt || '',
      images: blog.twitterImage || blog.ogImage || blog.image ? [blog.twitterImage || blog.ogImage || blog.image || ''] : undefined,
    }
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  
  const blog = await Blog.findOne({ 
    where: { slug }
  });

  if (!blog) {
    notFound();
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <article className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-8 pt-4">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-semibold truncate max-w-[200px] md:max-w-[400px]">{blog.title}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 relative">
          
          {/* Main Content Area (Left on Desktop) */}
          <div className="flex-1 w-full min-w-0 md:max-w-[calc(100%-320px)] lg:max-w-[calc(100%-400px)]">
            
            {/* Featured Image */}
            {blog.image && (
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-auto object-contain rounded-2xl overflow-hidden mb-8 shadow-sm border border-slate-100 bg-slate-50"
              />
            )}

            {/* Post Header */}
            <div className="mb-8 border-b border-slate-100 pb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                  <Calendar size={16} className="text-blue-600" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Post Prose */}
            <div 
              className="prose prose-lg md:prose-xl prose-slate max-w-none overflow-hidden
                prose-headings:font-bold prose-headings:text-slate-900 
                prose-p:text-slate-600 prose-p:leading-relaxed 
                prose-a:text-blue-600 prose-a:font-semibold hover:prose-a:text-blue-700
                prose-img:rounded-2xl prose-img:shadow-md
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-slate-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Back to blogs */}
            <div className="mt-16 pt-8 border-t border-slate-100">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">
                <ArrowLeft size={16} /> Read More Articles
              </Link>
            </div>
          </div>

          {/* Sidebar Area (Right on Desktop, Sticky) */}
          <aside className="w-full md:w-[300px] lg:w-[360px] flex-shrink-0">
            <div className="sticky top-28">
              <ContactSidebar />
            </div>
          </aside>
          
        </div>
      </div>
      
      {/* Inject Custom SEO Scripts (like JSON-LD) */}
      {blog.headScripts && (
        <div dangerouslySetInnerHTML={{ __html: blog.headScripts }} />
      )}
    </article>
  );
}
