import { Metadata } from 'next'
import { generatePageMetadata } from '../../../page-metadata'

// Find crane by slug helper function - fetch from API
async function findCraneBySlug(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/cranes/${slug}`, {
      cache: 'no-store' // Ensure fresh data for metadata generation
    })
    
    if (!response.ok) {
      return null
    }
    
    const crane = await response.json()
    return crane
  } catch (error) {
    console.error('Error fetching crane for metadata:', error)
    return null
  }
}

export async function generateTowerCraneMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  // Get crane data from API
  const crane = await findCraneBySlug(params.slug)
  
  if (!crane) {
    return {
      title: 'Tower Crane Not Found | NIBM Tower Cranes',
      description: 'The requested tower crane could not be found.'
    }
  }
  
  // Create base metadata for this crane
  const baseMetadata: Metadata = {
    title: `${crane.name} - ${crane.type === 'flattop' ? 'Flat Top' : 'Top Slewing'} Tower Crane`,
    description: crane.description || `The ${crane.name} is a ${crane.type === 'flattop' ? 'flat-top' : 'top-slewing'} tower crane with ${crane.maxCapacity} capacity. ${crane.category === 'sale' ? 'Available for sale' : 'Available for rental'}.`,
    keywords: `${crane.name}, tower crane, ${crane.type === 'flattop' ? 'Flat Top' : 'Top Slewing'}, crane for ${crane.category}, construction equipment, ${crane.maxCapacity} capacity, ${crane.maxJibLength} jib length`,
    openGraph: {
      title: `${crane.name} - ${crane.type === 'flattop' ? 'Flat Top' : 'Top Slewing'} Tower Crane | NIBM Tower Cranes`,
      description: crane.description || `The ${crane.name} is a premium ${crane.type === 'flattop' ? 'flat-top' : 'top-slewing'} tower crane with exceptional capacity. It's designed for the most demanding construction projects.`,
      url: `https://www.nibmvb.eu/towercranes/${crane.slug}`,
      type: 'website',
      images: [
        {
          url: `http://localhost:3000${crane.image}`,
          width: 1200,
          height: 630,
          alt: crane.name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: '@nibmvb',
      creator: '@nibmvb',
      title: 'NIBM Tower Cranes | Professional Tower Crane Solutions',
      description: 'Expert tower crane sales, rentals, and services for construction projects of any scale. Full-service support from planning to dismantling.',
      images: ['http://localhost:3000/images/optimized/cropped-Top-page2-potain6.webp']
    }
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    `/towercranes/${params.slug}`,
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
} 