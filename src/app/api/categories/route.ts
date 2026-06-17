import { NextRequest, NextResponse } from 'next/server';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import { connectDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    // Fetch ALL categories
    const allCategories = await Category.findAll({
      order: [['name', 'ASC']]
    });

    // Fetch ALL products to attach to categories
    const allProducts = await Product.findAll({
      attributes: ['id', 'name', 'slug', 'categoryId'],
      order: [['name', 'ASC']]
    });

    // Convert Sequelize instances to plain JS objects
    const categoriesMap: Record<string, any> = {};
    const rootCategories: any[] = [];

    // Initialize map
    allCategories.forEach(cat => {
      categoriesMap[cat.id] = { ...cat.toJSON(), subcategories: [], products: [] };
    });

    // Attach products directly to their categories
    allProducts.forEach(prod => {
      const p = prod.toJSON();
      if (categoriesMap[p.categoryId]) {
        categoriesMap[p.categoryId].products.push(p);
      }
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

    // Helper to recursively collect all products for a category
    const collectProducts = (category: any): any[] => {
      let collected = [...category.products];
      if (category.subcategories && category.subcategories.length > 0) {
        category.subcategories.forEach((sub: any) => {
          collected = [...collected, ...collectProducts(sub)];
        });
      }
      return collected;
    };

    // Attach allNestedProducts to root categories for the dropdown menu
    rootCategories.forEach(root => {
      root.allNestedProducts = collectProducts(root);
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
