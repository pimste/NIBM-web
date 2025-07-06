'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FaArrowLeft, FaCheck, FaDownload, FaEnvelope, FaInfoCircle, FaPhone, FaPrint } from 'react-icons/fa'
import { MotionDiv } from '@/components/MotionWrapper'
import { useLanguage } from '@/context/LanguageContext'
import { TowerCraneSchema } from '@/components/TowerCraneSchema'

// Define the Crane interface to match the API response
interface Crane {
  id: number
  name: string
  slug: string
  image: string
  gallery?: string[]
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
}

export default function CraneDetailsClient() {
  const params = useParams()
  const slug = params.slug as string
  const { t } = useLanguage()
  
  const [crane, setCrane] = useState<Crane | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const fetchCrane = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/cranes/${slug}`)
        if (!response.ok) {
          if (response.status === 404) {
            setError('Crane not found')
          } else {
            throw new Error('Failed to fetch crane')
          }
          return
        }
        
        const data = await response.json()
        setCrane(data)
      } catch (err) {
        console.error('Error fetching crane:', err)
        setError('Failed to load crane details')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchCrane()
    }
  }, [slug])

  // Helper functions for translations
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600">Lade Krandetails...</p>
        </div>
      </div>
    )
  }

  if (error || !crane) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Turmkran nicht gefunden</h1>
          <p className="text-neutral-600 mb-6">Der gesuchte Turmkran existiert nicht oder wurde entfernt.</p>
          <Link
            href="/de/towercranes"
            className="inline-flex items-center text-primary hover:text-primary-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Zurück zu verfügbaren Kranen
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would send the form data to a server
    console.log('Form submitted:', formData)
    setFormSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Add schema.org structured data for this specific crane
  const siteUrl = 'https://www.nibmvb.eu'
  const craneUrl = `${siteUrl}/de/towercranes/${crane.slug}`
  const manufacturer = crane.specifications?.manufacturer || 'Potain'
  const model = crane.specifications?.model || crane.name
  const condition = crane.category === 'sale' ? 'NewCondition' : 'UsedCondition'
  const availability = crane.status === 'available' ? 'InStock' : 'OutOfStock'

  // Prepare gallery images
  const galleryImages = crane.gallery && crane.gallery.length > 0 ? crane.gallery : [crane.image]

  return (
    <>
      <TowerCraneSchema
        name={crane.name}
        description={crane.description || ''}
        image={`${siteUrl}${crane.image}`}
        manufacturer={manufacturer}
        model={model}
        sku={crane.specifications?.serialNumber}
        maxCapacity={crane.maxCapacity}
        maxHeight={crane.maxHeight}
        availability={availability}
        condition={condition}
        url={craneUrl}
      />

      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 md:mb-0">
              {crane.name}
            </h1>
            <Link
              href="/de/towercranes"
              className="inline-flex items-center text-white hover:text-primary-100 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Zurück zu verfügbaren Kranen
            </Link>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                <Image
                  src={galleryImages[activeImage]}
                  alt={crane.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {galleryImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImage === index ? 'border-primary' : 'border-neutral-200'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${crane.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Crane Details */}
            <div>
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    crane.status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : crane.status === 'comingsoon'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {getStatusText(crane.status)}
                  </span>
                  <span className="text-primary font-medium">{getCategoryText(crane.category)}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">{crane.name}</h2>
                
                {crane.description && (
                  <p className="text-neutral-600 mb-6">{crane.description}</p>
                )}
              </div>

              {/* Specifications */}
              <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Technische Daten</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-neutral-500">Baujahr:</span>
                    <span className="block font-medium">{crane.year}</span>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-500">Typ:</span>
                    <span className="block font-medium">{getTypeText(crane.type)}</span>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-500">Max. Tragkraft:</span>
                    <span className="block font-medium">{crane.maxCapacity}</span>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-500">Max. Ausladung:</span>
                    <span className="block font-medium">{crane.maxJibLength}</span>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-500">Max. Hakenhöhe:</span>
                    <span className="block font-medium">{crane.maxHeight}</span>
                  </div>
                  {crane.specifications?.manufacturer && (
                    <div>
                      <span className="text-sm text-neutral-500">Hersteller:</span>
                      <span className="block font-medium">{crane.specifications.manufacturer}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              {crane.features && crane.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Ausstattung</h3>
                  <ul className="space-y-2">
                    {crane.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact Form */}
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  <FaEnvelope className="inline mr-2" />
                  Anfrage senden
                </h3>
                
                {formSubmitted ? (
                  <div className="text-center py-4">
                    <FaCheck className="text-green-600 text-2xl mx-auto mb-2" />
                    <p className="text-green-600 font-medium">Vielen Dank für Ihre Anfrage!</p>
                    <p className="text-neutral-600 text-sm">Wir werden uns in Kürze bei Ihnen melden.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Ihr Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Ihre E-Mail"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Telefonnummer"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="text"
                        name="company"
                        placeholder="Firma"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <textarea
                      name="message"
                      placeholder="Ihre Nachricht"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Anfrage senden
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 