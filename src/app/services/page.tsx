'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import ClientOnly from '@/components/ClientOnly'

export default function Services() {
  const { t } = useLanguage()
  
  const services = [
    {
      id: 'sale',
      title: t('services.sale.title'),
      description: t('services.sale.desc'),
      image: '/images/optimized/Potain-MDT-178_3W.webp',
      features: [
        t('services.sale.feature1'),
        t('services.sale.feature2'),
        t('services.sale.feature3'),
        t('services.sale.feature4'),
        t('services.sale.feature5'),
      ],
    },
    {
      id: 'rent',
      title: t('services.rent.title'),
      description: t('services.rent.desc'),
      image: '/images/optimized/cropped-Top-page2-potain6.webp',
      features: [
        t('services.rent.feature1'),
        t('services.rent.feature2'),
        t('services.rent.feature3'),
        t('services.rent.feature4'),
        t('services.rent.feature5'),
      ],
    },
    {
      id: 'planning',
      title: t('services.planning.title'),
      description: t('services.planning.desc'),
      image: '/images/optimized/helmet1a.webp',
      features: [
        t('services.planning.feature1'),
        t('services.planning.feature2'),
        t('services.planning.feature3'),
        t('services.planning.feature4'),
        t('services.planning.feature5'),
      ],
    },
    {
      id: 'transport',
      title: t('services.transport.title'),
      description: t('services.transport.desc'),
      image: '/images/optimized/sunset-TC.webp',
      features: [
        t('services.transport.feature1'),
        t('services.transport.feature2'),
        t('services.transport.feature3'),
        t('services.transport.feature4'),
        t('services.transport.feature5'),
      ],
    },
    {
      id: 'mounting',
      title: t('services.mounting.title'),
      description: t('services.mounting.desc'),
      image: '/images/optimized/sunset-TC-2.webp',
      features: [
        t('services.mounting.feature1'),
        t('services.mounting.feature2'),
        t('services.mounting.feature3'),
        t('services.mounting.feature4'),
        t('services.mounting.feature5'),
      ],
    },
  ]

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ClientOnly fallback={
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
              Our Services
            </h1>
          }>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
              {t('services.page.title')}
            </h1>
          </ClientOnly>
          
          <ClientOnly fallback={
            <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
              From crane selection and delivery to installation and training, we offer a complete solution for all your tower crane needs.
            </p>
          }>
            <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
              {t('services.page.subtitle')}
            </p>
          </ClientOnly>
        </div>
      </div>

      {/* Service Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ClientOnly fallback={
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Comprehensive Tower Crane Solutions
              </h2>
            }>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                {t('services.overview.title')}
              </h2>
            </ClientOnly>
            
            <ClientOnly fallback={
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                NIBM Tower Cranes offers a full range of services to meet all your tower crane needs. Our integrated approach ensures that every aspect of your crane requirements is handled with expertise and attention to detail.
              </p>
            }>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                {t('services.overview.desc')}
              </p>
            </ClientOnly>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-neutral-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                1
              </div>
              <ClientOnly fallback={<h3 className="text-xl font-bold text-neutral-900 mb-2">Consultation</h3>}>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{t('services.step1.title')}</h3>
              </ClientOnly>
              
              <ClientOnly fallback={
                <p className="text-neutral-700">
                  We begin with a thorough consultation to understand your specific project requirements and challenges.
                </p>
              }>
                <p className="text-neutral-700">
                  {t('services.step1.desc')}
                </p>
              </ClientOnly>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                2
              </div>
              <ClientOnly fallback={<h3 className="text-xl font-bold text-neutral-900 mb-2">Implementation</h3>}>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{t('services.step2.title')}</h3>
              </ClientOnly>
              
              <ClientOnly fallback={
                <p className="text-neutral-700">
                  Our team handles everything from crane selection and delivery to installation and testing.
                </p>
              }>
                <p className="text-neutral-700">
                  {t('services.step2.desc')}
                </p>
              </ClientOnly>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                3
              </div>
              <ClientOnly fallback={<h3 className="text-xl font-bold text-neutral-900 mb-2">Support</h3>}>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{t('services.step3.title')}</h3>
              </ClientOnly>
              
              <ClientOnly fallback={
                <p className="text-neutral-700">
                  We provide ongoing support, maintenance, and training throughout your project's duration.
                </p>
              }>
                <p className="text-neutral-700">
                  {t('services.step3.desc')}
                </p>
              </ClientOnly>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-primary hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              <ClientOnly fallback="Discuss Your Project With Us">
                {t('services.discuss')}
              </ClientOnly>
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Individual Services */}
      <ClientOnly fallback={
        <div>Loading services...</div>
      }>
        {services.map((service, index) => (
          <section 
            key={service.id} 
            id={service.id}
            className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image (switches sides based on index) */}
                {index % 2 === 0 ? (
                  <motion.div 
                    className="relative h-96 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full"
                      quality={75}
                      loading={index === 0 ? "eager" : "lazy"}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZXCLgAAAABJRU5ErkJggg=="
                    />
                  </motion.div>
                ) : null}

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-neutral-700 mb-6">
                    {service.description}
                  </p>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {t('services.features')}
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?subject=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center text-primary hover:text-primary-700 font-medium transition-colors"
                  >
                    {t('services.learnMore')}
                    <FaArrowRight className="ml-2" />
                  </Link>
                </motion.div>

                {/* Image (switches sides based on index) */}
                {index % 2 !== 0 ? (
                  <motion.div 
                    className="relative h-96 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full"
                      quality={75}
                      loading={index === 0 ? "eager" : "lazy"}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZXCLgAAAABJRU5ErkJggg=="
                    />
                  </motion.div>
                ) : null}
              </div>
            </div>
          </section>
        ))}
      </ClientOnly>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ClientOnly fallback={
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Discuss Your Tower Crane Needs?
              </h2>
            }>
              <h2 className="text-3xl font-bold text-white mb-6">
                {t('services.cta.title')}
              </h2>
            </ClientOnly>
            
            <ClientOnly fallback={
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Our team of experts is ready to help you find the perfect solution for your construction project.
              </p>
            }>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                {t('services.cta.desc')}
              </p>
            </ClientOnly>
            
            <Link
              href="/contact"
              className="inline-flex items-center bg-white hover:bg-neutral-100 text-primary font-medium px-8 py-4 rounded-md transition-colors"
            >
              <ClientOnly fallback="Request a Quote">
                {t('cta.quote')}
              </ClientOnly>
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
} 