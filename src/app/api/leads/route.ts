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
        host: process.env.SMTP_HOST || process.env.EMAIL_HOST || 'smtp.ethereal.email',
        port: parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || '587'),
        secure: (process.env.SMTP_SECURE || process.env.EMAIL_SECURE) === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER || process.env.EMAIL_USER || 'placeholder_user',
          pass: process.env.SMTP_PASS || process.env.EMAIL_PASS || 'placeholder_pass',
        },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000,
      });

      const adminEmailStr = process.env.ADMIN_EMAIL || 'sales@nkdairy.com';
      const adminEmails = adminEmailStr.split(/[,;]/).map(e => e.trim()).filter(Boolean);
      
      const adminPromises = adminEmails.map(adminEmail => {
        return transporter.sendMail({
          from: `"NK Dairy Website" <${process.env.SMTP_FROM || process.env.EMAIL_USER || 'no-reply@nkdairy.com'}>`,
          replyTo: process.env.SMTP_REPLY_TO || process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER || 'no-reply@nkdairy.com',
          to: adminEmail,
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
        });
      });

      // Send emails (awaited to ensure serverless function doesn't terminate prematurely)
      await Promise.all([
        // 1. Email to the user (Confirmation)
        transporter.sendMail({
          from: `"NK Dairy Equipments" <${process.env.SMTP_FROM || process.env.EMAIL_WEB || 'no-reply@nkdairy.com'}>`,
          to: email,
          subject: "Thank You for Contacting NK Dairy Equipments",
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7f6; padding: 40px 20px; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                
                <!-- Header -->
                <div style="background-color: #0d1b2e; padding: 30px; text-align: center; border-bottom: 4px solid #00b4d8;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">NK DAIRY EQUIPMENTS</h1>
                  <p style="color: #00b4d8; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Inquiry Confirmation</p>
                </div>

                <!-- Body -->
                <div style="padding: 40px 30px;">
                  <h2 style="color: #0d1b2e; font-size: 20px; margin-top: 0;">Hello ${name},</h2>
                  <p style="font-size: 16px; line-height: 1.6; color: #555;">
                    Thank you for reaching out to us. We have successfully received your inquiry regarding <strong style="color: #00b4d8;">${productInterest || 'our processing solutions'}</strong>.
                  </p>
                  <p style="font-size: 16px; line-height: 1.6; color: #555;">
                    Our engineering and sales team is currently reviewing your requirements. One of our experts will get back to you shortly to discuss how we can assist you.
                  </p>

                  <!-- Summary Box -->
                  <div style="background-color: #f8fafc; border-left: 4px solid #00b4d8; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                    <h3 style="margin-top: 0; color: #0d1b2e; font-size: 16px; margin-bottom: 15px;">Your Inquiry Summary</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                      <tr>
                        <td style="padding: 5px 0; color: #64748b; width: 100px;"><strong>Phone:</strong></td>
                        <td style="padding: 5px 0; color: #334155;">${phone}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #64748b;"><strong>Company:</strong></td>
                        <td style="padding: 5px 0; color: #334155;">${company || 'N/A'}</td>
                      </tr>
                    </table>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                      <p style="margin: 0 0 5px 0; color: #64748b;"><strong>Message:</strong></p>
                      <p style="margin: 0; color: #334155; line-height: 1.5; font-style: italic;">"${message}"</p>
                    </div>
                  </div>

                  <p style="font-size: 16px; line-height: 1.6; color: #555;">
                    We look forward to speaking with you!
                  </p>
                  <p style="font-size: 16px; line-height: 1.6; color: #0d1b2e; margin-bottom: 0;">
                    Best Regards,<br/>
                    <strong>The NK Dairy Team</strong>
                  </p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #64748b; font-size: 13px;">
                    119, Ishopur, Delhi Road, Near Radha Swami Sat Sang Bhawan<br/>
                    Yamuna Nagar, Haryana 135001<br/>
                    <a href="mailto:info@nkdairyequipments.com" style="color: #00b4d8; text-decoration: none;">info@nkdairyequipments.com</a>
                  </p>
                </div>
              </div>
            </div>
          `,
        }),

        // 2. Emails to the admins individually
        ...adminPromises
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
