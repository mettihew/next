
export const dynamic = 'force-dynamic';

import FeaturedProducts from "@/components/FeaturedProducts";
import Image from "next/image";
import Link from "next/link";
import { Star } from 'lucide-react';  

import RouterSpinnerLink from "@/components/RouterSpinnerLink";
import { Button } from "@/components/ui/button";



const coffee1 = [
  {
    id: 1,
    name: "Premium Espresso Machine",
    image: "/images/del/2.jpg",
    rating: 4,
    reviewCount: 1024,
    price: 249.99,
    originalPrice: 299.99,
    isPrime: true
  },
   {
    id: 2,
    name: "Premium Espresso Machine",
    image: "/images/del/2.jpg",
    rating: 4,
    reviewCount: 1024,
    price: 249.99,
    originalPrice: 299.99,
    isPrime: true
  }, {
    id: 3,
    name: "Premium Espresso Machine",
    image: "/images/del/2.jpg",
    rating: 4,
    reviewCount: 1024,
    price: 249.99,
    originalPrice: 299.99,
    isPrime: true
  },{
    id: 4,
    name: "Premium Espresso Machine",
    image: "/images/del/2.jpg",
    rating: 4,
    reviewCount: 1024,
    price: 249.99,
    originalPrice: 299.99,
    isPrime: true
  },
];


const coffee2 = [
  {
    id: 1,
    name: "Premium Espresso Machine",
    image: "/images/del/2.jpg",
    rating: 4,
    reviewCount: 1024,
    price: 249.99,
    originalPrice: 299.99,
    isPrime: true
  },
   {
    id: 2,
    name: "Premium Espresso Machine",
    image: "/images/del/3.jpg",
    rating: 4,
    reviewCount: 1024,
    price: 249.99,
    originalPrice: 299.99,
    isPrime: true
  }, {
    id: 3,
    name: "Premium Espresso Machine",
    image: "/images/del/4.jpg",
    rating: 4,
    reviewCount: 1024,
    price: 249.99,
    originalPrice: 299.99,
    isPrime: true
  },{
    id: 4,
    name: "Premium Espresso Machine",
    image: "/images/del/5.jpg",
    rating: 4,
    reviewCount: 1024,
    price: 249.99,
    originalPrice: 299.99,
    isPrime: true
  },
];

// type ProductType = {
//   _id: string;
//   name: string;
//   slug: string;
//   price: number;
//   images: { url: string; alt?: string }[];
// };

// async function getProducts(): Promise<ProductType[]> {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
//   const res = await fetch(`${baseUrl}/api/products/featured`, {
//     method: 'GET',
//     cache: 'no-store',
//   });

//   if (!res.ok) throw new Error('Failed to fetch products');

//   return res.json();
// }

export default async function HomePage() {
  // let products: ProductType[] = [];

  // try {
  //   products = await getProducts();
  // } catch (error) {
  //   console.error('Fetch error:', error);
  // }

  return (
    // <main className="container mx-auto px-4 py-6">
    <main className="container mx-auto">

<div className="flex items-center justify-center p-2">
      <Image src={'/images/camera.jpg'} alt="banner" width={1000} height={0} />
</div>





 {/* there is deal for you ? */}
  <div className="flex border rounded m-2">
        <div className="space-y-4 px-2 w-full m-2">
          <div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px]">
                Theres a deal for you, too
              </h1>
              <button className=" border rounded px-3 py-2 text-[8px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px]">
                Explore now
              </button>
            </div>
            <p className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              Dont miss a chance to save on items youve been looking for.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h1 className=" text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              Score these trending kicks
            </h1>
            <Link href="#" className="text-blue-500 underline text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              See all
            </Link>
          </div>
        </div>
      </div> 




  {/* banner of sunglesses extremly hot fashion lady  */}
   <div className="flex items-center justify-between mt-6 ">
        <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-bold ml-2 ">Fashion Products</h2>
        <RouterSpinnerLink href="/products">
          <Button variant="default">Explore All</Button>
        </RouterSpinnerLink>
      </div>
<div className="flex items-center justify-center ">
      <Image src={'/images/fashion/fashion-woman-banner2.jpg'} alt="fashion woman banner" width={1920} height={0} className="w-full h-auto max-w-100" />
</div>




     

      <FeaturedProducts />



 {/* there is deal for you ? */}
  <div className="flex border rounded m-2 mt-6">
        <div className="space-y-4 px-2 w-full m-4">
          <div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px]">
                Theres a deal for you, too
              </h1>
              <button className=" border rounded px-3 py-2 text-[8px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px]">
                Explore now
              </button>
            </div>
            <p className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              Dont miss a chance to save on items youve been looking for.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h1 className=" text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              Score these trending kicks
            </h1>
            <Link href="#" className="text-blue-500 underline text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              See all
            </Link>
          </div>
        </div>
      </div> 





















{/* Dynamic 2×2 Amazon-Style Grid */}
<div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Coffee Makers 1</h2>
    <RouterSpinnerLink href="/products/coffee-makers">
      <Button variant="link" className="text-blue-600 hover:text-blue-800 text-sm md:text-base">
        See all
      </Button>
    </RouterSpinnerLink>
  </div>

  {/* Dynamic 2×2 Grid */}
  <div className="grid grid-cols-4 gap-4">
    {coffee1.slice(0, 4).map((product) => (
      <div 
        key={product.id}
        className="group relative p-3 border border-gray-100 hover:border-blue-200 rounded-lg transition-all hover:shadow-md"
      >
        <div className="aspect-square bg-gray-50 rounded-md overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-sm font-bold text-gray-900">${product.price}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-500 line-through">${product.originalPrice}</p>
            )}
          </div>
          {product.isPrime && (
            <p className="text-xs text-green-600">Prime Delivery</p>
          )}
        </div>
      </div>
    ))}
  </div>
</div>














{/* Dynamic 2×2 Amazon-Style Grid */}
<div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Coffee Makers 2</h2>
    <RouterSpinnerLink href="/products/coffee-makers">
      <Button variant="link" className="text-blue-600 hover:text-blue-800 text-sm md:text-base">
        See all
      </Button>
    </RouterSpinnerLink>
  </div>

  {/* Dynamic 2×2 Grid */}
  <div className="grid grid-cols-4 gap-4">
    {coffee2.slice(0, 4).map((product) => (
      <div 
        key={product.id}
        className="group relative p-3 border border-gray-100 hover:border-blue-200 rounded-lg transition-all hover:shadow-md"
      >
        <div className="aspect-square bg-gray-50 rounded-md overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-sm font-bold text-gray-900">${product.price}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-500 line-through">${product.originalPrice}</p>
            )}
          </div>
          {product.isPrime && (
            <p className="text-xs text-green-600">Prime Delivery</p>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
















































{/* four fashion ladies */}
    {/* <div className="flex items-center justify-between mt-6 ">
        <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-bold ml-2 ">Fashion Products</h2>
        <RouterSpinnerLink href="/products">
          <Button variant="default">Explore All</Button>
        </RouterSpinnerLink>
      </div>
  <div className="flex flex-wrap justify-around">
    {[9, 1, 2, 10].map((id) => (
      <div key={id} className="w-[calc(50vw-20px)] flex-shrink-0 snap-start"> 
        <Image
          src={`/images/fashion/${id}.jpeg`}
          alt="fashion"
          width={600}
          height={400} // Explicit height to avoid layout shift
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
    ))}
  </div> */}




  {/* Coffee makers 2 */}
<div className="flex items-center justify-between mt-6 ">
        <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-bold ml-2 ">Coffee Makers</h2>
        <RouterSpinnerLink href="/products">
          <Button variant="default">Explore All</Button>
        </RouterSpinnerLink>
      </div>
<div className="flex flex-wrap">
  {/* Container for horizontal scroll (mobile) */}
  <div className=" flex flex-wrap justify-around">
    {[ 6, 7, 8, 10].map((id) => (
      <div key={id} className="w-[calc(50vw-20px)] flex-shrink-0 snap-start"> 
        <Image
          src={`/images/del/${id}.jpg`}
          alt="del"
          width={600}
          height={400} // Explicit height to avoid layout shift
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
    ))}
  </div>
</div>




    </main>
  );
}