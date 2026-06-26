import { NextRequest, NextResponse } from 'next/server';
import { Lead } from '@/models/Lead';
import { connectDB } from '@/lib/db';
import { Op } from 'sequelize';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body = await req.json();
    
    const { name, phone, email, company, country, productInterest, message, source } = body;
    
    // Basic validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Name, phone, and email are required fields.' },
        { status: 400 }
      );
    }
    
    const newLead = await Lead.create({
      name,
      phone,
      email,
      company,
      country,
      productInterest,
      message,
      source: source || 'Website Contact Form',
      status: 'NEW'
    });
    
    // Send email using nodemailer
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER || 'placeholder_user',
          pass: process.env.SMTP_PASS || 'placeholder_pass',
        },
        tls: {
          servername: 'smtp.gmail.com',
        },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000,
      });

      // Send emails (awaited to ensure serverless function doesn't terminate prematurely)
      await Promise.all([
        // 1. Email to the user (Confirmation)
        transporter.sendMail({
          from: `"NK Dairy Equipments" <${process.env.SMTP_FROM || 'no-reply@nkdairy.com'}>`,
          to: email,
          subject: "Thank You for Contacting NK Dairy Equipments",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #323373;">Inquiry Received</h2>
              <p>Dear ${name},</p>
              <p>Thank you for reaching out to NK Dairy Equipments. We have received your inquiry regarding <strong>${productInterest || 'our products'}</strong>.</p>
              <p>Our sales team is currently reviewing your message and will get back to you shortly.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 0.9em; color: #777;">
                <strong>Your Message Summary:</strong><br/>
                Phone: ${phone}<br/>
                Company: ${company || 'N/A'}<br/>
                Message: ${message}
              </p>
              <p>Best Regards,<br/><strong>NK Dairy Equipments Team</strong></p>
            </div>
          `,
        }),
        // 2. Email to the admin (Notification)
        transporter.sendMail({
          from: `"NK Dairy Website" <${process.env.SMTP_FROM || 'no-reply@nkdairy.com'}>`,
          to: process.env.ADMIN_EMAIL || 'sales@nkdairy.com',
          subject: `New Lead: ${name} - ${productInterest || 'General Inquiry'}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #d9534f;">New Lead Alert</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Company:</strong> ${company || 'N/A'}</p>
              <p><strong>Product Interest:</strong> ${productInterest}</p>
              <p><strong>Source:</strong> ${source || 'Website Contact Form'}</p>
              <p><strong>Message:</strong></p>
              <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">${message}</blockquote>
            </div>
          `,
        })
      ]).then(() => {
        console.log('Emails sent successfully!');
      }).catch(emailError => {
        console.error('Failed to send email, but lead was saved:', emailError);
      });
      
    } catch (setupError) {
      console.error('Failed to setup email transporter:', setupError);
    }
    
    return NextResponse.json(
      { message: 'Inquiry submitted successfully', leadId: newLead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // In a real application, you must protect this route (e.g., check session)
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    
    let page = parseInt(searchParams.get('page') || '1', 10);
    if (isNaN(page)) page = 1;
    
    let limit = parseInt(searchParams.get('limit') || '10', 10);
    if (isNaN(limit)) limit = 10;
    
    const search = searchParams.get('search');
    
    const offset = (page - 1) * limit;

    let whereClause: any = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { company: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const { count, rows } = await Lead.findAndCountAll({
      where: whereClause,
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
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
