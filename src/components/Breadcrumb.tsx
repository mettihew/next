// components/Breadcrumb.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Breadcrumb() {
  const pathname = usePathname(); // e.g. /products/women/lingerie/bras
  const segments = pathname.split('/').filter(Boolean); // remove empty strings

  const buildHref = (index: number) => {
    return '/' + segments.slice(0, index + 1).join('/');
  };

  return (
    <nav className="text-sm text-gray-600 flex flex-wrap items-center gap-1 my-4">
      <Link href="/" className="text-blue-600 hover:underline">Home</Link>
      {segments.map((seg, i) => {
        const name = decodeURIComponent(seg).replace(/-/g, ' ');
        const href = buildHref(i);
        const isLast = i === segments.length - 1;
        return (
          <span key={i} className="flex items-center">
            <span className="mx-1 text-gray-400">›</span>
            {isLast ? (
              <span className="text-gray-900 capitalize">{name}</span>
            ) : (
              <Link href={href} className="capitalize text-blue-600 hover:underline">
                {name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
