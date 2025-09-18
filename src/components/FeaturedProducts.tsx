

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import RouterSpinnerLink from "@/components/RouterSpinnerLink";

// function Spinner() {
//   return (
//     <div className="text-center py-10 text-gray-500">
//       <svg className="animate-spin mx-auto w-6 h-6" fill="none" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//         <path
//           className="opacity-75"
//           fill="currentColor"
//           d="M4 12a8 8 0 018-8v8H4z"
//         />
//       </svg>
//       <p className="mt-2">Loading featured products...</p>
//     </div>
//   );
// }

// type ProductType = {
//   _id: string;
//   name: string;
//   slug: string;
//   price: number;
//   images: { url: string; alt?: string }[];
// };

// export default function FeaturedProducts() {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function load() {
//       try {
//         const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
//         const res = await fetch(`${baseUrl}/api/products/featured`, {
//           method: 'GET',
//           cache: 'no-store',
//         });

//         if (!res.ok) throw new Error("Failed to fetch products");

//         const json = await res.json();
//         setProducts(json);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     load();
//   }, []);

//   console.log('beforrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', products);


//   if (loading) return <Spinner />;
//   if (!loading && products.length === 0) return null;

//   console.log('bruuuuuuuuuuuuuuuuuuuuuuuuuuu', products);
  

//   return (
//     <>
//       <div className="flex items-center justify-between mt-5">
//         <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-bold ml-1">Featured Products</h2>
//         <RouterSpinnerLink href="/products">
//           <Button variant="default">Explore All</Button>
//         </RouterSpinnerLink>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 mb-8">
//         {products.map((product) => (
//           <Link
//             key={product._id}
//             href={`/products/${encodeURIComponent(product.name)}/${product._id}?source=featured`}
//             className="block border rounded p-2 hover:shadow-md transition"
//           >
//             <Image
//               src={product.images?.[0]?.url || "/placeholder.jpg"}
//               alt={product.images?.[0]?.alt || product.name}
//               width={200}
//               height={0}
//               className="w-full max-w-[120px] mx-auto "
//             />
//             <p className="mt-2 font-medium text-center truncate w-48">{product.name}</p>
//             <p className="text-sm text-gray-600 text-center">${product.price}</p>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// }


"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import RouterSpinnerLink from "@/components/RouterSpinnerLink";

function Spinner() {
  return (
    <div className="text-center py-10 text-gray-500">
      <svg className="animate-spin mx-auto w-6 h-6" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      <p className="mt-2">Loading featured products...</p>
    </div>
  );
}

type ProductType = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: { url: string; alt?: string }[];
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setError(null);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const apiUrl = `${baseUrl}/api/products/featured`;
        
        console.log('🔍 Fetching from:', apiUrl);
        
        const res = await fetch(apiUrl, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('📡 Response status:', res.status);
        console.log('📡 Response ok:', res.ok);

        if (!res.ok) {
          const errorText = await res.text();
          console.error('❌ API Error:', errorText);
          throw new Error(`HTTP ${res.status}: ${errorText}`);
        }

        const json = await res.json();
        console.log('✅ API Response:', json);
        console.log('📊 Number of products:', Array.isArray(json) ? json.length : 'Not an array');

        if (Array.isArray(json)) {
          setProducts(json);
        } else {
          console.warn('⚠️ API did not return an array:', typeof json);
          setProducts([]);
        }
      } catch (err) {
        console.error("🚨 Fetch error:", err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  console.log('🎯 Current products state:', products);
  console.log('⏳ Loading state:', loading);
  console.log('❌ Error state:', error);

  if (loading) return <Spinner />;
  
  // Show error state
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading featured products: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // Show "no products" state for debugging
  if (!loading && products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No featured products found</p>
        <p className="text-sm text-gray-400 mt-2">Check your database and API route</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mt-5">
        <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-bold ml-1">
          Featured Products ({products.length})
        </h2>
        <RouterSpinnerLink href="/products">
          <Button variant="default">Explore All</Button>
        </RouterSpinnerLink>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 mb-8">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${encodeURIComponent(product.name)}/${product._id}?source=featured`}
            className="block border rounded p-2 hover:shadow-md transition"
          >
            <Image
              src={product.images?.[0]?.url || "/placeholder.jpg"}
              alt={product.images?.[0]?.alt || product.name}
              width={200}
              height={0}
              className="w-full max-w-[120px] mx-auto"
            />
            <p className="mt-2 font-medium text-center truncate w-48">{product.name}</p>
            <p className="text-sm text-gray-600 text-center">${product.price}</p>
          </Link>
        ))}
      </div>
    </>
  );
}