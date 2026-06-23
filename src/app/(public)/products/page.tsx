import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Package } from 'lucide-react';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';
import { getSeoMetadata } from '@/lib/seo';

import ProductFilter from '@/components/public/ProductFilter';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return await getSeoMetadata('/products');
}

export default async function ProductsPage(
  props: { searchParams: Promise<{ category?: string, page?: string }> }
) {
  const searchParams = await props.searchParams;
  await connectDB();

  // Fetch categories for the filter
  const categories = await Category.findAll({
    attributes: ['id', 'name', 'slug'],
    order: [['name', 'ASC']],
  });

  // Find selected category ID if a slug is provided
  let categoryId = null;
  if (searchParams.category) {
    const selectedCat = categories.find((c) => c.slug === searchParams.category);
    if (selectedCat) categoryId = selectedCat.id;
  }

  // Pagination logic
  const LIMIT = 12;
  const currentPage = parseInt(searchParams.page || '1') || 1;
  const offset = (currentPage - 1) * LIMIT;

  // Fetch all products with their categories, filtered if necessary
  const whereClause = categoryId ? { categoryId } : {};
  const { rows: products, count } = await Product.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name', 'slug'],
      },
    ],
    order: [['createdAt', 'DESC']],
    limit: LIMIT,
    offset: offset,
  });

  const totalPages = Math.ceil(count / LIMIT);

  // Helper to parse product images
  const getProductImage = (product: any) => {
    if (!product.images) return null;
    try {
      const parsed = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : null;
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* ── Premium Hero Section ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0d1b2e] text-white overflow-hidden">
        {/* Ambient glowing background orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none z-0">
          <div className="absolute -top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#00b4d8] blur-[100px]"></div>
          <div className="absolute -bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#0077b6] blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00b4d8] animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest uppercase text-white">Our Catalog</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                Discover Advanced <span className="text-[#00b4d8]">Dairy Tech</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium">
                Explore our comprehensive range of industrial dairy processing equipment, engineered for precision, durability, and maximum output.
              </p>
            </div>
            
            {/* Filter Component in Header */}
            <div className="w-full lg:w-auto relative z-50">
              <ProductFilter categories={categories.map(c => c.toJSON())} />
            </div>
          </div>
        </div>

        {/* Diagonal cut overlay at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px]">
          <svg className="relative block w-full h-[50px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 120 0 0 1200 120z" className="fill-slate-50"></path>
          </svg>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="container mx-auto px-6 md:px-12 py-20 relative z-20">
        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,119,182,0.05)]">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0d1b2e] mb-3 tracking-tight">No products found</h3>
            <p className="text-slate-500 font-medium text-lg">We couldn't find any products in this category right now. Try checking another category!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => {
              const image = getProductImage(product);
              
              return (
                <div key={product.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,119,182,0.08)] hover:shadow-[0_20px_60px_rgba(0,119,182,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col border border-gray-50">
                  
                  {/* Image Container */}
                  <Link href={`/products/${product.slug}`} className="block relative">
                    <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden flex items-center justify-center p-6">
                      {image ? (
                        <Image 
                          src={image} 
                          alt={product.name}
                          fill
                          className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="text-slate-400 font-mono text-xs opacity-50 flex flex-col items-center gap-2">
                          <Package size={32} />
                          <span>NO IMAGE</span>
                        </div>
                      )}
                      {/* Subtle hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2e]/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </Link>
                  
                  {/* Content Container */}
                  <div className="p-8 flex-1 flex flex-col bg-white">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-cyan-50 text-[#0077b6] text-xs font-bold uppercase tracking-widest rounded-full mb-3">
                        {(product as any).category?.name || 'Uncategorized'}
                      </span>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-xl font-extrabold group-hover:text-[#0077b6] transition-colors text-[#0d1b2e] line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    
                    {product.capacity && (
                      <p className="text-slate-500 text-sm mb-6 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]"></span>
                        Capacity: {product.capacity}
                      </p>
                    )}
                    
                    <div className="mt-auto pt-6 border-t border-gray-100">
                      <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#0d1b2e] group-hover:text-[#00b4d8] transition-colors uppercase tracking-widest">
                        View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Pagination Controls ── */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-2">
            {/* Previous Button */}
            {currentPage > 1 ? (
              <Link 
                href={`/products?${new URLSearchParams({ ...(searchParams.category ? { category: searchParams.category } : {}), page: (currentPage - 1).toString() }).toString()}`}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-[#0077b6] transition-colors shadow-sm"
              >
                Previous
              </Link>
            ) : (
              <span className="px-5 py-2.5 rounded-full border border-gray-100 text-gray-400 font-bold bg-gray-50 cursor-not-allowed">
                Previous
              </span>
            )}

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = pageNum === currentPage;
                return (
                  <Link
                    key={pageNum}
                    href={`/products?${new URLSearchParams({ ...(searchParams.category ? { category: searchParams.category } : {}), page: pageNum.toString() }).toString()}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      isCurrent 
                        ? 'bg-[#0077b6] text-white shadow-md' 
                        : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50 hover:text-[#0077b6] shadow-sm'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
              <Link 
                href={`/products?${new URLSearchParams({ ...(searchParams.category ? { category: searchParams.category } : {}), page: (currentPage + 1).toString() }).toString()}`}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-[#0077b6] transition-colors shadow-sm"
              >
                Next
              </Link>
            ) : (
              <span className="px-5 py-2.5 rounded-full border border-gray-100 text-gray-400 font-bold bg-gray-50 cursor-not-allowed">
                Next
              </span>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
