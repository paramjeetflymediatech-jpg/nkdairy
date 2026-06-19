import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, Package } from 'lucide-react';
import { Industry, Product, SeoMetadata } from '@/models';
import { connectDB } from '@/lib/db';
import { Metadata } from 'next';
import EquipmentSolutions from '@/components/shared/EquipmentSolutions';
import FAQAccordion from '@/components/home/FAQAccordion';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  
  const industry = await Industry.findOne({ where: { slug } });
  if (!industry) return { title: 'Industry Not Found' };

  // Check if there is an overriding SEO metadata entry in the db for this path
  const path = `/industries/${slug}`;
  const seo = await SeoMetadata.findOne({ where: { pagePath: path } });

  if (seo) {
    return {
      title: seo.metaTitle,
      description: seo.metaDescription,
      keywords: seo.metaKeywords ? seo.metaKeywords.split(',').map(k => k.trim()) : undefined,
      openGraph: {
        title: seo.metaTitle,
        description: seo.metaDescription || undefined,
        images: seo.ogImage ? [seo.ogImage] : undefined,
      }
    };
  }

  return {
    title: industry.metaTitle || `${industry.name} Processing Equipment & Solutions | NK Dairy`,
    description: industry.metaDescription || industry.description || `Explore our high-quality ${industry.name} processing plants, machinery, and turnkey solutions.`,
  };
}

export default async function IndustryDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  await connectDB();

  const industry = await Industry.findOne({
    where: { slug },
    include: [
      {
        model: Product,
        as: 'products',
        attributes: ['id', 'name', 'slug', 'images', 'capacity'],
        through: { attributes: [] }
      }
    ]
  });

  if (!industry) {
    notFound();
  }

  // Parse equipment solutions and FAQs from JSON
  const eqSolutions = typeof industry.equipmentSolutions === 'string' 
    ? JSON.parse(industry.equipmentSolutions) 
    : industry.equipmentSolutions;
    
  const faqs = typeof industry.faqs === 'string' 
    ? JSON.parse(industry.faqs) 
    : industry.faqs;

  // Helper to parse product images
  const getProductImage = (product: any) => {
    if (!product.images) return '/logo.png';
    try {
      const parsed = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : '/logo.png';
    } catch (e) {
      return '/logo.png';
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white text-[#323373] font-sans">
      <div className="container mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-400">Industries</span>
          <ChevronRight size={14} />
          <span className="text-[#323373] font-semibold">{industry.name}</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-4 font-bold text-xs uppercase tracking-widest">
            Business Segments
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#323373] tracking-tight leading-tight">
            {industry.name} Processing Solutions
          </h1>
          {industry.description && (
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light">
              {industry.description}
            </p>
          )}
        </div>
      </div>

      {/* 1. Equipment & Solutions Tabs */}
      {eqSolutions && eqSolutions.enabled && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          <EquipmentSolutions data={eqSolutions} />
        </div>
      )}

      {/* 2. Associated Products Grid */}
      <div className="container mx-auto px-6 md:px-12 mt-16">
        <h2 className="text-3xl font-bold mb-10 text-[#323373] tracking-tight flex items-center gap-3 border-b border-gray-100 pb-4">
          Related Equipment & Machinery
        </h2>
        
        {industry.products && industry.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {industry.products.map((product: any) => {
              const image = getProductImage(product);
              
              return (
                <div key={product.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-2xl shadow-sm transition-all duration-500 flex flex-col">
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center p-4">
                      {image ? (
                        <Image 
                          src={image} 
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="text-gray-400 font-mono text-xs opacity-50">
                          [ NO IMAGE ]
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                        NK DAIRY
                      </span>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 transition-colors text-[#323373] line-clamp-2 leading-tight">
                          {product.name}
                        </h3>
                      </Link>
                      {product.capacity && (
                        <p className="text-gray-500 text-xs mb-4 flex items-center gap-1 font-medium bg-slate-50 w-fit px-2.5 py-1 rounded-md">
                          Capacity: {product.capacity}
                        </p>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t border-gray-50">
                      <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#323373] group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                        Explore Specs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-1">No equipment mapped yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6 text-sm">
              We are updating our inventory for the {industry.name} segment. Please contact us for custom machinery.
            </p>
            <Link href="/contact" className="inline-block px-6 py-3 bg-[#323373] hover:bg-blue-900 text-white rounded-xl font-medium transition-colors text-sm shadow-md">
              Send Inquiry
            </Link>
          </div>
        )}
      </div>

      {/* 3. Frequently Asked Questions */}
      {faqs && faqs.length > 0 && (
        <div className="mt-20">
          <FAQAccordion
            title="Frequently Asked Questions"
            subtitle={`Common queries about our ${industry.name} processing plants`}
            data={faqs}
          />
        </div>
      )}
    </div>
  );
}
