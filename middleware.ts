import { NextRequest, NextResponse } from 'next/server';

const defaultLocale = 'en';
const supportedLocales = ['en', 'nl', 'de'];

// Known spam referrers to block
const SPAM_REFERRERS = [
  'mysticforge.top',
  'neonflux.top',
  'quantumforge.top',
  'cyberflux.top',
  'digitalforge.top',
  'techflux.top',
  'webforge.top',
  'netforge.top',
  'cloudforge.top',
  'dataforge.top',
];

// Suspicious user agents to block (generic terms like 'bot' are checked after legitimate bots)
const SUSPICIOUS_USER_AGENTS = [
  'curl',
  'wget',
  'python-requests',
  'python-urllib',
  'scrapy',
  'scraper',
  'headless',
  'phantomjs',
  'selenium',
  'playwright',
  'puppeteer',
  'httpie',
  'postman',
  'insomnia',
  'go-http-client',
  'java/',
  'okhttp',
  'apache-httpclient',
  'rest-client',
  'httpclient',
  'axios',
  'node-fetch',
  'got',
  'request',
  'urllib',
];

// Legitimate search engine bots to allow
const LEGITIMATE_BOTS = [
  'googlebot',
  'bingbot',
  'slurp', // Yahoo
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'facebot',
  'ia_archiver', // Internet Archive
  'applebot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'discordbot',
];

/**
 * Check if the request is from a bot that should be blocked
 * @param isAssetPath - If true, be more aggressive in blocking (for asset scraping)
 */
function isBlockedBot(request: NextRequest, isAssetPath: boolean = false): boolean {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const referer = request.headers.get('referer')?.toLowerCase() || '';
  const accept = request.headers.get('accept')?.toLowerCase() || '';
  
  // Check for spam referrers
  if (referer) {
    const isSpamReferrer = SPAM_REFERRERS.some((spam) => referer.includes(spam));
    if (isSpamReferrer) {
      return true;
    }
  }
  
  // If no user agent, likely a bot
  if (!userAgent) {
    return true;
  }
  
  // Check if it's a legitimate bot (allow these)
  const isLegitimateBot = LEGITIMATE_BOTS.some((bot) => userAgent.includes(bot));
  if (isLegitimateBot) {
    return false;
  }
  
  // For asset paths, be more aggressive
  if (isAssetPath) {
    // Block if user agent contains generic bot terms (unless it's a legitimate bot)
    if (
      (userAgent.includes('bot') || 
       userAgent.includes('crawler') || 
       userAgent.includes('spider') ||
       userAgent.includes('scraper')) &&
      !isLegitimateBot
    ) {
      return true;
    }
    
    // Block if Accept header is missing or suspicious (bots often have minimal Accept headers)
    if (!accept || accept === '*/*' || accept === 'image/*') {
      // But allow if it looks like a real browser
      if (!userAgent.includes('mozilla') && !userAgent.includes('chrome') && !userAgent.includes('safari')) {
        return true;
      }
    }
  }
  
  // Check for suspicious user agents
  const isSuspicious = SUSPICIOUS_USER_AGENTS.some((suspicious) => 
    userAgent.includes(suspicious)
  );
  
  return isSuspicious;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // FIRST: Aggressively block bots from static assets (images, videos, fonts, etc.)
  // This is critical because bots scrape these heavily and bypass browser cache
  const isAssetPath =
    pathname.startsWith('/images/') ||
    pathname.startsWith('/videos/') ||
    pathname.startsWith('/fonts/') ||
    pathname.startsWith('/assets/') ||
    pathname === '/favicon.ico' ||
    pathname === '/favicon.png' ||
    pathname === '/apple-touch-icon.png' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/site.webmanifest' ||
    /\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2|ttf|eot|otf|mp4|webm|mov|avi|pdf|zip)$/i.test(pathname);
  
  if (isAssetPath) {
    // For assets, be more aggressive - block any suspicious bot
    if (isBlockedBot(request, true)) {
      return new NextResponse('Forbidden', { 
        status: 403,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    }
    // Allow legitimate bots and browsers to pass through
    return NextResponse.next();
  }
  
  // SECOND: Handle API routes - no i18n processing needed, but still check bots
  // API routes have their own rate limiting, but we still block obvious spam bots
  if (pathname.startsWith('/api')) {
    // Only block obvious spam referrers on API routes, allow everything else
    // (legitimate API calls from automated systems should work)
    const referer = request.headers.get('referer')?.toLowerCase() || '';
    if (referer) {
      const isSpamReferrer = SPAM_REFERRERS.some((spam) => referer.includes(spam));
      if (isSpamReferrer) {
        return new NextResponse('Forbidden', { status: 403 });
      }
    }
    return NextResponse.next();
  }
  
  // THIRD: Block spam bots early for page routes to reduce edge function invocations
  if (isBlockedBot(request, false)) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  
  // FOURTH: Handle static files and assets - no i18n processing needed
  if (
    pathname === '/favicon.ico' ||
    pathname === '/favicon.png' ||
    pathname === '/apple-touch-icon.png' ||
    pathname === '/nibm-favicon.avif' ||
    pathname === '/icon.png' ||
    pathname === '/icon.avif' ||
    pathname === '/apple-icon.png' ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/fonts') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/site.webmanifest' ||
    pathname === '/sw.js' ||
    pathname.includes('/_next')
  ) {
    return NextResponse.next();
  }

  // FIFTH: Handle i18n for all other routes (including admin routes)
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
    
    // SIXTH: Handle admin route protection after i18n processing
    // Check if this is an admin route (after locale prefix)
    const pathWithoutLocale = pathname.replace(`/${existingLocale}`, '');
    if (pathWithoutLocale.startsWith('/admin')) {
      // Allow login page
      if (pathWithoutLocale === '/admin/login') {
        return response;
      }
      
      // Check for admin session for all other admin routes
      const sessionCookie = request.cookies.get('admin-session');
      if (!sessionCookie?.value) {
        return NextResponse.redirect(new URL(`/${existingLocale}/admin/login`, request.url));
      }
      
      // Validate session
      try {
        const session = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString());
        if (session.exp < Date.now()) {
          // Session expired, redirect to login
          const redirectResponse = NextResponse.redirect(new URL(`/${existingLocale}/admin/login`, request.url));
          redirectResponse.cookies.delete('admin-session');
          return redirectResponse;
        }
      } catch {
        // Invalid session, redirect to login
        const redirectResponse = NextResponse.redirect(new URL(`/${existingLocale}/admin/login`, request.url));
        redirectResponse.cookies.delete('admin-session');
        return redirectResponse;
      }
    }
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  // IMPORTANT: We now process asset paths to block bots, but exclude Next.js internal files
  // This allows us to block bots from /images/, /videos/, etc. while still excluding _next/*
  matcher: [
    /*
     * Match:
     * - Asset paths (images, videos, fonts, etc.) - to block bots
     * - API routes - to block spam referrers
     * - Page routes - for i18n and bot blocking
     * 
     * Exclude:
     * - _next/static, _next/image, _next/data (Next.js internal)
     * - sw.js (service worker)
     */
    '/((?!_next/static|_next/image|_next/data|sw.js).*)'
  ]
}; 