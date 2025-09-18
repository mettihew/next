// ReviewForm.tsx
"use client";
import { useState, FormEvent } from "react";

export default function ReviewForm({ productId }: { productId: string }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, comment, rating }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) setMessage(data.error || "Something went wrong");
    else {
      setMessage("Review submitted ✅");
      setComment("");
      setRating(5);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-2">
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border rounded p-2"
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 && "s"}
          </option>
        ))}
      </select>
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
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
