import ContactClient from './ContactClient';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return await getSeoMetadata('/contact');
}

export default function ContactPage() {
  return <ContactClient />;
}
