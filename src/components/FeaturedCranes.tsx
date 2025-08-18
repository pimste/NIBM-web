'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedElement } from './AnimatedElement'
import { useLanguage } from '@/context/LanguageContext'

interface Crane {
  id: number
  name: string
  slug: string
  image: string
  status: string
  year: number
  maxCapacity: string
  maxJibLength: string
  maxHeight: string
  type: string
}

function FeaturedCranes() {
  const [hoveredCrane, setHoveredCrane] = useState<number | null>(null)
  const [cranes, setCranes] = useState<Crane[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()
  
  useEffect(() => {
    const fetchCranes = async () => {
      try {
        const response = await fetch('/api/cranes')
        if (response.ok) {
          const allCranes = await response.json()
          // Filter for only available cranes and take only the first 3
          const availableCranes = allCranes.filter((crane: Crane) => crane.status === 'available')
          setCranes(availableCranes.slice(0, 3))
        } else {
          console.error('Failed to fetch cranes')
          setCranes([])
        }
      } catch (error) {
        console.error('Error fetching cranes:', error)
        setCranes([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchCranes()
  }, [])
  
  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedElement>
              <h2 className="section-title">{t('cranes.title')}</h2>
              <p className="section-subtitle">
                {t('cranes.subtitle')}
              </p>
            </AnimatedElement>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedElement>
            <h2 className="section-title">{t('cranes.title')}</h2>
            <p className="section-subtitle">
              {t('cranes.subtitle')}
            </p>
          </AnimatedElement>
        </div>
        
        {cranes.length === 0 ? (
          <div className="text-center py-12">
            <AnimatedElement>
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🏗️</div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  {t('cranes.noAvailableCranes')}
                </h3>
                <p className="text-neutral-600 mb-8">
                  {t('cranes.noAvailableCranesSubtitle')}
                </p>
                <Link href="/towercranes" className="btn-primary">
                  {t('cranes.viewAll')}
                </Link>
              </div>
            </AnimatedElement>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cranes.map((crane, index) => (
                <AnimatedElement
                  key={crane.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  animationVariant="slideUp"
                  delay={index * 0.1}
                >
                  <div className="relative h-64"
                    onMouseEnter={() => setHoveredCrane(crane.id)}
                    onMouseLeave={() => setHoveredCrane(null)}
                  >
                    <Image
                      src={crane.image}
                      alt={crane.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                      loading={index === 0 ? "eager" : "lazy"}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZXCLgAAAABJRU5ErkJggg=="
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {t('cranes.available')}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {crane.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-neutral-500">{t('cranes.year')}</p>
                        <p className="font-medium">{crane.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{t('cranes.type')}</p>
                        <p className="font-medium">{crane.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{t('cranes.maxCapacity')}</p>
                        <p className="font-medium">{crane.maxCapacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{t('cranes.maxHeight')}</p>
                        <p className="font-medium">{crane.maxHeight}</p>
                      </div>
                    </div>
                    <Link
                      href={`/towercranes/${crane.slug}`}
                      className="btn-primary w-full text-center block"
                    >
                      {t('cranes.viewDetails')}
                    </Link>
                  </div>
                </AnimatedElement>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <AnimatedElement>
                <Link href="/towercranes" className="btn-secondary">
                  {t('cranes.viewAll')}
                </Link>
              </AnimatedElement>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// Default export for dynamic import
export default FeaturedCranes
// Named export for direct imports
export { FeaturedCranes } 