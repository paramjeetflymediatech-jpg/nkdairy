import HomeClient from '@/components/home/HomeClient';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return await getSeoMetadata('/');
}

export default function Home() {
  return <HomeClient />;
}
