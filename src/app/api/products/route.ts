import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';
import { connectDB } from '@/lib/db';
import { Op } from 'sequelize';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    // Get URL params for filtering, pagination
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('category');
    
    let page = parseInt(searchParams.get('page') || '1', 10);
    if (isNaN(page)) page = 1;
    
    let limit = parseInt(searchParams.get('limit') || '10', 10);
    if (isNaN(limit)) limit = 10;
    
    const search = searchParams.get('search');
    
    const offset = (page - 1) * limit;
    
    let whereClause: any = {};
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }
    
    if (search) {
      whereClause.name = {
        [Op.like]: `%${search}%`
      };
    }
    
    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      include: [{ model: Category, as: 'category' }],
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
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // In a real application, you must protect this route to ensure Admin access only
    await connectDB();
    
    const body = await req.json();
    const newProduct = await Product.create(body);
    
    return NextResponse.json(
      { message: 'Product created successfully', product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
