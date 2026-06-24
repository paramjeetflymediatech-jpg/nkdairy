import HomeClient from '@/components/home/HomeClient';
import { getSeoMetadata } from '@/lib/seo';
import { connectDB } from '@/lib/db';
import { Product, Category, Industry, Faq } from '@/models';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return await getSeoMetadata('/');
}

export default async function Home() {
  await connectDB();
  const products = await Product.findAll({
    include: [{ model: Category, as: 'category', attributes: ['name', 'slug'] }],
    order: [['createdAt', 'DESC']],
    limit: 10,
  });

  const industries = await Industry.findAll({
    order: [['id', 'ASC']]
  });

  const faqs = await Faq.findAll({
    where: { isActive: true },
    order: [['order', 'ASC'], ['createdAt', 'DESC']]
  });

  return (
    <HomeClient 
      initialProducts={products.map(p => p.toJSON())} 
      initialIndustries={industries.map(i => i.toJSON())} 
      initialFaqs={faqs.map(f => f.toJSON())}
    />
  );
}
