'use client';


import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

 type Product = {
  _id: string;
  name: string;
  slug?: string;
  detail?: string;
  images?: {
    url: string;
    alt?: string;
  }[];
};

export default function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);

  return (
    <li className="border rounded-lg hover:shadow-md transition-shadow relative">

      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-2 right-2 text-xl"
      >
        {liked ? '❤️' : '🤍'}
      </button>



      <div>
        {product.images?.[0]?.url && (
          <div className="relative aspect-square">
            <Link href={`/product/${product._id}`}>
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name || 'Product image'}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              </Link>
           </div>
        )}
      </div>



<div className='px-1'>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-2">{product.slug}</p>
      <p className="text-gray-800">{product.detail}</p>
</div>

    </li>
  );
}
