'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedElement } from './AnimatedElement'
import { useLanguage } from '@/context/LanguageContext'
import { useLanguageUrl } from '@/hooks/useLanguageUrl'

export default function HeroSection() {
  const ref = useRef(null)
  const { t } = useLanguage()
  const { getUrl } = useLanguageUrl()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div ref={ref} className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background Video - Testing */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full">
          {isClient ? (
            /* Video Background - Only render on client */
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={`/api/video?t=${Date.now()}`} type="video/mp4" />
            </video>
          ) : (
            /* Fallback image for server-side rendering */
            <Image
              src="/images/optimized/sunset-TC-2.webp"
              alt="Tower crane silhouette against sunset cityscape"
              fill
              sizes="100vw"
              priority
              fetchPriority="high"
              quality={85}
              loading="eager"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZXCLgAAAABJRU5ErkJggg=="
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          
          <AnimatedElement className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={getUrl('/towercranes')}
              className="relative overflow-hidden group bg-primary hover:bg-primary-600 text-white font-medium px-8 py-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-primary/30 border border-transparent hover:border-white/10"
              aria-label="Browse our tower crane catalog"
            >
              <span className="relative z-10">{t('hero.cta1')}</span>
            </Link>
            <Link
              href={getUrl('/contact')}
              className="relative overflow-hidden group bg-secondary hover:bg-secondary-600 text-white font-medium px-8 py-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-secondary/30 border border-transparent hover:border-white/10"
              aria-label="Contact us for a quote on tower cranes"
            >
              <span className="relative z-10">{t('hero.cta2')}</span>
            </Link>
          </AnimatedElement>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white flex flex-col items-center cursor-pointer drop-shadow-md hover:scale-105 transition-transform duration-300"
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