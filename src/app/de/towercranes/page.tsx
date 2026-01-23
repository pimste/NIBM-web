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
    title: 'Turmkran Katalog | Potain Modelle zum Verkauf & Vermietung | NIBM',
    description: 'Durchsuchen Sie unseren kompletten Katalog von professionellen Turmkranen zum Verkauf und zur Vermietung. Entdecken Sie Potain-Modelle einschließlich MDT, MC und MCT Serien mit detaillierten Spezifikationen, Kapazitäten und Auslegerlängen. Finden Sie den perfekten Turmkran für Ihr Bauprojekt.',
    openGraph: {
      title: 'Turmkran Katalog | Potain Modelle zum Verkauf & Vermietung | NIBM',
      description: 'Entdecken Sie unsere Auswahl an Premium-Potain-Turmkranen mit detaillierten Spezifikationen, Kapazitäten und Verfügbarkeitsstatus. Professionelle Turmkranlösungen für Ihre Bauprojekte.',
      url: 'https://www.nibmvb.eu/de/towercranes',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Turmkran Katalog - Potain Modelle',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Turmkran Katalog | Potain Modelle zum Verkauf & Vermietung | NIBM',
      description: 'Entdecken Sie unsere Auswahl an Premium-Potain-Turmkranen mit detaillierten Spezifikationen und Verfügbarkeitsstatus.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/de/towercranes',
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