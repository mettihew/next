"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type ProductType = {
  _id: string;
  name: string;
  price: number;
  productImages: string[];
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const apiUrl = '/api/products/featured';
        
        const res = await fetch(apiUrl, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const json = await res.json();
        if (Array.isArray(json)) {
          setProducts(json);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("🚨 Fetch error:", err);
      } finally {
      }
    }

    load();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 mb-8">
     {products.map((product) => (
  <Link
    key={product._id}
    href={`/products/${product._id}`}
    className="block border rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-white"
  >
    <div className="relative w-full aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
      <Image
        src={product.productImages?.[0] || '/placeholder.png'}
        alt={product.name}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
    </div>
    
    {/* Product Info */}
    <div className="text-center space-y-1">
      <p className="font-semibold text-gray-900 line-clamp-2 leading-tight min-h-[2.5rem]">
        {product.name}
      </p>
      <p className="text-lg font-bold text-blue-600">${product.price}</p>
    </div>
  </Link>
))}
      </div>
    </>
  );
}