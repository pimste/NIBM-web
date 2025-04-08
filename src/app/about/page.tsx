'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

export default function About() {
  const teamMembers = [
    {
      name: 'Johan van der Berg',
      position: 'CEO & Founder',
      image: '/images/Potain-MDT-178_3W.jpg', // Placeholder, would be replaced with actual team photos
      bio: 'With over 25 years of experience in the construction industry, Johan founded NIBM Tower Cranes with a vision to provide reliable and innovative crane solutions.',
    },
    {
      name: 'Emma Schmidt',
      position: 'Technical Director',
      image: '/images/Potain-MDT-178_3W.jpg', // Placeholder
      bio: 'Emma brings 15 years of engineering expertise to NIBM, ensuring all tower cranes meet the highest technical and safety standards.',
    },
    {
      name: 'Thomas Weber',
      position: 'Operations Manager',
      image: '/images/Potain-MDT-178_3W.jpg', // Placeholder
      bio: 'Thomas oversees all operational aspects of NIBM, from logistics and installation to maintenance and training.',
    },
    {
      name: 'Lisa Jansen',
      position: 'Customer Relations',
      image: '/images/Potain-MDT-178_3W.jpg', // Placeholder
      bio: 'Lisa ensures that every client receives personalized service and support throughout their engagement with NIBM.',
    },
  ]

  const values = [
    {
      title: 'Safety First',
      description: 'We prioritize safety in all aspects of our operations, from crane selection to installation and training.',
    },
    {
      title: 'Quality & Reliability',
      description: 'We provide only the highest quality tower cranes that perform reliably in demanding construction environments.',
    },
    {
      title: 'Customer Focus',
      description: 'We work closely with our clients to understand their specific needs and provide customized solutions.',
    },
    {
      title: 'Technical Excellence',
      description: 'Our team of experts brings deep technical knowledge and experience to every project.',
    },
    {
      title: 'Innovation',
      description: 'We continuously seek innovative approaches to improve our services and offerings.',
    },
    {
      title: 'Sustainability',
      description: 'We are committed to environmentally responsible practices in our operations and recommendations.',
    },
  ]

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
            About NIBM Tower Cranes
          </h1>
          <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
            Your trusted partner for tower crane sales, rentals, and services since 1995.
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Our Story
              </h2>
              <p className="text-neutral-700 mb-4">
                NIBM Tower Cranes was founded in 1995 with a simple mission: to provide reliable, high-quality tower cranes and exceptional service to the construction industry. What began as a small rental company has grown into a comprehensive provider of tower crane solutions across Europe.
              </p>
              <p className="text-neutral-700 mb-4">
                Over the past 28 years, we have built a reputation for technical excellence, reliability, and customer-focused service. Our deep understanding of construction projects and their unique challenges has allowed us to develop a full-service approach that addresses all aspects of tower crane operations.
              </p>
              <p className="text-neutral-700">
                Today, NIBM Tower Cranes is proud to serve a diverse clientele, from small construction firms to large multinational corporations, providing them with the equipment and expertise they need to realize their construction projects safely and efficiently.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/cropped-Top-page2-potain6.png"
                alt="NIBM Tower Cranes"
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
                Our Mission
              </h2>
              <p className="text-neutral-700 mb-4">
                Our mission is to provide reliable, safe, and efficient tower crane solutions that enable our clients to complete their construction projects successfully. We are committed to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>Offering high-quality tower cranes that meet the specific needs of each project</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>Providing expert consultation to help clients select the right equipment</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>Ensuring safe and efficient crane operations through comprehensive training and support</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>Delivering exceptional service at every stage of the client relationship</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Our Vision
              </h2>
              <p className="text-neutral-700 mb-4">
                We envision NIBM Tower Cranes as the preferred partner for tower crane solutions in Europe, recognized for:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>Technical excellence and innovation in tower crane operations</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>Uncompromising commitment to safety and quality</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>Comprehensive service that exceeds client expectations</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>Contributing to the advancement of the construction industry through responsible and sustainable practices</span>
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
            Our Core Values
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
            Meet Our Team
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