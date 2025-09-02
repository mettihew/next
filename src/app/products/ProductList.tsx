'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
}



export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
      {products.map((product) => (
        <div key={product._id} className="border rounded shadow">
          <Link href={`/products/${product.slug}/${product._id}`}>
            <Image
              src={product.images[0] || '/placeholder.png'}
              alt={product.name}
              width={1000}
              height={0}
              className="w-full h-[200px] object-contain"
            />
          </Link>
          <h2 className="mt-2 font-bold text-sm truncate mx-1">{product.name}</h2>
          <p className="text-blue-600 mx-1">${product.price}</p>

          <div className="flex space-x-1 mx-1">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < 4 ? "★" : "☆"}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
