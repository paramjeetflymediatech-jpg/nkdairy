import { NextRequest, NextResponse } from 'next/server';
import { BlogCategory } from '@/models/BlogCategory';
import { connectDB } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const categories = await BlogCategory.findAll({ order: [['name', 'ASC']] });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
