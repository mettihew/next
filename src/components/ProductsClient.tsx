'use client';

import { useState } from 'react';
// import { useCartStore } from '@/store/cartStore';

type Props = {
  productId: string;
};

export default function ProductsClient({ productId }: Props) {
  const [message, setMessage] = useState('');
  // const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    alert( productId)
  };

  const handleAddToWishlist = () => {
    setMessage('❤️ Added to wishlist!');
  };

  return (
    <>
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
        <button
          onClick={handleAddToWishlist}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Add to Wishlist
        </button>
      </div>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </>
  );
}
