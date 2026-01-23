'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useLanguageUrl } from '@/hooks/useLanguageUrl'

interface Crane {
  id: number
  name: string
  slug: string
  model?: string
  status?: string
}

export default function PopularCraneLinks() {
  const [cranes, setCranes] = useState<Crane[]>([])
  const { t, language } = useLanguage()
  const { getUrl } = useLanguageUrl()

  useEffect(() => {
    const fetchCranes = async () => {
      try {
        const response = await fetch('/api/cranes')
        if (response.ok) {
          const allCranes = await response.json()
          // Get first 4-6 available cranes for quick links
          const availableCranes = allCranes
            .filter((crane: Crane) => crane.status === 'available')
            .slice(0, 6)
          setCranes(availableCranes)
        }
      } catch (error) {
        console.error('Error fetching cranes:', error)
      }
    }
    
    fetchCranes()
  }, [])

  if (cranes.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-neutral-50 border-y border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Popular Models
          </h3>
          <p className="text-sm text-neutral-600">
            Quick access to our most popular tower cranes
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {cranes.map((crane) => (
            <Link
              key={crane.id}
              href={`/${language}/towercranes/${crane.slug}`}
              className="px-4 py-2 bg-white hover:bg-primary hover:text-white text-primary border border-primary rounded-md transition-colors text-sm font-medium"
            >
              {crane.name}
            </Link>
          ))}
          <Link
            href={getUrl('/towercranes')}
            className="px-4 py-2 bg-primary hover:bg-primary-600 text-white border border-primary rounded-md transition-colors text-sm font-medium"
          >
            View All Cranes →
          </Link>
        </div>
      </div>
    </section>
  )
}
