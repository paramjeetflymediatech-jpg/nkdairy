import { NextRequest, NextResponse } from 'next/server';
import { Category } from '@/models/Category';
import { connectDB } from '@/lib/db';

// DELETE a category
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    
    // Check if category has subcategories
    const subcats = await Category.count({ where: { parentId: id } });
    if (subcats > 0) {
      return NextResponse.json({ error: 'Cannot delete category because it has subcategories. Delete them first.' }, { status: 400 });
    }

    // Check if category has products
    // Wait, we need to import Product model. Let's do it at the top.
    const { Product } = await import('@/models/Product');
    const products = await Product.count({ where: { categoryId: id } });
    if (products > 0) {
      return NextResponse.json({ error: 'Cannot delete category because it has products. Reassign or delete them first.' }, { status: 400 });
    }

    const deletedCount = await Category.destroy({ where: { id } });
    
    if (deletedCount === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Internal server error: ' + (error as any).message }, { status: 500 });
  }
}

// UPDATE a category
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    
    // Clean up parentId
    if (body.parentId === '' || body.parentId === 'null') {
      body.parentId = null;
    }

    const [updatedCount] = await Category.update(body, { where: { id } });
    
    if (updatedCount === 0) {
      return NextResponse.json({ error: 'Category not found or no changes made' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Category updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Internal server error: ' + (error as any).message }, { status: 500 });
  }
}
