import YoutubeGallery from '@/components/home/YoutubeGallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Videos | NK Dairy Equipments',
  description: 'Watch our latest equipment demonstrations and updates.',
};

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <YoutubeGallery />
    </div>
  );
}
