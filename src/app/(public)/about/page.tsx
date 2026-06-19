import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return await getSeoMetadata('/about');
}

export default function AboutPage() {
  return <AboutClient />;
}
