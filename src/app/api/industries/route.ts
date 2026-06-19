import { NextRequest, NextResponse } from 'next/server';
import { Industry } from '@/models';
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
        name: { [Op.like]: `%${search}%` }
      };
    }

    const industries = await Industry.findAll({
      where: whereClause,
      order: [['id', 'ASC']]
    });
    return NextResponse.json(industries, { status: 200 });
  } catch (error) {
    console.error('Error fetching industries:', error);
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
    
    // Check if slug already exists
    const existing = await Industry.findOne({ where: { slug: body.slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'An industry with this slug already exists.' },
        { status: 400 }
      );
    }
    
    const newIndustry = await Industry.create(body);
    return NextResponse.json(
      { message: 'Industry created successfully', industry: newIndustry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating industry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
