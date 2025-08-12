
export const dynamic = 'force-dynamic';

import FeaturedProducts from "@/components/FeaturedProducts";
import Image from "next/image";
import Link from "next/link";

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
    <main className="container mx-auto px-4 py-6">

<div className="flex items-center justify-center ">
      <Image src={'/images/camera.jpg'} alt="banner" width={1000} height={0} />
</div>



      <div className="flex border rounded m-5">
        <div className="space-y-4 px-2 ">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px]">
                Theres a deal for you, too
              </h1>
              <button className="mt-4 border rounded px-4 py-2 text-[8px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px]">
                Explore now
              </button>
            </div>
            <p className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              Dont miss a chance to save on items youve been looking for.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              Score these trending kicks
            </h1>
            <Link href="#" className="text-blue-500 underline text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              See all
            </Link>
          </div>
        </div>
      </div> 

      <FeaturedProducts />


<div className="flex gap-2 m-3">
      <Image src={'/images/girls-fashion/1.jpeg'} alt="girls-fashion" width={200} height={0} className="object-cover"/>
      <p className="absolute text-[50px]">explore</p>
      <Image src={'/images/girls-fashion/2.jpeg'} alt="girls-fashion" width={200} height={0} className="object-cover"/>
      <Image src={'/images/girls-fashion/3.jpeg'} alt="girls-fashion" width={200} height={0} className="object-cover"/>
      <Image src={'/images/girls-fashion/9.jpeg'} alt="girls-fashion" width={200} height={0} className="object-cover"/>
      <Image src={'/images/girls-fashion/10.jpeg'} alt="girls-fashion" width={200} height={0} className="object-cover"/>
</div>

{/* 
      <button>Score these trending kicks</button>
    <div className="overflow-x-auto flex gap-2 mb-4 ">
        {Array(3).fill(0).map((_, i) => (
          <div key={i}>
          <Image
            src="/images/shoes/shoe1.jpg" // use your actual image path
            alt={`Shoe ${i + 1}`}
            width={200}
            height={100}
            className="rounded-full"
          />
        <p>Jordan 4 Retro OG</p>
        </div>
        ))}
      </div> */}

 <div className="flex">
      <Image src={'/images/girls-fashion/4.jpeg'} alt="girls-fashion" width={200} height={0} className="object-cover"/>
      <p>You can find all the product you like no matter</p>
  </div>
      <p className="text-[20px]">You can find all the product you like no matter</p>

<div className="flex gap-2 m-3">
 
      <Image src={'/images/girls-fashion/5.jpeg'} alt="girls-fashion" width={200} height={0} className="object-cover"/>
      <Image src={'/images/girls-fashion/6.jpeg'} alt="girls-fashion" width={200} height={0} className="object-cover"/>
      <Image src={'/images/girls-fashion/7.jpeg'} alt="girls-fashion" width={200} height={0} className="object-cover"/>
</div>

      <div className="overflow-x-auto flex justify-around gap-2 mb-4 ">
        {Array(3).fill(0).map((_, i) => (
          <Image
            key={i}
            src="/globe.svg" // use your actual image path
            alt={`Shoe ${i + 1}`}
            width={100}
            height={100}
          />
        ))}
      </div>
      <Image
        src="https://m.media-amazon.com/images/I/51t1G+upZML._AC_UL480_QL65_.jpg"
        alt="Promo"
        width={300}
        height={300}
        className="mx-auto"
      />
    </main>
  );
}