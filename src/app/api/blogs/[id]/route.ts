import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '@/models/Blog';
import { connectDB } from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    
    const deletedCount = await Blog.destroy({ where: { id } });
    
    if (deletedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting blog:', error);
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
    
    const [updatedCount] = await Blog.update(body, { where: { id } });
    
    if (updatedCount === 0) {
      return NextResponse.json({ error: 'Blog not found or no changes made' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Blog updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
