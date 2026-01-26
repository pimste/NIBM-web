'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { AnimatedElement } from './AnimatedElement'
import { useLanguage } from '@/context/LanguageContext'
import { useLanguageUrl } from '@/hooks/useLanguageUrl'

export default function HeroSection() {
  const ref = useRef(null)
  const { t } = useLanguage()
  const { getUrl } = useLanguageUrl()

  return (
    <div ref={ref} className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background Video with Vercel Blob optimization */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0" style={{ 
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          minHeight: '100%'
        }}>
          <video
            src="https://a5db2zzmd8pkwmho.public.blob.vercel-storage.com/videos/new_backgroundvid.mp4"
            poster="/images/optimized/sunset-TC-2.webp"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <AnimatedElement>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 drop-shadow-lg">
                <span className="block">{t('hero.title1')}</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-amber-400">
                  {t('hero.title2')}
                </span>
              </h1>
            </AnimatedElement>
          </div>

          <AnimatedElement>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-10 drop-shadow-md">
              {t('hero.subtitle')}
            </p>
          </AnimatedElement>
          
          <AnimatedElement className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
            <Link
              href={getUrl('/towercranes')}
              className="relative overflow-hidden group bg-primary hover:bg-primary-600 text-white font-medium px-8 py-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-primary/30 border border-transparent hover:border-white/10"
              aria-label="View available tower cranes"
            >
              <span className="relative z-10">{t('hero.cta1')}</span>
            </Link>
            <Link
              href={getUrl('/contact')}
              className="relative overflow-hidden group bg-secondary hover:bg-secondary-600 text-white font-medium px-8 py-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-secondary/30 border border-transparent hover:border-white/10"
              aria-label="Request a quote on tower cranes"
            >
              <span className="relative z-10">{t('hero.cta2')}</span>
            </Link>
          </AnimatedElement>
          <AnimatedElement className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href={`${getUrl('/towercranes')}?category=sale`}
              className="text-white hover:text-amber-400 underline transition-colors"
              aria-label="View cranes for sale"
            >
              {t('hero.linkSale')}
            </Link>
            <span className="text-white/60">|</span>
            <Link
              href={`${getUrl('/towercranes')}?category=rental`}
              className="text-white hover:text-amber-400 underline transition-colors"
              aria-label="View rental cranes"
            >
              {t('hero.linkRental')}
            </Link>
          </AnimatedElement>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white flex flex-col items-center cursor-pointer drop-shadow-md hover:scale-105 transition-transform duration-300"
      >
        <span className="text-sm font-medium tracking-wide mb-2 backdrop-blur-sm bg-black/10 px-3 py-1 rounded-full">{t('hero.scroll')}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-7 w-7 animate-bounce" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}

export { HeroSection } 