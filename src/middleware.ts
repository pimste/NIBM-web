import { NextRequest } from 'next/server';

// This middleware just returns the request as is, without any i18n redirects
export function middleware(request: NextRequest) {
  return;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|assets|favicon.ico).*)']
}; 