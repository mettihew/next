
// // api/products/[id]/route.ts
// import { NextResponse } from 'next/server';
// import  Product  from '@/models/Product';
// import mongoose from 'mongoose';

//   interface ProductResponse {
//       id: string;
//       name: string;
//       price: number;
//       productImages: string[]
//     }

// // Connect to MongoDB
// async function connectDB() {
//   if (mongoose.connections[0].readyState) return;

//   try {
//     await mongoose.connect(process.env.MONGODB_URI || '');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//   }
// }

// export async function GET(
//   _req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();

//     const { id } = await params;  // Await params to get id

//     const product = await Product.findById(id).lean();

//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       id: product._id.toString(),
//       name: product.name,
//       price: product.price,
//       productImages: product.productImages || []
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
//   }
// }


// api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import mongoose from 'mongoose';

// Define the product document type with _id
interface ProductDocument {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  productImages?: string[];
}

interface ProductResponse {
  id: string;
  name: string;
  price: number;
  productImages: string[];
}

// Connect to MongoDB
async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    // Cast the result to our ProductDocument type
    const product = await Product.findById(id).lean() as ProductDocument | null;
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const response: ProductResponse = {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      productImages: product.productImages || []
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
























// import { NextResponse } from 'next/server';
// // import { Product } from '@/models/product';
// import Product from '@/models/Product';
// import mongoose from 'mongoose';

// // Connect to MongoDB
// async function connectDB() {
//   if (mongoose.connections[0].readyState) return;

//   try {
//     await mongoose.connect(process.env.MONGODB_URI || '');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//   }
// }

// export async function GET(
//   _req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();

//     const { id } = await params;  // Await params to get id

//     const product = await Product.findById(id).lean();

//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       id: product._id.toString(),
//       name: product.name,
//       price: product.price,
//       productImages: product.productImages || []
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
//   }
// }




// // import { NextRequest, NextResponse } from 'next/server';
// // import dbConnect from '@/lib/dbConnect';
// // import Product from '@/models/Product';
// // import mongoose from 'mongoose';

// //  interface RouteContext {
// //  params: { id: string }; // ✅ not Promise
// //  }

// //  export async function GET(_request: Request, context: RouteContext) {
// //   const { id } = await context.params; // Await params first
  
// //   await dbConnect();

// //   if (!mongoose.Types.ObjectId.isValid(id)) {
// //     return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
// //   }

// //   try {
// //     const product = await Product.findById(id).lean().exec();
// //     console.log('Product found:', !!product); // Debug log

// //     if (!product) {
// //       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
// //     }

// //     return NextResponse.json(product, {
// //       headers: {
// //         'Cache-Control': 'no-cache, no-store, must-revalidate',
// //         'Pragma': 'no-cache',
// //         'Expires': '0',
// //       },
// //     });
// //   } catch (error) {
// //     console.error('Product fetch error:', error);
// //     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
// //   }
// // }