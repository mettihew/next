

// // Update your featured products API (app/api/products/featured/route.ts)
// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Product from '@/models/Product';

// export async function GET() {
//   try {
//     await dbConnect();
    
//     // Use 'featured' instead of 'isFeatured' to match your schema
//     const products = await Product.find({ 
//       isActive: true,
//       featured: true  // Changed from isFeatured to featured
//     })
//     .limit(8)
//     .lean();

//     const transformedProducts = products.map(product => ({
//       _id: product._id.toString(),
//       name: product.name,
//       slug: product.slug,
//       price: product.price,
//       images: product.productImages?.map(url => ({ url })) || [] // Transform productImages to images array
//     }));

//     return NextResponse.json(transformedProducts);
//   } catch (error) {
//     console.error('Featured products API error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch featured products' },
//       { status: 500 }
//     );
//   }
// }

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
  // Add other fields that you're selecting/using
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
      // Add other fields you're transforming
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