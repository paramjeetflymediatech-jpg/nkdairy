import { NextRequest, NextResponse } from 'next/server';
import { Faq } from '@/models/Faq';
import { connectDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const faqs = await Faq.findAll({
      order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    return NextResponse.json(faqs, { status: 200 });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newFaq = await Faq.create(body);
    return NextResponse.json({ message: 'FAQ created successfully', faq: newFaq }, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
