'use client';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function EbaySearchBar() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex max-w-2xl w-full mx-auto rounded-md overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400"
    >
      {/* Select Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-100 text-gray-800 px-3 py-2 text-sm border-r border-gray-300 focus:outline-none"
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="collectibles">Collectibles</option>
        <option value="home">Home & Garden</option>
      </select>

      {/* Text Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 text-sm focus:outline-none"
        placeholder="Search for anything"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 flex items-center justify-center"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}
