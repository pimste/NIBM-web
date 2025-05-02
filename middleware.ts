import { NextRequest, NextResponse } from 'next/server';

const defaultLocale = 'en';
const supportedLocales = ['en', 'nl', 'de'];
const publicFiles = [
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/images',
  '/assets',
  '/fonts'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for a public file or Next.js internal routes
  if (
    publicFiles.some(file => pathname.startsWith(file)) ||
    pathname.includes('/_next') ||
    pathname.startsWith('/api')
  ) {
    return;
  }
  
  // Get locale from cookie first (prioritize this over URL)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  // If locale cookie exists and is supported, use it
  if (cookieLocale && supportedLocales.includes(cookieLocale)) {
    // Split the pathname into segments
    const segments = pathname.split('/').filter(Boolean);
    
    // Check if the first segment is a language code
    const firstSegment = segments[0];
    const hasLocalePrefix = supportedLocales.includes(firstSegment);
    
    // If URL has a locale prefix that doesn't match cookie locale, redirect
    if (hasLocalePrefix && firstSegment !== cookieLocale) {
      const newUrl = request.nextUrl.clone();
      
      // Replace existing locale prefix with cookie locale
      const pathWithoutLocale = segments.slice(1).join('/');
      newUrl.pathname = `/${cookieLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
      
      // Return redirect response
      return NextResponse.redirect(newUrl);
    }
    
    // If URL has no locale prefix, add the cookie locale
    if (!hasLocalePrefix) {
      const newUrl = request.nextUrl.clone();
      
      // Add locale prefix to URL
      newUrl.pathname = `/${cookieLocale}${pathname === '/' ? '' : pathname}`;
      
      // Return redirect response
      return NextResponse.redirect(newUrl);
    }
    
    // If URL already has the correct locale prefix, continue
    return NextResponse.next();
  }
  
  // If no cookie or unsupported locale in cookie, use accept-language or default
  let locale = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || defaultLocale;
  
  // Make sure the locale is supported, otherwise use default
  if (!supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }
  
  // Check if the URL already has a locale prefix
  const pathnameHasLocale = supportedLocales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );
  
  // If no locale in URL, redirect to the appropriate locale
  if (!pathnameHasLocale) {
    // Clone the URL and update it with the locale
    const url = request.nextUrl.clone();
    
    // Handle root path specially
    if (pathname === '/') {
      url.pathname = `/${locale}`;
    } else {
      // Add locale prefix to the path
      url.pathname = `/${locale}${pathname}`;
    }
    
    // Set cookie for the locale to remember user's preference
    const response = NextResponse.redirect(url);
    response.cookies.set('NEXT_LOCALE', locale, { 
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/' 
    });
    
    return response;
  }
  
  // URL already has locale, just update the cookie if needed
  const existingLocale = pathname.split('/')[1];
  if (supportedLocales.includes(existingLocale)) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', existingLocale, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  // Match all paths except static files, images, and API routes
  matcher: [
    '/((?!_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|images|assets|fonts|api).*)'
  ]
}; 