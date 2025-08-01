import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import TowerCranesClient from './TowerCranesClient'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for tower cranes page
  const baseMetadata: Metadata = {
    title: 'Tower Cranes Catalog | NIBM Tower Cranes',
    description: 'Browse our complete catalog of tower cranes available for sale, including Potain models with detailed specifications.',
    openGraph: {
      title: 'Tower Cranes Catalog | NIBM Tower Cranes',
      description: 'Explore our selection of premium tower cranes with detailed specifications and availability status.',
      url: 'https://www.nibmvb.eu/en/towercranes',
    }
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/en/towercranes',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function TowerCranes() {
  return <TowerCranesClient />
} 