// pages/api/products.ts or route.ts (handler)
import Product from '@/models/Product';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: Request) {
  await dbConnect();
  
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 5

  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit).lean()
  const total = await Product.countDocuments();

  return Response.json({ products, total, page, totalPages: Math.ceil(total / limit) });
}
