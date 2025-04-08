'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  
  const teamMembers = [
    {
      name: 'Johan van der Berg',
      position: t('about.team.ceo'),
      image: '/images/Potain-MDT-178_3W.jpg', // Placeholder, would be replaced with actual team photos
      bio: t('about.team.ceo.bio'),
    },
    {
      name: 'Emma Schmidt',
      position: t('about.team.technical'),
      image: '/images/Potain-MDT-178_3W.jpg', // Placeholder
      bio: t('about.team.technical.bio'),
    },
    {
      name: 'Thomas Weber',
      position: t('about.team.operations'),
      image: '/images/Potain-MDT-178_3W.jpg', // Placeholder
      bio: t('about.team.operations.bio'),
    },
    {
      name: 'Lisa Jansen',
      position: t('about.team.customer'),
      image: '/images/Potain-MDT-178_3W.jpg', // Placeholder
      bio: t('about.team.customer.bio'),
    },
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
                src="/images/cropped-Top-page2-potain6.png"
                alt={t('about.story.image')}
                fill
                className="object-cover"
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
              <motion.div
                key={index}
                className="p-6 bg-neutral-50 rounded-lg"
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

      {/* Our Team */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            {t('about.team.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-neutral-700">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
} 