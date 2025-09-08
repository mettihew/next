





"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Heart, Bell, User, LogOut } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';

interface Suggestion {
  name: string;
  slug: string;
  _id: string;
}

export default function HeaderClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  
  // Zustand auth state
  const { user, isLoading, logout, initializeAuth } = useAuthStore();

  const categories = [ "All Categories", "Electronics", "Fashion", "Home & Garden", "Collectibles", "Sports", "Toys", "Business & Industrial"];

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Search suggestions effect
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

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

 const handleCategory = (category: string) => {
  console.log('Selected category:', category);
  
  // Actually do something with the category
  if (category && searchQuery.trim()) {
    // Search with category filter
    router.push(`/search?q=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(category)}`);
  } else if (category) {
    // Browse category without search query
    router.push(`/category/${encodeURIComponent(category.toLowerCase())}`);
  }
  
  (document.activeElement as HTMLElement)?.blur();
}

  return (
    <header className="bg-white shadow-sm top-0 z-50">
      {/* Top Navigation */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/products" className="hover:text-yellow-300">Daily Deals</Link>
            <Link href="#" className="hover:text-yellow-300">Sell</Link>
            <Link href="/about" className="hover:text-yellow-300">Help & Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* <Link href="/products" className="hover:text-yellow-300">Products</Link> */}
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              
              {isLoading ? (
                <span className="text-gray-300">Loading...</span>
              ) : user ? (
                <div className="flex items-center space-x-2">
                  <Link href="/dashboard" className="hover:text-yellow-300">
                    Hello, {user.username}
                  </Link>
                  <span>/</span>
                  <button 
                    onClick={handleLogout} 
                    className="hover:text-yellow-300 flex items-center space-x-1"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login" className="hover:text-yellow-300">Sign In</Link>
                  <span>/</span>
                  <Link href="/register" className="hover:text-yellow-300">Register</Link>
                </div>
              )}
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
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for anything..."
                  />
                  <button 
                    type="submit"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
                  >
                    <Search className="w-5 h-5 cursor-pointer" />
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

              {/* Category dropdown */}
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
            <Link href="/test" className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
              <Heart className="w-5 h-5 mr-1" />
              <span className="text-sm">Test</span>
            </Link>
            <button className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
              <Bell className="w-5 h-5 mr-1" />
              <span className="text-sm">Notifications</span>
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-600">
              <ShoppingCart className="w-5 h-5 mr-1" />
              <span className="text-sm">Cart</span>
              <span className="ml-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">0</span>
            </button>

            {!isLoading && (
              user ? (
                <Link href="/dashboard" className="flex items-center text-gray-700 hover:text-blue-600">
                  Hello, {user.username}
                </Link>
              ) : (
                <Link href="/login" className="flex items-center text-gray-700 hover:text-blue-600">
                  Login
                </Link>
              )
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="flex items-center w-full max-w-2xl border border-gray-300 rounded-full overflow-hidden bg-white">
            <div className="px-3 flex items-center text-gray-500">
              <button type="submit">
                <Search className="w-5 h-5" />
              </button>
            </div>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-2 pr-4 focus:outline-none"
              placeholder="Search for anything"
            />

            <select  onChange={(e) => handleCategory(e.target.value)} className="h-full border-l border-gray-300 px-3 py-2 bg-gray-50 text-sm focus:outline-none focus:bg-white">
              <option value="">All Categories</option>
              <option value="electronics">women</option>
              <option value="electronics">women</option>
              <option value="electronics">women</option>

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
              <Link href="/products" className="py-2 text-gray-700 hover:text-blue-600">All Products</Link>
              <Link href="#" className="py-2 text-gray-700 hover:text-blue-600">Categories</Link>
              <Link href="#" className="py-2 text-gray-700 hover:text-blue-600">Sell</Link>
              <Link href="#" className="py-2 text-gray-700 hover:text-blue-600">Help & Contact</Link>
              <div className="pt-2 border-t">
                {user ? (
                  <>
                    <Link href="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600">Dashboard</Link>
                    <button onClick={handleLogout} className="block py-2 text-gray-700 hover:text-blue-600">Logout</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block py-2 text-gray-700 hover:text-blue-600">Sign In</Link>
                    <Link href="/register" className="block py-2 text-gray-700 hover:text-blue-600">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}




// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Search, ShoppingCart, Heart, Bell, User, LogOut, Menu } from "lucide-react";
// import Link from "next/link";
// import { motion, AnimatePresence } from 'framer-motion';
// import { useRouter, usePathname } from 'next/navigation';
// import { useAuthStore } from '@/lib/authStore';

// // Types
// interface Suggestion {
//   name: string;
//   slug: string;
//   _id: string;
// }

// interface SearchFormProps {
//   isMobile?: boolean;
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   onSearch: (e: React.FormEvent) => void;
//   onCategorySelect: (category: string) => void;
//   suggestions: Suggestion[];
//   showDropdown: boolean;
//   onSuggestionClick: (slug: string, id: string) => void;
// }

// interface CategoryDropdownProps {
//   categories: string[];
//   selectedCategory: string;
//   isOpen: boolean;
//   onToggle: () => void;
//   onSelect: (category: string) => void;
//   isMobile?: boolean;
// }

// // Constants
// const CATEGORIES = [
//   "All Categories", 
//   "Electronics", 
//   "Fashion", 
//   "Home & Garden", 
//   "Collectibles", 
//   "Sports", 
//   "Toys", 
//   "Business & Industrial"
// ];

// const MOBILE_CATEGORY_OPTIONS = [
//   { value: "", label: "All Categories" },
//   { value: "women", label: "Women" },
//   { value: "electronics", label: "Electronics" },
//   { value: "fashion", label: "Fashion" },
//   { value: "home", label: "Home" },
//   { value: "toys", label: "Toys" },
//   { value: "books", label: "Books" }
// ];

// // Reusable Components
// const CategoryDropdown = ({ 
//   categories, 
//   selectedCategory, 
//   isOpen, 
//   onToggle, 
//   onSelect, 
//   isMobile = false 
// }: CategoryDropdownProps) => {
//   if (isMobile) {
//     return (
//       <select 
//         onChange={(e) => onSelect(e.target.value)} 
//         className="h-full border-l border-gray-300 px-3 py-2 bg-gray-50 text-sm focus:outline-none focus:bg-white"
//       >
//         {MOBILE_CATEGORY_OPTIONS.map(option => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     );
//   }

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={onToggle}
//         className="h-full px-4 py-2 border-t border-b border-r border-gray-300 bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 whitespace-nowrap rounded-r-full"
//       >
//         {selectedCategory}
//         <svg
//           className={`ml-2 w-4 h-4 inline transition-transform ${isOpen ? "rotate-180" : ""}`}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//           <ul className="py-1 text-sm text-gray-700 max-h-96 overflow-y-auto">
//             {categories.map((category) => (
//               <li key={category}>
//                 <button
//                   type="button"
//                   onClick={() => onSelect(category)}
//                   className={`block px-4 py-2 w-full text-left hover:bg-gray-100 ${
//                     selectedCategory === category ? "bg-blue-50 text-blue-600" : ""
//                   }`}
//                 >
//                   {category}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// const SuggestionsDropdown = ({ 
//   suggestions, 
//   showDropdown, 
//   onSuggestionClick 
// }: {
//   suggestions: Suggestion[];
//   showDropdown: boolean;
//   onSuggestionClick: (slug: string, id: string) => void;
// }) => {
//   if (!showDropdown || suggestions.length === 0) return null;

//   return (
//     <AnimatePresence>
//       <motion.ul
//         className="absolute z-20 bg-white border border-gray-200 w-full mt-1 rounded shadow"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -5 }}
//         transition={{ duration: 0.2 }}
//       >
//         {suggestions.map((suggestion) => (
//           <motion.li
//             key={suggestion._id}
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -10 }}
//             transition={{ duration: 0.2 }}
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//             onClick={() => onSuggestionClick(suggestion.slug, suggestion._id)}
//           >
//             {suggestion.name}
//           </motion.li>
//         ))}
//       </motion.ul>
//     </AnimatePresence>
//   );
// };

// const SearchForm = ({ 
//   isMobile = false, 
//   searchQuery, 
//   setSearchQuery, 
//   onSearch, 
//   onCategorySelect,
//   suggestions,
//   showDropdown,
//   onSuggestionClick
// }: SearchFormProps) => {
//   const formClassName = isMobile 
//     ? "flex items-center w-full max-w-2xl border border-gray-300 rounded-full overflow-hidden bg-white"
//     : "relative flex w-full";

//   const inputClassName = isMobile
//     ? "flex-1 py-2 pr-4 focus:outline-none"
//     : "w-full pl-10 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

//   return (
//     <form onSubmit={onSearch} className={formClassName}>
//       <div className="relative flex-grow">
//         <div className="relative">
//           {isMobile && (
//             <div className="px-3 flex items-center text-gray-500">
//               <button type="submit">
//                 <Search className="w-5 h-5" />
//               </button>
//             </div>
//           )}
          
//           <input
//             type="search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className={inputClassName}
//             placeholder={isMobile ? "Search for anything" : "Search for anything..."}
//           />
          
//           {!isMobile && (
//             <button 
//               type="submit"
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
//             >
//               <Search className="w-5 h-5 cursor-pointer" />
//             </button>
//           )}
//         </div>

//         <SuggestionsDropdown 
//           suggestions={suggestions}
//           showDropdown={showDropdown}
//           onSuggestionClick={onSuggestionClick}
//         />
//       </div>

//       <CategoryDropdown
//         categories={CATEGORIES}
//         selectedCategory="All Categories"
//         isOpen={false}
//         onToggle={() => {}}
//         onSelect={onCategorySelect}
//         isMobile={isMobile}
//       />
//     </form>
//   );
// };

// const TopNavigation = ({ user, isLoading, onLogout }: {
//   user: any;
//   isLoading: boolean;
//   onLogout: () => void;
// }) => (
//   <div className="bg-gray-900 text-white text-sm">
//     <div className="container mx-auto px-4 py-1 flex justify-between items-center">
//       <div className="flex items-center space-x-4">
//         <Link href="/products" className="hover:text-yellow-300">Daily Deals</Link>
//         <Link href="#" className="hover:text-yellow-300">Sell</Link>
//         <Link href="/about" className="hover:text-yellow-300">Help & Contact</Link>
//       </div>
//       <div className="flex items-center space-x-4">
//         <div className="flex items-center space-x-2">
//           <User className="w-4 h-4" />
          
//           {isLoading ? (
//             <span className="text-gray-300">Loading...</span>
//           ) : user ? (
//             <div className="flex items-center space-x-2">
//               <Link href="/dashboard" className="hover:text-yellow-300">
//                 Hello, {user.username}
//               </Link>
//               <span>/</span>
//               <button 
//                 onClick={onLogout} 
//                 className="hover:text-yellow-300 flex items-center space-x-1"
//               >
//                 <LogOut className="w-3 h-3" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-2">
//               <Link href="/login" className="hover:text-yellow-300">Sign In</Link>
//               <span>/</span>
//               <Link href="/register" className="hover:text-yellow-300">Register</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const UserActions = ({ user, isLoading }: { user: any; isLoading: boolean }) => (
//   <div className="flex items-center space-x-4">
//     <Link href="/test" className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
//       <Heart className="w-5 h-5 mr-1" />
//       <span className="text-sm">Test</span>
//     </Link>
//     <button className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
//       <Bell className="w-5 h-5 mr-1" />
//       <span className="text-sm">Notifications</span>
//     </button>
//     <button className="flex items-center text-gray-700 hover:text-blue-600">
//       <ShoppingCart className="w-5 h-5 mr-1" />
//       <span className="text-sm">Cart</span>
//       <span className="ml-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">0</span>
//     </button>

//     {!isLoading && (
//       user ? (
//         <Link href="/dashboard" className="flex items-center text-gray-700 hover:text-blue-600">
//           Hello, {user.username}
//         </Link>
//       ) : (
//         <Link href="/login" className="flex items-center text-gray-700 hover:text-blue-600">
//           Login
//         </Link>
//       )
//     )}
//   </div>
// );

// const MobileMenu = ({ 
//   isOpen, 
//   user, 
//   onLogout 
// }: { 
//   isOpen: boolean; 
//   user: any; 
//   onLogout: () => void; 
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="md:hidden bg-white border-t">
//       <div className="container mx-auto px-4 py-2">
//         <div className="flex flex-col space-y-2">
//           <Link href="/products" className="py-2 text-gray-700 hover:text-blue-600">All Products</Link>
//           <Link href="#" className="py-2 text-gray-700 hover:text-blue-600">Categories</Link>
//           <Link href="#" className="py-2 text-gray-700 hover:text-blue-600">Sell</Link>
//           <Link href="#" className="py-2 text-gray-700 hover:text-blue-600">Help & Contact</Link>
//           <div className="pt-2 border-t">
//             {user ? (
//               <>
//                 <Link href="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600">Dashboard</Link>
//                 <button onClick={onLogout} className="block py-2 text-gray-700 hover:text-blue-600">Logout</button>
//               </>
//             ) : (
//               <>
//                 <Link href="/login" className="block py-2 text-gray-700 hover:text-blue-600">Sign In</Link>
//                 <Link href="/register" className="block py-2 text-gray-700 hover:text-blue-600">Register</Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Header Component
// export default function HeaderClient() {
//   // State management
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All Categories");
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);
  
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
  
//   const { user, isLoading, logout, initializeAuth } = useAuthStore();

//   // Effects
//   useEffect(() => {
//     initializeAuth();
//   }, [initializeAuth]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(async () => {
//       if (searchQuery.trim().length >= 2) {
//         try {
//           const res = await fetch(`/api/products/suggestions?query=${searchQuery}`);
//           const data = await res.json();
//           setSuggestions(data);
//           setShowDropdown(true);
//         } catch (error) {
//           console.error('Error fetching suggestions:', error);
//           setSuggestions([]);
//           setShowDropdown(false);
//         }
//       } else {
//         setSuggestions([]);
//         setShowDropdown(false);
//       }
//     }, 300);

//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery]);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setIsCategoryOpen(false);
//   }, [pathname]);

//   // Event handlers
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       const categoryParam = selectedCategory !== "All Categories" 
//         ? `&category=${encodeURIComponent(selectedCategory)}` 
//         : "";
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}${categoryParam}`);
//       setShowDropdown(false);
//     }
//   };

//   const handleSuggestionClick = (slug: string, id: string) => {
//     router.push(`/products/${slug}/${id}`);
//     setSearchQuery('');
//     setShowDropdown(false);
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       router.push('/');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const handleCategorySelect = (category: string) => {
//     console.log('Selected category:', category);
    
//     // Handle category selection logic
//     if (category && searchQuery.trim()) {
//       // Search with category filter
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(category)}`);
//     } else if (category && category !== "All Categories") {
//       // Browse category without search query
//       router.push(`/category/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`);
//     }
    
//     // Close dropdown and blur element
//     setSelectedCategory(category);
//     setIsCategoryOpen(false);
//     (document.activeElement as HTMLElement)?.blur();
//   };

//   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
//   const toggleCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);

//   return (
//     <header className="bg-white shadow-sm top-0 z-50">
//       <TopNavigation 
//         user={user}
//         isLoading={isLoading}
//         onLogout={handleLogout}
//       />

//       {/* Main Header */}
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center">
//             <button 
//               className="md:hidden mr-4 text-gray-600"
//               onClick={toggleMobileMenu}
//               aria-label="Toggle mobile menu"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//             <Link href="/" className="text-lg font-bold text-blue-600">
//               Eesy
//             </Link>
//           </div>

//           {/* Desktop Search */}
//           <div className="hidden md:flex flex-1 max-w-2xl mx-2">
//             <SearchForm 
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//               onSearch={handleSearch}
//               onCategorySelect={handleCategorySelect}
//               suggestions={suggestions}
//               showDropdown={showDropdown}
//               onSuggestionClick={handleSuggestionClick}
//             />
//           </div>

//           <UserActions user={user} isLoading={isLoading} />
//         </div>

//         {/* Mobile Search */}
//         <div className="mt-3 md:hidden">
//           <SearchForm 
//             isMobile
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//             onSearch={handleSearch}
//             onCategorySelect={handleCategorySelect}
//             suggestions={suggestions}
//             showDropdown={showDropdown}
//             onSuggestionClick={handleSuggestionClick}
//           />
//         </div>
//       </div>

//       <MobileMenu 
//         isOpen={isMobileMenuOpen}
//         user={user}
//         onLogout={handleLogout}
//       />
//     </header>
//   );
// }