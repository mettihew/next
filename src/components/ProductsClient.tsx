"use client";

import { useEffect, useState } from "react";
import ReviewForm from "@/components/ReviewForm";

// interface Review {
//   _id: string;
//   userId?: { name: string };
//   rating: number;
//   comment: string;
// }

interface Review {
  _id: string;
  userId?: { username: string };
  rating: number;
  comment: string;
}

interface Props {
  productId: string;
}

export default function ProductsClient({ productId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState(0);
  const [message, setMessage] = useState('');

  // Fetch reviews
  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        const revs = data.reviews || [];
        setReviews(revs);
        if (revs.length > 0) {
          setAverage(
            revs.reduce((sum: number, r: Review) => sum + r.rating, 0) / revs.length
          );
        }
      });
  }, [productId]);

  // Render stars for rating
  const renderStars = (rating: number) => {
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

  // Handlers
  const handleAddToCart = () => {
    alert(`Added product ${productId} to cart!`);
  };

  const handleAddToWishlist = () => {
    setMessage('❤️ Added to wishlist!');
  };

  return (
    <div className="space-y-8">

      {/* Add to Cart / Wishlist */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
        <button
          onClick={handleAddToWishlist}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Add to Wishlist
        </button>
      </div>
      {message && <p className="mt-2 text-green-600">{message}</p>}

      {/* Reviews Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        <div className="bg-yellowwwwwwww-100 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className="text-4xl font-bold mr-4">{average.toFixed(1)}</div>
            <div>
              {renderStars(average)}
              <p className="text-sm text-gray-600 mt-1">
                Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-4 mb-6">
              {reviews.map((r) => (
                <div key={r._id} className="border-b pb-2">
                  
                  <div className="flex">
                  <p className="font-semibold">{r.userId?.username || "Anonymous"}</p>
                  <p className="text-xs text-gray-500">{r.rating} ★</p>
                  </div>

                  <p className="text-sm text-gray-700">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mb-6">No reviews yet. Be the first to review this product!</p>
          )}

          <ReviewForm productId={productId} />
        </div>
      </section>
    </div>
  );
}
