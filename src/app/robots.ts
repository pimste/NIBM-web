import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/analytics/', // Block analytics PDFs from indexing
        ],
        crawlDelay: 0, // Allow immediate crawling (removed delay for better indexing)
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/analytics/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/analytics/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/images/',
          '/videos/',
        ],
        disallow: [
          '/admin/',
          '/analytics/',
        ],
      },
      // Block aggressive scrapers and bad bots
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot', 'BLEXBot'],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://www.nibmvb.eu/sitemap.xml',
    host: 'https://www.nibmvb.eu',
  };
} 