import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  // Define base metadata for this specific page
  const baseMetadata: Metadata = {
    title: 'Über Uns | NIBM Tower Cranes',
    description: 'Erfahren Sie mehr über NIBM Tower Cranes, Ihren zuverlässigen Partner für Verkauf und Service von Turmkranen seit 1996.',
    openGraph: {
      title: 'Über NIBM Tower Cranes',
      description: 'Ihr zuverlässiger Partner für Verkauf und Service von Turmkranen seit 1996.',
      url: 'https://www.nibmvb.eu/de/about',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/about-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'NIBM Tower Cranes Hauptsitz'
        }
      ]
    },
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/de/about',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
} 