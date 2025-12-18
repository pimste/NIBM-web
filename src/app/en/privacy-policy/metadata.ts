import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata: Metadata = {
    title: 'Privacy Policy | NIBM Tower Cranes',
    description: 'Privacy Policy for NIBM Tower Cranes website',
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
    '/en/privacy-policy',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

