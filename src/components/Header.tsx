

import HeaderClient from '@/components/HeaderClient'; 
import { getUserFromToken } from "@/lib/auth";


export default async function Header() {
  const user = await getUserFromToken();
  return <HeaderClient user={user} />;
}
