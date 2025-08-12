"use client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: email.trim(), password: password.trim() }),
  credentials: "include", // << add this so cookies work
});
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      // localStorage.setItem("token", data.token); // 💾 Save JWT
      alert("Logged in as " + data.userId);
      // Redirect if needed, or just chill 😎
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-sm mx-auto mt-10 space-y-4">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border" />
      {error && <p className="text-red-500">{error}</p>}
      <button className="border border-1px-green bg-black text-white px-4 py-2 rounded">Login</button>
      <Link className="text-[10px]" href={'/register'}>Register</Link>
    </form>
  );
}
