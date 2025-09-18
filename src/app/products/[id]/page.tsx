
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ProductsClient from '@/components/ProductsClient';

import Image from 'next/image';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

type Product = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  category: string;
  subCategory: string;
  brand: string;
  description: string;
  specifications: Record<string, string | string[]>;
  images: string[];
  banner: string;
  rating: number;
  numReviews: number;
  stock: number;
  sold: number;
};

async function getProduct(slug: string, id: string ): Promise<Product | null> {
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: 'no-store',
    next: { tags: [`product-${id}`] },
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string, id: string }> }) {
  const { slug, id } = await params;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const product = await getProduct(slug, id);

  if (!product) {
    return notFound();
  }

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100)
    : null;

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">½</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </div>
    );
  };
  

  return (
    <main className="py-8 px-4 max-w-7xl mx-auto">

     <Breadcrumb />


<div className="flex flex-col md:flex-row">


  {/* Left: Product Images and Description */}
  <div className="md:w-1/2 mt-10">

    <p className="text-lg font-semibold text-gray-600 mb-2">Product Images</p>
    <div className="h-[400px]">
      <Image
        src={product.images[0]}
        alt={product.name}
        width={600}
        height={400}
        loading="eager"
        className="w-full h-auto max-h-[400px] object-contain"
        priority
        // unoptimized={!product.images[0].startsWith('http')}
      />
    </div>

    <p className="text-[30px] font-semibold mt-6">About this item</p>
    <p className="text-gray-700 mt-2">
      Bali has the #1 Minimizer in the market (DF3385). Source: Circana, Retail Tracking Service,
      U.S. Brand Sales, Women’s Non-Sports Bras, Brand Model, 12 Months Ending August 2024. <br />
      <br />
      SAY BYE-BYE TO UP TO 1.5 INCHES – Full-coverage bra with minimizer construction can pare your
      profile by up to 1.5 inches. <br />
      <br />
      SHAPING & SUPPORT – The encased underwire and 2-ply supportive fabric provide the shaping and
      support you want in a full-coverage bra. <br />
      <br />
      SMOOTH, SILKY, AND SEAMFREE – Underwire bra with lightly lined 2-ply cups that disappear under
      tees and other clingy clothes. <br />
      <br />
      COMFORT STRAPS – No-slip straps help alleviate shoulder stress. <br />
      <br />
      ALL ABOUT THE DETAILS – This pretty minimizing bra has lace insets where cups meet the straps
      and a 3-column, 2-row hook & eye closure.</p>
  </div>

  




        {/* Product Info */}
        <div className="md:w-1/2">
          <div className="mb-4">
            <span className="text-sm text-gray-500">{product.brand}</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              {renderRating(product.rating)}
              <span className="ml-2 text-sm text-gray-600">
                {product.rating.toFixed(1)} ({product.numReviews} reviews)
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-600">{product.sold} sold</span>
            </div>

            {product.stock > 0 ? (
              <span className="text-sm text-green-600">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-sm text-red-600">Out of Stock</span>
            )}
          </div>

          <div className="mb-6">
            {discountedPrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900 mr-3">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-3 bg-red-100 text-red-800 text-sm font-medium px-2 py-0.5 rounded">
                  {product.discount}% OFF
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Specifications</h2>
            <div className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="w-1/3 text-gray-600">{key}:</span>
                  <span className="w-2/3 text-gray-800">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </span>
                </div>
              ))}
            </div>
          </div>


    <ProductsClient productId={product._id} />

      </div>
</div>




 {/* banner  */}
<Image
  src={"https://m.media-amazon.com/images/S/aplus-media-library-service-media/f6f098fa-cd46-425b-ae21-1a52b89abce0.__CR0,0,970,300_PT0_SX970_V1___.jpg"}
  alt={"banner"}
  width={10000}
  height={10000}
  className="w-full h-auto object-contain mt-14"
/>


   
    </main>
  );
}