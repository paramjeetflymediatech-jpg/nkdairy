import SeoForm from '@/components/admin/SeoForm';
import { connectDB } from '@/lib/db';
import { SeoMetadata } from '@/models/SeoMetadata';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditSeoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await connectDB();
  const seo = await SeoMetadata.findByPk(id);
  
  if (!seo) {
    notFound();
  }
  
  return (
    <div className="p-6">
      <SeoForm 
        initialData={JSON.parse(JSON.stringify(seo))} 
        isEdit={true}
      />
    </div>
  );
}
