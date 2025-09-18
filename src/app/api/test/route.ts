// import { NextResponse } from "next/server";
// import connectDB from "@/lib/dbConnect";
// import Product from "@/models/Product";

// export async function DELETE() {
//   try {
//     await connectDB();
//     await Product.deleteMany({});
//     const res = await Product.find()
//     console.log(res);
//     return NextResponse.json(res);
//   } catch (err) {
//     return NextResponse.json({ error: err }, { status: 500 });
//   }
// }

// curl -X DELETE http://localhost:3000/api/test

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Test route working 🎉' });
}


// import { NextResponse } from "next/server";
// import connectDB from "@/lib/dbConnect";
// import Product from "@/models/Product";

// export async function GET() {
//   try {
//     await connectDB();
//     await Product.insertMany()

//     return NextResponse.json("it might work or not; check you site bitch");
//   } catch (err) {
//     return NextResponse.json({ error: err }, { status: 500 });
//   }
// }
