"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Heart, Bell, User } from "lucide-react";
import Link from "next/link";

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';



interface Suggestion {
  name: string;
  slug: string;
  _id: string;
}

interface User {
  username: string;
}

interface HeaderClientProps {
  user: User | null;
}

export default function HeaderClient({ user }: HeaderClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();


  const categories = [ "All Categories", "Electronics", "Fashion", "Home & Garden", "Collectibles", "Sports", "Toys", "Business & Industrial",];

  
const pathname = usePathname();
  // DELETE THIS ENTIRE FIRST USEEFFECT BLOCK:
// useEffect(() => {
//   const delayDebounce = setTimeout(async () => {
//     if (searchQuery.trim().length >= 2) {
//       const res = await fetch(`/api/products/suggestions?query=${searchQuery}`);
//       const data = await res.json();
//       setSuggestions(data);
//       setShowDropdown(true);
//     } else {
//       setSuggestions([]);
//       setShowDropdown(false);
//     }
//   }, 50);
// KEEP THIS SECOND USEEFFECT BLOCK (it has the cleanup):
useEffect(() => {
  const delayDebounce = setTimeout(async () => {
    if (searchQuery.trim().length >= 2) {
      const res = await fetch(`/api/products/suggestions?query=${searchQuery}`);
      const data = await res.json();
      setSuggestions(data);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, 50);

  return () => clearTimeout(delayDebounce);
}, [searchQuery]);

// Add this new useEffect for closing the mobile menu
useEffect(() => {
  setIsMobileMenuOpen(false); // Close the mobile menu on navigation
}, [pathname]); // This runs every time the pathname changes












 const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (slug: string, id: string) => {
    router.push(`/products/${slug}/${id}`);
    setSearchQuery('');
    setShowDropdown(false);
  };

  return (
    <header className="bg-white shadow-sm top-0 z-50">
      {/* Top Navigation */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:text-yellow-300">Daily Deals</Link>
            <Link href="#" className="hover:text-yellow-300">Sell</Link>
            <Link href="#" className="hover:text-yellow-300">Help & Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/products" className="hover:text-yellow-300">Products</Link>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <Link href="/login" className="hover:text-yellow-300">Sign In</Link>
              <span>/</span>
              <Link href="/register" className="hover:text-yellow-300">Register</Link>
            </div>
          </div>
        </div>
      </div>




      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="text-lg font-bold text-blue-600">
              Eesy
            </Link>
          </div>













          {/* Search Bar - Desktop */}
<div className="hidden md:flex flex-1 max-w-2xl mx-2">
  <form onSubmit={handleSearch} className="relative flex w-full">
    <div className="relative flex-grow">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for anything..."
        />
        <button 
          type="submit"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>


       

            

      {showDropdown && suggestions.length > 0 && (
        <AnimatePresence>
          <motion.ul
            className="absolute z-20 bg-white border border-gray-200 w-full mt-1 rounded shadow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.map((s) => (
              <motion.li
                key={s._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(s.slug, s._id)}
              >
                {s.name}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </div>

    {/* Category dropdown - unchanged */}
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        className="h-full px-4 py-2 border-t border-b border-r border-gray-300 bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 whitespace-nowrap rounded-r-full"
      >
        {selectedCategory}
        <svg
          className={`ml-2 w-4 h-4 inline transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isCategoryOpen && (
        <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <ul className="py-1 text-sm text-gray-700 max-h-96 overflow-y-auto">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoryOpen(false);
                  }}
                  className={`block px-4 py-2 w-full text-left hover:bg-gray-100 ${selectedCategory === category ? "bg-blue-50 text-blue-600" : ""}`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </form>
</div>






          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
              <Heart className="w-5 h-5 mr-1" />
              <span className="text-sm">Watchlist</span>
            </button>
            <button className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
              <Bell className="w-5 h-5 mr-1" />
              <span className="text-sm">Notifications</span>
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-600">
              <ShoppingCart className="w-5 h-5 mr-1" />
              <span className="text-sm">Cart</span>
              <span className="ml-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">0</span>
            </button>

            {user?.username ? (
            <Link href="/dashboard" className="flex items-center text-gray-700 hover:text-blue-600">
                Hello, {user.username}
            </Link>
            ) : 
            <Link href="/login" className="flex items-center text-gray-700 hover:text-blue-600">
            login</Link>}


          </div>
        </div>

        {/* Mobile Search - Hidden on desktop */}
        <div className="mt-3 md:hidden">
      

<form onSubmit={handleSearch} className="flex items-center w-full max-w-2xl border border-gray-300 rounded-full overflow-hidden bg-white">
  {/* Search icon */}
  <div className="px-3 flex items-center text-gray-500">
      {/* Submit button */}
  <button type="submit">
    <Search className="w-5 h-5" />
  </button>

  
  </div>

  {/* Text input */}
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="flex-1 py-2 pr-4 focus:outline-none"
    placeholder="Search for anything"
  />

  {/* Category dropdown */}
  <select
    className="h-full border-l border-gray-300 px-3 py-2 bg-gray-50 text-sm focus:outline-none focus:bg-white"
  >
    <option value="">All Categories</option>
    <option value="electronics">Electronics</option>
    <option value="fashion">Fashion</option>
    <option value="home">Home</option>
    <option value="toys">Toys</option>
    <option value="books">Books</option>
  </select>

</form>

     {showDropdown && suggestions.length > 0 && (
   <AnimatePresence>
     <motion.ul
       className="absolute z-20 bg-white border border-gray-200 w-full mt-1 rounded shadow"
       initial={{ opacity: 0, y: -10 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -5 }}
       transition={{ duration: 0.2 }}
     >
       {suggestions.map((s) => (
         <motion.li
           key={s._id}
           initial={{ opacity: 0, x: -10 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -10 }}
           transition={{ duration: 0.2 }}
           className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
           onClick={() => handleSuggestionClick(s.slug, s._id)}
         >
           {s.name}
         </motion.li>
       ))}
     </motion.ul>
   </AnimatePresence>
 )}


          
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-2">
              <Link href="/products" className="py-2 text-gray-700 hover:text-blue-600">Daily Deals</Link>
              <Link href="#" className="py-2 text-gray-700 hover:text-blue-600">Categories</Link>
              <Link href="#" className="py-2 text-gray-700 hover:text-blue-600">Sell</Link>
              <Link href="#" className="py-2 text-gray-700 hover:text-blue-600">Help & Contact</Link>
              <div className="pt-2 border-t">
                <Link href="/login" className="block py-2 text-gray-700 hover:text-blue-600">Sign In</Link>
                <Link href="/register" className="block py-2 text-gray-700 hover:text-blue-600">Register</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}



     
