
// app/api/products/featured/route.ts
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

interface FeaturedProductLeanDocument {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  price: number;
  productImages?: string[];
}

export async function GET() {
  try {
    await dbConnect();
    
    const products = await Product.find({ 
      featured: true, 
      isActive: true 
    })
      .select('name slug price productImages') // Add other fields you need
      .limit(8) // or whatever limit you're using
      .lean<FeaturedProductLeanDocument[]>();

    const transformedProducts = products.map(product => ({
      _id: product._id.toString(),
      name: product.name,
      slug: product.slug,
      price: product.price,
      productImages: product.productImages || [],
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('Featured products API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
}