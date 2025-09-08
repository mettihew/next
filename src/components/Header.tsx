

import HeaderClient from '@/components/HeaderClient'; 
import { getUserFromToken } from "@/lib/auth";



export default async function Header() {
  const user = await getUserFromToken();
  console.log('check for user', user);
  return <HeaderClient />;
}
