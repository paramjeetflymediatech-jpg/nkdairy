import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Secure the filename and create a unique name
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFilename = `${Date.now()}-${filename}`;
    
    // Set upload directory to public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure the directory exists
    await mkdir(uploadDir, { recursive: true });
    
    // Full path to save the file
    const filepath = path.join(uploadDir, uniqueFilename);
    
    // Write the file to the local filesystem
    await writeFile(filepath, buffer);

    // Return the public URL path
    const fileUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Local image upload failed' }, { status: 500 });
  }
}
