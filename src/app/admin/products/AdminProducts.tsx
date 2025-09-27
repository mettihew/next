'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  featured: boolean;
  isActive: boolean;
  stock: number;
  productImages: string[];
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  // Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle featured status
  const toggleFeatured = async (productId: string, currentFeatured: boolean) => {
    setUpdating(productId);
    try {
      const response = await fetch('/api/admin/products/featured', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          featured: !currentFeatured
        })
      });

      if (response.ok) {
        // Update local state
        setProducts(products.map(p => 
          p._id === productId 
            ? { ...p, featured: !currentFeatured }
            : p
        ));
      }
    } catch (error) {
      console.error('Error updating featured status:', error);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  const featuredCount = products.filter(p => p.featured).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-600">
            Total Products: {products.length} | Featured: {featuredCount}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product._id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden border-2 transition-all ${
                product.featured ? 'border-red-200 bg-red-50' : 'border-gray-200'
              }`}
            >
              {/* Product Image */}
              <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                {product?.productImages && product.productImages[0] ? (
                  <Image
                    src={product.productImages[0]} 
                    alt={product.name}
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <svg className="mx-auto h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">No Image</p>
                  </div>
                )}
                
                {/* Featured Heart Button */}
                <button
                  onClick={() => toggleFeatured(product._id, product.featured)}
                  disabled={updating === product._id}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all transform hover:scale-110 disabled:opacity-50"
                  title={product.featured ? 'Remove from featured' : 'Add to featured'}
                >
                  {updating === product._id ? (
                    <div className="animate-spin h-5 w-5 border-2 border-red-300 border-t-red-600 rounded-full"></div>
                  ) : (
                    <svg 
                      className={`h-5 w-5 transition-colors ${
                        product.featured ? 'text-red-500 fill-current' : 'text-gray-400'
                      }`} 
                      fill={product.featured ? 'currentColor' : 'none'}
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-blue-600 mb-2">
                  ${product.price.toFixed(2)}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Stock: {product.stock}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {product.featured && (
                  <div className="mt-2 flex items-center text-red-600 text-sm font-medium">
                    <svg className="h-4 w-4 mr-1 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400">Add some products to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}