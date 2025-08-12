// import { NextResponse } from "next/server";
// import connectDB from "@/lib/dbConnect";
// import User from "@/models/User";

// export async function DELETE() {
//   try {
//     await connectDB();
//     await User.deleteMany({});
//     return NextResponse.json({ message: "All users deleted" });
//   } catch (err) {
//     return NextResponse.json({ error: err }, { status: 500 });
//   }
// }

// curl -X DELETE http://localhost:3000/api/test

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Test route working 🎉' });
}
