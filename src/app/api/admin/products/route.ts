

// app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

interface ProductLeanDocument {
  _id: Types.ObjectId;
  name: string;
  price: number;
  featured: boolean;
  isActive: boolean;
  stock: number;
  productImages?: string[];
  // Add other selected fields as needed
}

export async function GET() {
  try {
    await dbConnect();
    
    const products = await Product.find({})
      .select('name slug price featured isActive stock productImages')
      .sort({ createdAt: -1 })
      .lean<ProductLeanDocument[]>();

    const transformedProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString()
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('Admin products API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}