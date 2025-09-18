
// app/api/admin/products/featured/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { productId, featured } = await request.json();
    
    if (!productId || featured === undefined) {
      return NextResponse.json(
        { error: 'Product ID and featured status are required' },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { featured: featured },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: `Product ${featured ? 'marked as featured' : 'removed from featured'}`,
      product: {
        _id: product._id.toString(),
        name: product.name,
        featured: product.featured
      }
    });
    
  } catch (error) {
    console.error('Admin featured API error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}
