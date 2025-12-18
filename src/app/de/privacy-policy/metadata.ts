import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata: Metadata = {
    title: 'Datenschutzerklärung | NIBM Tower Cranes',
    description: 'Datenschutzerklärung für NIBM Tower Cranes Website',
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
    '/de/privacy-policy',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

