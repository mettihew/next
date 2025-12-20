

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
  specifications: Record<string, string | string[]>;
  userImages: string[];
      bannerImage: string;
      stock: number;
      sold: number;
      brand: string;
      description: string;
}

interface ProductResponse {
  id: string;
  name: string;
  price: number;
  productImages: string[];
  specifications: Record<string, string | string[]>;
    userImages: string[];
      bannerImage: string;
      stock: number;
      sold: number;
      brand: string;
      description: string;
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
      productImages: product.productImages || [],
      specifications: product.specifications,
      userImages: product.userImages,
      bannerImage: product.bannerImage,
      stock: product.stock,
      sold: product.sold,
      brand: product.brand,
      description: product.description,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}