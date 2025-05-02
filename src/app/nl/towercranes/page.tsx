import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import TowerCranesClient from './TowerCranesClient'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for tower cranes page
  const baseMetadata: Metadata = {
    title: 'Torenkraan Catalogus | NIBM Tower Cranes',
    description: 'Bekijk onze complete catalogus van torenkranen die beschikbaar zijn voor verkoop en verhuur, inclusief Potain-modellen met gedetailleerde specificaties.',
    openGraph: {
      title: 'Torenkraan Catalogus | NIBM Tower Cranes',
      description: 'Ontdek onze selectie van premium torenkranen met gedetailleerde specificaties en beschikbaarheidsstatus.',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/towercranes-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'NIBM Torenkraan Catalogus'
        }
      ]
    }
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/nl/towercranes',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function TowerCranes() {
  return <TowerCranesClient />
} 