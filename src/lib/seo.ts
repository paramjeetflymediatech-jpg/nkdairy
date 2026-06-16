import { SeoMetadata } from '@/models/SeoMetadata';
import { connectDB } from './db';
import { Metadata } from 'next';

export async function getSeoMetadata(pagePath: string): Promise<Metadata> {
  try {
    await connectDB();
    const seo = await SeoMetadata.findOne({ where: { pagePath } });

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
  } catch (error) {
    console.error('Error fetching SEO metadata for', pagePath, error);
  }

  // Fallback defaults
  return {
    title: 'NK Dairy Equipments | Premium Industrial Manufacturers',
    description: 'World-class industrial manufacturing for next-generation dairy plants. Precision, efficiency, and scale—designed for modern industry.',
  };
}
