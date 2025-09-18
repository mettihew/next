
// app/category/[slug]/ClientPage.tsx
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductList from '@/app/products/ProductList';
import LoaderDots from '@/components/LoadingDots';
import Pagination from '@/components/Pagination';

type Product = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: [];
};

type ProductData = {
  products: Product[];
  totalPages: number;
  categoryName?: string;
};

interface ClientPageProps {
  categorySlug: string;
}

export default function ClientPage({ categorySlug }: ClientPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 14; // fixed value (you control it)

  const [data, setData] = useState<ProductData>({ products: [], totalPages: 1 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/category/${categorySlug}?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(() => {
        setData({ products: [], totalPages: 1 });
        setLoading(false);
      });
  }, [page, categorySlug]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/category/${categorySlug}?${params.toString()}`);
  };

  // Format category name for display
  const categoryDisplayName = data.categoryName || 
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

console.log(data);
    

  return (
    <main className="max-w-7xl mx-auto px-1 py-3">
      <div className="flex">
        <h1 className="text-3xl font-bold mb-3 p-3">{categoryDisplayName} Products</h1>
        {loading && (
          <div className="text-center text-gray-400 animate-pulse mt-2 ml-2">
            Loading products...
          </div>
        )}
      </div>
      {loading ? (
        <LoaderDots />
      ) : (
        <div>
          {data?.products?.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-gray-600">
                There are currently no products in the {categoryDisplayName} category.
              </p>
            </div>
          ) : (
            <>
              <ProductList products={data.products} />
              <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      )}
    </main>
  );
}
