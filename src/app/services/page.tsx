'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

const services = [
  {
    id: 'sale',
    title: 'Sale of Tower Cranes',
    description: 'We offer a wide range of new and used tower cranes for sale, catering to various construction needs and budgets. Each crane comes with comprehensive documentation, warranties, and full technical support.',
    image: '/images/Potain-MDT-178_3W.jpg',
    features: [
      'Extensive selection of crane types and models',
      'New and used cranes with warranties',
      'Competitive pricing and financing options',
      'Technical documentation and certification',
      'Full after-sales support and spare parts',
    ],
  },
  {
    id: 'rent',
    title: 'Rental of Tower Cranes',
    description: 'Our rental service provides flexible access to high-quality tower cranes without the full investment of purchasing. We offer short-term and long-term rental options with comprehensive support throughout the rental period.',
    image: '/images/cropped-Top-page2-potain6.png',
    features: [
      'Flexible rental terms (short and long-term)',
      'Well-maintained and regularly inspected cranes',
      'Technical support and maintenance included',
      'Option to switch or upgrade equipment as needed',
      'Possibility of rent-to-own arrangements',
    ],
  },
  {
    id: 'planning',
    title: 'Planning & Consulting',
    description: 'Our experienced team provides expert consultation on crane selection, site planning, and regulatory compliance to ensure your project starts with the right foundation for safe and efficient tower crane operations.',
    image: '/images/Potain-MDT-178_3W.jpg',
    features: [
      'Site assessment and crane selection consulting',
      'Load capacity and coverage analysis',
      'Regulatory compliance guidance',
      'Cost optimization strategies',
      'Project timeline planning',
    ],
  },
  {
    id: 'transport',
    title: 'Transport & Logistics',
    description: 'We handle all aspects of crane transportation to your construction site, including route planning, permits, and specialized transport equipment to ensure safe and timely delivery.',
    image: '/images/cropped-Top-page2-potain6.png',
    features: [
      'Specialized transport vehicles and equipment',
      'Route planning and analysis',
      'Permit acquisition and compliance',
      'Experienced transport team',
      'Insurance coverage during transport',
    ],
  },
  {
    id: 'mounting',
    title: 'Mounting & Installation',
    description: 'Our certified technicians perform professional assembly, installation, and dismantling services, ensuring that your tower crane is set up safely and according to all relevant regulations and specifications.',
    image: '/images/Potain-MDT-178_3W.jpg',
    features: [
      'Certified installation specialists',
      'Compliance with all safety regulations',
      'Thorough testing and commissioning',
      'Efficient dismantling services',
      'Comprehensive documentation',
    ],
  },
  {
    id: 'training',
    title: 'Training & Certification',
    description: 'We offer comprehensive training programs for crane operators and maintenance personnel, ensuring your team has the knowledge and skills necessary for safe and efficient crane operation.',
    image: '/images/cropped-Top-page2-potain6.png',
    features: [
      'Certified crane operator training',
      'Maintenance and inspection training',
      'Safety protocols and best practices',
      'Hands-on and theoretical instruction',
      'Certification and documentation',
    ],
  },
]

export default function Services() {
  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
            Our Services
          </h1>
          <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
            From crane selection and delivery to installation and training, we provide a complete solution for all your tower crane needs.
          </p>
        </div>
      </div>

      {/* Service Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Comprehensive Tower Crane Solutions
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              NIBM Tower Cranes offers a full range of services to meet all your tower crane needs. Our integrated approach ensures that every aspect of your crane requirements is handled with expertise and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-neutral-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Consult</h3>
              <p className="text-neutral-700">
                We begin with a thorough consultation to understand your specific project requirements and challenges.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Implement</h3>
              <p className="text-neutral-700">
                Our team handles everything from crane selection and delivery to installation and testing.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Support</h3>
              <p className="text-neutral-700">
                We provide ongoing support, maintenance, and training throughout your project's duration.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-primary hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Discuss Your Project With Us
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Individual Services */}
      {services.map((service, index) => (
        <section 
          key={service.id} 
          id={service.id}
          className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image (switches sides based on index) */}
              {index % 2 === 0 ? (
                <motion.div 
                  className="relative h-96 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ) : null}

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-neutral-700 mb-6">
                  {service.description}
                </p>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  Key Features:
                </h3>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?subject=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center text-primary hover:text-primary-700 font-medium transition-colors"
                >
                  Learn More About This Service
                  <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>

              {/* Image (switches sides based on index) */}
              {index % 2 !== 0 ? (
                <motion.div 
                  className="relative h-96 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Discuss Your Tower Crane Needs?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Our team of experts is ready to help you find the perfect solution for your construction project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white hover:bg-neutral-100 text-primary font-medium px-8 py-4 rounded-md transition-colors"
            >
              Contact Us Today
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
} 