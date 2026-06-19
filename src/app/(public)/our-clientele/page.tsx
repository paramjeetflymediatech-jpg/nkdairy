import { Metadata } from 'next';
import OurClienteleClient from './OurClienteleClient';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return await getSeoMetadata('/our-clientele');
}

export default function OurClientelePage() {
  return <OurClienteleClient />;
}
