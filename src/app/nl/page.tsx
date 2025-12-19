import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'
import { Metadata } from 'next'
import { generatePageMetadata } from '../page-metadata'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for home page
  const baseMetadata: Metadata = {
    title: 'NIBM Tower Cranes | Specialisten in de verkoop van torenkranen',
    description: 'NIBM Tower Cranes is gespecialiseerd in de verkoop van torenkranen, met complete serviceoplossingen van planning tot doorlopende ondersteuning.',
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/nl',
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

const DynamicCtaSection = dynamic(() => import('@/components/CtaSection'), {
  loading: () => <LoadingFallback />,
  ssr: true
})

export default function DutchHome() {
  return (
    <main>
      <HeroSection />
      <DynamicFeaturedCranes />
      <DynamicServicesSection />
      <DynamicCtaSection />
    </main>
  )
} 