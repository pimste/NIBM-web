import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  // Define base metadata for this specific page
  const baseMetadata: Metadata = {
    title: 'Over Ons | NIBM Tower Cranes - Uw Betrouwbare Torenkraan Partner Sinds 1996',
    description: 'Leer over NIBM Tower Cranes, uw betrouwbare partner voor verkoop en diensten van torenkranen sinds 1996. Met kantoren in Nederland en Israël bieden wij deskundige torenkraanoplossingen in heel Europa. Ontdek onze geschiedenis, missie en toewijding aan excellentie.',
    openGraph: {
      title: 'Over NIBM Tower Cranes - Uw Betrouwbare Partner Sinds 1996',
      description: 'Uw betrouwbare partner voor verkoop en diensten van torenkranen sinds 1996. Deskundige oplossingen in heel Europa met kantoren in Nederland en Israël.',
      url: 'https://www.nibmvb.eu/nl/about',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Tower Cranes - Over Ons'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Over NIBM Tower Cranes - Uw Betrouwbare Partner Sinds 1996',
      description: 'Uw betrouwbare partner voor verkoop en diensten van torenkranen sinds 1996. Deskundige oplossingen in heel Europa.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
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