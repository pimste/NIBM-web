import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import TowerCranesClient from './TowerCranesClient'
import { prisma } from '@/lib/prisma'

// Enable ISR - revalidate every 5 minutes
export const revalidate = 300

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for tower cranes page
  const baseMetadata: Metadata = {
    title: 'Torenkraan Catalogus | Bekijk Potain Modellen te Koop & Verhuur | NIBM',
    description: 'Bekijk onze complete catalogus van professionele torenkranen beschikbaar voor verkoop en verhuur. Ontdek Potain modellen inclusief MDT, MC en MCT series met gedetailleerde specificaties, capaciteiten en gieklengtes. Vind de perfecte torenkraan voor uw bouwproject.',
    openGraph: {
      title: 'Torenkraan Catalogus | Potain Modellen te Koop & Verhuur | NIBM',
      description: 'Ontdek onze selectie van premium Potain torenkranen met gedetailleerde specificaties, capaciteiten en beschikbaarheidsstatus. Professionele torenkraanoplossingen voor uw bouwprojecten.',
      url: 'https://www.nibmvb.eu/nl/towercranes',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Torenkraan Catalogus - Potain Modellen',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Torenkraan Catalogus | Potain Modellen te Koop & Verhuur | NIBM',
      description: 'Ontdek onze selectie van premium Potain torenkranen met gedetailleerde specificaties en beschikbaarheidsstatus.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/nl/towercranes',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

// Fetch cranes data on the server
async function getCranes() {
  try {
    const cranes = await prisma.crane.findMany({
      where: {
        isAvailable: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    // Transform the data to match frontend expectations
    return cranes.map(crane => ({
      ...crane,
      image: Array.isArray(crane.images) && crane.images.length > 0 ? crane.images[0] : '/images/placeholder-crane.jpg',
      gallery: Array.isArray(crane.images) ? crane.images : [],
      specifications: {
        manufacturer: 'Potain',
        model: crane.model,
        yearOfManufacture: crane.year ?? '-',
        serialNumber: crane.serialNumber,
        condition: crane.condition,
        maxCapacity: crane.maxCapacity,
        maxJibLength: crane.maxJibLength,
        maxHeight: crane.maxHeight,
        counterJibLength: crane.counterJibLength,
        towerType: crane.towerType,
        cabinType: crane.cabinType,
        powerRequirements: crane.powerRequirements,
        hoistSpeed: crane.hoistSpeed,
        trolleySpeed: crane.trolleySpeed,
        slewing: crane.slewing,
      }
    }))
  } catch (error) {
    console.error('Error fetching cranes:', error)
    return []
  }
}

export default async function TowerCranes() {
  const cranes = await getCranes()
  return <TowerCranesClient initialCranes={cranes} />
} 