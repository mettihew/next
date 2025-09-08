import Image from "next/image";

export default function NotFound() {
  return (
    <div className="text-center mt-10">
      <Image src="/images/404-dog.jpeg" alt="not-found-dog" width={100} height={0} className="mx-auto"/>
      <h1 className="text-3xl font-bold">404 - Product Not Found</h1>
      <p>Sorry, we couldnt find that product.</p>
    </div>
  );
}
