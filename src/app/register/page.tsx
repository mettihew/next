"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.errors) {
        const messages = (Object.values(data.errors) as { message: string }[])
  .map((err) => err.message)
  .join(", ");
        setError(messages);
      } else {
        // setError(data.error?.message || data.message || data.error || "Something went wrong");
        setError(JSON.stringify(data.error || "Something went wrong"));
      }
    } else {
      setError("");
      alert("Welcome, " + data.userId);
      // TODO: Redirect or set cookie/localStorage
    }
  }

  return (
    <form onSubmit={handleRegister} className="p-4 max-w-sm mx-auto mt-10 space-y-4">
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full p-2 border"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border"
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full p-2 border"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button className="bg-black text-white px-4 py-2 rounded">Register</button>
      <Link className="text-[10px]" href={'/login'}>login</Link>
    </form>
  );
}
