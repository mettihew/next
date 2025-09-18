// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    await dbConnect();

    // ✅ Extract token (Authorization header or cookie)
    let token = null;
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value || null;
    }
    if (!token) {
      return NextResponse.json({ error: "Login to send a review" }, { status: 401 });
    }

    // ✅ Verify token
    let payload: { userId: string };
    try {
      payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // ✅ Parse body
    const { productId, rating, comment } = await req.json();
    if (!productId || !rating || !comment) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Create review
    const review = await Review.create({
      userId: payload.userId,
      productId,
      rating,
      comment,
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}



export async function GET(req: Request) {
  try {
    // await connectDB();
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return new Response(JSON.stringify({ error: "Missing productId" }), { status: 400 });
    }

    const reviews = await Review.find({ productId })
      .populate("userId", "username") 
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ reviews }, { status: 200 });

    // return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error("❌ Error fetching reviews:", errorMessage);
  return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
