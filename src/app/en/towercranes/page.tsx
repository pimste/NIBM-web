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
    title: 'Tower Cranes Catalog | Browse Potain Models for Sale & Rental | NIBM',
    description: 'Browse our complete catalog of professional tower cranes available for sale and rental. Explore Potain models including MDT, MC, and MCT series with detailed specifications, capacities, and jib lengths. Find the perfect tower crane for your construction project.',
    openGraph: {
      title: 'Tower Cranes Catalog | Potain Models for Sale & Rental | NIBM',
      description: 'Explore our selection of premium Potain tower cranes with detailed specifications, capacities, and availability status. Professional tower crane solutions for your construction projects.',
      url: 'https://www.nibmvb.eu/en/towercranes',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Tower Cranes Catalog - Potain Models',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Tower Cranes Catalog | Potain Models for Sale & Rental | NIBM',
      description: 'Explore our selection of premium Potain tower cranes with detailed specifications and availability status.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/en/towercranes',
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