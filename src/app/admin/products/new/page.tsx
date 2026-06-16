import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-500 mt-1">Create a new product listing for your catalog.</p>
      </div>
      
      <ProductForm mode="create" />
    </div>
  );
}
