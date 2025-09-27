
export const dynamic = 'force-dynamic';

import FeaturedProducts from "@/components/FeaturedProducts";
import Image from "next/image";
import Link from "next/link";

import RouterSpinnerLink from "@/components/RouterSpinnerLink";
import { Button } from "@/components/ui/button";
import ProductsHome from "@/components/ProductsHome";


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


export default async function HomePage() {

  return (
    <main className="container mx-auto">

<div className="flex items-center justify-center p-2">
      <Image src={'/images/camera.jpg'} alt="banner" width={1000} height={0} />
</div>





 {/* there is deal for you ? */}
  <div className="flex border rounded m-2">
        <div className="space-y-4 w-full m-2">
          <div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[16px] sm:text-[18px] md:text-[18px] lg:text-[20px] xl:text-[20px]">
                Theres a deal for you, too
              </h1>
              <button className=" border rounded p-1 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
                Explore now
              </button>
            </div>
            <p className="pt-2 text-[14px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]">
              Dont miss a chance to save on items youve been looking for.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h1 className=" text-[14px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]">
              Score these trending kicks
            </h1>
            <Link href="#" className="text-blue-500 underline text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              See all
            </Link>
          </div>
        </div>
      </div> 






<ProductsHome
  title="Coffee Makers 2"
  products={coffee2}
  href="/products/coffee-makers"
/>

<ProductsHome
  title="Coffee Makers 3"
  products={coffee3}
  href="/products/coffee-makers"
/>

<ProductsHome
  title="Pets Toys"
  products={pets}
  href="/products/toys"
/>

<ProductsHome
  title="Home Decorations"
  products={decorations}
  href="/products/decorations"
/>



<div className="flex space-x-4 overflow-x-auto">
  {[
    { src: "/images/222/dress1.jpg", title: "Summer Dress", price: "$39.99" },
    { src: "/images/222/dress2.jpg", title: "Casual Outfit", price: "$29.99" },
    { src: "/images/222/dress3.jpg", title: "Elegant Gown", price: "$59.99" },
    { src: "/images/222/dress4.jpg", title: "Party Dress", price: "$45.99" },
    { src: "/images/222/dress5.jpg", title: "Classic Look", price: "$35.99" },
  ].map((item, i) => (
    <div
      key={i}
      className="flex-shrink-0 w-[170px] sm:w-[220px] md:w-[300px] text-center"
    >
      <div className="relative w-full h-[220px] sm:h-[280px] md:h-[350px]">
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="rounded-[10px] object-cover"
          sizes="(max-width: 640px) 170px,
                 (max-width: 768px) 220px,
                 300px"
        />
      </div>
      <p className="mt-2 text-sm font-semibold">{item.title}</p>
      <p className="text-gray-500">{item.price}</p>
      <button className="mt-1 px-3 py-1 bg-black text-white text-xs rounded-lg hover:bg-gray-800">
        Shop Now
      </button>
    </div>
  ))}
</div>




<div className="flex space-x-4 overflow-x-auto">
  {[
    { src: "/images/222/dress1.webp", title: "Summer Dress", price: "$39.99" },
    { src: "/images/222/dress2.webp", title: "Casual Outfit", price: "$29.99" },
    { src: "/images/222/dress3.webp", title: "Elegant Gown", price: "$59.99" },
    { src: "/images/222/dress4.webp", title: "Classic Look", price: "$35.99" },
    { src: "/images/222/dress5.webp", title: "Fancy", price: "$35.99" },
  ].map((item, i) => (
    <div
      key={i}
      className="flex-shrink-0 w-[170px] sm:w-[220px] md:w-[300px] text-center"
    >
      <div className="relative w-full h-[220px] sm:h-[280px] md:h-[350px]">
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="rounded-[10px] object-cover"
          sizes="(max-width: 640px) 170px,
                 (max-width: 768px) 220px,
                 300px"
        />
      </div>
      <p className="mt-2 text-sm font-semibold">{item.title}</p>
      <p className="text-gray-500">{item.price}</p>
      <button className="mt-1 px-3 py-1 bg-black text-white text-xs rounded-lg hover:bg-gray-800">
        Shop Now
      </button>
    </div>
  ))}
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


<FeaturedProducts />

    </main>
  );
}