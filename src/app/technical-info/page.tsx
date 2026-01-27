'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaDownload, FaPlus, FaMinus, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'

// Technical documents
const technicalDocuments: Array<{
  id: number
  title: string
  description: string
  fileSize: string
  fileType: string
  category: string
  url: string
}> = [
  {
    id: 2,
    title: 'Telescoping Tower Sections T 41, T 61, T 851',
    description: 'Detailed technical specifications and installation guidelines for telescoping tower sections T 41, T 61, and T 851.',
    fileSize: '11 MB',
    fileType: 'PDF',
    category: 'Specifications',
    url: '/technical docs/02GP_631_2019_04_EN_Telescoping T 41-T 61-T 851 (2).pdf',
  },
  {
    id: 5,
    title: 'Anchorage Frames',
    description: 'Comprehensive guide to anchorage frames for tower cranes, including installation procedures, safety requirements, and technical specifications.',
    fileSize: '3.6 MB',
    fileType: 'PDF',
    category: 'Safety',
    url: '/technical docs/Anchorage frames.pdf',
  },
  {
    id: 6,
    title: 'Anchoring Frame Types',
    description: 'Documentation covering different types of anchoring frames, their applications, and installation guidelines.',
    fileSize: '771 KB',
    fileType: 'PDF',
    category: 'Safety',
    url: '/technical docs/Anchoring frane Types .pdf .pdf',
  },
  {
    id: 7,
    title: 'CCS Driver Documentation',
    description: 'Technical documentation for the CCS (Crane Control System) driver, including operation procedures and troubleshooting guide.',
    fileSize: '3.2 MB',
    fileType: 'PDF',
    category: 'Operations',
    url: '/technical docs/CCS driver.pdf',
  },
  {
    id: 8,
    title: 'Fixing Angles for K Masts',
    description: 'Installation guide for fixing angles used with K masts, including proper positioning and assembly instructions.',
    fileSize: '218 KB',
    fileType: 'PDF',
    category: 'Operations',
    url: '/technical docs/Pdka_02_19_EN Fixing angels K.pdf',
  },
  {
    id: 9,
    title: 'Electronic Catalog - Tower Crane Specifications',
    description: 'Comprehensive electronic catalog containing detailed specifications, technical data, and product information for tower crane components and systems.',
    fileSize: '506 MB',
    fileType: 'PDF',
    category: 'Specifications',
    url: 'https://a5db2zzmd8pkwmho.public.blob.vercel-storage.com/e_catalog_en14439_c25_d25_937-2-gecomprimeerd.pdf',
  },
  {
    id: 10,
    title: 'Wire Ropes Calculation Tool - Crane Configuration',
    description: 'Interactive Excel tool for calculating and selecting appropriate wire ropes based on crane type, jib length, and hook height. <strong>Fill in your specific crane parameters to determine the correct wire rope specifications for your application.</strong>',
    fileSize: '1.5 MB',
    fileType: 'XLSX',
    category: 'Operations',
    url: '/technical docs/Cables metalliques _ Wire ropes (24).xlsx',
  },
  {
    id: 11,
    title: 'Technical Documentation Collection V60A',
    description: 'Comprehensive merged technical documentation containing essential tower crane specifications, installation guidelines, and operational procedures in a consolidated format for easy reference.',
    fileSize: '845 KB',
    fileType: 'PDF',
    category: 'Specifications',
    url: '/technical docs/ilovepdf_merged.pdf',
  },
  {
    id: 12,
    title: 'Fixing Angles P 63A / P 800B and R 63A / R 800C - Enhanced Hook Heights for 2m Masts',
    description: 'New fixing angle offer for 2m (K600) and 2.45m (K800) cross-section masts. Includes P 63A / P 800B (non-reusable) and R 63A / R 800C (reusable) versions. These reinforced fixing angles significantly improve hook heights of cranes on 2m masts, especially when associated with the new KRM 6410B reinforced mast.',
    fileSize: '306 KB',
    fileType: 'PDF',
    category: 'Specifications',
    url: '/technical docs/ Fixing angles P 63A:P 800 and R 63A:R 800C.pdf',
  },
  {
    id: 13,
    title: 'KRM 6410B Mast Section - Reinforced 10m Section for 2m Masts',
    description: 'New 10m reinforced, monoblock, non-telescoping mast section for 2m (K600) type masts. Length: 10m, Weight: 7,100 kg. Developed alongside the new ZX 640 cross-shaped base and new fixing angles. Combined with new bases, it improves hook heights of cranes on 2m masts. Can replace two 5m mast sections or one 10m mast section of lower strength.',
    fileSize: '467 KB',
    fileType: 'PDF',
    category: 'Specifications',
    url: '/technical docs/Special towersection KRM 6410B.pdf',
  },
]

// FAQs about tower cranes
const faqs = [
  {
    question: 'What are the main types of tower cranes?',
    answer: 'The main types of tower cranes include flat-top cranes, hammerhead cranes, luffing jib cranes, and self-erecting cranes. Each type is designed for specific applications and site conditions. Flat-top cranes have no A-frame above the jib and counter-jib, making them ideal for sites with height restrictions or multiple cranes. Hammerhead cranes have a horizontal jib and counter-jib with a trolley that moves loads in and out. Luffing jib cranes have a jib that can be raised and lowered, making them suitable for congested sites. Self-erecting cranes can be quickly set up and dismantled, making them ideal for smaller projects.',
  },
  {
    question: 'How do you determine the right tower crane for a construction project?',
    answer: 'Determining the right tower crane involves considering several factors including the maximum load capacity needed, the required height and reach, site constraints, project duration, and budget. You should also consider the type of materials to be lifted, the frequency of lifts, and any specific requirements of the project. Our team of experts can help you assess these factors and recommend the most suitable crane for your specific needs.',
  },
  {
    question: 'What safety measures should be in place when operating a tower crane?',
    answer: 'Safety measures for tower crane operation include proper maintenance, regular inspections, clear communication protocols, weather monitoring, load management systems, and anti-collision devices. Additionally, ensuring proper foundation and installation, establishing a clear zone around the crane, and implementing comprehensive safety plans are essential. Following manufacturer guidelines and emergency procedures is also crucial.',
  },
  {
    question: 'How often should tower cranes be inspected?',
    answer: 'Tower cranes should undergo daily visual inspections by qualified personnel before use, weekly more detailed inspections by a competent person, monthly thorough inspections by a qualified technician, and annual comprehensive inspections by certified inspectors. Additionally, after severe weather events or any modifications, special inspections should be conducted. These regular inspections help ensure safe operation and identify potential issues before they become serious problems.',
  },
  {
    question: 'What are the wind speed limits for tower crane operation?',
    answer: 'Tower cranes typically have operational wind speed limits of around 20-25 mph (32-40 km/h) for normal operation. When wind speeds reach approximately 45 mph (72 km/h), cranes should be put into weathervane mode to allow the jib to move freely with the wind. However, these limits can vary based on the specific crane model, load characteristics, and manufacturer guidelines. It\'s essential to follow the specifications provided by the crane manufacturer and consider site-specific conditions when determining safe operating parameters.',
  },
  {
    question: 'What maintenance services are available for tower cranes?',
    answer: 'Professional maintenance services for tower cranes include preventive maintenance programs, regular inspections, parts replacement, emergency repairs, and technical support. These services help ensure optimal performance, extend equipment lifespan, and maintain safety standards. Maintenance schedules should follow manufacturer recommendations and industry best practices.',
  },
]

export default function TechnicalInfo() {
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useLanguage()

  const categories = Array.from(new Set(technicalDocuments.map(doc => doc.category)))

  const toggleCategory = (category: string) => {
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter(cat => cat !== category))
    } else {
      setActiveCategories([...activeCategories, category])
    }
  }

  const filteredDocuments = technicalDocuments.filter(doc => {
    const matchesCategory = activeCategories.length === 0 || activeCategories.includes(doc.category)
    const matchesSearch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
            {t('technical.title')}
          </h1>
          <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
            {t('technical.subtitle')}
          </p>
        </div>
      </div>

      {/* Technical Documents */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            {t('technical.resources')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  {t('technical.search')}
                </h3>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder={t('technical.searchPlaceholder')}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  {t('technical.filterCategory')}
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                        checked={activeCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-neutral-700"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Documents List */}
            <div className="lg:col-span-3">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12 bg-neutral-50 rounded-lg">
                  <FaFileAlt className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-neutral-700">{t('technical.noDocuments')}</h3>
                  <p className="text-neutral-500 mt-2">{t('technical.tryAdjusting')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="bg-neutral-50 p-6 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary rounded-md mb-2">
                            {doc.category}
                          </span>
                          <h3 className="text-lg font-bold text-neutral-900 mb-2">
                            {doc.title}
                          </h3>
                          <p className="text-neutral-700 text-sm mb-3" dangerouslySetInnerHTML={{ __html: doc.description }} />
                          <p className="text-neutral-500 text-xs">
                            {doc.fileType} • {doc.fileSize}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-neutral-200">
                        <a
                          href={doc.url}
                          className="inline-flex items-center text-primary hover:text-primary-700 font-medium text-sm"
                          download
                        >
                          <FaDownload className="mr-2" />
                          {t('technical.download')}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
            {t('technical.faq')}
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-6"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <h3 className="text-lg font-bold text-neutral-900 text-left">
                      {t(`faq.q${index + 1}`)}
                    </h3>
                    <span className="ml-4">
                      {activeFaq === index ? (
                        <FaMinus className="text-primary h-4 w-4" />
                      ) : (
                        <FaPlus className="text-primary h-4 w-4" />
                      )}
                    </span>
                  </button>
                  {activeFaq === index && (
                    <div className="p-6 pt-0">
                      <p className="text-neutral-700">
                        {t(`faq.a${index + 1}`)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  )
} 