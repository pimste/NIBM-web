'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaSave, FaSpinner, FaPlus, FaTrash } from 'react-icons/fa'
import ImageUpload from '@/components/ImageUpload'

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
}

export default function EditCrane() {
  const router = useRouter()
  const params = useParams()
  const craneId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [crane, setCrane] = useState<Crane | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'topslewing',
    condition: 'excellent',
    serialNumber: '',
    maxCapacity: '',
    maxJibLength: '',
    maxHeight: '',
    counterJibLength: '',
    towerType: '',
    cabinType: '',
    hoistSpeed: '',
    trolleySpeed: '',
    slewing: '',
    powerRequirements: '',
    description: '',
    features: [''],
    images: [''],
    brochureUrl: '',
    isAvailable: true,
    status: 'available',
    category: 'sale'
  })

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
        
        // Populate form with existing data
        setFormData({
          name: craneData.name || '',
          model: craneData.model || '',
          year: craneData.year || new Date().getFullYear(),
          type: craneData.type || 'topslewing',
          condition: craneData.condition || 'excellent',
          serialNumber: craneData.serialNumber || '',
          maxCapacity: craneData.maxCapacity || '',
          maxJibLength: craneData.maxJibLength || '',
          maxHeight: craneData.maxHeight || '',
          counterJibLength: craneData.counterJibLength || '',
          towerType: craneData.towerType || '',
          cabinType: craneData.cabinType || '',
          hoistSpeed: craneData.hoistSpeed || '',
          trolleySpeed: craneData.trolleySpeed || '',
          slewing: craneData.slewing || '',
          powerRequirements: craneData.powerRequirements || '',
          description: craneData.description || '',
          features: Array.isArray(craneData.features) ? craneData.features : [''],
          images: Array.isArray(craneData.images) ? craneData.images : [''],
          brochureUrl: craneData.brochureUrl || '',
          isAvailable: craneData.isAvailable ?? true,
          status: craneData.status || 'available',
          category: craneData.category || 'sale'
        })
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleArrayChange = (index: number, value: string, field: 'features' | 'images') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field: 'features' | 'images') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (index: number, field: 'features' | 'images') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      // Filter out empty strings from arrays, but keep uploaded files
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        images: formData.images.filter(i => {
          // Keep uploaded files (starting with /images/) even if they appear empty
          if (i.startsWith('/images/')) return true
          // Filter out empty URLs
          return i.trim() !== ''
        })
      }

      // Ensure we have at least one image or set to empty array
      if (cleanedData.images.length === 0) {
        cleanedData.images = []
      }

      console.log('Submitting crane update:', cleanedData)
      console.log('Images before submission:', formData.images)
      console.log('Cleaned images:', cleanedData.images)

      const response = await fetch(`/api/admin/cranes/${craneId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
        credentials: 'include'
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (response.ok) {
        const result = await response.json()
        console.log('Update successful:', result)
        router.push('/en/admin/dashboard')
      } else {
        const data = await response.json()
        console.error('Update failed:', data)
        setError(data.error || 'Failed to update crane')
      }
    } catch (error) {
      console.error('Network error:', error)
      setError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading crane data...</p>
        </div>
      </div>
    )
  }

  if (error && !crane) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Edit Crane</h1>
                <p className="text-gray-600">Update {crane?.name} details</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="text-sm text-red-600">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Crane Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Model *
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  min="1990"
                  max="2030"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Number
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="topslewing">Top Slewing</option>
                  <option value="flattop">Flat Top</option>
                  <option value="selferecting">Self Erecting</option>
                </select>
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="excellent">Excellent</option>
                  <option value="very-good">Very Good</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="comingsoon">Coming Soon</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="sale">For Sale</option>
                  <option value="rental">For Rental</option>
                </select>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <ImageUpload
              images={formData.images}
              onChange={(images) => setFormData(prev => ({ ...prev, images }))}
              maxImages={20}
              label="Crane Images"
            />
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Key Features</h2>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'features')}
                    placeholder="Enter a key feature..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'features')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('features')}
                className="text-primary hover:text-primary-dark flex items-center space-x-2"
              >
                <FaPlus className="w-4 h-4" />
                <span>Add Feature</span>
              </button>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="maxCapacity" className="block text-sm font-medium text-gray-700 mb-2">
                  Max Capacity
                </label>
                <input
                  type="text"
                  id="maxCapacity"
                  name="maxCapacity"
                  value={formData.maxCapacity}
                  onChange={handleInputChange}
                  placeholder="e.g., 8 tons"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="maxJibLength" className="block text-sm font-medium text-gray-700 mb-2">
                  Max Jib Length
                </label>
                <input
                  type="text"
                  id="maxJibLength"
                  name="maxJibLength"
                  value={formData.maxJibLength}
                  onChange={handleInputChange}
                  placeholder="e.g., 60 meters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="maxHeight" className="block text-sm font-medium text-gray-700 mb-2">
                  Max Height
                </label>
                <input
                  type="text"
                  id="maxHeight"
                  name="maxHeight"
                  value={formData.maxHeight}
                  onChange={handleInputChange}
                  placeholder="e.g., 64.9 meters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="counterJibLength" className="block text-sm font-medium text-gray-700 mb-2">
                  Counter Jib Length
                </label>
                <input
                  type="text"
                  id="counterJibLength"
                  name="counterJibLength"
                  value={formData.counterJibLength}
                  onChange={handleInputChange}
                  placeholder="e.g., 20 meters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="towerType" className="block text-sm font-medium text-gray-700 mb-2">
                  Tower Type
                </label>
                <input
                  type="text"
                  id="towerType"
                  name="towerType"
                  value={formData.towerType}
                  onChange={handleInputChange}
                  placeholder="e.g., Standard"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="cabinType" className="block text-sm font-medium text-gray-700 mb-2">
                  Cabin Type
                </label>
                <input
                  type="text"
                  id="cabinType"
                  name="cabinType"
                  value={formData.cabinType}
                  onChange={handleInputChange}
                  placeholder="e.g., Comfort"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="hoistSpeed" className="block text-sm font-medium text-gray-700 mb-2">
                  Hoist Speed
                </label>
                <input
                  type="text"
                  id="hoistSpeed"
                  name="hoistSpeed"
                  value={formData.hoistSpeed}
                  onChange={handleInputChange}
                  placeholder="e.g., 120 m/min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="trolleySpeed" className="block text-sm font-medium text-gray-700 mb-2">
                  Trolley Speed
                </label>
                <input
                  type="text"
                  id="trolleySpeed"
                  name="trolleySpeed"
                  value={formData.trolleySpeed}
                  onChange={handleInputChange}
                  placeholder="e.g., 40 m/min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="slewing" className="block text-sm font-medium text-gray-700 mb-2">
                  Slewing Speed
                </label>
                <input
                  type="text"
                  id="slewing"
                  name="slewing"
                  value={formData.slewing}
                  onChange={handleInputChange}
                  placeholder="e.g., 0.6 rpm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="powerRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                  Power Requirements
                </label>
                <input
                  type="text"
                  id="powerRequirements"
                  name="powerRequirements"
                  value={formData.powerRequirements}
                  onChange={handleInputChange}
                  placeholder="e.g., 400V 50Hz"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Description</h2>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter detailed description of the crane..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-end space-x-4">
              <Link
                href="/en/admin/dashboard"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
} 