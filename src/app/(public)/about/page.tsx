import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Pioneering Dairy Technology | NK Dairy Equipments',
  description: 'Learn about NK Dairy Equipments. We are a team of qualified technocrats manufacturing and exporting high-capacity dairy processing plants globally.',
};

export default function AboutPage() {
  return <AboutClient />;
}
