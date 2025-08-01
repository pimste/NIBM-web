'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'
import { MdArrowOutward } from 'react-icons/md'
import { useLanguage } from '@/context/LanguageContext'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Safely import ClientOnly
const ClientOnly = dynamic(
  () => import('@/components/ClientOnly').then(mod => mod.ClientOnly),
  { 
    ssr: false,
    loading: () => null 
  }
)

// Safely import MotionDiv
const MotionDiv = dynamic(
  () => import('@/components/MotionWrapper').then(mod => mod.MotionDiv),
  { 
    ssr: false,
    loading: () => <div /> 
  }
)

export default function ServicesClient() {
  const languageContext = useLanguage()
  const [isClient, setIsClient] = useState(false)
  
  // Safe access to the translate function
  const translate = languageContext?.t
  
  // Ensure we always have a translation function even if context fails
  const t = (key: string) => {
    try {
      return translate ? translate(key) || key : key
    } catch (error) {
      console.error('Translation error:', error)
      return key // Fallback to key if translation fails
    }
  }
  
  // Handle client-side rendering detection
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check if components exist
  const hasClientOnly = typeof ClientOnly === 'function'
  const hasMotionDiv = typeof MotionDiv === 'function'
  
  // Use fallback content if needed
  const renderContent = (content: React.ReactNode, fallback: React.ReactNode) => {
    return hasClientOnly ? (
      <ClientOnly fallback={fallback}>{content}</ClientOnly>
    ) : isClient ? content : fallback
  }

  // Services data with fallback content
  const services = [
    {
      titleKey: 'services.sale.title',
      titleFallback: 'Tower Crane Sales',
      descKey: 'services.sale.desc',
      descFallback: 'New and used tower cranes from leading manufacturers with warranty and support.',
      image: '/images/optimized/Potain-MDT-178_3W.webp',
      featureKeys: ['services.sale.feature1', 'services.sale.feature2', 'services.sale.feature3', 'services.sale.feature4'],
      featureFallbacks: ['New and used tower cranes from top manufacturers', 'Comprehensive warranty and after-sales support', 'Expert consultation on crane selection', 'Competitive pricing and financing options']
    },
    {
      titleKey: 'services.rent.title',
      titleFallback: 'Equipment Assessment & Evaluation',
      descKey: 'services.rent.desc',
      descFallback: 'Comprehensive technical inspections of crane condition and construction site evaluations.',
      image: '/images/optimized/sunset-TC.webp',
      featureKeys: ['services.rent.feature1', 'services.rent.feature2', 'services.rent.feature3', 'services.rent.feature4', 'services.rent.feature5'],
      featureFallbacks: ['Detailed equipment condition assessments', 'Construction site evaluation for optimal crane selection', 'Safety compliance and operational assessments', 'Detailed reporting and recommendations', 'Request a customized quote']
    },
    {
      titleKey: 'services.transport.title',
      titleFallback: 'Transport & Logistics',
      descKey: 'services.transport.desc',
      descFallback: 'We handle the complete transport of your crane.',
      image: '/images/optimized/cropped-Top-page2-potain6.webp',
      featureKeys: ['services.transport.feature4', 'services.transport.feature5'],
      featureFallbacks: ['Experienced transport team', 'Insurance coverage during transport']
    },
    {
      titleKey: 'services.mounting.title',
      titleFallback: 'Mounting & Installation',
      descKey: 'services.mounting.desc',
      descFallback: 'We have professional assemblers for assembly and disassembly.',
      image: '/images/optimized/sunset-TC-2.webp',
      featureKeys: ['services.mounting.feature2', 'services.mounting.feature3', 'services.mounting.feature4', 'services.mounting.feature5'],
      featureFallbacks: ['Compliance with all safety regulations', 'Inspection before commissioning', 'Efficient dismantling services', 'Comprehensive documentation']
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {renderContent(
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
              {t('services.page.title')}
            </h1>,
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
              Our Services
            </h1>
          )}
          {renderContent(
            <p className="text-xl text-white/80 mt-4 max-w-3xl mx-auto">
              {t('services.page.subtitle')}
            </p>,
            <p className="text-xl text-white/80 mt-4 max-w-3xl mx-auto">
              From crane selection and delivery to installation and training, we offer a complete solution for all your tower crane needs.
            </p>
          )}
        </div>
      </div>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            {renderContent(
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                {t('services.overview.title')}
              </h2>,
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Comprehensive Tower Crane Solutions
              </h2>
            )}
            {renderContent(
              <p className="text-lg text-neutral-700">
                {t('services.overview.desc')}
              </p>,
              <p className="text-lg text-neutral-700">
                NIBM Tower Cranes offers a full range of services to meet all your tower crane needs. Our integrated approach ensures that every aspect of your crane requirements is handled with expertise and attention to detail.
              </p>
            )}
          </div>

          {/* Service Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <span className="text-primary font-bold text-2xl">1</span>
              </div>
              {renderContent(
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {t('services.step1.title')}
                </h3>,
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Consultation
                </h3>
              )}
              {renderContent(
                <p className="text-neutral-700">
                  {t('services.step1.desc')}
                </p>,
                <p className="text-neutral-700">
                  We begin with a thorough consultation to understand your specific project requirements and challenges.
                </p>
              )}
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <span className="text-primary font-bold text-2xl">2</span>
              </div>
              {renderContent(
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {t('services.step2.title')}
                </h3>,
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Implementation
                </h3>
              )}
              {renderContent(
                <p className="text-neutral-700">
                  {t('services.step2.desc')}
                </p>,
                <p className="text-neutral-700">
                  Our team handles everything from crane selection and delivery to installation and testing.
                </p>
              )}
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <span className="text-primary font-bold text-2xl">3</span>
              </div>
              {renderContent(
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {t('services.step3.title')}
                </h3>,
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Support
                </h3>
              )}
              {renderContent(
                <p className="text-neutral-700">
                  {t('services.step3.desc')}
                </p>,
                <p className="text-neutral-700">
                  We provide ongoing support, maintenance, and training throughout your project's duration.
                </p>
              )}
            </div>
          </div>

          {/* Individual Services */}
          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={service.image}
                      alt={service.titleFallback}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      quality={80}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZXCLgAAAABJRU5ErkJggg=="
                      sizes="(max-width: 1023px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  {renderContent(
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                      {t(service.titleKey)}
                    </h3>,
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                      {service.titleFallback}
                    </h3>
                  )}
                  {renderContent(
                    <p className="text-neutral-700 mb-6">
                      {t(service.descKey)}
                    </p>,
                    <p className="text-neutral-700 mb-6">
                      {service.descFallback}
                    </p>
                  )}
                  {renderContent(
                    <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                      {t('services.features')}
                    </h4>,
                    <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                      Key Features:
                    </h4>
                  )}
                  <ul className="space-y-2 mb-6">
                    {service.featureKeys.map((featureKey, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                        {renderContent(
                          <span>{t(featureKey)}</span>,
                          <span>{service.featureFallbacks[featureIndex]}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    {renderContent(
                      t('services.learnMore'),
                      'Learn More About This Service'
                    )}
                    <MdArrowOutward className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center max-w-4xl mx-auto">
            {renderContent(
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                {t('services.cta.title')}
              </h2>,
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Ready to Discuss Your Tower Crane Needs?
              </h2>
            )}
            {renderContent(
              <p className="text-neutral-700 mb-8 max-w-2xl mx-auto">
                {t('services.cta.desc')}
              </p>,
              <p className="text-neutral-700 mb-8 max-w-2xl mx-auto">
                Our team of experts is ready to help you find the perfect solution for your construction project.
              </p>
            )}
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors"
            >
              {renderContent(
                t('services.discuss'),
                'Discuss Your Project With Us'
              )}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 