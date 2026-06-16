import { Metadata } from 'next';
import OurClienteleClient from './OurClienteleClient';

export const metadata: Metadata = {
  title: 'Our Clientele | NK Dairy Equipments',
  description: 'Discover the prestigious institutes and research centers that trust NK Dairy Equipments.',
};

export default function OurClientelePage() {
  return <OurClienteleClient />;
}
