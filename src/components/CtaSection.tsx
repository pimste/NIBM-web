'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useLanguageUrl } from '@/hooks/useLanguageUrl'

export default function CtaSection() {
  const { t } = useLanguage()
  const { getUrl } = useLanguageUrl()
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/optimized/cropped-Top-page2-potain6.webp"
          alt="Tower cranes at a construction site"
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
          quality={80}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZXCLgAAAABJRU5ErkJggg=="
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              {t('cta.title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
            >
              {t('cta.subtitle')}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href={getUrl('/contact')}
              className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-600 text-white font-medium px-8 py-4 rounded-md transition-all shadow-lg hover:shadow-secondary/30 text-center group"
            >
              {t('cta.quote')}
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                <FaArrowRight />
              </motion.span>
            </Link>
            <Link
              href={getUrl('/towercranes')}
              className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-primary-900 font-medium px-8 py-4 rounded-md transition-all shadow-lg hover:shadow-white/30 text-center"
            >
              {t('cta.explore')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { CtaSection } 