import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import FeaturedCranes from '@/components/FeaturedCranes'
import ServicesSection from '@/components/ServicesSection'
import CtaSection from '@/components/CtaSection'
import { Skeleton } from '@/components/ui/skeleton'

// Optimized loading fallback using shadcn skeleton
const CranesLoadingFallback = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<CranesLoadingFallback />}>
        <FeaturedCranes />
      </Suspense>
      <ServicesSection />
      <CtaSection />
    </main>
  )
} 