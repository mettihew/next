import { getUserFromToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUserFromToken();
    
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" }, 
        { status: 401 }
      );
    }
    
    return NextResponse.json(user);
    
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: "Authentication failed" }, 
      { status: 500 }
    );
  }
}