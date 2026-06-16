import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '@/models/Blog';
import { BlogCategory } from '@/models/BlogCategory';
import { User } from '@/models/User';
import { connectDB } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    
    let page = parseInt(searchParams.get('page') || '1', 10);
    if (isNaN(page)) page = 1;
    
    let limit = parseInt(searchParams.get('limit') || '10', 10);
    if (isNaN(limit)) limit = 10;
    
    const offset = (page - 1) * limit;
    
    const { count, rows } = await Blog.findAndCountAll({
      include: [
        { model: BlogCategory, as: 'category' },
        { model: User, as: 'author', attributes: ['id', 'name', 'email'] }
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });
    
    return NextResponse.json({
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body = await req.json();
    // Default to admin user id 1 if not provided by session for now
    if (!body.authorId) body.authorId = 1;
    
    const newBlog = await Blog.create(body);
    
    return NextResponse.json(
      { message: 'Blog created successfully', blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
