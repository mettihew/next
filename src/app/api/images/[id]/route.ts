// app/api/images/[id]/route.ts - Updated for Next.js 14+
import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

let images: any[] = [];

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  try {
    // Await the params first
    const { id } = await params;
    
    // Find image
    const imageIndex = images.findIndex(img => img.id === id);
    if (imageIndex === -1) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    
    const image = images[imageIndex];
    
    // Delete file
    const filepath = path.join(process.cwd(), 'public', image.url);
    try {
      await unlink(filepath);
    } catch (fileError) {
      console.error('Error deleting file:', fileError);
    }
    
    // Remove from array
    images.splice(imageIndex, 1);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}

// If you need a GET endpoint for individual images
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const image = images.find(img => img.id === id);
    
    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(image);
  } catch (error) {
    console.error('Get image error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

// Optional: Add PUT/PATCH for updating images
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const imageIndex = images.findIndex(img => img.id === id);
    if (imageIndex === -1) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    
    // Update image properties
    images[imageIndex] = {
      ...images[imageIndex],
      ...body,
      id: images[imageIndex].id, // Keep original ID
    };
    
    return NextResponse.json(images[imageIndex]);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    );
  }
}