import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { cookies } from "next/headers";

interface Review {
  userId: string;
  comment: string;
  createdAt: Date;
}

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    await dbConnect();

    let token = null;
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      const cookieStore = await cookies(); // await here
      token = cookieStore.get("token")?.value || null;
    }

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload: { userId: string };
    try {
      payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { productId, review }: { productId: string; review: string } = await req.json();

    if (!productId || !review) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const reviewObj: Review = {
      userId: payload.userId,
      comment: review,
      createdAt: new Date(),
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { reviews: reviewObj } },
      { new: true }
    )
      .select("reviews")
      .lean() as { reviews: Review[] } | null;

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ reviews: updatedProduct.reviews }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
