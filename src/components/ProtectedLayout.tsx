import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface User {
  username: string;
}

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user: User | null = null;

  if (token) {
    try {
      user = jwt.verify(token, JWT_SECRET) as User;
    } catch {
      user = null;
    }
  }

  if (!user) {
    redirect("/login"); // send back to login
  }

  return <>{children}</>;
}
