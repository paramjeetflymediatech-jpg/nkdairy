import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@/models/Product';
import { connectDB } from '@/lib/db';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  const product = await Product.findByPk(id);

  if (!product) {
    notFound();
  }

  // Convert Sequelize model to plain object for client component
  const productData = product.get({ plain: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500 mt-1">Update the details for {productData.name}.</p>
      </div>
      
      <ProductForm initialData={productData} mode="edit" />
    </div>
  );
}
