// src/components/header.tsx

// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Menu, Search } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useCartStore } from '@/store/cartStore';
// // import EbaySearchBar from '@/components/EbaySearchBar';
// import { getUserFromToken } from '@/utils/getUserFromToken';
// import { motion, AnimatePresence } from 'framer-motion';


// interface Suggestion {
//   name: string;
//   slug: string;
//   _id: string;
// }

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const router = useRouter();
//   const cart = useCartStore((state) => state.cart);
//    const user = await getUserFromToken();
// const cartCount = cart.reduce((total, item) => total + item.quantity, 0);


//   // Debounced fetch
//   useEffect(() => {
//     const delayDebounce = setTimeout(async () => {
//       if (searchQuery.trim().length >= 2) {
//         const res = await fetch(`/api/products/suggestions?query=${searchQuery}`);
//         const data = await res.json();
//         setSuggestions(data);
//         setShowDropdown(true);
//       } else {
//         setSuggestions([]);
//         setShowDropdown(false);
//       }
//     }, 250);

//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery]);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setShowDropdown(false);
//     }
//   };

//   const handleSuggestionClick = (slug: string, id: string) => {
//     router.push(`/products/${slug}/${id}`);
//     setSearchQuery('');
//     setShowDropdown(false);
//   };

//   return (
//     <header className=" shadow-sm top-0 z-10 bg-gray-400">
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/" className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[22px] font-bold text-gray-900">
//               Eesy
//             </Link>
//           </div>

//           {/* Search Box */}
//           <div className="relative flex-1 max-w-md mx-4">
//             <form onSubmit={handleSearch}>
//               <input 
//                 type="text" 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 // sm: from small to up < 
//                 className="w-full pl-10 pr-20 py-1 sm:py-2 border border-black rounded-full"
//                 placeholder="Search..."
//               />
//                 <Search onClick={handleSearch} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <select className="bg-blue-500 text-red absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none">
//               <option></option>
//               <option>Shirts</option>
//               <option>Shoes</option>
//               </select>
//             </form>



//             {/* 🔍 Autocomplete Dropdown */}
//             {/* {showDropdown && suggestions.length > 0 && (
//               <ul className="absolute z-20  border border-gray-200 w-full mt-1 rounded shadow">
//                 {suggestions.map((s) => (
//                   <li
//                     key={s._id}
//                     onClick={() => handleSuggestionClick(s.slug, s._id)}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                   >
//                     {s.name}
//                   </li>
//                 ))}
//               </ul>
//             )} */}


//           {showDropdown && suggestions.length > 0 && (
//   <AnimatePresence>
//     <motion.ul
//       className="absolute z-20 bg-white border border-gray-200 w-full mt-1 rounded shadow"
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -5 }}
//       transition={{ duration: 0.2 }}
//     >
//       {suggestions.map((s) => (
//         <>
//         {/* <li
//           key={s._id}
//           onClick={() => handleSuggestionClick(s.slug, s._id)}
//           className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//           >
//           {s.name}
//         </li> */}

//         <motion.li
//   key={s._id}
//   initial={{ opacity: 0, x: -10 }}
//   animate={{ opacity: 1, x: 0 }}
//   exit={{ opacity: 0, x: -10 }}
//   transition={{ duration: 0.2 }}
//   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
// >
//   {s.name}
// </motion.li>

        
//           </>
//       ))}
      
//     </motion.ul>
//   </AnimatePresence>
// )}




//           </div>


//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-8 items-center text-gray-700">
//             {[ '/products', '/about', '/login', '/cart', '/test'].map((path) => (
//               <Link 
//                 key={path} 
//                 href={path} 
//                 className="hover:text-blue-600 capitalize relative"
//               >
//                 {path === '/' ? 'Home' : path.slice(1)}
//                 {path === '/cart' && cartCount > 0 && (
//                   <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
//                     {cartCount}
//                   </span>
//                 )}
//                  {user?.username && (
//         <span className="ml-4 font-semibold text-gray-900">
//           Hello, {user.username}
//         </span>
//       )}
//               </Link>
//             ))}
//           </div>


//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 px-1">
//               <Menu className="h-6 w-6 mt-[8px]" /> 
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isOpen && (
//           <div className="md:hidden  p-4 flex gap-4 border-t text-gray-700">
//             {['/products', '/about', '/login',  '/cart', '/test'].map((path) => (
//               <Link 
//                 key={path} 
//                 href={path} 
//                 className="hover:text-blue-600 capitalize"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {path === '/' ? 'Home' : path.slice(1)}
//               </Link>
//             ))}
//           </div>
//         )}
//       </nav>

// {/* <EbaySearchBar /> */}

//     </header>
//   );
// }


import HeaderClient from '@/components/HeaderClient'; // ✅ Default import
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface User {
  username: string;
}


export default async function Header() {
  const cookieStore = await cookies(); // ✅ No await
  const token = cookieStore.get('token')?.value;

  let user: User | null = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as User;
      user = decoded;
    } catch {
      user = null;
    }
  }
  return <HeaderClient user={user} />;
}
