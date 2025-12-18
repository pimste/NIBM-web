import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata: Metadata = {
    title: 'Nutzungsbedingungen | NIBM Tower Cranes',
    description: 'Nutzungsbedingungen für NIBM Tower Cranes Website',
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
    '/de/terms-of-service',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

