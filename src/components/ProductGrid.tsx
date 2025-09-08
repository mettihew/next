// components/ProductGrid.tsx
"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import RouterSpinnerLink from "@/components/RouterSpinnerLink";

type Product = {
  id: number | string;
  name?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  originalPrice?: number;
  isPrime?: boolean;
};

type ProductGridProps = {
  title: string;
  products: Product[];
  href?: string;
  showDetails?: boolean; // toggle: Amazon-style vs simple gallery
};


export default function ProductGrid({ title, products, href, showDetails = true }: ProductGridProps) {

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
        {href && (
          <RouterSpinnerLink href={href}>
            <Button variant="link" className="text-blue-600 hover:text-blue-800 text-sm md:text-base">
              See all
            </Button>
          </RouterSpinnerLink>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

{products.map((product) => {
  const weightedRatings = [5, 5, 5, 5, 4, 4, 4, 3, 3, 2];
  const randomRating = weightedRatings[Math.floor(Math.random() * weightedRatings.length)];

  return (
    <div key={product.id} className="group relative p-3 border border-gray-100 hover:border-blue-200 rounded-lg transition-all hover:shadow-md">
      <div className="aspect-square bg-gray-50 rounded-md overflow-hidden">
        <Image
          src={product.image}
          alt={product.name || "product"}
          width={300}
          height={300}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>

      {showDetails && (
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < randomRating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({(Math.random() * (1300 - 550) + 50).toFixed(0)})
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-sm font-bold text-gray-900">
              ${(Math.random() * (300 - 50) + 50).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 line-through">
              ${(Math.random() * (300 - 50) + 50).toFixed(2)}
            </p>
          </div>
          <p className="text-xs text-green-600">Prime Delivery</p>
        </div>
      )}
    </div>
  );
})}
      </div>
    </div>
  );
}
