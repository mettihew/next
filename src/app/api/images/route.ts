// app/api/images/route.ts - NO UUID VERSION
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Simple in-memory storage - replace with DB later
let images: any[] = [];

export async function GET() {
  return NextResponse.json(images);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file selected' },
        { status: 400 }
      );
    }

    // Generate SIMPLE filename - NO UUID!
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9); // 7 random chars
    const safeName = file.name.replace(/\s+/g, '-').toLowerCase();
    const filename = `${timestamp}-${randomStr}-${safeName}`;
    
    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadsDir, filename);
    
    await writeFile(filepath, buffer);
    
    // Create image object with SIMPLE ID
    const newImage = {
      id: `${timestamp}-${randomStr}`, // Simple unique ID
      url: `/uploads/${filename}`,
      title,
      description: description || '',
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      uploadDate: new Date().toISOString(),
      author: 'You',
    };
    
    // Store in memory
    images.unshift(newImage);
    
    return NextResponse.json(newImage, { status: 201 });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}