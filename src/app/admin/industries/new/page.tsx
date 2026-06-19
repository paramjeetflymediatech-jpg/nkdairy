import IndustryForm from '@/components/admin/IndustryForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewIndustryPage() {
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
          <h1 className="text-2xl font-bold text-gray-900">Add New Industry</h1>
          <p className="text-sm text-gray-500">Create a dynamic business segment and map products to it.</p>
        </div>
      </div>

      <IndustryForm />
    </div>
  );
}
