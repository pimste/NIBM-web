'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import dynamic from 'next/dynamic'

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

export default function AboutClient() {
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
  
  const teamMembers = [
    {
      name: 'Gid Gehlen',
      position: isClient ? t('about.team.ceo') : 'CEO & Founder',
      image: '/images/optimized/gidgehlen.webp',
      bio: isClient ? t('about.team.ceo.bio') : '',
    }
  ]

  const values = [
    {
      title: isClient ? t('about.values.safety.title') : 'Safety First',
      description: isClient ? t('about.values.safety.desc') : '',
    },
    {
      title: isClient ? t('about.values.quality.title') : 'Quality & Reliability',
      description: isClient ? t('about.values.quality.desc') : '',
    },
    {
      title: isClient ? t('about.values.customer.title') : 'Customer Focus',
      description: isClient ? t('about.values.customer.desc') : '',
    },
    {
      title: isClient ? t('about.values.excellence.title') : 'Technical Excellence',
      description: isClient ? t('about.values.excellence.desc') : '',
    },
    {
      title: isClient ? t('about.values.innovation.title') : 'Innovation',
      description: isClient ? t('about.values.innovation.desc') : '',
    },
    {
      title: isClient ? t('about.values.sustainability.title') : 'Sustainability',
      description: isClient ? t('about.values.sustainability.desc') : '',
    }
  ]

  // Check if components exist
  const hasClientOnly = typeof ClientOnly === 'function'
  const hasMotionDiv = typeof MotionDiv === 'function'
  
  // Use fallback content if needed
  const renderContent = (content: React.ReactNode, fallback: React.ReactNode) => {
    return hasClientOnly ? (
      <ClientOnly fallback={fallback}>{content}</ClientOnly>
    ) : isClient ? content : fallback
  }

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {renderContent(
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
              About NIBM Tower Cranes
            </h1>,
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
              {t('about.title')}
            </h1>
          )}
          
          {renderContent(
            <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
              Your trusted partner for tower crane sales, rentals, and services since 1995.
            </p>,
            <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          )}
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {renderContent(
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Our Story
                </h2>,
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  {t('about.story.title')}
                </h2>
              )}
              
              {renderContent(
                <p className="text-neutral-700 mb-4">
                  NIBM Tower Cranes was founded in 1995 with a simple mission: to provide reliable, high-quality tower cranes and exceptional service to the construction industry. What began as a small rental company has grown into a comprehensive provider of tower crane solutions across Europe.
                </p>,
                <p className="text-neutral-700 mb-4">
                  {t('about.story.p1')}
                </p>
              )}
              
              {renderContent(
                <p className="text-neutral-700 mb-4">
                  Over the past 28 years, we have built a reputation for technical excellence, reliability, and customer-focused service. Our deep understanding of construction projects and their unique challenges has allowed us to develop a full-service approach that addresses all aspects of tower crane operations.
                </p>,
                <p className="text-neutral-700 mb-4">
                  {t('about.story.p2')}
                </p>
              )}
              
              {renderContent(
                <p className="text-neutral-700">
                  Today, NIBM Tower Cranes proudly serves a diverse clientele, from small construction firms to large multinational companies, providing them with the equipment and expertise they need to complete their construction projects safely and efficiently.
                </p>,
                <p className="text-neutral-700">
                  {t('about.story.p3')}
                </p>
              )}
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/optimized/our-story-2.webp"
                alt="NIBM Tower Cranes story"
                width={500}
                height={500}
                priority
                quality={80}
                loading="eager"
                className="rounded-md shadow-lg object-cover w-full h-auto"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZXCLgAAAABJRU5ErkJggg=="
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the about page components... */}
    </>
  )
} 