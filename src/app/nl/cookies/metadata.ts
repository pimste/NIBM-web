import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata: Metadata = {
    title: 'Cookiebeleid | NIBM Tower Cranes',
    description: 'Cookiebeleid voor NIBM Tower Cranes website',
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
    '/nl/cookies',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

