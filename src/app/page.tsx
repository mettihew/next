
export const dynamic = 'force-dynamic';

import FeaturedProducts from "@/components/FeaturedProducts";
import Image from "next/image";
import Link from "next/link";

import RouterSpinnerLink from "@/components/RouterSpinnerLink";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/ProductGrid";


const coffee2 = [
  {
    id: 1,
    name: "Premium Espresso Machine",
    image: "/images/del/2.jpg",
  },
   {
    id: 2,
    name: "Premium Espresso Machine",
    image: "/images/del/3.jpg",
  }, {
    id: 3,
    name: "Premium Espresso Machine",
    image: "/images/del/4.jpg",
  },{
    id: 4,
    name: "Premium Espresso Machine",
    image: "/images/del/5.jpg",
  },
];



const coffee3 = [
  {
    id: 1,
    name: "Premium Espresso Machine",
    image: "/images/del/6.jpg",
  },
   {
    id: 2,
    name: "Premium Espresso Machine",
    image: "/images/del/7.jpg",
  }, {
    id: 3,
    name: "Premium Espresso Machine",
    image: "/images/del/8.jpg",
  },{
    id: 4,
    name: "Premium Espresso Machine",
    image: "/images/del/10.jpg",
  },
];


const pets = [
  {
    id: 1,
    name: "Dogs",
    image: "/images/222/dog1.jpg",
  },
   {
    id: 2,
    name: "Cats",
    image: "/images/222/cat1.jpg",
  }, {
    id: 3,
    name: "Hamester",
    image: "/images/222/ham1.jpg",
  },{
    id: 4,
    name: "Toys",
    image: "/images/222/toy1.jpg",
  },
];

const decorations = [
  {
    id: 1,
    name: "home decorations",
    image: "/images/222/home1.jpg",
  },
   {
    id: 2,
    name: "home decorations",
    image: "/images/222/home2.jpg",
  }, {
    id: 3,
    name: "home decorations",
    image: "/images/222/home3.jpg",
  },{
    id: 4,
    name: "home decorations",
    image: "/images/222/home4.jpg",
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
      <div className="flex items-center justify-between mt-6 md:hidden">
        <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-bold ml-2 ">Fashion Products</h2>
        <RouterSpinnerLink href="/products">
          <Button variant="default">Explore All</Button>
        </RouterSpinnerLink>
      </div>

      <div className="flex items-center justify-center">
            <Image src={'/images/fashion/fashion-woman-banner2.jpg'} alt="fashion woman banner" width={1920} height={0} className="w-full h-auto max-w-100 md:hidden" />
      </div>



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

<ProductGrid
  title="Pets Toys"
  products={pets}
  href="/products/toys"
/>

<ProductGrid
  title="Home Decorations"
  products={decorations}
  href="/products/decorations"
/>


<div className="flex gap-2 overflow-x-auto p-4">
  {[
    { src: "/images/222/dress1.jpg", title: "Summer Dress", price: "$39.99" },
    { src: "/images/222/dress2.jpg", title: "Casual Outfit", price: "$29.99" },
    { src: "/images/222/dress3.jpg", title: "Elegant Gown", price: "$59.99" },
    { src: "/images/222/dress4.jpg", title: "Party Dress", price: "$45.99" },
    { src: "/images/222/dress5.jpg", title: "Classic Look", price: "$35.99" },
  ].map((item, i) => (
    <div
      key={i}
      className="flex-shrink-0 w-[170px] flex flex-col items-center text-center"
    >
      <Image
        src={item.src}
        alt={item.title}
        width={1000000}
        height={0}
        className="rounded-[10px] object-cover"
      />
      <p className="mt-2 text-sm font-semibold">{item.title}</p>
      <p className="text-gray-500">{item.price}</p>
      <button className="mt-1 px-3 py-1 bg-black text-white text-xs rounded-lg hover:bg-gray-800">
        Shop Now
      </button>
    </div>
  ))}
</div>

<div className="flex gap-2 overflow-x-auto p-4">
  {[
    { src: "/images/222/dress1.webp", title: "Summer Dress", price: "$39.99" },
    { src: "/images/222/dress2.webp", title: "Casual Outfit", price: "$29.99" },
    { src: "/images/222/dress3.webp", title: "Elegant Gown", price: "$59.99" },
    { src: "/images/222/dress4.webp", title: "Classic Look", price: "$35.99" },
    { src: "/images/222/dress5.webp", title: "Fancy", price: "$35.99" },
  ].map((item, i) => (
    <div
      key={i}
      className="flex-shrink-0 w-[170px] flex flex-col items-center text-center"
    >
      <Image
        src={item.src}
        alt={item.title}
        width={1000000}
        height={0}
        className="rounded-[10px] object-cover"
      />
      <p className="mt-2 text-sm font-semibold">{item.title}</p>
      <p className="text-gray-500">{item.price}</p>
      <button className="mt-1 px-3 py-1 bg-black text-white text-xs rounded-lg hover:bg-gray-800">
        Shop Now
      </button>
    </div>
  ))}
</div>



<FeaturedProducts />

    </main>
  );
}