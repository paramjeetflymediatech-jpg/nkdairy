import { NextRequest, NextResponse } from 'next/server';
import { Industry, Product } from '@/models';
import { connectDB } from '@/lib/db';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await connectDB();
    const industry = await Industry.findByPk(params.id, {
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'name', 'slug'],
          through: { attributes: [] }
        }
      ]
    });
    
    if (!industry) {
      return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
    }
    
    return NextResponse.json(industry, { status: 200 });
  } catch (error) {
    console.error('Error fetching industry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await connectDB();
    const body = await req.json();
    const industry = await Industry.findByPk(params.id);
    
    if (!industry) {
      return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
    }
    
    // Update basic fields
    await industry.update({
      name: body.name,
      slug: body.slug,
      description: body.description,
      image: body.image,
      equipmentSolutions: body.equipmentSolutions,
      faqs: body.faqs,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription
    });
    
    // Update products association if provided
    if (Array.isArray(body.productIds)) {
      await (industry as any).setProducts(body.productIds);
    }
    
    return NextResponse.json({ message: 'Industry updated successfully', industry }, { status: 200 });
  } catch (error) {
    console.error('Error updating industry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await connectDB();
    const industry = await Industry.findByPk(params.id);
    
    if (!industry) {
      return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
    }
    
    await industry.destroy();
    return NextResponse.json({ message: 'Industry deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting industry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
