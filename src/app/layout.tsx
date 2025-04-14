import '@/app/globals.css'
import { Inter, Montserrat } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SEOProvider } from '@/components/SEOProvider'
import Script from 'next/script'
import { LanguageProvider } from '@/context/LanguageContext'
import { LangAttributeUpdater } from '@/components/LangAttributeUpdater'

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'NIBM Tower Cranes | Premium Tower Crane Solutions',
  description: 'NIBM Tower Cranes provides premium tower crane sales, rental, and services across Europe. Expert guidance, reliable equipment, and professional support.',
  keywords: 'tower cranes, crane rental, crane sales, construction equipment, potain, liebherr, terex, crane installation, crane dismantling, netherlands',
  authors: [{ name: 'NIBM Tower Cranes' }],
  creator: 'NIBM Tower Cranes',
  publisher: 'NIBM Tower Cranes',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.nibmvb.eu'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/images/optimized/logo-blue.webp',
    apple: '/images/optimized/logo-blue.webp',
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
    google: 'google-site-verification=YOUR_GOOGLE_VERIFICATION_CODE', // Replace with your actual code
  },
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
            <main className="flex-grow">{children}</main>
            <Footer />
          </LangAttributeUpdater>
        </LanguageProvider>
        <LazyLoadScript />
        <ProgressiveImageLoadingScript />
      </body>
    </html>
  )
}
