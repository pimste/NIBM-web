import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'
import { Metadata } from 'next'
import { generatePageMetadata } from '../page-metadata'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for home page
  const baseMetadata: Metadata = {
    title: 'NIBM Tower Cranes | Professional Tower Crane Sales, Rental & Services',
    description: 'NIBM Tower Cranes specializes in professional tower crane sales, rental, installation, and maintenance services across Europe. Expert Potain tower crane solutions for construction projects. Offices in Netherlands and Israel. Trusted partner since 1996.',
    openGraph: {
      title: 'NIBM Tower Cranes | Professional Tower Crane Solutions',
      description: 'Expert tower crane sales, rental, installation, and maintenance services across Europe. Professional Potain tower crane solutions for your construction projects.',
      url: 'https://www.nibmvb.eu/en',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Tower Cranes - Professional Tower Crane Solutions',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'NIBM Tower Cranes | Professional Tower Crane Solutions',
      description: 'Expert tower crane sales, rental, installation, and maintenance services across Europe.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/en',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

// Loading fallbacks
const LoadingFallback = () => <div className="min-h-[40vh] flex items-center justify-center">Loading...</div>

// Dynamic imports for code splitting
const DynamicFeaturedCranes = dynamic(() => import('@/components/FeaturedCranes'), {
  loading: () => <LoadingFallback />,
  ssr: true
})

const DynamicServicesSection = dynamic(() => import('@/components/ServicesSection'), {
  loading: () => <LoadingFallback />,
  ssr: false
})

const DynamicTestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), {
  loading: () => <LoadingFallback />,
  ssr: true
})

const DynamicCtaSection = dynamic(() => import('@/components/CtaSection'), {
  loading: () => <LoadingFallback />,
  ssr: true
})

export default function EnglishHome() {
  return (
    <main>
      <HeroSection />
      <DynamicFeaturedCranes />
      <DynamicServicesSection />
      <DynamicTestimonialsSection />
      <DynamicCtaSection />
    </main>
  )
} 