// export default function LoaderDots() {
//   return (
//     // <div className="flex justify-center items-center my-12 space-x-2">
//     //   <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" />
//     //   <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-150" />
//     //   <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-300" />
//     // </div>
//     // components/LoaderDots.tsx
//     <div className="flex gap-2 justify-center items-center my-8">
//       <div className="w-3 h-3 rounded-full bg-[#00ED64] animate-bounce1" />
//       <div className="w-3 h-3 rounded-full bg-[#00ED64] animate-bounce2" />
//       <div className="w-3 h-3 rounded-full bg-[#00ED64] animate-bounce3" />
//     </div>

//   );
// }
// components/LoadingDots.tsx
'use client';

import { useEffect, useState } from 'react';

export default function LoaderDots() {
  const [dot, setDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDot((prev) => (prev + 1) % 3);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-16">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`mx-1 w-3 h-3 rounded-full bg-green-600 transition-opacity duration-300 ${
            dot === i ? 'opacity-100' : 'opacity-30'
          }`}
        />
      ))}
    </div>
  );
}
