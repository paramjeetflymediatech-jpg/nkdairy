import { ArrowLeft, CheckCircle, Download, FileText } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Product } from '@/models/Product';
import { connectDB } from '@/lib/db';
import ProductSchema from '@/components/seo/ProductSchema';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const product = await Product.findOne({ where: { slug } });
  
  if (!product) return { title: 'Product Not Found' };
  
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
  if (product.images) {
    try {
      const parsed = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      if (Array.isArray(parsed) && parsed.length > 0) {
        imageUrl = parsed[0];
      }
    } catch (e) {}
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white text-[#323373]">
      <ProductSchema product={product} />
      <div className="container mx-auto px-6 md:px-12">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div className="aspect-square bg-gray-50 border border-gray-200 rounded-xl relative flex items-center justify-center overflow-hidden shadow-inner">
             {imageUrl ? (
               <img src={imageUrl} alt={product.name} className="object-cover w-full h-full" />
             ) : (
               <div className="text-gray-400 font-mono flex flex-col items-center gap-4">
                  <span className="text-4xl animate-spin-slow">⚙️</span>
                  <span className="text-sm font-semibold">[ NO IMAGE AVAILABLE ]</span>
               </div>
             )}
             <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="bg-white/80 backdrop-blur px-3 py-1.5 rounded text-xs text-[#323373] border border-gray-300 hover:bg-white transition shadow-sm font-semibold">360° View</button>
             </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2 block">Industrial Machinery</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#323373]">{productName}</h1>
            
            {product.description ? (
              <div 
                className="text-gray-600 text-lg mb-8 leading-relaxed prose max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            ) : (
              <div className="text-gray-600 text-lg mb-8 leading-relaxed whitespace-pre-wrap">
                Our {productName} is engineered with premium food-grade stainless steel (SS 304/316). Designed for high-capacity industrial dairy plants, it ensures maximum efficiency, optimal hygiene, and minimal maintenance.
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Capacity</p>
                <p className="font-semibold text-lg text-[#323373]">500L - 10000L/hr</p>
              </div>
              <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Material</p>
                <p className="font-semibold text-lg text-[#323373]">SS 304 / SS 316</p>
              </div>
              <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Automation</p>
                <p className="font-semibold text-lg text-[#323373]">PLC / Semi-Auto</p>
              </div>
              <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Power</p>
                <p className="font-semibold text-lg text-[#323373]">3 Phase, 415V</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="flex-1 bg-[#323373] hover:bg-blue-900 text-white px-8 py-4 rounded-sm font-semibold tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-md">
                Request Quote
              </Link>
              <button className="flex-1 bg-white border-2 border-[#323373] text-[#323373] hover:bg-gray-50 px-8 py-4 rounded-sm font-semibold tracking-wider transition-all flex items-center justify-center gap-2">
                <Download size={18} /> Brochure
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold mb-8 text-[#323373]">Key Features & Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <ul className="space-y-4">
                {[
                  'Hygienic sanitary design compliant with international standards.',
                  'Energy-efficient motors and heat recovery systems.',
                  'Easy to clean with integrated CIP (Clean-In-Place) capabilities.',
                  'Robust construction for 24/7 continuous operation.',
                  'Customizable footprint to fit existing plant layouts.'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-blue-600 shrink-0 mt-1" size={20} />
                    <span className="text-gray-600 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-sm">
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#323373]"><FileText size={20} className="text-blue-600" /> Technical Data</h3>
               <table className="w-full text-sm text-left">
                  <tbody className="divide-y divide-gray-200">
                    <tr><td className="py-3 text-gray-500 font-medium">Dimensions</td><td className="py-3 font-semibold text-[#323373]">Customizable based on capacity</td></tr>
                    <tr><td className="py-3 text-gray-500 font-medium">Operating Temp</td><td className="py-3 font-semibold text-[#323373]">4°C to 95°C</td></tr>
                    <tr><td className="py-3 text-gray-500 font-medium">Control Panel</td><td className="py-3 font-semibold text-[#323373]">Touch Screen HMI</td></tr>
                    <tr><td className="py-3 text-gray-500 font-medium">Certifications</td><td className="py-3 font-semibold text-[#323373]">ISO 9001, CE Mark</td></tr>
                  </tbody>
               </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
