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

export default function About() {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)
  
  // Handle client-side rendering detection
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const teamMembers = [
    {
      name: 'Egidius (Gid) Gehlen',
      position: t('about.team.ceo'),
      image: '/images/optimized/gidgehlen.webp',
      bio: t('about.team.ceo.bio'),
    }
  ]

  const values = [
    {
      title: t('about.values.safety.title'),
      description: t('about.values.safety.desc'),
    },
    {
      title: t('about.values.quality.title'),
      description: t('about.values.quality.desc'),
    },
    {
      title: t('about.values.customer.title'),
      description: t('about.values.customer.desc'),
    },
    {
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.desc'),
    },
    {
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.desc'),
    },
    {
      title: t('about.values.sustainability.title'),
      description: t('about.values.sustainability.desc'),
    }
  ]

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
            {t('about.title')}
          </h1>
          
          <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                {t('about.story.title')}
              </h2>
              
              <p className="text-neutral-700 mb-4">
                {t('about.story.p1')}
              </p>
              
              <p className="text-neutral-700 mb-4">
                {t('about.story.p2')}
              </p>
              
              <p className="text-neutral-700">
                {t('about.story.p3')}
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/manitowoc-potain-about.webp"
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

      {/* Mission & Vision */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                {t('about.mission.title')}
              </h2>
              
              <p className="text-neutral-700 mb-4">
                {t('about.mission.intro')}
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>{t('about.mission.point1')}</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>{t('about.mission.point2')}</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>{t('about.mission.point3')}</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>{t('about.mission.point4')}</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                {t('about.vision.title')}
              </h2>
              
              <p className="text-neutral-700 mb-4">
                {t('about.vision.intro')}
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>{t('about.vision.point1')}</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>{t('about.vision.point2')}</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>{t('about.vision.point3')}</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>{t('about.vision.point4')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            {t('about.values.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <MotionDiv
                key={index}
                className="bg-neutral-50 p-8 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-700">
                  {value.description}
                </p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            {t('about.team.title')}
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <MotionDiv
              className="bg-white rounded-lg overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative min-h-[400px] flex items-center justify-center">
                  <Image
                    src="/images/optimized/gidgehlen.webp"
                    alt="Team Member"
                    width={300}
                    height={300}
                    className="rounded-full shadow-lg object-cover"
                    quality={80}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZXCLgAAAABJRU5ErkJggg=="
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    Egidius (Gid) Gehlen
                  </h3>
                  <p className="text-primary font-medium text-lg mb-4">
                    {t('about.team.ceo')}
                  </p>
                  <ClientOnly fallback={
                    <div className="space-y-4">
                      <p className="text-neutral-700">Loading biography...</p>
                    </div>
                  }>
                    <p className="text-neutral-700 mb-4">
                      {t('about.team.ceo.bio')}
                    </p>
                    <p className="text-neutral-700">
                      {t('about.team.ceo.bio2')}
                    </p>
                  </ClientOnly>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>
    </>
  )
} 