'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import ClientOnly from '@/components/ClientOnly'

export default function About() {
  const { t } = useLanguage()
  
  const teamMembers = [
    {
      name: 'Gid Gehlen',
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
    },
  ]

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ClientOnly fallback={
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
              About NIBM Tower Cranes
            </h1>
          }>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
              {t('about.title')}
            </h1>
          </ClientOnly>
          
          <ClientOnly fallback={
            <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
              Your trusted partner for tower crane sales, rentals, and services since 1995.
            </p>
          }>
            <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </ClientOnly>
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ClientOnly fallback={
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Our Story
                </h2>
              }>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  {t('about.story.title')}
                </h2>
              </ClientOnly>
              
              <ClientOnly fallback={
                <p className="text-neutral-700 mb-4">
                  NIBM Tower Cranes was founded in 1995 with a simple mission: to provide reliable, high-quality tower cranes and exceptional service to the construction industry. What began as a small rental company has grown into a comprehensive provider of tower crane solutions across Europe.
                </p>
              }>
                <p className="text-neutral-700 mb-4">
                  {t('about.story.p1')}
                </p>
              </ClientOnly>
              
              <ClientOnly fallback={
                <p className="text-neutral-700 mb-4">
                  Over the past 28 years, we have built a reputation for technical excellence, reliability, and customer-focused service. Our deep understanding of construction projects and their unique challenges has allowed us to develop a full-service approach that addresses all aspects of tower crane operations.
                </p>
              }>
                <p className="text-neutral-700 mb-4">
                  {t('about.story.p2')}
                </p>
              </ClientOnly>
              
              <ClientOnly fallback={
                <p className="text-neutral-700">
                  Today, NIBM Tower Cranes proudly serves a diverse clientele, from small construction firms to large multinational companies, providing them with the equipment and expertise they need to complete their construction projects safely and efficiently.
                </p>
              }>
                <p className="text-neutral-700">
                  {t('about.story.p3')}
                </p>
              </ClientOnly>
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

      {/* Mission & Vision */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <ClientOnly fallback={
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Our Mission
                </h2>
              }>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  {t('about.mission.title')}
                </h2>
              </ClientOnly>
              
              <ClientOnly fallback={
                <p className="text-neutral-700 mb-4">
                  Our mission is to provide reliable, safe, and efficient tower crane solutions that enable our clients to complete their construction projects successfully. We are committed to:
                </p>
              }>
                <p className="text-neutral-700 mb-4">
                  {t('about.mission.intro')}
                </p>
              </ClientOnly>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <ClientOnly fallback={<span>Offering high-quality tower cranes that meet the specific needs of each project</span>}>
                    <span>{t('about.mission.point1')}</span>
                  </ClientOnly>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <ClientOnly fallback={<span>Providing expert consultation to help clients select the right equipment</span>}>
                    <span>{t('about.mission.point2')}</span>
                  </ClientOnly>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <ClientOnly fallback={<span>Ensuring safe and efficient crane operations through comprehensive training and support</span>}>
                    <span>{t('about.mission.point3')}</span>
                  </ClientOnly>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <ClientOnly fallback={<span>Delivering exceptional service at every stage of the client relationship</span>}>
                    <span>{t('about.mission.point4')}</span>
                  </ClientOnly>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <ClientOnly fallback={
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Our Vision
                </h2>
              }>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  {t('about.vision.title')}
                </h2>
              </ClientOnly>
              
              <ClientOnly fallback={
                <p className="text-neutral-700 mb-4">
                  We envision NIBM Tower Cranes as the preferred partner for tower crane solutions in Europe, recognized for:
                </p>
              }>
                <p className="text-neutral-700 mb-4">
                  {t('about.vision.intro')}
                </p>
              </ClientOnly>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <ClientOnly fallback={<span>Technical excellence and innovation in tower crane operations</span>}>
                    <span>{t('about.vision.point1')}</span>
                  </ClientOnly>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <ClientOnly fallback={<span>Uncompromising commitment to safety and quality</span>}>
                    <span>{t('about.vision.point2')}</span>
                  </ClientOnly>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <ClientOnly fallback={<span>Comprehensive service that exceeds client expectations</span>}>
                    <span>{t('about.vision.point3')}</span>
                  </ClientOnly>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <ClientOnly fallback={<span>Contributing to the advancement of the construction industry through responsible and sustainable practices</span>}>
                    <span>{t('about.vision.point4')}</span>
                  </ClientOnly>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ClientOnly fallback={
            <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
              Our Core Values
            </h2>
          }>
            <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
              {t('about.values.title')}
            </h2>
          </ClientOnly>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ClientOnly fallback={
            <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
              Meet the Founder
            </h2>
          }>
            <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
              {t('about.team.title')}
            </h2>
          </ClientOnly>
          
          <div className="max-w-5xl mx-auto">
            <motion.div
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
                    Gid Gehlen
                  </h3>
                  <p className="text-primary font-medium text-lg mb-4">
                    {t('about.team.ceo')}
                  </p>
                  <p className="text-neutral-700 mb-4">
                    {t('about.team.ceo.bio')}
                  </p>
                  <p className="text-neutral-700">
                    {t('about.team.ceo.bio2')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
} 