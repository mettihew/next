
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  productImages?: string[];
}

interface ReviewStats {
  averageRating: number;
  reviewCount: number;
}

interface Review {
  rating: number;
  comment: string;
  userId?: { name: string };
}

export default function ProductList({ products }: { products: Product[] }) {
  const [stats, setStats] = useState<Record<string, ReviewStats>>({});

  useEffect(() => {
    async function fetchStats() {
      const newStats: Record<string, ReviewStats> = {};
      await Promise.all(
        products.map(async (p) => {
          const res = await fetch(`/api/reviews?productId=${p._id}`);
          const data = await res.json();
          const reviews: Review[] = data.reviews || [];
          const count = reviews.length;
          const avg =
            count > 0
              ? reviews.reduce((acc, r) => acc + r.rating, 0) / count
              : 0;
          newStats[p._id] = { averageRating: avg, reviewCount: count };
        })
      );
      setStats(newStats);
    }
    fetchStats();
  }, [products]);

  return (
    // phone is 2 line, tablet 3, pc 4
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {products.map((product) => {
        const productStats = stats[product._id] || { averageRating: 0, reviewCount: 0 };
        const roundedRating = Math.round(productStats.averageRating);

        return (
          <div
            key={product._id}
            className="border rounded shadow hover:shadow-md transition-shadow"
          >
            <Link href={`/products/${product._id}`}>
              <div className="w-full h-[200px] relative">
                <Image
                  src={product.productImages?.[0] || '/placeholder.png'}
                  alt={product.name || 'Product'}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-t"
                />
              </div>
            </Link>

            <div className="p-2">
              <h2 className="font-bold text-sm truncate">{product.name}</h2>
              <p className="text-blue-600 font-semibold">${product.price.toFixed(2)}</p>

              {/* ⭐ Real rating */}
              <div className="flex items-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < roundedRating ? 'text-yellow-500' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({productStats.reviewCount})
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
