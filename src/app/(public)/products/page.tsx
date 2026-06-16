import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Filter, Package } from 'lucide-react';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  await connectDB();

  // Fetch all products with their categories
  const products = await Product.findAll({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name', 'slug'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

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
    <div className="pt-32 pb-20 min-h-screen bg-white text-[#323373]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
            <p className="text-gray-600 max-w-2xl text-lg">
              Explore our comprehensive range of industrial dairy processing equipment, designed for efficiency, durability, and maximum output.
            </p>
          </div>
          <button className="mt-6 md:mt-0 flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold shadow-sm text-slate-700">
            <Filter size={18} /> Filter Categories
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No products available.</h3>
            <p className="text-gray-500">We are currently updating our inventory. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const image = getProductImage(product);
              
              return (
                <div key={product.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl shadow-sm transition-all duration-300 flex flex-col">
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center">
                      {image ? (
                        <Image 
                          src={image} 
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="text-gray-400 font-mono text-xs opacity-50">
                          [ NO IMAGE AVAILABLE ]
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 block">
                      {(product as any).category?.name || 'Uncategorized'}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors text-[#323373] line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {product.capacity && (
                      <p className="text-gray-500 text-sm mb-6 flex items-center gap-2 font-medium bg-slate-50 inline-block px-3 py-1.5 rounded-md w-fit">
                        Capacity: {product.capacity}
                      </p>
                    )}
                    
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#323373] group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                        View Specifications <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
