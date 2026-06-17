import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, Package } from 'lucide-react';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import { connectDB } from '@/lib/db';
import { Metadata } from 'next';
import EquipmentSolutions from '@/components/shared/EquipmentSolutions';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const category = await Category.findOne({ where: { slug } });

  if (!category) return { title: 'Not Found' };

  return {
    title: `${category.name} | NK Dairy Equipments`,
    description: category.description || `Explore our ${category.name} machinery and equipment solutions.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();

  // Find the requested category
  const category = await Category.findOne({
    where: { slug }
  });

  if (!category) {
    notFound();
  }

  // Fetch its subcategories
  const subcategories = await Category.findAll({
    where: { parentId: category.id },
    order: [['name', 'ASC']]
  });

  // Fetch any products directly assigned to this category
  const products = await Product.findAll({
    where: { categoryId: category.id },
    order: [['createdAt', 'DESC']]
  });

  // Helper to parse product images
  const getProductImage = (product: any) => {
    if (!product.images) return '/logo.png';
    try {
      const parsed = JSON.parse(product.images);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : '/logo.png';
    } catch (e) {
      return '/logo.png';
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white text-[#323373]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-[#323373] font-semibold">{category.name}</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#323373]">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 text-lg leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* Equipment & Solutions Dynamic Section */}
      {category.equipmentSolutions && category.equipmentSolutions.enabled && (
        <EquipmentSolutions data={category.equipmentSolutions} />
      )}

      <div className="container mx-auto px-6 md:px-12 mt-16">
        {/* Subcategories Grid */}
        {subcategories.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 border-b border-gray-100 pb-4">
              <Package className="text-blue-600" /> Categories in {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategories.map(sub => (
                <Link
                  href={`/${sub.slug}`}
                  key={sub.id}
                  className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md rounded-xl p-6 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-[#323373] group-hover:text-blue-600 transition-colors mb-2">
                    {sub.name}
                  </h3>
                  {sub.description && (
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {sub.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight size={16} className="ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 border-b border-gray-100 pb-4">
              Products in {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map(product => (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.id}
                  className="group block"
                >
                  <div className="aspect-[4/3] bg-gray-50 rounded-xl mb-4 overflow-hidden border border-gray-100 relative">
                    <Image
                      src={getProductImage(product)}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-[#323373] group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  {product.capacity && (
                    <p className="text-sm text-gray-500 mt-1">Cap: {product.capacity}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {subcategories.length === 0 && products.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We are currently updating our inventory for {category.name}. Please check back later or contact us for more information.
            </p>
            <Link href="/contact" className="inline-block mt-6 px-6 py-3 bg-[#323373] hover:bg-blue-900 text-white rounded-lg font-medium transition-colors">
              Contact Sales
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
