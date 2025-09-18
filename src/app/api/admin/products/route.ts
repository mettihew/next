// // app/api/admin/products/route.ts
// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Product from '@/models/Product';

// interface Product {
//   _id: string;

// }

// export async function GET() {
//   try {
//     await dbConnect();
    
//     const products = await Product.find({})
//       .select('name slug price featured isActive stock productImages')
//       .sort({ createdAt: -1 })
//       .lean();
   
//     const transformedProducts = products.map((product) => ({
//       ...product,
//       _id: product._id.toString() // Now TypeScript knows _id exists
//     }));


//     return NextResponse.json(transformedProducts);
    
//   } catch (error) {
//     console.error('Admin products API error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch products' },
//       { status: 500 }
//     );
//   }
// }


// app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

interface ProductLeanDocument {
  _id: Types.ObjectId;
  name: string;
  slug: string;
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