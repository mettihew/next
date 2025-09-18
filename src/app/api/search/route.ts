// app/api/products/suggestions/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query || query.length < 2) return NextResponse.json([]);

  try {
    const suggestions = await Product.aggregate([
      {
        $search: {
          index: 'product_suggestions', // make sure this index exists in Atlas
          autocomplete: {
            query,
            path: 'name',
            fuzzy: { maxEdits: 1 },
          },
        },
      },
      { $limit: 5 },
      { $project: { name: 1, slug: 1 } },
    ]);

    return NextResponse.json(suggestions);
  } catch (err) {
    console.error('Search failed:', err);
    return NextResponse.json(
      {
        error: 'Search unavailable',
        fallback: `/search?q=${encodeURIComponent(query)}`,
      },
      { status: 500 }
    );
  }
}
