'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FaArrowLeft, FaCheck, FaDownload, FaEnvelope, FaInfoCircle, FaPhone, FaPrint } from 'react-icons/fa'
import { TowerCraneSchema } from '@/components/TowerCraneSchema'

// Define the Crane interface to match the API response
interface Crane {
  id: number
  name: string
  slug: string
  image: string
  gallery?: string[]
  status: 'available' | 'sold' | 'comingsoon'
  year: number | null
  maxCapacity: string
  maxJibLength: string
  maxHeight: string
  type: 'flattop' | 'topslewing'
  category: 'sale' | 'rental'
  description?: string
  specifications?: any
  features?: string[]
}

interface CraneDetailsClientProps {
  slug: string
}

export default function CraneDetailsClient({ slug }: CraneDetailsClientProps) {
  const [mounted, setMounted] = useState(false)
  const [crane, setCrane] = useState<Crane | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    craneModel: '',
    inquiryType: 'Crane Inquiry'
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch crane data from API
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

  // Initialize form with crane details
  useEffect(() => {
    if (crane) {
      setFormData(prev => ({
        ...prev,
        craneModel: crane.name,
        subject: `Inquiry about ${crane.name}`,
        message: `I'm interested in the ${crane.name} (${crane.year ?? '-'}) and would like more information about:\n\n- Pricing and availability\n- Technical specifications\n- Delivery options\n- Service and support\n\nPlease contact me to discuss further.`
      }))
    }
  }, [crane?.name, crane?.year])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit the form. Please try again.')
      }

      setFormSubmitted(true)
      // Reset form data but keep crane-specific info
      if (crane) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: `Inquiry about ${crane.name}`,
          message: `I'm interested in the ${crane.name} (${crane.year ?? '-'}) and would like more information about:\n\n- Pricing and availability\n- Technical specifications\n- Delivery options\n- Service and support\n\nPlease contact me to discuss further.`,
          craneModel: crane.name,
          inquiryType: 'Crane Inquiry'
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Loading Crane Details...</h1>
          <p className="text-neutral-600">Please wait while we fetch the crane information.</p>
        </div>
      </div>
    )
  }

  if (error || !crane) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Tower Crane Not Found</h1>
          <p className="text-neutral-600 mb-6">The tower crane you are looking for does not exist or has been removed.</p>
          <Link
            href="/en/towercranes"
            className="inline-flex items-center text-primary hover:text-primary-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Available Cranes
          </Link>
        </div>
      </div>
    )
  }

  // SEO and schema variables
  const siteUrl = 'https://www.nibmvb.eu'
  const manufacturer = crane.specifications?.manufacturer || 'NIBM'
  const model = crane.specifications?.model || crane.name
  const availability = crane.status === 'available' ? 'InStock' : 'OutOfStock'
  const condition = crane.specifications?.condition || 'Used'
  const craneUrl = `${siteUrl}/en/towercranes/${crane.slug}`

  return (
    <>
      <TowerCraneSchema
        name={crane.name}
        description={crane.description}
        image={crane.image}
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
              href="/en/towercranes"
              className="inline-flex items-center text-white hover:text-primary-100 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Back to Available Cranes
            </Link>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery - More Professional Layout */}
            <div>
              <div className="relative h-80 rounded-lg overflow-hidden mb-4 shadow-lg">
                <Image
                  src={crane.gallery && crane.gallery.length > 0 ? crane.gallery[activeImage] : crane.image}
                  alt={crane.name}
                  fill
                  className="object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  crane.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {crane.status}
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {crane.category === 'sale' ? 'For Sale' : 'For Rent'}
                </div>
              </div>
              {crane.gallery && crane.gallery.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {crane.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded overflow-hidden ${
                        activeImage === index ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${crane.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              <div className="flex justify-between mt-4">
                <button
                  className="flex items-center text-primary hover:text-primary-700 transition-colors"
                  onClick={() => window.print()}
                >
                  <FaPrint className="mr-2" /> Print Details
                </button>
                <button
                  className="flex items-center text-primary hover:text-primary-700 transition-colors"
                >
                  <FaDownload className="mr-2" /> Download Brochure
                </button>
              </div>
            </div>

            {/* Crane Information */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                {crane.name}
              </h2>
              <p className="text-neutral-700 mb-6">
                {crane.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Year</h3>
                  <p className="text-neutral-700">{crane.year ?? '-'}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Type</h3>
                  <p className="text-neutral-700">{crane.type}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Max Capacity</h3>
                  <p className="text-neutral-700">{crane.maxCapacity}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Max Jib Length</h3>
                  <p className="text-neutral-700">{crane.maxJibLength}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Max Height</h3>
                  <p className="text-neutral-700">{crane.maxHeight}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Category</h3>
                  <p className="text-neutral-700">{crane.category === 'sale' ? 'For Sale' : 'For Rent'}</p>
                </div>
              </div>

              {/* Features Section */}
              {crane.features && crane.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {crane.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Technical Specifications
            </h2>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(crane.specifications || {}).map(([key, value], index) => (
                  <div 
                    key={key} 
                    className={`p-4 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                    } border-b border-neutral-200`}
                  >
                    <div className="text-sm text-neutral-500 mb-1">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2 flex items-center">
              <FaEnvelope className="mr-3 text-primary" />
              Request Information About This Crane
            </h2>
            <p className="text-neutral-600 mb-6">
              Fill out the form below and we'll get back to you with detailed information about the {crane.name}.
            </p>
            
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-md">
                <div className="flex items-center">
                  <FaCheck className="text-green-600 text-xl mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Thank You for Your Interest!</h3>
                    <p>We've received your inquiry about the {crane.name}. Our team will contact you within 24 hours with detailed information.</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                    <p>{submitError}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                    Subject*
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mt-6">
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-md transition-colors flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaEnvelope className="mr-2" />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
} 

