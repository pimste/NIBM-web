'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedElement } from './AnimatedElement'
import { useLanguage } from '@/context/LanguageContext'

// This would be replaced by actual data from a CMS or API
const featuredCranes = [
  {
    id: 1,
    name: 'Potain MDT 178',
    slug: 'potain-mdt-178',
    image: '/images/optimized/Potain-MDT-178_3W.webp',
    status: 'available',
    year: 2019,
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
    maxHeight: '64.9 meters',
    type: 'Flat Top',
  },
  {
    id: 2,
    name: 'Potain MC 85 B',
    slug: 'potain-mc-85-b',
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    status: 'available',
    year: 2020,
    maxCapacity: '5 tons',
    maxJibLength: '52 meters',
    maxHeight: '42.5 meters',
    type: 'Top Slewing',
  },
  {
    id: 3,
    name: 'Potain MDT 219 J10',
    slug: 'potain-mdt-219-j10',
    image: '/images/optimized/sunset-TC.webp',
    status: 'comingSoon',
    year: 2021,
    maxCapacity: '10 tons',
    maxJibLength: '65 meters',
    maxHeight: '70.2 meters',
    type: 'Flat Top',
  },
]

function FeaturedCranes() {
  const [hoveredCrane, setHoveredCrane] = useState<number | null>(null)
  const { t } = useLanguage()
  
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCranes.map((crane, index) => (
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
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  crane.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {t(`cranes.${crane.status}`)}
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
      </div>
    </section>
  )
}

// Default export for dynamic import
export default FeaturedCranes
// Named export for direct imports
export { FeaturedCranes } 