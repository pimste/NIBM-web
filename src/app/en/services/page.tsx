import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import ServicesClient from './ServicesClient'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for services page
  const baseMetadata: Metadata = {
    title: 'Our Services | NIBM Tower Cranes',
    description: 'Explore our comprehensive range of tower crane services including sales, rental, installation, maintenance, and operator training.',
    openGraph: {
      title: 'Tower Crane Services from NIBM',
      description: 'Complete tower crane solutions for your construction projects, from selection and delivery to installation and support.',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/services-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'NIBM Tower Crane Services'
        }
      ]
    }
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/en/services',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function Services() {
  return <ServicesClient />
} 