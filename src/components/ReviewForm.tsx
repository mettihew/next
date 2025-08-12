"use client";
import { useState, FormEvent } from "react";

export default function ReviewForm({ productId }: { productId: string }) {
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, review }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Something went wrong");
    } else {
      setMessage("Review submitted ✅");
      setReview("");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Submit Review
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </form>
  );
}
