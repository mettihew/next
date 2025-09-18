

// app/api/products/category/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    
    // Await params first
    const { slug } = await params;
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '4');
    const skip = (page - 1) * limit;

    // Convert slug to proper category name
    // "electronics" -> "Electronics"
    // const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
    const categoryName = slug.charAt(0) + slug.slice(1);
    
    // Search for products with the capitalized category name
    const products = await Product.find({ category: categoryName })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments({ category: categoryName });
    const totalPages = Math.ceil(totalProducts / limit);

    // Debug: Let's see what the products look like
    console.log('Found products:', products.length);
    console.log('First product:', products[0]);

    return NextResponse.json({
      products,
      totalPages,
      categoryName,
      currentPage: page
    });

  } catch (error) {
    console.error('Error fetching category products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}