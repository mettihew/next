// app/products/page.tsx
'use client';

import { Suspense } from 'react';
import ClientPage from './ClientPage';
import LoaderDots from '@/components/LoadingDots';

export default function Page() {
  return (
    <Suspense fallback={<LoaderDots />}>
      <ClientPage />
    </Suspense>
  );
}
