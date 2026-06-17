import { NextRequest, NextResponse } from 'next/server';
import { SeoMetadata } from '@/models/SeoMetadata';
import { connectDB } from '@/lib/db';
import { Op } from 'sequelize';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    
    let whereClause: any = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { pagePath: { [Op.like]: `%${search}%` } },
          { title: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const seoEntries = await SeoMetadata.findAll({
      where: whereClause,
      order: [['pagePath', 'ASC']]
    });
    return NextResponse.json(seoEntries, { status: 200 });
  } catch (error) {
    console.error('Error fetching SEO metadata:', error);
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
    
    // Check if the path already exists
    const existing = await SeoMetadata.findOne({ where: { pagePath: body.pagePath } });
    if (existing) {
      return NextResponse.json(
        { error: 'SEO metadata for this path already exists. Please update it instead.' },
        { status: 400 }
      );
    }
    
    const newSeo = await SeoMetadata.create(body);
    return NextResponse.json(
      { message: 'SEO metadata created successfully', seo: newSeo },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating SEO metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
