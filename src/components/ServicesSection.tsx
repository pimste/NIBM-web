'use client'

import { FaTruckMoving, FaTools, FaClipboardCheck, FaHardHat, FaCogs, FaHandshake } from 'react-icons/fa'
import { AnimatedElement } from './AnimatedElement'
import { useLanguage } from '@/context/LanguageContext'

function ServicesSection() {
  const { t } = useLanguage()
  
  const services = [
    {
      key: 'rental',
      icon: FaTruckMoving,
      titleKey: 'services.rental',
      descriptionKey: 'services.rental.desc',
    },
    {
      key: 'installation',
      icon: FaTools,
      titleKey: 'services.installation',
      descriptionKey: 'services.installation.desc',
    },
    {
      key: 'maintenance',
      icon: FaCogs,
      titleKey: 'services.maintenance',
      descriptionKey: 'services.maintenance.desc',
    },
    {
      key: 'consulting',
      icon: FaClipboardCheck,
      titleKey: 'services.consulting',
      descriptionKey: 'services.consulting.desc',
    },
    {
      key: 'training',
      icon: FaHardHat,
      titleKey: 'services.training',
      descriptionKey: 'services.training.desc',
    },
    {
      key: 'planning',
      icon: FaHandshake,
      titleKey: 'services.planning',
      descriptionKey: 'services.planning.desc',
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
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              animationVariant="fadeIn"
              delay={index * 0.1}
            >
              <div className="flex items-center mb-4">
                <service.icon className="h-8 w-8 text-primary mr-3" aria-hidden="true" />
                <h3 className="text-xl font-bold text-neutral-900">{t(service.titleKey)}</h3>
              </div>
              <p className="text-neutral-700">{t(service.descriptionKey)}</p>
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