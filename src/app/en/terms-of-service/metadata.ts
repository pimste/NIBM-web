import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata: Metadata = {
    title: 'Terms of Service | NIBM Tower Cranes',
    description: 'Terms of Service for NIBM Tower Cranes website',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  }

  return generatePageMetadata(
    baseMetadata,
    '/en/terms-of-service',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

