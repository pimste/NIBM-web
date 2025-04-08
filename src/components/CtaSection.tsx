'use client'

import Link from 'next/link'
import { FaPhone, FaEnvelope } from 'react-icons/fa'
import { AnimatedElement } from './AnimatedElement'
import { useLanguage } from '@/context/LanguageContext'

function CtaSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/cropped-Top-page2-potain6.png')" }}
      >
        <div className="absolute inset-0 bg-primary opacity-90"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              {t('cta.subtitle')}
            </p>
          </AnimatedElement>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <AnimatedElement 
              className="flex items-center justify-center px-6 py-4 bg-white rounded-md shadow-md" 
              animationVariant="fadeInLeft"
              delay={0.2}
            >
              <FaPhone className="text-primary mr-3 h-5 w-5" />
              <a href="tel:+31889993332" className="text-neutral-900 font-medium">
                +31 889 99 3332
              </a>
            </AnimatedElement>
            
            <AnimatedElement 
              className="flex items-center justify-center px-6 py-4 bg-white rounded-md shadow-md"
              animationVariant="fadeInRight" 
              delay={0.3}
            >
              <FaEnvelope className="text-primary mr-3 h-5 w-5" />
              <a href="mailto:info@nibmtowercranes.com" className="text-neutral-900 font-medium">
                info@nibmtowercranes.com
              </a>
            </AnimatedElement>
          </div>
          
          <AnimatedElement delay={0.4}>
            <Link
              href="/contact"
              className="btn-primary"
            >
              {t('cta.quote')}
            </Link>
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}

// Default export for dynamic import
export default CtaSection
// Named export for direct imports
export { CtaSection } 