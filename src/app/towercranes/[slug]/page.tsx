'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FaArrowLeft, FaCheck, FaDownload, FaEnvelope, FaInfoCircle, FaPhone, FaPrint } from 'react-icons/fa'
import { MotionDiv } from '@/components/MotionWrapper'
import { useLanguage } from '@/context/LanguageContext'

// This would be fetched from a CMS or API in a real implementation
const cranes = [
  {
    id: 1,
    name: 'Potain MDT 178',
    slug: 'potain-mdt-178', // SEO-friendly slug
    image: '/images/optimized/Potain-MDT-178_3W.webp',
    gallery: [
      '/images/optimized/Potain-MDT-178_3W.webp',
      '/images/optimized/cropped-Top-page2-potain6.webp',
    ],
    status: 'Available',
    year: 2019,
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
    maxHeight: '64.9 meters',
    type: 'Flat Top',
    category: 'Sale',
    description: 'The Potain MDT 178 is a versatile flat top tower crane designed for ease of transport, assembly, and operation. It offers excellent lift capacities and reach, making it ideal for a wide range of construction projects.',
    specifications: {
      manufacturer: 'Potain',
      model: 'MDT 178',
      yearOfManufacture: 2019,
      serialNumber: 'MDT178-2019-0123',
      condition: 'Excellent',
      maxCapacity: '8 tons',
      maxJibLength: '60 meters',
      maxHeight: '64.9 meters',
      counterJibLength: '17.6 meters',
      towerType: 'K-type mast sections',
      cabinType: 'Vision cab with air conditioning',
      powerRequirements: '380-480V, 50/60Hz, 3-phase',
      hoistSpeed: '0-80 m/min',
      trolleySpeed: '0-60 m/min',
      slewing: '0-0.8 rpm',
    },
    features: [
      'High-performance winch with frequency control',
      'Automated greasing system',
      'Anti-collision system',
      'Remote monitoring capability',
      'Energy recuperation system',
      'Adjustable frequency drives',
      'Transport axles included',
      'Full documentation and certificates',
    ],
  },
  {
    id: 2,
    name: 'Potain MC 85 B',
    slug: 'potain-mc-85-b', // SEO-friendly slug
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    gallery: [
      '/images/optimized/cropped-Top-page2-potain6.webp',
      '/images/optimized/Potain-MDT-178_3W.webp',
    ],
    status: 'Available',
    year: 2020,
    maxCapacity: '5 tons',
    maxJibLength: '52 meters',
    maxHeight: '42.5 meters',
    type: 'Top Slewing',
    category: 'Rental',
    description: 'The Potain MC 85 B is a reliable top-slewing tower crane suitable for medium-sized construction projects. With its compact design and excellent performance, it provides an effective lifting solution with minimal operational costs.',
    specifications: {
      manufacturer: 'Potain',
      model: 'MC 85 B',
      yearOfManufacture: 2020,
      serialNumber: 'MC85B-2020-0456',
      condition: 'Excellent',
      maxCapacity: '5 tons',
      maxJibLength: '52 meters',
      maxHeight: '42.5 meters',
      counterJibLength: '15.2 meters',
      towerType: 'H-type mast sections',
      cabinType: 'Standard cab with heating',
      powerRequirements: '380-480V, 50/60Hz, 3-phase',
      hoistSpeed: '0-70 m/min',
      trolleySpeed: '0-50 m/min',
      slewing: '0-0.7 rpm',
    },
    features: [
      'High-performance winch',
      'Safety lock system',
      'Wind speed monitoring',
      'Overload protection',
      'Remote diagnostics',
      'Energy-efficient motors',
      'Galvanized components for longer life',
      'Full documentation and certificates',
    ],
  },
]

export default function CraneDetails() {
  const params = useParams()
  const slug = params.slug as string
  const crane = cranes.find(c => c.slug === slug)
  const [activeImage, setActiveImage] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  if (!crane) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Tower Crane Not Found</h1>
          <p className="text-neutral-600 mb-6">The tower crane you are looking for does not exist or has been removed.</p>
          <Link
            href="/towercranes"
            className="inline-flex items-center text-primary hover:text-primary-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Available Cranes
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

  return (
    <>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 md:mb-0">
              {crane.name}
            </h1>
            <Link
              href="/towercranes"
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
            {/* Image Gallery */}
            <div>
              <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                <Image
                  src={crane.gallery[activeImage]}
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
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {crane.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-24 h-24 flex-shrink-0 rounded overflow-hidden ${
                      activeImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${crane.name} image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
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
                  <p className="text-neutral-700">{crane.year}</p>
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
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-primary" /> Key Features
                </h3>
                <ul className="space-y-2">
                  {crane.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaPhone className="mr-2 text-primary" /> Contact Us About This Crane
                </h3>
                <p className="text-neutral-700 mb-4">
                  Interested in this {crane.name}? Contact our sales team for more information, pricing, or to schedule a viewing.
                </p>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <a 
                    href="tel:+31123456789" 
                    className="flex items-center justify-center bg-primary hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors mb-3 sm:mb-0"
                  >
                    <FaPhone className="mr-2" /> Call Us
                  </a>
                  <a 
                    href="mailto:gid.gehlen@nibmtowercranes.com" 
                    className="flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    <FaEnvelope className="mr-2" /> Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Technical Specifications
            </h2>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(crane.specifications).map(([key, value], index) => (
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

          {/* Inquiry Form */}
          <div className="mt-16 bg-neutral-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Request More Information
            </h2>
            
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Thank You for Your Interest!</h3>
                <p>We've received your inquiry about the {crane.name}. Our team will get back to you shortly with more information.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    defaultValue={`I'm interested in the ${crane.name} and would like more information.`}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    Submit Inquiry
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