import { NextRequest, NextResponse } from 'next/server';
import { SeoMetadata } from '@/models/SeoMetadata';
import { connectDB } from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    
    const deletedCount = await SeoMetadata.destroy({ where: { id } });
    
    if (deletedCount === 0) {
      return NextResponse.json({ error: 'SEO metadata not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'SEO metadata deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting SEO metadata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    
    const [updatedCount] = await SeoMetadata.update(body, { where: { id } });
    
    if (updatedCount === 0) {
      return NextResponse.json({ error: 'SEO metadata not found or no changes made' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'SEO metadata updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating SEO metadata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
