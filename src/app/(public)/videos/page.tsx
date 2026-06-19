import YoutubeGallery from '@/components/home/YoutubeGallery';
import { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return await getSeoMetadata('/videos');
}

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <YoutubeGallery />
    </div>
  );
}
