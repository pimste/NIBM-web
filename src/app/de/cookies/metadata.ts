import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata: Metadata = {
    title: 'Cookie-Richtlinie | NIBM Tower Cranes',
    description: 'Cookie-Richtlinie für NIBM Tower Cranes Website',
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
    '/de/cookies',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

