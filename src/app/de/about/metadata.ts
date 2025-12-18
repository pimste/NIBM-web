import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  // Define base metadata for this specific page
  const baseMetadata: Metadata = {
    title: 'Über Uns | NIBM Tower Cranes - Ihr Zuverlässiger Turmkran Partner Seit 1996',
    description: 'Erfahren Sie mehr über NIBM Tower Cranes, Ihren zuverlässigen Partner für Verkauf und Service von Turmkranen seit 1996. Mit Büros in den Niederlanden und Israel bieten wir fachkundige Turmkranlösungen in ganz Europa. Entdecken Sie unsere Geschichte, Mission und unser Engagement für Exzellenz.',
    openGraph: {
      title: 'Über NIBM Tower Cranes - Ihr Zuverlässiger Partner Seit 1996',
      description: 'Ihr zuverlässiger Partner für Verkauf und Service von Turmkranen seit 1996. Fachkundige Lösungen in ganz Europa mit Büros in den Niederlanden und Israel.',
      url: 'https://www.nibmvb.eu/de/about',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Tower Cranes - Über Uns'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Über NIBM Tower Cranes - Ihr Zuverlässiger Partner Seit 1996',
      description: 'Ihr zuverlässiger Partner für Verkauf und Service von Turmkranen seit 1996. Fachkundige Lösungen in ganz Europa.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
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