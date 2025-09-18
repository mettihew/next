'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GlobalRouterSpinner() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Stop loading whenever the route changes
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const anchor = target.closest('a, button');
      if (!anchor) return;

      setLoading(true);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full z-50 bg-black text-white text-center py-1 text-xs shadow">
          Loading...
        </div>
      )}
    </>
  );
}
