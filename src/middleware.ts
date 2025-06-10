import { NextRequest, NextResponse } from 'next/server';

const defaultLocale = 'en';
const supportedLocales = ['en', 'nl', 'de'];
const publicFiles = [
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/images',
  '/assets',
  '/fonts',
  '/icon',
  '/apple-icon',
  '/manifest',
  '/site.webmanifest'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for a public file or video file
  const isPublicFile = publicFiles.some(file => pathname.startsWith(file));
  const isVideoFile = /\.(mp4|webm|ogg|avi|mov)$/i.test(pathname);
  
  if (isPublicFile || isVideoFile) {
    return;
  }
  
  // Skip API routes
  if (pathname.startsWith('/api')) {
    return;
  }
  
  // Get locale from cookie or accept-language header
  let currentLocale = request.cookies.get('NEXT_LOCALE')?.value || 
               defaultLocale;
  
  // Make sure locale is valid
  if (!supportedLocales.includes(currentLocale as any)) {
    currentLocale = defaultLocale;
  }
  
  // Check if path has a locale prefix and extract the current path locale and the rest of the path
  const pathParts = pathname.split('/').filter(Boolean);
  const hasLocalePrefix = supportedLocales.includes(pathParts[0]);
  const pathLocale = hasLocalePrefix ? pathParts[0] : null;
  const pathWithoutLocale = hasLocalePrefix 
    ? `/${pathParts.slice(1).join('/')}` 
    : pathname;
  
  // If the cookie locale doesn't match the URL locale, redirect to the correct locale path
  if (hasLocalePrefix && pathLocale !== currentLocale) {
    // Redirect to the correct locale path
    const url = request.nextUrl.clone();
    url.pathname = `/${currentLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    
    // Normalize the path to avoid double slashes
    url.pathname = url.pathname.replace(/\/+/g, '/');
    if (url.pathname.endsWith('/') && url.pathname !== '/') {
      url.pathname = url.pathname.slice(0, -1);
    }
    
    return NextResponse.redirect(url);
  }
  
  // If no locale in URL, redirect to the appropriate language subfolder
  if (!hasLocalePrefix) {
    // Redirect to locale subfolder
    const url = request.nextUrl.clone();
    url.pathname = `/${currentLocale}${pathname === '/' ? '' : pathname}`;
    
    // Normalize the path to avoid double slashes
    url.pathname = url.pathname.replace(/\/+/g, '/');
    if (url.pathname.endsWith('/') && url.pathname !== '/') {
      url.pathname = url.pathname.slice(0, -1);
    }
    
    return NextResponse.redirect(url);
  }
  
  // If we get here, the URL already has the correct locale - continue
  return;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}; 