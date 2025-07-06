'use client'

import { useState, useEffect } from 'react'

interface CraneData {
  id: string
  name: string
  model: string
  year: number
  type: string
  condition: string
  serialNumber: string
  status: string
  forSale: boolean
  specifications: {
    maxCapacity: string
    jibLength: string
    maxLiftingHeight: string
    counterJibLength: string
    maxLoadMoment: string
    hoistingSpeed: string
    slewing: string
    luffing: string
    maxLiftingCapacity: string
    power: string
    weight: string
    dimensions: string
    transportWeight: string
    maxTipLoad: string
    maxTipLoadRadius: string
    maxCapacityRadius: string
    maxFreeLiftingHeight: string
    maxLiftingHeightUnderHook: string
    maxLiftingHeightWithTie: string
    maxLiftingHeightWithoutTie: string
    jibLengthOptions: string
    counterJibLengthOptions: string
    maxLoadMomentOptions: string
    hoistingSpeedOptions: string
    slewingSpeedOptions: string
    luffingSpeedOptions: string
    maxLiftingCapacityOptions: string
    powerOptions: string
    weightOptions: string
    dimensionsOptions: string
    transportWeightOptions: string
    maxTipLoadOptions: string
    maxTipLoadRadiusOptions: string
    maxCapacityRadiusOptions: string
    maxFreeLiftingHeightOptions: string
    maxLiftingHeightUnderHookOptions: string
    maxLiftingHeightWithTieOptions: string
    maxLiftingHeightWithoutTieOptions: string
  }
  features: string[]
  images: string[]
  description: string
  price: string
  location: string
  availability: string
  category: string
  subcategory: string
  brand: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface CraneDetailsClientProps {
  slug: string
}

export default function CraneDetailsClient({ slug }: CraneDetailsClientProps) {
  const [mounted, setMounted] = useState(false)
  const [crane, setCrane] = useState<CraneData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const fetchCrane = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/cranes/${slug}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setCrane(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load crane details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchCrane()
  }, [slug])

  const handleRetry = () => {
    fetchCrane()
  }

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading crane details...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading crane details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Crane</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={handleRetry} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!crane) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🏗️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Crane Not Found</h2>
          <p className="text-gray-600">The crane you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    if (crane.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % crane.images.length)
    }
  }

  const prevImage = () => {
    if (crane.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + crane.images.length) % crane.images.length)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{crane.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>Year: {crane.year}</span>
            <span>Type: {crane.type}</span>
            <span>Condition: {crane.condition}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              crane.status === 'available' ? 'bg-green-100 text-green-800' : 
              crane.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {crane.status}
            </span>
          </div>
        </div>

        {crane.images && crane.images.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={crane.images[currentImageIndex]}
                  alt={`${crane.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {crane.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    →
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Max Capacity</p>
              <p className="font-semibold">{crane.specifications.maxCapacity}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Jib Length</p>
              <p className="font-semibold">{crane.specifications.jibLength}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Max Height</p>
              <p className="font-semibold">{crane.specifications.maxLiftingHeight}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Counter Jib Length</p>
              <p className="font-semibold">{crane.specifications.counterJibLength}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Power</p>
              <p className="font-semibold">{crane.specifications.power}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Weight</p>
              <p className="font-semibold">{crane.specifications.weight}</p>
            </div>
          </div>
        </div>

        {crane.description && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{crane.description}</p>
          </div>
        )}

        {crane.features && crane.features.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {crane.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Interested in this crane?</h2>
          <p className="text-gray-600 mb-4">
            Contact us for more information, pricing, or to schedule a viewing.
          </p>
          <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
} 

