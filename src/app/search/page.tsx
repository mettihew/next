
// // import dbConnect from '@/lib/dbConnect';
// // import Product from '@/models/Product';
// // import FilterClient from '@/components/SearchFilterClient';
// // import ProductList from '../products/ProductList';

// // interface ProductType {
// //   _id: string;
// //   name: string;
// //   brand: string;
// //   price: number;
// //   images: {
// //     url: string;
// //     alt?: string;
// //   }[];
// //   slug: string;
// // }

// // export default async function SearchPage({
// //   searchParams,
// // }: {
// //   searchParams: Promise<Record<string, string | string[] | undefined>>;
// // }) {
// //   const params = await searchParams;
// //   await dbConnect();

// //   const query = typeof params.q === 'string' ? params.q : '';
// //   const brandParam = params.brand;
// //   const brandList = typeof brandParam === 'string' ? brandParam.split(',').map(b => b.trim()) : [];
// //   const min = parseFloat(typeof params.min === 'string' ? params.min : '0');
// //   const max = parseFloat(typeof params.max === 'string' ? params.max : `${Infinity}`);

// //   const filter: Record<string, unknown> = {
// //     isActive: true,
// //     name: { $regex: query, $options: 'i' },
// //   };

// //   if (brandList.length > 0) {
// //     filter.brand = { $in: brandList };
// //   }

// //   if (!isNaN(min) && !isNaN(max)) {
// //     filter.price = { $gte: min, $lte: max };
// //   }

// //   const rawProducts = await Product.find(filter).lean<ProductType[]>();
  
// //   // Transform the data to match ProductList expectations
// //   const products = rawProducts.map(p => ({
// //     ...p,
// //     _id: p._id.toString(),
// //     images: p.images.map(img => img) // Convert to string array
// //   }));

// //   const uniqueBrands = await Product.distinct('brand', { isActive: true });

// //   return (
// //     <div className="max-w-7xl mx-auto px-2 grid grid-cols-1 py-3 md:grid-cols-4 gap-2">
// //       <FilterClient
// //         query={query}
// //         brandList={brandList}
// //         uniqueBrands={uniqueBrands}
// //         min={min}
// //         max={max}
// //       />
// //       <ProductList products={products} />
// //     </div>
// //   );
// // }


// 'use client';

// import { Suspense, useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import ProductList from '../products/ProductList';
// import LoaderDots from '@/components/LoadingDots';
// import Pagination from '@/components/Pagination';
// import FilterClient from '@/components/SearchFilterClient';

// type Product = {
//   _id: string;
//   name: string;
//   brand: string;
//   price: number;
//   slug: string;
//   images: { url: string; alt?: string }[];
// };

// type ProductData = {
//   products: Product[];
//   totalPages: number;
//   uniqueBrands: string[];
// };

// function SearchContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const page = parseInt(searchParams.get('page') || '1');
//   const limit = 4;

//   const [data, setData] = useState<ProductData>({
//     products: [],
//     totalPages: 1,
//     uniqueBrands: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const params = new URLSearchParams(searchParams.toString());
//         params.set('page', page.toString());
//         params.set('limit', limit.toString());

//         // const response = await fetch(`/api/search?${params.toString()}`);
//         const response = await fetch(`/api/search/results?${params.toString()}`);

//         if (!response.ok) throw new Error(`Failed to fetch search results: ${response.statusText}`);

//         const result: ProductData = await response.json();
//         setData(result);

//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       } catch (err) {
//         console.error('Error fetching search:', err);
//         setError(err instanceof Error ? err.message : 'Failed to load search results');
//         setData({ products: [], totalPages: 1, uniqueBrands: [] });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [page, searchParams, limit]);

//   const handlePageChange = (newPage: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('page', newPage.toString());
//     router.push(`/search?${params.toString()}`);
//   };

//   if (error) {
//     return (
//       <main className="max-w-7xl mx-auto px-4 py-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold mb-4">Search Results</h1>
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//             <p className="font-medium">Error loading results</p>
//             <p className="text-sm">{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
//       <FilterClient
//         query={searchParams.get('q') || ''}
//         brandList={(searchParams.get('brand') || '').split(',').filter(Boolean)}
//         uniqueBrands={data.uniqueBrands}
//         min={parseFloat(searchParams.get('min') || '0')}
//         max={parseFloat(searchParams.get('max') || `${Infinity}`)}
//       />

//       <div className="md:col-span-3">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">Search Results</h1>
//           {loading && <div className="text-sm text-gray-500 animate-pulse">Loading...</div>}
//         </div>

//         {loading ? (
//           <LoaderDots />
//         ) : (
//           <div className="space-y-8">
//             {data.products.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg">No results found</p>
//               </div>
//             ) : (
//               <>
//                 <ProductList products={data.products} />
//                 {data.totalPages > 1 && (
//                   <Pagination
//                     currentPage={page}
//                     totalPages={data.totalPages}
//                     onPageChange={handlePageChange}
//                   />
//                 )}
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

// export default function Page() {
//   return (
//     <Suspense fallback={<LoaderDots />}>
//       <SearchContent />
//     </Suspense>
//   );
// }


'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductList from '../products/ProductList';
import LoaderDots from '@/components/LoadingDots';
import Pagination from '@/components/Pagination';
import FilterClient from '@/components/SearchFilterClient';

// API response type (what comes from the API)
type ApiProduct = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  slug: string;
  // images: { url: string; alt?: string }[];
  images: string[];
};

// Component type (what ProductList expects)
type Product = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  slug: string;
  images: string[]; // ProductList expects string[]
};

type ApiProductData = {
  products: ApiProduct[];
  totalPages: number;
  uniqueBrands: string[];
};

type ProductData = {
  products: Product[];
  totalPages: number;
  uniqueBrands: string[];
};

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 4;

  const [data, setData] = useState<ProductData>({
    products: [],
    totalPages: 1,
    uniqueBrands: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        params.set('limit', limit.toString());

        const response = await fetch(`/api/search/results?${params.toString()}`);

        if (!response.ok) throw new Error(`Failed to fetch search results: ${response.statusText}`);

        const result: ApiProductData = await response.json();
        
        // Transform API data to match ProductList expectations
        const transformedData: ProductData = {
          ...result,
          products: result.products.map(product => ({
            ...product,
            images: product.images.map(img => img) // Convert to string[]
          }))
        };
        
        setData(transformedData);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        console.error('Error fetching search:', err);
        setError(err instanceof Error ? err.message : 'Failed to load search results');
        setData({ products: [], totalPages: 1, uniqueBrands: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, searchParams, limit]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/search?${params.toString()}`);
  };

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p className="font-medium">Error loading results</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <FilterClient
        query={searchParams.get('q') || ''}
        brandList={(searchParams.get('brand') || '').split(',').filter(Boolean)}
        uniqueBrands={data.uniqueBrands}
        min={parseFloat(searchParams.get('min') || '0')}
        max={parseFloat(searchParams.get('max') || `${Infinity}`)}
      />

      <div className="md:col-span-3">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Search Results</h1>
          {loading && <div className="text-sm text-gray-500 animate-pulse">Loading...</div>}
        </div>

        {loading ? (
          <LoaderDots />
        ) : (
          <div className="space-y-8">
            {data.products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No results found</p>
              </div>
            ) : (
              <>
                <ProductList products={data.products} />
                {data.totalPages > 1 && (
                  <Pagination
                    currentPage={page}
                    totalPages={data.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoaderDots />}>
      <SearchContent />
    </Suspense>
  );
}