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
    <div className="min-h-screen bg-white font-sans">

      {/* 1. Dynamic Hero Section */}
      <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#0d1b2e]">
        {/* Background Image or Gradient Pattern */}
        {industry.image ? (
          <>
            <div className="absolute inset-0 z-0">
              <Image src={industry.image} alt={industry.name} fill className="object-cover opacity-30" priority />
            </div>
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0d1b2e] via-[#0d1b2e]/80 to-transparent"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0d1b2e] via-[#112a46] to-[#00b4d8]/20"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00b4d8]/10 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none"></div>
          </>
        )}

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-8 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="opacity-50" />
            <span className="opacity-70">Industries</span>
            <ChevronRight size={14} className="opacity-50" />
            <span className="text-white font-semibold">{industry.name}</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00b4d8]/10 border border-[#00b4d8]/30 text-[#00b4d8] mb-6 font-bold text-xs uppercase tracking-widest backdrop-blur-sm">
              Business Segments
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 text-white tracking-tight leading-tight drop-shadow-lg">
              {industry.name} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] to-blue-400">Processing Solutions</span>
            </h1>
            {industry.description && (
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light max-w-3xl border-l-2 border-[#00b4d8] pl-6">
                {industry.description}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Curve/Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-white" />
          </svg>
        </div>
      </div>

      {/* 2. Equipment & Solutions Tabs */}
      {eqSolutions && eqSolutions.enabled && (
        <div className="bg-white py-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-32 opacity-50 z-0 hidden lg:block"></div>
          <div className="relative z-10">
            <EquipmentSolutions data={eqSolutions} />
          </div>
        </div>
      )}

      {/* 3. Associated Products Grid */}
      <div className="container mx-auto px-6 md:px-12 py-24 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1b2e] mb-4 tracking-tight">
            Related Equipment & <span className="text-[#00b4d8]">Machinery</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
            Explore our state-of-the-art machinery meticulously engineered for the {industry.name} sector.
          </p>
        </div>

        {industry.products && industry.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {industry.products.map((product: any) => {
              const image = getProductImage(product);

              return (
                <div key={product.id} className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:border-[#00b4d8]/30 shadow-[0_4px_20px_rgba(13,27,46,0.04)] hover:shadow-[0_20px_40px_rgba(0,180,216,0.12)] transition-all duration-500 flex flex-col -translate-y-0 hover:-translate-y-2">
                  <Link href={`/products/${product.slug}`} className="block relative">
                    <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden flex items-center justify-center transition-colors">
                      {image ? (
                        <Image
                          src={image}
                          alt={product.name}
                          fill
                          className="object-contain transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="text-gray-400 font-mono text-xs opacity-50">
                          [ NO IMAGE ]
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-8 flex-1 flex flex-col justify-between relative bg-white">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#00b4d8] uppercase tracking-widest mb-3 block">
                        NK DAIRY
                      </span>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-xl font-bold mb-4 group-hover:text-[#0077b6] transition-colors text-[#0d1b2e] line-clamp-2 leading-tight">
                          {product.name}
                        </h3>
                      </Link>
                      {product.capacity && (
                        <div className="inline-flex items-center gap-1.5 font-medium bg-slate-100/80 text-slate-600 px-3 py-1.5 rounded-lg text-xs border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]"></span>
                          Capacity: {product.capacity}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-100">
                      <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#0d1b2e] group-hover:text-[#0077b6] transition-colors uppercase tracking-wider">
                        Explore Specs <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50/80 rounded-[2rem] border border-gray-200 border-dashed backdrop-blur-sm">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
              <Package size={32} className="text-[#00b4d8]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0d1b2e] mb-2">No equipment mapped yet</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8 text-base">
              We are actively updating our inventory for the {industry.name} segment. Please contact our engineering team for custom machinery solutions.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0d1b2e] hover:bg-[#0077b6] text-white rounded-full font-bold transition-colors text-sm shadow-lg shadow-[#0d1b2e]/20 hover:shadow-[#0077b6]/30">
              Send Inquiry <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* 4. Frequently Asked Questions */}
      {faqs && faqs.length > 0 && (
        <div className="bg-slate-50 border-t border-gray-100 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b4d8]/5 rounded-full blur-3xl pointer-events-none"></div>
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
