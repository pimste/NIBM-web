import '@/app/globals.css'
import '@/app/form-normalizer.css'
import { Inter, Montserrat } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SEOProvider } from '@/components/SEOProvider'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { LangAttributeUpdater } from '@/components/LangAttributeUpdater'
import { FontFallbacks } from '@/components/FontFallbacks'
import { Analytics } from '@/components/Analytics'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import SEOOptimizer from '@/components/SEOOptimizer'
import { LanguageProvider } from '@/context/LanguageContext'
import { CookieBanner } from '@/components/CookieBanner'

// Optimized font loading - reduced weights for better performance
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  weight: ['400', '600'], // Removed 500, 700 - use 400 or 600 instead
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'optional', // Use optional for display text - better performance
  variable: '--font-montserrat',
  preload: true,
  weight: ['700'], // Removed 800 - not critical
  fallback: ['var(--font-inter)', 'system-ui', 'sans-serif'],
})

// Preload component - optimized for critical resources only
function Preload() {
  return (
    <>
      {/* Only preload the hero video poster for instant visual */}
      <link rel="preload" href="/images/optimized/sunset-TC-2.webp" as="image" type="image/webp" fetchPriority="high" />
      <link rel="preload" href="/images/optimized/logo-blue.webp" as="image" type="image/webp" />
      
      {/* DNS prefetch for own domain only */}
      <link rel="preconnect" href="https://www.nibmvb.eu" />
      <link rel="dns-prefetch" href="https://www.nibmvb.eu" />

      <FontFallbacks />
    </>
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
    'NIBM Tower Cranes specializes in professional tower crane sales, rental, installation, and maintenance services across Europe. Expert solutions for construction projects with offices in Netherlands and Israel. Trusted partner since 1996.',
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
    // Local SEO keywords
    'tower cranes Netherlands',
    'tower cranes Nuth',
    'tower cranes Limburg',
    'crane rental Netherlands',
    'crane rental Nuth',
    'crane sales Netherlands',
    'Potain cranes Netherlands',
    'tower crane services Europe',
    'tower crane rental Germany',
    'tower crane rental Belgium',
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
    locale: 'en_US',
    alternateLocale: ['nl_NL', 'de_DE'],
    url: 'https://www.nibmvb.eu/',
    siteName: 'NIBM Tower Cranes',
    title: 'NIBM Tower Cranes | Professional Tower Crane Solutions',
    description: 'Expert tower crane sales and services for construction projects of any scale. Full-service support from planning to dismantling.',
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
            description: 'Expert tower crane sales and services for construction projects of any scale. Full-service support from planning to dismantling.',
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
        <Analytics />
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
        <SEOOptimizer />
        <VercelAnalytics mode="production" />
      </body>
    </html>
  )
}
