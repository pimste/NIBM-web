import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'
import { Metadata } from 'next'
import { generatePageMetadata } from '../page-metadata'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for home page
  const baseMetadata: Metadata = {
    title: 'NIBM Tower Cranes | Spezialisten für Verkauf und Vermietung von Turmkranen',
    description: 'NIBM Tower Cranes ist spezialisiert auf den Verkauf und die Vermietung von Turmkranen mit kompletten Servicelösungen von der Planung bis zur laufenden Unterstützung.',
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/de',
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
  ssr: true
})

const DynamicTestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), {
  loading: () => <LoadingFallback />,
  ssr: true
})

const DynamicCtaSection = dynamic(() => import('@/components/CtaSection'), {
  loading: () => <LoadingFallback />,
  ssr: true
})

export default function GermanHome() {
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