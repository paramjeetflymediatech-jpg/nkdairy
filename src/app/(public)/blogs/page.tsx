import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { connectDB } from '@/lib/db';
import { Blog } from '@/models/Blog';
import { Metadata } from 'next';
import ContactSidebar from '@/components/shared/ContactSidebar';

export const metadata: Metadata = {
  title: 'Blog & Insights | NK Dairy Equipments',
  description: 'Read the latest news, updates, and insights from the dairy processing industry.',
};

export const dynamic = 'force-dynamic';

export default async function BlogsPage(
  props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  await connectDB();
  
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const limit = 6;
  const offset = (page - 1) * limit;

  const { rows: blogs, count: totalBlogs } = await Blog.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });

  const totalPages = Math.ceil(totalBlogs / limit);

  return (
    <div className="pt-32 pb-24  min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight drop-shadow-sm">
            Latest News & Insights
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Stay updated with the latest trends, technologies, and innovations in the dairy processing industry.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 relative">
          
          {/* Main Content Area (Blogs Grid) */}
          <div className="flex-1 w-full min-w-0 md:max-w-[calc(100%-320px)] lg:max-w-[calc(100%-400px)]">
            {blogs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-400">No blogs published yet.</h3>
                <p className="text-slate-500 mt-2">Check back soon for new content!</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {blogs.map((blog) => (
                    <article key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col group">
                      <Link href={`/blogs/${blog.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <Image 
                          src={blog.image || '/logo.png'} 
                          alt={blog.title}
                          fill
                          className={`duration-700 ${blog.image ? 'object-contain' : 'object-contain p-8 opacity-20'}`}
                        />
                      </Link>
                      
                      <div className="p-8 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4 uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-blue-500" />
                            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </div>
                        
                        <Link href={`/blogs/${blog.slug}`}>
                          <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {blog.title}
                          </h2>
                        </Link>
                        
                        <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                          {(blog.excerpt || blog.content || '').replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').substring(0, 150) + '...'}
                        </p>
                        
                        <Link href={`/blogs/${blog.slug}`} className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-xs hover:text-blue-800 transition-colors mt-auto">
                          Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-slate-200">
                    {page > 1 ? (
                      <Link href={`/blogs?page=${page - 1}`} className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                        Previous
                      </Link>
                    ) : (
                      <span className="px-6 py-2 rounded-full border border-slate-300 text-slate-400 font-medium cursor-not-allowed">
                        Previous
                      </span>
                    )}
                    
                    <span className="text-slate-600 font-medium">
                      Page {page} of {totalPages}
                    </span>

                    {page < totalPages ? (
                      <Link href={`/blogs?page=${page + 1}`} className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                        Next
                      </Link>
                    ) : (
                      <span className="px-6 py-2 rounded-full border border-slate-300 text-slate-400 font-medium cursor-not-allowed">
                        Next
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar Area (Right on Desktop, Sticky) */}
          <aside className="w-full md:w-[300px] lg:w-[360px] flex-shrink-0">
            <div className="sticky top-28">
              <ContactSidebar />
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}
