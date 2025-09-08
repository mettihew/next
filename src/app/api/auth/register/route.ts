// import { NextResponse } from "next/server";
// import connectDB from "@/lib/dbConnect";
// import User from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     const { email, password, username } = await req.json();
//     await connectDB();

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return NextResponse.json(
//         { error: "Email already registered" },
//         { status: 400 }
//       );
//     }

//     const user = await User.create({ email, password, username });

//     return NextResponse.json({ userId: user._id.toString() });
//   } catch (err) {
//     console.error(err);
// return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }



// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

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

    // Create JWT token
    const token = jwt.sign(
      { username: user.username, userId: user._id.toString() }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // Set the cookie and return user info
    const response = NextResponse.json({ 
      success: true,
      userId: user._id.toString(),
      username: user.username 
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
    
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}