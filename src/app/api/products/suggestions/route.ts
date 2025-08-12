// import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/lib/dbConnect";
// import Product from "@/models/Product";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("query");

//     if (!query || query.trim() === "") {
//       return NextResponse.json({ suggestions: [] });
//     }

//     await connectDB();

//     const products = await Product.find(
//       { name: { $regex: query, $options: "i" } },
//       "name"
//     ).limit(5);

//     const suggestions = products.map((p) => p.name);

//     return NextResponse.json({ suggestions });
//   } catch (error: unknown) {
//     console.error("Suggestion API error:", error);

//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Unknown error" },
//       { status: 500 }
//     );
//   }
// }


// app/api/products/suggestions/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query || query.trim() === '') {
      return NextResponse.json([]);
    }

    await connectDB();

    // Find products that match the query by name (case-insensitive)
    const products = await Product.find(
      { name: { $regex: query, $options: 'i' } },
      '_id name slug'
    ).limit(5);

    return NextResponse.json(products); // return full object: { _id, name, slug }
  } catch (error: unknown) {
    console.error('Suggestion API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
