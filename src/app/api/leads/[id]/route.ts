import { NextRequest, NextResponse } from 'next/server';
import { Lead } from '@/models/Lead';
import { connectDB } from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    
    const deletedCount = await Lead.destroy({ where: { id } });
    
    if (deletedCount === 0) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Lead deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting lead:', error);
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
    
    // Only allow updating status and notes/message
    const [updatedCount] = await Lead.update({
      status: body.status,
      message: body.message
    }, { where: { id } });
    
    if (updatedCount === 0) {
      return NextResponse.json({ error: 'Lead not found or no changes made' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Lead updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
