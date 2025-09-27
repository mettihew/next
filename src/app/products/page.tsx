

'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductList from './ProductList';
import LoaderDots from '@/components/LoadingDots';
import Pagination from '@/components/Pagination';

type Product = {
  _id: string;
  name: string;
  price: number;
  images: string[]; // More specific typing
};

type ProductData = {
  products: Product[];
  totalPages: number;
};

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 4;
  
  const [data, setData] = useState<ProductData>({ products: [], totalPages: 1 });
  const [loading, setLoading] = useState(true); // Start with true for initial load
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
        
        // Smooth scroll to top on page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setData({ products: [], totalPages: 1 });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/products?${params.toString()}`);
  };

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">All Products</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p className="font-medium">Error loading products</p>
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
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">All Products {data?.products?.length} Results</h1>
        {loading && (
          <div className="text-sm text-gray-500 animate-pulse">
            Loading products...
          </div>
        )}
      </div>

      {loading ? (
        <LoaderDots />
      ) : (
        <div className="space-y-8">
          {data.products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
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
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoaderDots />}>
      <ProductsContent />
    </Suspense>
  );
}