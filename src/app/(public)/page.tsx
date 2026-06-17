import HomeClient from '@/components/home/HomeClient';
import { getSeoMetadata } from '@/lib/seo';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';

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

  return <HomeClient initialProducts={products.map(p => p.toJSON())} />;
}
