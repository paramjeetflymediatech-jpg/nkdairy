import { NextRequest, NextResponse } from 'next/server';
import { Category } from '@/models/Category';
import { connectDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    // Fetch ALL categories
    const allCategories = await Category.findAll({
      order: [['name', 'ASC']]
    });

    // Convert Sequelize instances to plain JS objects
    const categoriesMap: Record<string, any> = {};
    const rootCategories: any[] = [];

    // Initialize map
    allCategories.forEach(cat => {
      categoriesMap[cat.id] = { ...cat.toJSON(), subcategories: [] };
    });

    // Build the tree
    allCategories.forEach(cat => {
      if (cat.parentId) {
        if (categoriesMap[cat.parentId]) {
          categoriesMap[cat.parentId].subcategories.push(categoriesMap[cat.id]);
        }
      } else {
        rootCategories.push(categoriesMap[cat.id]);
      }
    });
    
    return NextResponse.json(rootCategories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
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
    
    // Clean up parentId
    if (body.parentId === '' || body.parentId === 'null') {
      body.parentId = null;
    }

    const newCategory = await Category.create(body);
    return NextResponse.json({ message: 'Category created successfully', category: newCategory }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
