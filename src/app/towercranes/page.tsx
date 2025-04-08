'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'

// This would be fetched from a CMS or API in a real implementation
const cranes = [
  {
    id: 1,
    name: 'Potain MDT 178',
    image: '/images/Potain-MDT-178_3W.jpg',
    status: 'Available',
    year: 2019,
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
    maxHeight: '64.9 meters',
    type: 'Flat Top',
    category: 'Sale',
  },
  {
    id: 2,
    name: 'Potain MC 85 B',
    image: '/images/cropped-Top-page2-potain6.png',
    status: 'Available',
    year: 2020,
    maxCapacity: '5 tons',
    maxJibLength: '52 meters',
    maxHeight: '42.5 meters',
    type: 'Top Slewing',
    category: 'Rental',
  },
  {
    id: 3,
    name: 'Potain MDT 219 J10',
    image: '/images/cropped-Top-page2-potain6.png',
    status: 'Coming Soon',
    year: 2021,
    maxCapacity: '10 tons',
    maxJibLength: '65 meters',
    maxHeight: '70.2 meters',
    type: 'Flat Top',
    category: 'Sale',
  },
  {
    id: 4,
    name: 'Potain MCT 88',
    image: '/images/Potain-MDT-178_3W.jpg',
    status: 'Available',
    year: 2018,
    maxCapacity: '5 tons',
    maxJibLength: '52 meters',
    maxHeight: '47 meters',
    type: 'Flat Top',
    category: 'Rental',
  },
  {
    id: 5,
    name: 'Potain MC 125',
    image: '/images/cropped-Top-page2-potain6.png',
    status: 'Available',
    year: 2017,
    maxCapacity: '6 tons',
    maxJibLength: '60 meters',
    maxHeight: '55 meters',
    type: 'Top Slewing',
    category: 'Sale',
  },
  {
    id: 6,
    name: 'Potain MDT 189',
    image: '/images/Potain-MDT-178_3W.jpg',
    status: 'Available',
    year: 2020,
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
    maxHeight: '60 meters',
    type: 'Flat Top',
    category: 'Rental',
  },
]

type FilterState = {
  status: string
  type: string
  category: string
}

export default function TowerCranes() {
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
      crane.type.toLowerCase().includes(searchTerm.toLowerCase())

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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
            Available Tower Cranes
          </h1>
        </div>
      </div>

      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Filter Tower Cranes</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-neutral-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Search by name or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Available">Available</option>
                  <option value="Coming Soon">Coming Soon</option>
                </select>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-neutral-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Flat Top">Flat Top</option>
                  <option value="Top Slewing">Top Slewing</option>
                </select>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Sale">For Sale</option>
                  <option value="Rental">For Rent</option>
                </select>
              </div>
            </div>
          </div>

          {filteredCranes.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-neutral-700">No tower cranes found matching your criteria</h3>
              <p className="text-neutral-500 mt-2">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCranes.map((crane) => (
                <motion.div
                  key={crane.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-64">
                    <Image
                      src={crane.image}
                      alt={crane.name}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                      crane.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {crane.status}
                    </div>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {crane.category === 'Sale' ? 'For Sale' : 'For Rent'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{crane.name}</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                      <div className="text-sm">
                        <span className="text-neutral-500">Year:</span> <span className="font-medium">{crane.year}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-neutral-500">Type:</span> <span className="font-medium">{crane.type}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-neutral-500">Max Capacity:</span> <span className="font-medium">{crane.maxCapacity}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-neutral-500">Max Jib Length:</span> <span className="font-medium">{crane.maxJibLength}</span>
                      </div>
                    </div>
                    <Link
                      href={`/towercranes/${crane.id}`}
                      className="block w-full text-center bg-primary hover:bg-primary-700 text-white font-medium py-2 rounded-md transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
} 