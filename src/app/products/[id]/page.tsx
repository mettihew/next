import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ProductsClient from '@/components/ProductsClient';
import Image from 'next/image';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

type Product = {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  category: string;
  subCategory: string;
  brand: string;
  description: string;
  specifications: Record<string, string | string[]>;
  productImages: string[];
  userImages: string[];
  bannerImage: string;
  rating: number;
  numReviews: number;
  stock: number;
  sold: number;
};

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: 'no-store',
    next: { tags: [`product-${id}`] },
  });

  if (!res.ok) return null;
  return res.json();
}


// export default async function ProductPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { id } = params;

//   if (!id || typeof id !== 'string') {
//     return notFound();
//   }


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // Add Promise wrapper
}) {
  const { id } = await params; // Await the params

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }

  // const discountedPrice = product.discount
  //   ? product.price * (1 - product.discount / 100)
  //   : null;

  // const renderRating = (rating: number) => {
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 >= 0.5;
  //   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  //   return (
  //     <div className="flex">
  //       {[...Array(fullStars)].map((_, i) => (
  //         <span key={`full-${i}`} className="text-yellow-400">★</span>
  //       ))}
  //       {hasHalfStar && <span className="text-yellow-400">½</span>}
  //       {[...Array(emptyStars)].map((_, i) => (
  //         <span key={`empty-${i}`} className="text-gray-300">★</span>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <main className="py-8 px-4 max-w-7xl mx-auto">
      <Breadcrumb />

      <div className="flex flex-col md:flex-row">
        {/* Left: Product Images and Description */}
        <div className="md:w-1/2 mt-10">
          <p className="text-lg font-semibold text-gray-600 mb-2">Product Images</p>
          <div className="h-[400px]">
            <Image
              src={product.productImages[0]}
              alt={product.name}
              width={600}
              height={400}
              loading="eager"
              className="w-full h-auto max-h-[400px] object-contain"
              priority
            />
          </div>

            <div className='flex justify-around'>
            {product?.productImages?.map((image, index) => (
              <Image key={index} src={image} alt={`Product image ${index + 1}`} width={50} height={50} />
      ))}
          </div>


          <p className="text-[30px] font-semibold mt-6">About this item</p>
          <p className="text-gray-700 mt-2">{product.description}</p>
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2">
          <div className="mb-4">
            <span className="text-sm text-gray-500">{product.brand}</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              {/* {renderRating(product.rating)} */}
              <span className="ml-2 text-sm text-gray-600">
                {/* {product.rating.toFixed(1)} ({product.numReviews} reviews) */}
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-600">{product.sold} sold</span>
            </div>

            {product.stock > 0 ? (
              <span className="text-sm text-green-600">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-sm text-red-600">Out of Stock</span>
            )}
          </div>

          {/* <div className="mb-6">
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
          </div> */}

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Specifications</h2>
            <div className="space-y-2">
              {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
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

      {/* Banner  */} 
      <Image
      src={product?.bannerImage}
        alt="banner"
        width={10000}
        height={10000}
        className="w-full object-contain mt-14"
      />


     {/* personl images  */}
     <h1>Reviews with images</h1>
<div className='flex overflow-x-auto space-x-4 py-4 scrollbar-hide'>
  {product?.userImages?.map((ev, i) => (
    <div key={i} className="flex-shrink-0"> 
      <Image 
        src={ev} 
        width={600} 
        height={600} 
        alt={`User image ${i + 1}`}
        className="min-w-[500px] h-auto object-contain rounded-lg shadow-lg"
      />
    </div>
  ))}
</div>


    </main>
  );
}