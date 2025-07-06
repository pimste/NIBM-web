'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaEdit, FaTrash, FaCog, FaRuler, FaWeight, FaCalendar, FaTag, FaInfoCircle } from 'react-icons/fa'

interface Crane {
  id: number
  name: string
  model: string
  year: number
  type: string
  condition: string
  serialNumber: string
  maxCapacity: string
  maxJibLength: string
  maxHeight: string
  counterJibLength: string
  towerType: string
  cabinType: string
  hoistSpeed: string
  trolleySpeed: string
  slewing: string
  powerRequirements: string
  description: string
  features: string[]
  images: string[]
  brochureUrl: string
  isAvailable: boolean
  status: string
  category: string
  createdAt: string
  updatedAt: string
}

export default function ViewCrane() {
  const params = useParams()
  const router = useRouter()
  const craneId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [crane, setCrane] = useState<Crane | null>(null)

  useEffect(() => {
    fetchCrane()
  }, [craneId])

  const fetchCrane = async () => {
    try {
      const response = await fetch(`/api/admin/cranes/${craneId}`, {
        credentials: 'include'
      })
      if (response.ok) {
        const craneData = await response.json()
        setCrane(craneData)
      } else if (response.status === 401) {
        router.push('/en/admin/login')
        return
      } else {
        setError('Failed to fetch crane data')
      }
    } catch (error) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      available: 'bg-green-100 text-green-800',
      sold: 'bg-red-100 text-red-800',
      'coming-soon': 'bg-yellow-100 text-yellow-800',
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading crane details...</p>
        </div>
      </div>
    )
  }

  if (error || !crane) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Crane not found'}</p>
          <Link
            href="/en/admin/dashboard"
            className="text-primary hover:text-primary-dark"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/en/admin/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{crane.name}</h1>
                <p className="text-gray-600">{crane.model} • {crane.year}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {getStatusBadge(crane.status)}
              <Link
                href={`/en/admin/cranes/${crane.id}/edit`}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
              >
                <FaEdit className="w-4 h-4" />
                <span>Edit</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaInfoCircle className="w-5 h-5 mr-2 text-primary" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Serial Number</label>
                  <p className="mt-1 text-sm text-gray-900">{crane.serialNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{crane.type.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Condition</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{crane.condition.replace('-', ' ')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">For {crane.category}</p>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaCog className="w-5 h-5 mr-2 text-primary" />
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {crane.maxCapacity && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Capacity</label>
                    <p className="mt-1 text-sm text-gray-900">{crane.maxCapacity}</p>
                  </div>
                )}
                {crane.maxJibLength && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Jib Length</label>
                    <p className="mt-1 text-sm text-gray-900">{crane.maxJibLength}</p>
                  </div>
                )}
                {crane.maxHeight && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Height</label>
                    <p className="mt-1 text-sm text-gray-900">{crane.maxHeight}</p>
                  </div>
                )}
                {crane.counterJibLength && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Counter Jib Length</label>
                    <p className="mt-1 text-sm text-gray-900">{crane.counterJibLength}</p>
                  </div>
                )}
                {crane.towerType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tower Type</label>
                    <p className="mt-1 text-sm text-gray-900">{crane.towerType}</p>
                  </div>
                )}
                {crane.cabinType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cabin Type</label>
                    <p className="mt-1 text-sm text-gray-900">{crane.cabinType}</p>
                  </div>
                )}
                {crane.hoistSpeed && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hoist Speed</label>
                    <p className="mt-1 text-sm text-gray-900">{crane.hoistSpeed}</p>
                  </div>
                )}
                {crane.trolleySpeed && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Trolley Speed</label>
                    <p className="mt-1 text-sm text-gray-900">{crane.trolleySpeed}</p>
                  </div>
                )}
                {crane.slewing && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Slewing</label>
                    <p className="mt-1 text-sm text-gray-900">{crane.slewing}</p>
                  </div>
                )}
                {crane.powerRequirements && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Power Requirements</label>
                    <p className="mt-1 text-sm text-gray-900">{crane.powerRequirements}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {crane.description && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{crane.description}</p>
              </div>
            )}

            {/* Features */}
            {crane.features && crane.features.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Features</h2>
                <ul className="space-y-2">
                  {crane.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Availability */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Current Status</span>
                  {getStatusBadge(crane.status)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Available</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    crane.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {crane.isAvailable ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Images */}
            {crane.images && crane.images.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Images</h3>
                <div className="space-y-2">
                  {crane.images.map((image, index) => (
                    <div key={index} className="text-sm">
                      <a 
                        href={image} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark break-all"
                      >
                        Image {index + 1}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Brochure */}
            {crane.brochureUrl && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Brochure</h3>
                <a 
                  href={crane.brochureUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark text-sm break-all"
                >
                  Download Brochure
                </a>
              </div>
            )}

            {/* Metadata */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Metadata</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Created:</span>
                  <p className="text-gray-600">{new Date(crane.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Last Updated:</span>
                  <p className="text-gray-600">{new Date(crane.updatedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">ID:</span>
                  <p className="text-gray-600">{crane.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 