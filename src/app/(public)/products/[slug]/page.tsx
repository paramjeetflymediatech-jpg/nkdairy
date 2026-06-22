import { ArrowLeft, CheckCircle, Download, FileText } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Product } from '@/models/Product';
import { connectDB } from '@/lib/db';
import ProductSchema from '@/components/seo/ProductSchema';
import EquipmentSolutions from '@/components/shared/EquipmentSolutions';
import FAQAccordion from '@/components/home/FAQAccordion';
import { Metadata } from 'next';
import { SeoMetadata } from '@/models/SeoMetadata';
import ProductMediaViewer from '@/components/shared/ProductMediaViewer';
import ProductGallery from '@/components/shared/ProductGallery';
import ZigZagContent from '@/components/shared/ZigZagContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const product = await Product.findOne({ where: { slug } });

  if (!product) return { title: 'Product Not Found' };

  const path = `/products/${slug}`;
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
    title: product.metaTitle || `${product.name} | NK Dairy Equipments`,
    description: product.metaDescription || product.description?.substring(0, 160) || `Learn more about our ${product.name} industrial machinery.`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  await connectDB();
  const product = await Product.findOne({ where: { slug } });

  if (!product) {
    notFound();
  }

  const productName = product.name;

  let imageUrl = null;
  let allImages: string[] = [];
  if (product.images) {
    try {
      const parsed = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      if (Array.isArray(parsed) && parsed.length > 0) {
        imageUrl = parsed[0];
        allImages = parsed;
      }
    } catch (e) { }
  }

  const getEquipmentSolutions = (prod: any) => {
    if (!prod.equipmentSolutions) return null;
    if (typeof prod.equipmentSolutions === 'object') return prod.equipmentSolutions;
    try {
      return JSON.parse(prod.equipmentSolutions);
    } catch (e) {
      return null;
    }
  };

  const getPageSections = (prod: any) => {
    if (!prod.pageSections) return [];
    if (Array.isArray(prod.pageSections)) return prod.pageSections;
    try {
      return JSON.parse(prod.pageSections) || [];
    } catch (e) {
      return [];
    }
  };

  const getFaqs = (prod: any) => {
    if (!prod.faqs) return [];
    if (Array.isArray(prod.faqs)) return prod.faqs;
    try {
      return JSON.parse(prod.faqs) || [];
    } catch (e) {
      return [];
    }
  };

  const eqSolutions = getEquipmentSolutions(product);
  const pageSections = getPageSections(product);
  const faqs = getFaqs(product);

  return (
    <div className="bg-white">
      <ProductSchema product={product} />

      {/* 1. Neologic Style Hero Banner */}
      <div className="pt-32 pb-20 bg-[#323373] relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Link href="/products" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Back to Products
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-md">
                {productName}
              </h1>
              <p className="text-white/90 text-lg md:text-xl font-medium max-w-xl">
                {product.heroSubtitle || 'Designed For Food, Milk Processing, Curd, Yoghurt, & Ice-Cream Processing Plants'}
              </p>
            </div>
            <div className="w-full">
              <ProductMediaViewer
                imageUrl={imageUrl}
                modelUrl={product.model3d || null}
                productName={product.name}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dynamic Zig-Zag Sections */}
      {pageSections && pageSections.length > 0 ? (
        <div className="flex flex-col">
          {pageSections.map((section: any, idx: number) => {
            const isLeft = section.alignment === 'left';
            const bgClass = section.backgroundColor === 'gray' ? 'bg-gray-50' : 'bg-white';

            return (
              <div key={section.id || idx} className={`py-20 ${bgClass}`}>
                <div className="container mx-auto px-6 md:px-12">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isLeft ? '' : 'lg:flex-row-reverse'}`}>

                    {/* Image/Video Column */}
                    <div className={`${isLeft ? 'lg:order-1' : 'lg:order-2'} relative h-[400px]`}>
                      {section.image ? (
                        section.mediaType === 'video' ? (
                          <video
                            src={section.image}
                            className="object-contain w-full h-full"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <img src={section.image} alt={section.title || 'Section Image'} className="object-contain w-full h-full" />
                        )
                      ) : (
                        <div className="w-full h-full bg-transparent flex items-center justify-center text-gray-400">Media Placeholder</div>
                      )}
                    </div>

                    {/* Text Column */}
                    <div className={`${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                      {section.title && (
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#323373]">{section.title}</h2>
                      )}
                      {section.content && (
                        <div
                          className={`max-w-none text-gray-600 ${section.content.includes('style=') ? '' : 'prose prose-headings:text-[#323373] prose-li:marker:text-[#f3b216] prose-a:text-[#f3b216]'}`}
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Fallback for products without dynamic sections */
        <div className="py-20 container mx-auto px-6 md:px-12">
          {product.description ? (
            <ZigZagContent html={product.description} />
          ) : (
            <p className="text-gray-600 text-lg text-center">Detailed description coming soon.</p>
          )}
        </div>
      )}

      {/* Product Equipment Gallery */}
      <ProductGallery images={allImages} productName={productName} />

      {/* 3. Equipment & Solutions Tabs */}
      {eqSolutions && eqSolutions.enabled && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          <EquipmentSolutions data={eqSolutions} />
        </div>
      )}

      {/* 4. Frequently Asked Questions */}
      <FAQAccordion
        title="Frequently Asked Questions"
        subtitle="Common questions about our products and services"
        data={faqs && faqs.length > 0 ? faqs : undefined}
      />

    </div>
  );
}
