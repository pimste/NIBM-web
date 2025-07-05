'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaDownload, FaPlus, FaMinus, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'

// English technical documents
const technicalDocuments = [
  {
    id: 1,
    title: 'Tower Crane Safety Guidelines',
    description: 'Comprehensive safety guidelines for tower crane operations.',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    category: 'Safety',
    url: '#',
  },
  {
    id: 2,
    title: 'Potain MDT 178 Technical Specifications',
    description: 'Detailed specifications and technical data for the Potain MDT 178 tower crane.',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    category: 'Specifications',
    url: '#',
  },
  {
    id: 3,
    title: 'Pre-operation Inspection Checklist',
    description: 'Checklist for inspecting tower cranes before operation.',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    category: 'Operations',
    url: '#',
  },
  {
    id: 4,
    title: 'Tower Crane Maintenance Schedule',
    description: 'Recommended maintenance schedule for different types of tower cranes.',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    category: 'Maintenance',
    url: '#',
  },
  {
    id: 5,
    title: 'Load Capacity Charts - Potain MC Series',
    description: 'Load capacity charts for the Potain MC series tower cranes.',
    fileSize: '4.2 MB',
    fileType: 'PDF',
    category: 'Specifications',
    url: '#',
  },
]

// English FAQs about tower cranes
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

export default function TechnicalInfoClient() {
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
            Technical Information
          </h1>
          <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
            Detailed technical specifications and documentation for our tower cranes.
          </p>
        </div>
      </div>

      {/* Technical Documents */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Technical Resources
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Search
                </h3>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Filter by Category
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
                  <h3 className="text-xl font-medium text-neutral-700">No documents found</h3>
                  <p className="text-neutral-500 mt-2">Try adjusting your search criteria</p>
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
                          <p className="text-neutral-700 text-sm mb-3">
                            {doc.description}
                          </p>
                          <p className="text-neutral-500 text-xs">
                            {doc.fileType} • {doc.fileSize}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Link href={doc.url} className="flex items-center text-primary hover:text-primary-700 transition-colors">
                          <FaDownload className="mr-2" />
                          <span>Download</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FAQs */}
          <div id="faq" className="mt-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-neutral-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full p-4 text-left bg-neutral-50 hover:bg-neutral-100 flex items-center justify-between focus:outline-none transition-colors"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <span className="font-medium text-lg">{faq.question}</span>
                    {activeFaq === index ? 
                      <FaMinus className="text-primary" /> : 
                      <FaPlus className="text-primary" />
                    }
                  </button>
                  {activeFaq === index && (
                    <div className="p-4 bg-white">
                      <p className="text-neutral-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">
              Additional Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Industry Standards
                </h3>
                <p className="text-neutral-700 mb-4">
                  Access relevant industry standards and regulations related to tower crane operations.
                </p>
                <Link href="#" className="text-primary hover:text-primary-700 flex items-center transition-colors">
                  <span>View Standards</span>
                  <FaExternalLinkAlt className="ml-2 h-3 w-3" />
                </Link>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Educational Videos
                </h3>
                <p className="text-neutral-700 mb-4">
                  Watch instructional videos on tower crane operation, maintenance, and safety.
                </p>
                <Link href="#" className="text-primary hover:text-primary-700 flex items-center transition-colors">
                  <span>Watch Videos</span>
                  <FaExternalLinkAlt className="ml-2 h-3 w-3" />
                </Link>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Technical Support
                </h3>
                <p className="text-neutral-700 mb-4">
                  Need specialized technical assistance? Our expert team is ready to help.
                </p>
                <Link href="/en/contact" className="text-primary hover:text-primary-700 flex items-center transition-colors">
                  <span>Contact Support</span>
                  <FaExternalLinkAlt className="ml-2 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 