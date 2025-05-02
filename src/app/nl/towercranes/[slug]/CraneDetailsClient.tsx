'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FaArrowLeft, FaCheck, FaDownload, FaEnvelope, FaInfoCircle, FaPhone, FaPrint } from 'react-icons/fa'
import { MotionDiv } from '@/components/MotionWrapper'
import { useLanguage } from '@/context/LanguageContext'
import { TowerCraneSchema } from '@/components/TowerCraneSchema'

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
    status: 'Beschikbaar',
    year: 2019,
    maxCapacity: '8 ton',
    maxJibLength: '60 meter',
    maxHeight: '64,9 meter',
    type: 'Flat Top',
    category: 'Verkoop',
    description: 'De Potain MDT 178 is een veelzijdige flat top torenkraan, ontworpen voor eenvoudig transport, montage en bediening. Hij biedt uitstekende hefcapaciteiten en bereik, waardoor hij ideaal is voor een breed scala aan bouwprojecten.',
    specifications: {
      manufacturer: 'Potain',
      model: 'MDT 178',
      yearOfManufacture: 2019,
      serialNumber: 'MDT178-2019-0123',
      condition: 'Uitstekend',
      maxCapacity: '8 ton',
      maxJibLength: '60 meter',
      maxHeight: '64,9 meter',
      counterJibLength: '17,6 meter',
      towerType: 'K-type mastsecties',
      cabinType: 'Vision cabine met airconditioning',
      powerRequirements: '380-480V, 50/60Hz, 3-fase',
      hoistSpeed: '0-80 m/min',
      trolleySpeed: '0-60 m/min',
      slewing: '0-0,8 rpm',
    },
    features: [
      'Hoogwaardige lier met frequentieregeling',
      'Automatisch smeersysteem',
      'Anti-botsingsysteem',
      'Mogelijkheid tot monitoring op afstand',
      'Energieterugwinningssysteem',
      'Verstelbare frequentieaandrijvingen',
      'Transportassen inbegrepen',
      'Volledige documentatie en certificaten',
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
    status: 'Beschikbaar',
    year: 2020,
    maxCapacity: '5 ton',
    maxJibLength: '52 meter',
    maxHeight: '42,5 meter',
    type: 'Bovendraaier',
    category: 'Verhuur',
    description: 'De Potain MC 85 B is een betrouwbare bovendraaier torenkraan, geschikt voor middelgrote bouwprojecten. Met zijn compacte ontwerp en uitstekende prestaties biedt het een effectieve hefoplossing met minimale operationele kosten.',
    specifications: {
      manufacturer: 'Potain',
      model: 'MC 85 B',
      yearOfManufacture: 2020,
      serialNumber: 'MC85B-2020-0456',
      condition: 'Uitstekend',
      maxCapacity: '5 ton',
      maxJibLength: '52 meter',
      maxHeight: '42,5 meter',
      counterJibLength: '15,2 meter',
      towerType: 'H-type mastsecties',
      cabinType: 'Standaard cabine met verwarming',
      powerRequirements: '380-480V, 50/60Hz, 3-fase',
      hoistSpeed: '0-70 m/min',
      trolleySpeed: '0-50 m/min',
      slewing: '0-0,7 rpm',
    },
    features: [
      'Hoogwaardige lier',
      'Veiligheidsvergrendelingssysteem',
      'Windsnelheidsmonitoring',
      'Overbelastingsbeveiliging',
      'Diagnosemogelijkheid op afstand',
      'Energiezuinige motoren',
      'Gegalvaniseerde componenten voor langere levensduur',
      'Volledige documentatie en certificaten',
    ],
  },
]

export default function CraneDetailsClient() {
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
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Torenkraan niet gevonden</h1>
          <p className="text-neutral-600 mb-6">De gezochte torenkraan bestaat niet of is verwijderd.</p>
          <Link
            href="/nl/towercranes"
            className="inline-flex items-center text-primary hover:text-primary-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Terug naar beschikbare kranen
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
  const craneUrl = `${siteUrl}/nl/towercranes/${crane.slug}`
  const manufacturer = crane.specifications?.manufacturer || 'Potain'
  const model = crane.specifications?.model || crane.name
  const condition = crane.category === 'Verkoop' ? 'NewCondition' : 'UsedCondition'
  const availability = crane.status === 'Beschikbaar' ? 'InStock' : 'OutOfStock'

  return (
    <>
      <TowerCraneSchema
        name={crane.name}
        description={crane.description}
        image={`${siteUrl}${crane.gallery[0]}`}
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
              href="/nl/towercranes"
              className="inline-flex items-center text-white hover:text-primary-100 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Terug naar beschikbare kranen
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
                  crane.status === 'Beschikbaar' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {crane.status}
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {crane.category === 'Verkoop' ? 'Te koop' : 'Te huur'}
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
                      alt={`${crane.name} - Afbeelding ${index + 1}`}
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
                  <FaPrint className="mr-2" /> Details afdrukken
                </button>
                <button
                  className="flex items-center text-primary hover:text-primary-700 transition-colors"
                >
                  <FaDownload className="mr-2" /> Brochure downloaden
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
                  <h3 className="text-lg font-semibold mb-2">Bouwjaar</h3>
                  <p className="text-neutral-700">{crane.year}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Type</h3>
                  <p className="text-neutral-700">{crane.type}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Max. capaciteit</h3>
                  <p className="text-neutral-700">{crane.maxCapacity}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Max. gieklengte</h3>
                  <p className="text-neutral-700">{crane.maxJibLength}</p>
                </div>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-primary" /> Belangrijkste kenmerken
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
                  <FaPhone className="mr-2 text-primary" /> Neem contact met ons op over deze kraan
                </h3>
                <p className="text-neutral-700 mb-4">
                  Geïnteresseerd in deze {crane.name}? Neem contact op met ons verkoopteam voor meer informatie, prijzen of om een bezichtiging te plannen.
                </p>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <a 
                    href="tel:+31123456789" 
                    className="flex items-center justify-center bg-primary hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors mb-3 sm:mb-0"
                  >
                    <FaPhone className="mr-2" /> Bel ons
                  </a>
                  <a 
                    href="mailto:gid.gehlen@nibmtowercranes.com" 
                    className="flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    <FaEnvelope className="mr-2" /> E-mail ons
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Technische specificaties
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
              Meer informatie aanvragen
            </h2>
            
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Bedankt voor uw interesse!</h3>
                <p>We hebben uw aanvraag over de {crane.name} ontvangen. Ons team zal binnenkort contact met u opnemen met meer informatie.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Uw naam*
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
                    E-mailadres*
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
                    Telefoonnummer
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
                    Bedrijfsnaam
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
                    Uw bericht*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    defaultValue={`Ik ben geïnteresseerd in de ${crane.name} en wil graag meer informatie.`}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    Aanvraag versturen
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