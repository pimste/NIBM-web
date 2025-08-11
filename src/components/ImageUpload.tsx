'use client'

import { useState } from 'react'
import { FaUpload, FaSpinner, FaTrash, FaPlus } from 'react-icons/fa'
import Image from 'next/image'

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
  label?: string
}

interface ImageItem {
  url: string
  isUploaded?: boolean
}

export default function ImageUpload({ images, onChange, maxImages = 5, label = "Images" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  // Debug logging
  console.log('ImageUpload component - images:', images)
  console.log('ImageUpload component - images with /images/:', images.filter(img => img.startsWith('/images/')))

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        console.log('File uploaded successfully:', data.url)
        // Add uploaded file without requiring URL input
        const newImages = [...images, data.url]
        onChange(newImages)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError('Network error. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleUrlAdd = () => {
    const url = prompt('Enter image URL:')
    if (url && url.trim()) {
      const newImages = [...images, url.trim()]
      onChange(newImages)
    }
  }

  const handleAddEmpty = () => {
    const newImages = [...images, '']
    onChange(newImages)
  }

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  const handleChange = (index: number, value: string) => {
    const newImages = images.map((img, i) => i === index ? value : img)
    onChange(newImages)
  }

  const handleBlur = (index: number, value: string) => {
    // Remove empty strings when user leaves the field, but keep uploaded files
    if (!value.trim() && !value.startsWith('/images/')) {
      const newImages = images.filter((_, i) => i !== index)
      onChange(newImages)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Image List */}
      <div className="space-y-3 mb-4">
        {images.map((image, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            {/* Image Preview */}
            <div className="w-16 h-16 relative bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              {image && (
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={() => {
                    // Handle broken image
                  }}
                />
              )}
            </div>
            
            {/* Show URL input only if it's not an uploaded file */}
            {image && !image.startsWith('/images/') ? (
              <input
                type="url"
                value={image}
                onChange={(e) => handleChange(index, e.target.value)}
                onBlur={(e) => handleBlur(index, e.target.value)}
                placeholder="Enter image URL (optional)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            ) : (
              <div className="flex-1 px-3 py-2 text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-md">
                {image ? 'Uploaded file' : 'No image'}
              </div>
            )}
            
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-600 hover:text-red-800 p-2"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Image Options */}
      {images.length < maxImages && (
        <div className="flex space-x-2">
          {/* File Upload */}
          <label className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            {uploading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FaUpload className="mr-2" />
            )}
            <span className="text-sm">
              {uploading ? 'Uploading...' : 'Upload Image'}
            </span>
          </label>

          {/* Add Empty URL Input - only show if no uploaded files */}
          {!images.some(img => img.startsWith('/images/')) && (
            <button
              type="button"
              onClick={handleAddEmpty}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <FaPlus className="mr-2" />
              <span className="text-sm">Add URL Field</span>
            </button>
          )}
        </div>
      )}

      {images.length >= maxImages && (
        <p className="text-sm text-gray-500 mt-2">
          Maximum {maxImages} images allowed
        </p>
      )}
    </div>
  )
} 