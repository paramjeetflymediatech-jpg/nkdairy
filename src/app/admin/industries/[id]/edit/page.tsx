import IndustryForm from '@/components/admin/IndustryForm';
import { Industry, Product } from '@/models';
import { connectDB } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function EditIndustryPage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  await connectDB();

  const industry = await Industry.findByPk(params.id, {
    include: [
      {
        model: Product,
        as: 'products',
        attributes: ['id', 'name', 'slug'],
        through: { attributes: [] }
      }
    ]
  });

  if (!industry) {
    notFound();
  }

  // Convert Sequelize model instance to plain JSON object for client component serialization
  const plainIndustry = JSON.parse(JSON.stringify(industry.get({ plain: true })));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/industries" 
          className="p-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-500 transition-colors shadow-sm"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Industry: {plainIndustry.name}</h1>
          <p className="text-sm text-gray-500">Modify dynamic solutions, mapped products, FAQs, and SEO tags.</p>
        </div>
      </div>

      <IndustryForm initialData={plainIndustry} />
    </div>
  );
}
