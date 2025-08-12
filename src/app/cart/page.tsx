
'use client';

import LoadingDots from '@/components/LoadingDots';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

type Product = {
  _id: string;
  slug: string;  
  name: string;
  price: number;
  images: { url: string; alt: string }[];
};

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  const fetchProducts = async () => {
    const ids = cart.map((item) => item.productId);
    if (ids.length === 0) return;

    const res = await fetch(`/api/products/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: cart.map((item) => item.productId) }),
    });

    try {
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('Expected array but got:', data);
        setProducts([]); // fallback
      }
    } catch (err) {
      console.error('Error parsing response JSON:', err);
      setProducts([]);
    }
  };

  fetchProducts();
}, [cart]);


  const getProduct = (id: string) => products.find((p) => p._id === id);

  const subtotal = cart.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  const tax = subtotal * 0.1;
  const shipping = 5.99;
  const total = subtotal + tax + shipping;


  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>

                    <LoadingDots />
              {products.length !== 0 &&
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"> Continue Shopping
            </Link>
              }
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <div className="divide-y divide-gray-200">
              {products.length === 0 &&
                    <LoadingDots />
      }

              {cart.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <li key={item.productId} className="py-6">
                    <div className="flex gap-4 items-center">
                      <div className="w-24 h-24 rounded-md overflow-hidde bg-gray-200">
                        <Link href={`/products/${product.slug}/${product._id}`}>
                        <Image
                          src={product.images[0]?.url || '/favi.ico'}
                          alt={product.images[0]?.alt || product.name}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-gray-500">${product.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right font-semibold">
                        ${(product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 mt-8 lg:mt-0">
  <div className="bg-gray-50 p-6 rounded-2xl shadow-lg w-full min-w-[320px]">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
