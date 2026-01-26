/** @type {import('next').NextConfig} */
const { withNextVideo } = require('next-video/process');
const withBundleAnalyzer = process.env.ANALYZE === 'true' 
  ? require('@next/bundle-analyzer')()
  : (config) => config;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add TypeScript configuration to ignore build errors
  typescript: {
    // !! WARN !!
    // Allow production builds to complete even with type errors
    ignoreBuildErrors: true,
  },
  // Add redirects for SEO-friendly URLs
  async redirects() {
    return [
      // Redirect old numeric ID URLs to new slug-based URLs for tower cranes
      {
        source: '/towercranes/1',
        destination: '/towercranes/potain-mdt-178',
        permanent: true,
      },
      {
        source: '/towercranes/2',
        destination: '/towercranes/potain-mc-85-b',
        permanent: true,
      },
      {
        source: '/towercranes/3',
        destination: '/towercranes/potain-mdt-219-j10',
        permanent: true,
      },
      {
        source: '/towercranes/4',
        destination: '/towercranes/potain-mct-88',
        permanent: true,
      },
      {
        source: '/towercranes/5',
        destination: '/towercranes/potain-mc-125',
        permanent: true,
      },
      {
        source: '/towercranes/6',
        destination: '/towercranes/potain-mdt-189',
        permanent: true,
      },
      {
        source: '/towercranes/7',
        destination: '/towercranes/potain-mc-175-b',
        permanent: true,
      },
      {
        source: '/towercranes/8',
        destination: '/towercranes/potain-mdt-268-j12',
        permanent: true,
      },
      {
        source: '/towercranes/9',
        destination: '/towercranes/potain-mct-135',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/en/admin/login',
        permanent: true,
      },
      // SEO: Common misspellings and variations
      {
        source: '/tower-cranes',
        destination: '/en/towercranes',
        permanent: true,
      },
      {
        source: '/crane',
        destination: '/en/towercranes',
        permanent: true,
      },
      {
        source: '/cranes',
        destination: '/en/towercranes',
        permanent: true,
      },
      {
        source: '/rental',
        destination: '/en/towercranes',
        permanent: true,
      },
      {
        source: '/sale',
        destination: '/en/towercranes',
        permanent: true,
      },
      // SEO: Canonical enforcement - remove trailing slashes for consistency
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'www.nibmvb.eu',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fsdzgbwxpwbsnjmdnhxy.supabase.co',
      },
    ],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false, // Make sure optimization is enabled
    domains: ['localhost', 'nibmvb.eu'],
  },
  compress: true,
  poweredByHeader: false,
  optimizeFonts: true,
  headers: async () => {
    return [
      {
        // Explicit Content-Type for sitemap.xml - CRITICAL for Google Search Console
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        // Explicit Content-Type for robots.txt
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|webp|avif|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Accept-CH',
            value: 'DPR, Width, Viewport-Width',
          },
        ],
      },
      {
        source: '/images/optimized/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', 
          },
          {
            key: 'Accept-CH',
            value: 'DPR, Width, Viewport-Width',
          },
          {
            key: 'Priority',
            value: 'high',
          },
        ],
      },
      {
        source: '/(.*).(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(mp4|webm|ogg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://nibmvb.eu',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
      {
        source: '/:lang(en|nl|de)/towercranes/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ],
      },
      {
        source: '/:lang(en|nl|de)/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ['motion', 'react-icons', '@heroicons/react'],
    // Only enable CSS optimization if running in production
    optimizeCss: process.env.NODE_ENV === 'production',
    scrollRestoration: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
    optimizeServerReact: true,
    webpackBuildWorker: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
};

// Wrap with next-video for optimized video delivery
module.exports = withNextVideo(withBundleAnalyzer(nextConfig), {
  provider: 'vercel-blob',
  providerConfig: {
    'vercel-blob': {
      // Use the existing blob store with videos/ subfolder
      token: process.env.BLOB_READ_WRITE_TOKEN,
    },
  },
  folder: 'videos',
});