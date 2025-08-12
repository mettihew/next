import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Extract subdomain: me.eesy.ir → 'me'
  const subdomain = hostname.split('.')[0];

  if (subdomain === 'me') {
    // Rewrite to internal about page
    return NextResponse.rewrite(new URL('/about', request.url));
  }

  // Default behavior
  return NextResponse.next();
}
