// // "use client";
// // import Link from "next/link";
// // import { useState } from "react";

// // export default function RegisterPage() {
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   async function handleRegister(e: React.FormEvent) {
// //     e.preventDefault();
// //     const res = await fetch("/api/auth/register", {
// //       method: "POST",
// //       body: JSON.stringify({ username, email, password }),
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });

// //     const data = await res.json();

// //     if (!res.ok) {
// //       if (data.errors) {
// //         const messages = (Object.values(data.errors) as { message: string }[])
// //   .map((err) => err.message)
// //   .join(", ");
// //         setError(messages);
// //       } else {
// //         // setError(data.error?.message || data.message || data.error || "Something went wrong");
// //         setError(JSON.stringify(data.error || "Something went wrong"));
// //       }
// //     } else {
// //       setError("");
// //       alert("Welcome, " + data.userId);
// //       // TODO: Redirect or set cookie/localStorage
// //     }
// //   }

// //   return (
// //     <form onSubmit={handleRegister} className="p-4 max-w-sm mx-auto mt-10 space-y-4">
// //       <input
// //         value={username}
// //         onChange={e => setUsername(e.target.value)}
// //         placeholder="Username"
// //         className="w-full p-2 border"
// //       />
// //       <input
// //         value={email}
// //         onChange={e => setEmail(e.target.value)}
// //         placeholder="Email"
// //         className="w-full p-2 border"
// //       />
// //       <input
// //         value={password}
// //         onChange={e => setPassword(e.target.value)}
// //         type="password"
// //         placeholder="Password"
// //         className="w-full p-2 border"
// //       />
// //       {error && <p className="text-red-500">{error}</p>}
// //       <button className="bg-black text-white px-4 py-2 rounded">Register</button>
// //       <Link className="text-[10px]" href={'/login'}>login</Link>
// //     </form>
// //   );
// // }


// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   const router = useRouter();

//   async function handleRegister(e: React.FormEvent) {
//     console.log('can you see me?');
    
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         body: JSON.stringify({ username, email, password }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         if (data.errors) {
//           const messages = (Object.values(data.errors) as { message: string }[])
//             .map((err) => err.message)
//             .join(", ");
//           setError(messages);
//         } else {
//           setError(data.error || "Something went wrong");
//         }
//       } else {
//         // Success! User is automatically logged in via cookie
//         console.log("Registration successful:", data);
        
//         // Refresh server components to update header
//         router.refresh();
        
//         // Redirect to dashboard
//         router.push("/dashboard");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//             Create your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Join us today and start shopping!
//           </p>
//         </div>
        
//         <form onSubmit={handleRegister} className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <input
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Username"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={loading}
//             />
            
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={loading}
//             />
            
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               placeholder="Password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={loading}
//               minLength={6}
//             />
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-md p-3">
//               <p className="text-red-800 text-sm">{error}</p>
//             </div>
//           )}

//           <button 
//           onClick={handleRegister}
//             type="submit"
//             disabled={loading}
//             className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//               loading 
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
//             }`}
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>

//           <div className="text-center">
//             <span className="text-sm text-gray-600">Already have an account? </span>
//             <Link href="/login" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//               Sign in
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/lib/authStore';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
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
          setError(data.error || "Something went wrong");
        }
      } else {
        // Success! Set user in Zustand store
        setUser({ 
          username: data.username,
          userId: data.userId 
        });
        
        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us today and start shopping!
          </p>
        </div>
        
        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div className="space-y-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={loading}
            />
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={loading}
            />
            
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <button 
          onClick={handleRegister}
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Link href="/login" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}