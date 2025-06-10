const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
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
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.nibmvb.eu',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false, // Make sure optimization is enabled
  },
  compress: true,
  poweredByHeader: false,
  optimizeFonts: true,
  headers: async () => {
    return [
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
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
    ];
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
    // Only enable CSS optimization if running in production
    optimizeCss: process.env.NODE_ENV === 'production',
    scrollRestoration: true,
    webVitalsAttribution: ['CLS', 'LCP'],
  },
};

module.exports = withNextIntl(withBundleAnalyzer(nextConfig));