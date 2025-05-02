import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import TowerCranesClient from './TowerCranesClient'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for tower cranes page
  const baseMetadata: Metadata = {
    title: 'Turmkran Katalog | NIBM Tower Cranes',
    description: 'Durchsuchen Sie unseren kompletten Katalog von Turmkranen zum Verkauf und zur Vermietung, einschließlich Potain-Modellen mit detaillierten Spezifikationen.',
    openGraph: {
      title: 'Turmkran Katalog | NIBM Tower Cranes',
      description: 'Entdecken Sie unsere Auswahl an Premium-Turmkranen mit detaillierten Spezifikationen und Verfügbarkeitsstatus.',
      url: 'https://www.nibmvb.eu/de/towercranes',
    }
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/de/towercranes',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function TowerCranes() {
  return <TowerCranesClient />
} 