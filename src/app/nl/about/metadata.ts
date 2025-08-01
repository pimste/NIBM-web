import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  // Define base metadata for this specific page
  const baseMetadata: Metadata = {
    title: 'Over Ons | NIBM Tower Cranes',
    description: 'Leer over NIBM Tower Cranes, uw betrouwbare partner voor verkoop en diensten van torenkranen sinds 1996.',
    openGraph: {
      title: 'Over NIBM Tower Cranes',
      description: 'Uw betrouwbare partner voor verkoop en diensten van torenkranen sinds 1996.',
      url: 'https://www.nibmvb.eu/nl/about',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/about-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'NIBM Tower Cranes Hoofdkantoor'
        }
      ]
    },
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/nl/about',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
} 