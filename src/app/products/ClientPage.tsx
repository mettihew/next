// app/products/ClientPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductList from './ProductList';
import LoaderDots from '@/components/LoadingDots';


type Product = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: { url: string; alt?: string }[];
};

type ProductData = {
  products: Product[];
  totalPages: number;
};

export default function ClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get('page') || '1');
  const limit = 4; // fixed value (you control it)

  const [data, setData] = useState<ProductData>({ products: [], totalPages: 1 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?page=${page}&limit=${limit}`)
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
  }, [page]);

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/products?${params.toString()}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-1 py-3">
      <div className="flex">
        <h1 className="text-3xl font-bold mb-3">All Products</h1>
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
          <ProductList products={data.products} />
          <div className="mt-4 flex items-center gap-4">
            <button disabled={page === 1} onClick={() => updatePage(page - 1)}>
              Previous
            </button>
            <span>
              Page {page} of {data.totalPages}
            </span>
            <button
              disabled={page === data.totalPages}
              onClick={() => updatePage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
