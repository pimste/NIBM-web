import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import ServicesClient from '../../en/services/ServicesClient'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for services page
  const baseMetadata: Metadata = {
    title: 'Onze Diensten | NIBM Tower Cranes',
    description: 'Ontdek ons uitgebreide aanbod van torenkraandiensten inclusief verkoop, verhuur, installatie, onderhoud en operatortraining.',
    openGraph: {
      title: 'Torenkraan Diensten van NIBM',
      description: 'Complete torenkraanoplossingen voor uw bouwprojecten, van selectie en levering tot installatie en ondersteuning.',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/services-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'NIBM Torenkraan Diensten'
        }
      ]
    }
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/nl/services',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function Services() {
  return <ServicesClient />
} 