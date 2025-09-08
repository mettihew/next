
export const dynamic = 'force-dynamic';

import FeaturedProducts from "@/components/FeaturedProducts";
import Image from "next/image";
import Link from "next/link";
import { Star } from 'lucide-react';  

import RouterSpinnerLink from "@/components/RouterSpinnerLink";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/ProductGrid";



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



const coffee3 = [
  {
    id: 1,
    name: "Premium Espresso Machine",
    image: "/images/del/6.jpg",
    rating: 4,
    reviewCount: 1024,
    price: 249.99,
    originalPrice: 299.99,
    isPrime: true
  },
   {
    id: 2,
    name: "Premium Espresso Machine",
    image: "/images/del/7.jpg",
    rating: 4,
    reviewCount: 1024,
    price: 249.99,
    originalPrice: 299.99,
    isPrime: true
  }, {
    id: 3,
    name: "Premium Espresso Machine",
    image: "/images/del/8.jpg",
    rating: 4,
    reviewCount: 1024,
    price: 249.99,
    originalPrice: 299.99,
    isPrime: true
  },{
    id: 4,
    name: "Premium Espresso Machine",
    image: "/images/del/10.jpg",
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



<ProductGrid
  title="Coffee Makers 1"
  products={coffee1}
  href="/products/coffee-makers"
/>

<ProductGrid
  title="Coffee Makers 2"
  products={coffee2}
  href="/products/coffee-makers"
/>

<ProductGrid
  title="Coffee Makers 3"
  products={coffee3}
  href="/products/coffee-makers"
/>


    </main>
  );
}