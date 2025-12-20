// app/products/category/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";

// Use absolute URL for server components
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

type Product = {
  _id: string;
  name: string;
  price: number;
  productImages?: string[];
  category?: string;
};

type ApiResponse = {
  products: Product[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  // Await params
  const { slug } = await params;
  const search = await searchParams;
  const page = search?.page || '1';
  const limit = 12;

  console.log('📁 Fetching category:', slug, 'page:', page);

  try {
    // Fetch products for this category
    const res = await fetch(
      `${baseUrl}/api/products?category=${encodeURIComponent(slug)}&page=${page}&limit=${limit}`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log('📊 API Response status:', res.status);

    if (!res.ok) {
      console.error('❌ API error:', res.status, res.statusText);
      notFound();
    }

    const data: ApiResponse = await res.json();
    const products = data.products || [];

    console.log('✅ Products found:', products.length);

    // Format category name for display
    const categoryName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {categoryName}
          </h1>
          <p className="text-gray-600">
            {data.total} products found
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try another category or check back later.
            </p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group border rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
                >
                  {/* Product Image */}
                  <div className="h-64 bg-gray-100 relative overflow-hidden">
                    {product.productImages?.[0] ? (
                      <Image
                        src={product.productImages[0]}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-2">
                      {product.name}
                    </h2>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      
                      {product.category && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {product.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination (if needed) */}
            {data.totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <a
                      key={pageNum}
                      href={`/products/category/${slug}?page=${pageNum}`}
                      className={`px-4 py-2 rounded-lg ${
                        pageNum === parseInt(page)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {pageNum}
                    </a>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    );
  } catch (error) {
    console.error('🔥 Error in category page:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${categoryName} Products - Your Store`,
    description: `Shop the best ${categoryName} products. Find great deals and quality items.`,
  };
}

// Optional: Generate static paths for better performance
export async function generateStaticParams() {
  // Define your categories here
  const categories = [
    'electronics',
    'clothing',
    'home-garden',
    'books',
    'sports',
    'beauty',
    'toys',
    'automotive'
  ];

  return categories.map((slug) => ({
    slug,
  }));
}