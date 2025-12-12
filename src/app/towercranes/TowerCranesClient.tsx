'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { ClientOnly } from '@/components/ClientOnly'
import { FaArrowRight, FaSearch, FaFilter, FaTimes } from 'react-icons/fa'
import { MotionDiv } from '@/components/MotionWrapper'

// Utility function to generate slugs from crane names
const generateSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
}

// Define the Crane interface to match the API response
interface Crane {
  id: number
  name: string
  slug: string
  image: string
  status: 'available' | 'sold' | 'comingsoon'
  year: number
  maxCapacity: string
  maxJibLength: string
  maxHeight: string
  type: 'flattop' | 'topslewing'
  category: 'sale' | 'rental'
  description?: string
  specifications?: any
  features?: string[]
  gallery?: string[]
}

type FilterState = {
  status: string
  type: string
  category: string
}

export default function TowerCranesClient() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [cranes, setCranes] = useState<Crane[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Set mounted state once on client
  useEffect(() => {
    setMounted(true)
  }, [])

  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    type: 'all',
    category: 'all',
  })
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch cranes from API
  const fetchCranes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Add cache-busting parameter to ensure fresh data
      const response = await fetch(`/api/cranes?_t=${Date.now()}`, {
        cache: 'no-store'
      })
      if (!response.ok) {
        throw new Error('Failed to fetch cranes')
      }
      
      const data = await response.json()
      setCranes(data)
    } catch (err) {
      console.error('Error fetching cranes:', err)
      setError('Failed to load tower cranes')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCranes()
  }, [fetchCranes])
  
  const filteredCranes = cranes.filter((crane) => {
    const matchesStatus = filters.status === 'all' || crane.status === filters.status
    const matchesType = filters.type === 'all' || crane.type === filters.type
    const matchesCategory = filters.category === 'all' || crane.category === filters.category
    const matchesSearch = searchTerm === '' || 
      crane.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      getTypeText(crane.type).toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesType && matchesCategory && matchesSearch
  })

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // Helper functions for status, type, and category text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return t('towercranes.status.available')
      case 'sold':
        return t('towercranes.status.sold')
      case 'comingsoon':
        return t('towercranes.status.comingsoon')
      default:
        return status
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'flattop':
        return t('towercranes.type.flattop')
      case 'topslewing':
        return t('towercranes.type.topslewing')
      default:
        return type
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'sale':
        return t('towercranes.category.sale')
      case 'rental':
        return t('towercranes.category.rental')
      default:
        return category
    }
  }

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ClientOnly fallback={
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
              Available Tower Cranes
            </h1>
          }>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
              {t('towercranes.page.title')}
            </h1>
          </ClientOnly>
        </div>
      </div>

      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
            <ClientOnly fallback={
              <h2 className="text-xl font-bold mb-4">Filter Tower Cranes</h2>
            }>
              <h2 className="text-xl font-bold mb-4">{t('towercranes.filter.title')}</h2>
            </ClientOnly>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder={t('towercranes.filter.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">{t('towercranes.filter.all')} {t('towercranes.filter.status')}</option>
                  <option value="available">{t('towercranes.status.available')}</option>
                  <option value="comingsoon">{t('towercranes.status.comingsoon')}</option>
                  <option value="sold">{t('towercranes.status.sold')}</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">{t('towercranes.filter.all')} {t('towercranes.filter.type')}</option>
                  <option value="flattop">{t('towercranes.type.flattop')}</option>
                  <option value="topslewing">{t('towercranes.type.topslewing')}</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">{t('towercranes.filter.all')} {t('towercranes.filter.category')}</option>
                  <option value="sale">{t('towercranes.category.sale')}</option>
                  <option value="rental">{t('towercranes.category.rental')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchCranes}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Cranes Grid */}
          {!loading && !error && (
            <>
              {filteredCranes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-neutral-600 text-lg mb-2">{t('towercranes.noCranesFound')}</p>
                  <p className="text-neutral-500">{t('towercranes.noCranesFoundSuggestion')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCranes.map((crane, index) => (
                    <MotionDiv
                      key={crane.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative h-64">
                        <Image
                          src={crane.image || '/images/optimized/default-crane.webp'}
                          alt={crane.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            crane.status === 'available' 
                              ? 'bg-green-100 text-green-800' 
                              : crane.status === 'comingsoon'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {getStatusText(crane.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">{crane.name}</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-neutral-500">{t('towercranes.crane.year')}:</span>
                            <span className="ml-2 font-medium">{crane.year}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">{t('towercranes.crane.type')}:</span>
                            <span className="ml-2 font-medium">{getTypeText(crane.type)}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">{t('towercranes.crane.maxCapacity')}:</span>
                            <span className="ml-2 font-medium">{crane.maxCapacity}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">{t('towercranes.crane.maxJibLength')}:</span>
                            <span className="ml-2 font-medium">{crane.maxJibLength}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-medium">{getCategoryText(crane.category)}</span>
                          <Link
                            href={`/towercranes/${crane.slug}`}
                            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
                          >
                            {t('towercranes.viewDetails')}
                            <FaArrowRight className="ml-2" />
                          </Link>
                        </div>
                      </div>
                    </MotionDiv>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
} 