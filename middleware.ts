import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'nl', 'de'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
  
  // Domains can be used to configure different domains for each locale
  domains: [
    {
      domain: 'nibmvb.eu',
      defaultLocale: 'nl'
    },
    {
      domain: 'nibmvb.de',
      defaultLocale: 'de'
    },
    {
      domain: 'nibmvb.com',
      defaultLocale: 'en'
    }
  ]
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 