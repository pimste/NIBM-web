import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  // Define base metadata for this specific page
  const baseMetadata: Metadata = {
    title: 'About Us | NIBM Tower Cranes',
    description: 'Learn about NIBM Tower Cranes, your trusted partner for tower crane sales, rentals, and services since 1995.',
    openGraph: {
      title: 'About NIBM Tower Cranes',
      description: 'Your trusted partner for tower crane sales, rentals, and services since 1995.',
      url: 'https://www.nibmvb.eu/about',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/about-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'NIBM Tower Cranes Headquarters'
        }
      ]
    },
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/en/about',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
} 