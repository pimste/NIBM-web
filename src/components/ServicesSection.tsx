'use client'

import { FaTruckMoving, FaTools, FaClipboardCheck, FaHardHat, FaCogs, FaHandshake, FaQuoteLeft, FaProjectDiagram } from 'react-icons/fa'
import Link from 'next/link'
import { AnimatedElement } from './AnimatedElement'
import { useLanguage } from '@/context/LanguageContext'
import { useLanguageUrl } from '@/hooks/useLanguageUrl'

function ServicesSection() {
  const { t } = useLanguage()
  const { getUrl } = useLanguageUrl()
  
  const services = [
    {
      key: 'rental',
      icon: FaClipboardCheck,
      titleKey: 'services.rental',
      descriptionKey: 'services.rental.desc',
      craneLink: 'rental',
    },
    {
      key: 'installation',
      icon: FaTools,
      titleKey: 'services.installation',
      descriptionKey: 'services.installation.desc',
      craneLink: null,
    },
    {
      key: 'maintenance',
      icon: FaCogs,
      titleKey: 'services.maintenance',
      descriptionKey: 'services.maintenance.desc',
      craneLink: null,
    },
    {
      key: 'consulting',
      icon: FaHandshake,
      titleKey: 'services.consulting',
      descriptionKey: 'services.consulting.desc',
      craneLink: null,
    },
    {
      key: 'quote',
      icon: FaQuoteLeft,
      titleKey: 'services.quote',
      descriptionKey: 'services.quote.desc',
      isQuote: true,
      craneLink: null,
    },
    {
      key: 'planning',
      icon: FaProjectDiagram,
      titleKey: 'services.planning',
      descriptionKey: 'services.planning.desc',
      craneLink: null,
    },
  ]

  return (
    <section id="services" className="py-20 bg-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedElement>
            <h2 className="section-title">{t('services.title')}</h2>
            <p className="section-subtitle">
              {t('services.subtitle')}
            </p>
          </AnimatedElement>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {services.map((service, index) => (
            <AnimatedElement
              key={service.key}
              className={`${service.isQuote ? 'bg-neutral-50 border-2 border-primary' : 'bg-white'} rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col`}
              animationVariant="fadeIn"
              delay={index * 0.1}
            >
              <div className="flex items-center mb-4">
                <service.icon className={`h-8 w-8 ${service.isQuote ? 'text-primary' : 'text-primary'} mr-3`} aria-hidden="true" />
                <h3 className="text-xl font-bold text-neutral-900">{t(service.titleKey)}</h3>
              </div>
              <p className={`${service.isQuote ? 'text-neutral-800 font-medium italic' : 'text-neutral-700'} mb-4 flex-grow`}>{t(service.descriptionKey)}</p>
              {!service.isQuote && (
                <Link
                  href={service.craneLink ? `${getUrl('/towercranes')}?category=${service.craneLink}` : getUrl('/towercranes')}
                  className="text-primary hover:text-primary-600 font-medium text-sm mt-auto inline-flex items-center gap-1 transition-colors"
                >
                  {service.craneLink === 'rental' 
                    ? t('services.viewRentalCranes') 
                    : service.craneLink === 'sale'
                    ? t('services.viewSaleCranes')
                    : t('services.viewCranes')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}

// Default export for dynamic import
export default ServicesSection
// Named export for direct imports
export { ServicesSection } 