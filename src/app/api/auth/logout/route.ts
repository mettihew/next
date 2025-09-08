// // src/app/api/auth/logout/route.ts
// import { NextResponse } from "next/server";

// export async function POST() {
//   const res = NextResponse.json({ message: "Logged out" });
//   res.cookies.set({
//     name: "token",
//     value: "",
//     path: "/",
//     maxAge: 0,
//   });
//   return res;
// }




import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ 
      message: "Logged out successfully" 
    });
    
    // Clear the token cookie
    response.cookies.delete("token");
    
    return response;
    
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: "Logout failed" }, 
      { status: 500 }
    );
  }
}