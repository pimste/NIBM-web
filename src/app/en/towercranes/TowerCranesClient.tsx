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

// This would be fetched from a CMS or API in a real implementation
const cranes = [
  {
    id: 1,
    name: 'Potain MDT 178',
    slug: 'potain-mdt-178', // SEO-friendly slug
    image: '/images/optimized/Potain-MDT-178_3W.webp',
    status: 'towercranes.status.available',
    year: 2019,
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
    maxHeight: '64.9 meters',
    type: 'towercranes.type.flattop',
    category: 'towercranes.category.sale',
  },
  {
    id: 2,
    name: 'Potain MC 85 B',
    slug: 'potain-mc-85-b', // SEO-friendly slug
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    status: 'towercranes.status.available',
    year: 2020,
    maxCapacity: '5 tons',
    maxJibLength: '52 meters',
    maxHeight: '42.5 meters',
    type: 'towercranes.type.topslewing',
    category: 'towercranes.category.rental',
  },
  {
    id: 3,
    name: 'Potain MDT 219 J10',
    slug: 'potain-mdt-219-j10', // SEO-friendly slug
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    status: 'towercranes.status.comingsoon',
    year: 2021,
    maxCapacity: '10 tons',
    maxJibLength: '65 meters',
    maxHeight: '70.2 meters',
    type: 'towercranes.type.flattop',
    category: 'towercranes.category.sale',
  },
  {
    id: 4,
    name: 'Potain MCT 88',
    slug: 'potain-mct-88', // SEO-friendly slug
    image: '/images/optimized/Potain-MDT-178_3W.webp',
    status: 'towercranes.status.available',
    year: 2018,
    maxCapacity: '5 tons',
    maxJibLength: '52 meters',
    maxHeight: '47 meters',
    type: 'towercranes.type.flattop',
    category: 'towercranes.category.rental',
  },
  {
    id: 5,
    name: 'Potain MC 125',
    slug: 'potain-mc-125', // SEO-friendly slug
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    status: 'towercranes.status.available',
    year: 2017,
    maxCapacity: '6 tons',
    maxJibLength: '60 meters',
    maxHeight: '55 meters',
    type: 'towercranes.type.topslewing',
    category: 'towercranes.category.sale',
  },
  {
    id: 6,
    name: 'Potain MDT 189',
    slug: 'potain-mdt-189', // SEO-friendly slug
    image: '/images/optimized/Potain-MDT-178_3W.webp',
    status: 'towercranes.status.available',
    year: 2020,
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
    maxHeight: '60 meters',
    type: 'towercranes.type.flattop',
    category: 'towercranes.category.rental',
  },
  {
    id: 7,
    name: 'Potain MC 175 B',
    slug: 'potain-mc-175-b', // SEO-friendly slug
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    status: 'towercranes.status.sold',
    year: 2019,
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
    maxHeight: '58 meters',
    type: 'towercranes.type.topslewing',
    category: '',
  },
  {
    id: 8,
    name: 'Potain MDT 268 J12',
    slug: 'potain-mdt-268-j12', // SEO-friendly slug
    image: '/images/optimized/Potain-MDT-178_3W.webp',
    status: 'towercranes.status.sold',
    year: 2018,
    maxCapacity: '12 tons',
    maxJibLength: '75 meters',
    maxHeight: '72.8 meters',
    type: 'towercranes.type.flattop',
    category: '',
  },
  {
    id: 9,
    name: 'Potain MCT 135',
    slug: 'potain-mct-135', // SEO-friendly slug
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    status: 'towercranes.status.sold',
    year: 2020,
    maxCapacity: '6 tons',
    maxJibLength: '50 meters',
    maxHeight: '53 meters',
    type: 'towercranes.type.flattop',
    category: '',
  },
]

type FilterState = {
  status: string
  type: string
  category: string
}

export default function TowerCranesClient() {
  // Use language for translations and filtering
  const { t, language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  
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
  
  const filteredCranes = cranes.filter((crane) => {
    const matchesStatus = filters.status === 'all' || crane.status === filters.status
    const matchesType = filters.type === 'all' || crane.type === filters.type
    const matchesCategory = filters.category === 'all' || crane.category === filters.category
    const matchesSearch = searchTerm === '' || 
      crane.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t(crane.type).toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesType && matchesCategory && matchesSearch
  })

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <ClientOnly fallback={
                  <label htmlFor="search" className="block text-sm font-medium text-neutral-700 mb-1">
                    Search
                  </label>
                }>
                  <label htmlFor="search" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('towercranes.filter.search')}
                  </label>
                </ClientOnly>
                <input
                  type="text"
                  id="search"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder={mounted ? t('towercranes.filter.searchPlaceholder') : "Search by name or type..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <ClientOnly fallback={
                  <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">
                    Status
                  </label>
                }>
                  <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('towercranes.filter.status')}
                  </label>
                </ClientOnly>
                <select
                  id="status"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="all">{mounted ? t('towercranes.filter.all') : "All"}</option>
                  <option value="towercranes.status.available">{mounted ? t('towercranes.status.available') : "Available"}</option>
                  <option value="towercranes.status.comingsoon">{mounted ? t('towercranes.status.comingsoon') : "Coming Soon"}</option>
                  <option value="towercranes.status.sold">{mounted ? t('towercranes.status.sold') : "Sold"}</option>
                </select>
              </div>
              <div>
                <ClientOnly fallback={
                  <label htmlFor="type" className="block text-sm font-medium text-neutral-700 mb-1">
                    Type
                  </label>
                }>
                  <label htmlFor="type" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('towercranes.filter.type')}
                  </label>
                </ClientOnly>
                <select
                  id="type"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="all">{mounted ? t('towercranes.filter.all') : "All"}</option>
                  <option value="towercranes.type.flattop">{mounted ? t('towercranes.type.flattop') : "Flat Top"}</option>
                  <option value="towercranes.type.topslewing">{mounted ? t('towercranes.type.topslewing') : "Top Slewing"}</option>
                </select>
              </div>
              <div>
                <ClientOnly fallback={
                  <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
                    Category
                  </label>
                }>
                  <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('towercranes.filter.category')}
                  </label>
                </ClientOnly>
                <select
                  id="category"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="all">{mounted ? t('towercranes.filter.all') : "All"}</option>
                  <option value="towercranes.category.sale">{mounted ? t('towercranes.category.sale') : "For Sale"}</option>
                  <option value="towercranes.category.rental">{mounted ? t('towercranes.category.rental') : "For Rent"}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredCranes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCranes.map((crane) => (
                <div key={crane.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="relative h-64">
                    <Image 
                      src={crane.image} 
                      alt={crane.name}
                      fill
                      className="object-cover"
                      quality={80}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={`absolute top-4 right-4 py-1 px-3 rounded-full text-sm font-medium
                      ${crane.status === 'towercranes.status.available' 
                        ? 'bg-green-100 text-green-800' 
                        : crane.status === 'towercranes.status.comingsoon'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}
                    >
                      {mounted ? t(crane.status) : crane.status.split('.').pop()}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{crane.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-neutral-500">{mounted ? t('towercranes.crane.year') : "Year"}</p>
                        <p className="font-medium">{crane.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{mounted ? t('towercranes.crane.type') : "Type"}</p>
                        <p className="font-medium">{mounted ? t(crane.type) : crane.type.split('.').pop()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{mounted ? t('towercranes.crane.maxCapacity') : "Max Capacity"}</p>
                        <p className="font-medium">{crane.maxCapacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{mounted ? t('towercranes.crane.maxJibLength') : "Max Jib Length"}</p>
                        <p className="font-medium">{crane.maxJibLength}</p>
                      </div>
                    </div>
                    <Link
                      href={`/towercranes/${crane.slug}`}
                      className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
                    >
                      {mounted ? t('towercranes.viewDetails') : "View Details"}
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {mounted ? t('towercranes.noCranesFound') : "No tower cranes found matching your criteria"}
              </h3>
              <p className="text-neutral-700">
                {mounted ? t('towercranes.noCranesFoundSuggestion') : "Try adjusting your filters or search term"}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
} 