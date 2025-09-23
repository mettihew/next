// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Product from '@/models/Product';
// import mongoose from 'mongoose';

// interface RouteContext {
//   params: {
//     id: string;
//   };
// }

// export async function GET(_request: Request, context: RouteContext) {
//   const { id } = context.params;

//   await dbConnect();

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
//   }

//   try {
//     const product = await Product.findById(id).lean().exec();

//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }

//     return NextResponse.json(product, {
//       headers: {
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         Pragma: 'no-cache',
//         Expires: '0',
//       },
//     });
//   } catch (error) {
//     console.error('Product fetch error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }


// // calude

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import mongoose from 'mongoose';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  
  await dbConnect();
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }
  
  try {
    const product = await Product.findById(id).lean().exec();
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Product fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}






// import { NextResponse, NextRequest } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Product from '@/models/Product';
// import mongoose from 'mongoose';

// interface RouteContext {
//   params: {
//     id: string;
//   };
// }

// export async function GET(request: NextRequest, context: { params: { id: string } }) {
//   const { id } = context.params;
//   await dbConnect();
  
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
//   }
  
//   try {
//     const product = await Product.findById(id).lean().exec();
//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }
    
//     return NextResponse.json(product, {
//       headers: {
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0',
//       },
//     });
//   } catch (error) {
//     console.error('Product fetch error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }