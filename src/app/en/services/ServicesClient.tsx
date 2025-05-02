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

  // Services data
  const services = [
    {
      title: isClient ? t('services.sale.title') : 'Tower Crane Sales',
      description: isClient ? t('services.sale.desc') : 'We offer a wide range of new and used tower cranes for sale that cater to various construction needs and budgets.',
      image: '/images/optimized/services/crane-sales.webp',
      features: [
        isClient ? t('services.sale.feature1') : 'Extensive selection of crane types and models',
        isClient ? t('services.sale.feature2') : 'New and used cranes with warranties',
        isClient ? t('services.sale.feature3') : 'Competitive pricing and financing options',
        isClient ? t('services.sale.feature4') : 'Technical documentation and certification',
        isClient ? t('services.sale.feature5') : 'Full after-sales support and spare parts',
      ]
    },
    {
      title: isClient ? t('services.rent.title') : 'Tower Crane Rental',
      description: isClient ? t('services.rent.desc') : 'Our rental service provides flexible access to high-quality tower cranes without the full investment of purchasing.',
      image: '/images/optimized/services/crane-rental.webp',
      features: [
        isClient ? t('services.rent.feature1') : 'Flexible rental terms (short and long-term)',
        isClient ? t('services.rent.feature2') : 'Well-maintained and regularly inspected cranes',
        isClient ? t('services.rent.feature3') : 'Technical support and maintenance included',
        isClient ? t('services.rent.feature4') : 'Option to switch or upgrade equipment as needed',
        isClient ? t('services.rent.feature5') : 'Possibility of rent-to-own arrangements',
      ]
    },
    {
      title: isClient ? t('services.planning.title') : 'Planning & Consulting',
      description: isClient ? t('services.planning.desc') : 'Expert project planning services to help you select the right tower crane solutions for your construction project.',
      image: '/images/optimized/services/planning.webp',
      features: [
        isClient ? t('services.planning.feature1') : 'Site assessment and crane selection consulting',
        isClient ? t('services.planning.feature2') : 'Load capacity and coverage analysis',
        isClient ? t('services.planning.feature3') : 'Regulatory compliance guidance',
        isClient ? t('services.planning.feature4') : 'Cost optimization strategies',
        isClient ? t('services.planning.feature5') : 'Project timeline planning',
      ]
    },
    {
      title: isClient ? t('services.transport.title') : 'Transport & Logistics',
      description: isClient ? t('services.transport.desc') : 'We handle all aspects of crane transportation to your construction site.',
      image: '/images/optimized/services/transport.webp',
      features: [
        isClient ? t('services.transport.feature1') : 'Specialized transport vehicles and equipment',
        isClient ? t('services.transport.feature2') : 'Route planning and analysis',
        isClient ? t('services.transport.feature3') : 'Permit acquisition and compliance',
        isClient ? t('services.transport.feature4') : 'Experienced transport team',
        isClient ? t('services.transport.feature5') : 'Insurance coverage during transport',
      ]
    },
    {
      title: isClient ? t('services.mounting.title') : 'Mounting & Installation',
      description: isClient ? t('services.mounting.desc') : 'Our certified technicians perform professional assembly, installation, and dismantling services.',
      image: '/images/optimized/services/installation.webp',
      features: [
        isClient ? t('services.mounting.feature1') : 'Certified installation specialists',
        isClient ? t('services.mounting.feature2') : 'Compliance with all safety regulations',
        isClient ? t('services.mounting.feature3') : 'Thorough testing and commissioning',
        isClient ? t('services.mounting.feature4') : 'Efficient dismantling services',
        isClient ? t('services.mounting.feature5') : 'Comprehensive documentation',
      ]
    },
    {
      title: isClient ? t('services.training.title') : 'Training & Certification',
      description: isClient ? t('services.training.desc') : 'Comprehensive training programs for crane operators and maintenance personnel.',
      image: '/images/optimized/services/training.webp',
      features: [
        isClient ? t('services.training.feature1') : 'Certified crane operator training',
        isClient ? t('services.training.feature2') : 'Maintenance and inspection training',
        isClient ? t('services.training.feature3') : 'Safety protocols and best practices',
        isClient ? t('services.training.feature4') : 'Hands-on and theoretical instruction',
        isClient ? t('services.training.feature5') : 'Certification and documentation',
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
            {isClient ? t('services.page.title') : 'Our Services'}
          </h1>
          <p className="text-xl text-white/80 mt-4 max-w-3xl mx-auto">
            {isClient ? t('services.page.subtitle') : 'From crane selection and delivery to installation and training, we offer a complete solution for all your tower crane needs.'}
          </p>
        </div>
      </div>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              {isClient ? t('services.overview.title') : 'Comprehensive Tower Crane Solutions'}
            </h2>
            <p className="text-lg text-neutral-700">
              {isClient ? t('services.overview.desc') : 'NIBM Tower Cranes offers a full range of services to meet all your tower crane needs. Our integrated approach ensures that every aspect of your crane requirements is handled with expertise and attention to detail.'}
            </p>
          </div>

          {/* Service Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <span className="text-primary font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {isClient ? t('services.step1.title') : 'Consultation'}
              </h3>
              <p className="text-neutral-700">
                {isClient ? t('services.step1.desc') : 'We begin with a thorough consultation to understand your specific project requirements and challenges.'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <span className="text-primary font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {isClient ? t('services.step2.title') : 'Implementation'}
              </h3>
              <p className="text-neutral-700">
                {isClient ? t('services.step2.desc') : 'Our team handles everything from crane selection and delivery to installation and testing.'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <span className="text-primary font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {isClient ? t('services.step3.title') : 'Support'}
              </h3>
              <p className="text-neutral-700">
                {isClient ? t('services.step3.desc') : 'We provide ongoing support, maintenance, and training throughout your project\'s duration.'}
              </p>
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
                      alt={service.title}
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
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-neutral-700 mb-6">
                    {service.description}
                  </p>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                    {isClient ? t('services.features') : 'Key Features:'}
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    {isClient ? t('services.learnMore') : 'Learn More About This Service'}
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
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              {isClient ? t('services.cta.title') : 'Ready to Discuss Your Tower Crane Needs?'}
            </h2>
            <p className="text-neutral-700 mb-8 max-w-2xl mx-auto">
              {isClient ? t('services.cta.desc') : 'Our team of experts is ready to help you find the perfect solution for your construction project.'}
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors"
            >
              {isClient ? t('services.discuss') : 'Discuss Your Project With Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 