import '@/app/globals.css'
import '@/app/form-normalizer.css'
import { Inter, Montserrat } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SEOProvider } from '@/components/SEOProvider'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { LangAttributeUpdater } from '@/components/LangAttributeUpdater'
import { FontFallbacks } from '@/components/FontFallbacks'
import { Analytics } from '@/components/Analytics'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import SEOOptimizer from '@/components/SEOOptimizer'
import { LanguageProvider } from '@/context/LanguageContext'
import { CookieBanner } from '@/components/CookieBanner'

// Optimized font loading with subsets and display options
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  weight: ['400', '500', '600', '700'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: true,
  weight: ['700', '800'],
})

// Preload component
function Preload() {
  return (
    <>
      {/* Critical images that should load immediately */}
      <link rel="preload" href="/images/optimized/sunset-TC-2.webp" as="image" type="image/webp" fetchPriority="high" />
      <link rel="preload" href="/images/optimized/cropped-Top-page2-potain6.webp" as="image" type="image/webp" />
      <link rel="preload" href="/images/optimized/logo-blue.webp" as="image" type="image/webp" fetchPriority="high" />
      
      {/* Prefetch next likely images - assuming these are commonly accessed */}
      <link rel="prefetch" href="/images/optimized/gidgehlen.webp" as="image" type="image/webp" />
      <link rel="prefetch" href="/images/optimized/Potain-MDT-178_3W.webp" as="image" type="image/webp" />
      
      {/* DNS prefetch and preconnect */}
      <link rel="preconnect" href="https://www.nibmvb.eu" />
      <link rel="dns-prefetch" href="https://www.nibmvb.eu" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      <FontFallbacks />
    </>
  )
}

// Progressive image loading script - helps with lazy loading and avoiding layout shifts
function ProgressiveImageLoadingScript() {
  return (
    <Script 
      id="progressive-image-loading"
      strategy="afterInteractive"
    >{`
      document.addEventListener('DOMContentLoaded', function() {
        // Handle progressive image loading with blur transitions
        const progressiveImages = document.querySelectorAll('.progressive-image');
        
        function loadImage(img) {
          const src = img.dataset.src;
          if (!src) return;
          
          const newImg = new Image();
          newImg.src = src;
          newImg.onload = () => {
            img.classList.add('loaded');
            img.src = src;
            img.removeAttribute('data-src');
          };
        }
        
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                loadImage(entry.target);
                imageObserver.unobserve(entry.target);
              }
            });
          }, {
            rootMargin: '50px 0px',
            threshold: 0.01
          });
          
          progressiveImages.forEach(img => {
            imageObserver.observe(img);
          });
        } else {
          // Fallback for browsers that don't support IntersectionObserver
          progressiveImages.forEach(img => {
            loadImage(img);
          });
        }
      });
    `}
    </Script>
  )
}

// LazyLoad component - to improve Largest Contentful Paint
function LazyLoadScript() {
  return (
    <Script 
      id="lazy-load-script"
      strategy="afterInteractive"
    >{`
      // Lazy load images that are not in viewport
      document.addEventListener('DOMContentLoaded', function() {
        // IntersectionObserver is supported in modern browsers
        if ('IntersectionObserver' in window) {
          const lazyImages = Array.from(document.querySelectorAll('img.lazy'));
          
          const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                const lazyImage = entry.target;
                if (lazyImage.dataset.src) {
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.classList.remove('lazy');
                  imageObserver.unobserve(lazyImage);
                }
              }
            });
          });
          
          lazyImages.forEach(function(lazyImage) {
            imageObserver.observe(lazyImage);
          });
        } else {
          // Fallback for browsers that don't support IntersectionObserver
          let active = false;
          
          const lazyLoad = function() {
            if (active === false) {
              active = true;
              
              setTimeout(function() {
                const lazyImages = document.querySelectorAll('img.lazy');
                
                lazyImages.forEach(function(lazyImage) {
                  if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== 'none') {
                    if (lazyImage.dataset.src) {
                      lazyImage.src = lazyImage.dataset.src;
                      lazyImage.classList.remove('lazy');
                    }
                    
                    if (lazyImages.length === 0) {
                      document.removeEventListener('scroll', lazyLoad);
                      window.removeEventListener('resize', lazyLoad);
                      window.removeEventListener('orientationChange', lazyLoad);
                    }
                  }
                });
                
                active = false;
              }, 200);
            }
          };
          
          document.addEventListener('scroll', lazyLoad);
          window.addEventListener('resize', lazyLoad);
          window.addEventListener('orientationChange', lazyLoad);
          lazyLoad();
        }
      });
    `}</Script>
  )
}

// Service Worker Registration
function ServiceWorkerScript() {
  return (
    <Script
      id="register-sw"
      strategy="afterInteractive"
    >{`
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js').then(
            function(registration) {
              // Registration was successful
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, 
            function(err) {
              // registration failed :(
              console.log('ServiceWorker registration failed: ', err);
            }
          );
        });
      }
    `}</Script>
  )
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0F172A', // primary-900 color
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nibmvb.eu'),
  title: {
    default: 'NIBM Tower Cranes | Professional Crane Solutions',
    template: '%s | NIBM Tower Cranes',
  },
  description:
    'NIBM Tower Cranes offers services in sale, rental, transport, assembly, technical support, repairs and maintenance of tower cranes.',
  keywords: [
    'tower cranes',
    'crane rental',
    'crane sales',
    'crane maintenance',
    'construction equipment',
    'NIBM tower cranes',
    'crane services',
    'crane assembly',
    'crane disassembly',
    'crane transport',
    'tower crane parts',
    'tower crane solutions',
    'construction machinery',
    'building equipment',
    'crane repairs',
  ],
  authors: [{ name: 'NIBM Tower Cranes' }],
  creator: 'NIBM Tower Cranes',
  publisher: 'NIBM Tower Cranes',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'nl': '/nl',
      'de': '/de',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NL',
    url: 'https://www.nibmvb.eu/',
    siteName: 'NIBM Tower Cranes',
    title: 'NIBM Tower Cranes | Professional Tower Crane Solutions',
    description: 'Expert tower crane sales, rentals, and services for construction projects of any scale. Full-service support from planning to dismantling.',
    images: [{
      url: '/images/optimized/cropped-Top-page2-potain6.webp',
      width: 1200,
      height: 630,
      alt: 'NIBM Tower Cranes - Professional Tower Crane Solutions',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nibmvb',
    creator: '@nibmvb',
    title: 'NIBM Tower Cranes | Professional Tower Crane Solutions',
    description: 'Expert tower crane sales, rentals, and services for construction projects of any scale. Full-service support from planning to dismantling.',
    images: ['/images/optimized/cropped-Top-page2-potain6.webp'],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE, // Add your Google Search Console verification code to environment variables
  },
  category: 'Construction Equipment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${montserrat.variable}`}>
      <head>
        <Preload />
      </head>
      <body 
        suppressHydrationWarning
        className="font-sans antialiased min-h-screen bg-neutral-50 text-neutral-900 flex flex-col"
      >
        <SEOProvider />
        <LanguageProvider>
          <LangAttributeUpdater>
            <Header />
            <BreadcrumbNav />
            <main className="flex-grow content-visibility-auto">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </LangAttributeUpdater>
        </LanguageProvider>
        <LazyLoadScript />
        <ProgressiveImageLoadingScript />
        <ServiceWorkerScript />
        <Analytics />
        <PerformanceMonitor />
        <SEOOptimizer />
      </body>
    </html>
  )
}
