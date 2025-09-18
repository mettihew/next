// app/api/search/results/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

// Define the filter type based on your MongoDB queries
interface SearchFilter {
  isActive: boolean;
  name: { $regex: string; $options: string };
  brand?: { $in: string[] };
  price?: { $gte: number; $lte: number };
}

// Define the lean document type (what comes back from .lean())
interface ProductLeanDocument {
  _id: Types.ObjectId;
  name: string;
  price: number;
  brand: string;
  images?: string[];
  isActive: boolean;
  // Add other product fields as needed
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const brand = searchParams.get('brand');
  const min = parseFloat(searchParams.get('min') || '0');
  const max = parseFloat(searchParams.get('max') || `${Infinity}`);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');

  const filter: SearchFilter = {
    isActive: true,
    name: { $regex: q, $options: 'i' },
  };

  if (brand) {
    filter.brand = { $in: brand.split(',').map((b) => b.trim()) };
  }

  if (!isNaN(min) && !isNaN(max)) {
    filter.price = { $gte: min, $lte: max };
  }

  try {
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<ProductLeanDocument[]>();

    const uniqueBrands = await Product.distinct('brand', { isActive: true });

    return NextResponse.json({
      products: products.map((p) => ({
        ...p,
        _id: p._id.toString(),
        images: p.images || [],
      })),
      totalPages,
      uniqueBrands,
    });
  } catch (err) {
    console.error('Search failed:', err);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}