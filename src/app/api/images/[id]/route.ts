// app/api/images/[id]/route.ts - NO UUID VERSION
import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

let images: any[] = [];

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
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