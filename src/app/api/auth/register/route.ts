import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();
    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const user = await User.create({ email, password, username });

    return NextResponse.json({ userId: user._id.toString() });
  } catch (err) {
    console.error(err);
return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
