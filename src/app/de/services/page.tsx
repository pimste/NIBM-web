import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import ServicesClient from '../../en/services/ServicesClient'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for services page
  const baseMetadata: Metadata = {
    title: 'Unsere Dienstleistungen | NIBM Tower Cranes',
    description: 'Entdecken Sie unser umfassendes Angebot an Turmkrandienstleistungen, darunter Verkauf, Installation, Wartung und Bedienerschulung.',
    openGraph: {
      title: 'Turmkran-Dienstleistungen von NIBM',
      description: 'Komplette Turmkranlösungen für Ihre Bauprojekte, von der Auswahl und Lieferung bis hin zur Installation und Unterstützung.',
      url: 'https://www.nibmvb.eu/de/services',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Turmkran-Dienstleistungen - Verkauf, Vermietung, Installation & Wartung'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Turmkran-Dienstleistungen von NIBM',
      description: 'Komplette Turmkranlösungen für Ihre Bauprojekte, von der Auswahl und Lieferung bis hin zur Installation und Unterstützung.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/de/services',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function Services() {
  return <ServicesClient />
} 