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
    status: 'Verfügbar',
    year: 2019,
    maxCapacity: '8 Tonnen',
    maxJibLength: '60 Meter',
    maxHeight: '64,9 Meter',
    type: 'Flat Top',
    category: 'Verkauf',
    description: 'Der Potain MDT 178 ist ein vielseitiger Obendreher-Turmkran, der für einfachen Transport, Montage und Bedienung konzipiert wurde. Er bietet hervorragende Hubkapazitäten und Reichweite, was ihn ideal für eine Vielzahl von Bauprojekten macht.',
    specifications: {
      manufacturer: 'Potain',
      model: 'MDT 178',
      yearOfManufacture: 2019,
      serialNumber: 'MDT178-2019-0123',
      condition: 'Ausgezeichnet',
      maxCapacity: '8 Tonnen',
      maxJibLength: '60 Meter',
      maxHeight: '64,9 Meter',
      counterJibLength: '17,6 Meter',
      towerType: 'K-Typ Mastsektionen',
      cabinType: 'Vision Kabine mit Klimaanlage',
      powerRequirements: '380-480V, 50/60Hz, 3-phasig',
      hoistSpeed: '0-80 m/min',
      trolleySpeed: '0-60 m/min',
      slewing: '0-0,8 U/min',
    },
    features: [
      'Hochleistungswinde mit Frequenzsteuerung',
      'Automatisches Schmiersystem',
      'Anti-Kollisions-System',
      'Fernüberwachungsmöglichkeit',
      'Energierückgewinnungssystem',
      'Verstellbare Frequenzantriebe',
      'Transportachsen inklusive',
      'Vollständige Dokumentation und Zertifikate',
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
    status: 'Verfügbar',
    year: 2020,
    maxCapacity: '5 Tonnen',
    maxJibLength: '52 Meter',
    maxHeight: '42,5 Meter',
    type: 'Obendreher',
    category: 'Vermietung',
    description: 'Der Potain MC 85 B ist ein zuverlässiger Obendreher-Turmkran, der für mittelgroße Bauprojekte geeignet ist. Mit seinem kompakten Design und seiner ausgezeichneten Leistung bietet er eine effektive Hebelösung mit minimalen Betriebskosten.',
    specifications: {
      manufacturer: 'Potain',
      model: 'MC 85 B',
      yearOfManufacture: 2020,
      serialNumber: 'MC85B-2020-0456',
      condition: 'Ausgezeichnet',
      maxCapacity: '5 Tonnen',
      maxJibLength: '52 Meter',
      maxHeight: '42,5 Meter',
      counterJibLength: '15,2 Meter',
      towerType: 'H-Typ Mastsektionen',
      cabinType: 'Standardkabine mit Heizung',
      powerRequirements: '380-480V, 50/60Hz, 3-phasig',
      hoistSpeed: '0-70 m/min',
      trolleySpeed: '0-50 m/min',
      slewing: '0-0,7 U/min',
    },
    features: [
      'Hochleistungswinde',
      'Sicherheitsverriegelungssystem',
      'Windgeschwindigkeitsüberwachung',
      'Überlastschutz',
      'Ferndiagnose',
      'Energieeffiziente Motoren',
      'Verzinkte Komponenten für längere Lebensdauer',
      'Vollständige Dokumentation und Zertifikate',
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
  const condition = crane.category === 'Verkauf' ? 'NewCondition' : 'UsedCondition'
  const availability = crane.status === 'Verfügbar' ? 'InStock' : 'OutOfStock'

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
                  src={crane.gallery[activeImage]}
                  alt={crane.name}
                  fill
                  className="object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  crane.status === 'Verfügbar' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {crane.status}
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {crane.category === 'Verkauf' ? 'Zum Verkauf' : 'Zur Miete'}
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
                      alt={`${crane.name} - Bild ${index + 1}`}
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
                  <FaPrint className="mr-2" /> Details drucken
                </button>
                <button
                  className="flex items-center text-primary hover:text-primary-700 transition-colors"
                >
                  <FaDownload className="mr-2" /> Broschüre herunterladen
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
                  <h3 className="text-lg font-semibold mb-2">Baujahr</h3>
                  <p className="text-neutral-700">{crane.year}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Typ</h3>
                  <p className="text-neutral-700">{crane.type}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Max. Kapazität</h3>
                  <p className="text-neutral-700">{crane.maxCapacity}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Max. Auslegerlänge</h3>
                  <p className="text-neutral-700">{crane.maxJibLength}</p>
                </div>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-primary" /> Hauptmerkmale
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
                  <FaPhone className="mr-2 text-primary" /> Kontaktieren Sie uns bezüglich dieses Krans
                </h3>
                <p className="text-neutral-700 mb-4">
                  Interessiert an diesem {crane.name}? Kontaktieren Sie unser Verkaufsteam für weitere Informationen, Preise oder um einen Besichtigungstermin zu vereinbaren.
                </p>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <a 
                    href="tel:+31123456789" 
                    className="flex items-center justify-center bg-primary hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors mb-3 sm:mb-0"
                  >
                    <FaPhone className="mr-2" /> Rufen Sie uns an
                  </a>
                  <a 
                    href="mailto:gid.gehlen@nibmtowercranes.com" 
                    className="flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    <FaEnvelope className="mr-2" /> E-Mail senden
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Technische Spezifikationen
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
              Weitere Informationen anfordern
            </h2>
            
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Vielen Dank für Ihr Interesse!</h3>
                <p>Wir haben Ihre Anfrage zum {crane.name} erhalten. Unser Team wird sich in Kürze mit weiteren Informationen bei Ihnen melden.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Ihr Name*
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
                    E-Mail-Adresse*
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
                    Telefonnummer
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
                    Firmenname
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
                    Ihre Nachricht*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    defaultValue={`Ich interessiere mich für den ${crane.name} und möchte weitere Informationen.`}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    Anfrage absenden
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