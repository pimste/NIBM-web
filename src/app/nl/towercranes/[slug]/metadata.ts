import { Metadata } from 'next'
import { generatePageMetadata } from '../../../page-metadata'

// This would be fetched from a CMS or API in a real implementation
const cranes = [
  {
    id: 1,
    name: 'Potain MDT 178',
    slug: 'potain-mdt-178', // SEO-friendly slug
    image: '/images/optimized/Potain-MDT-178_3W.webp',
    status: 'Available',
    category: 'Sale',
    description: 'The Potain MDT 178 is a versatile flat top tower crane designed for ease of transport, assembly, and operation. It offers excellent lift capacities and reach, making it ideal for a wide range of construction projects.',
  },
  {
    id: 2,
    name: 'Potain MC 85 B',
    slug: 'potain-mc-85-b', // SEO-friendly slug
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    status: 'Available',
    category: 'Rental',
    description: 'The Potain MC 85 B is a reliable top-slewing tower crane suitable for medium-sized construction projects. With its compact design and excellent performance, it provides an effective lifting solution with minimal operational costs.',
  },
]

function findCraneBySlug(slug: string) {
  return cranes.find(crane => crane.slug === slug)
}

export function generateTowerCraneMetadata({ params }: { params: { slug: string } }): Metadata {
  // Get crane data
  const crane = findCraneBySlug(params.slug)
  
  if (!crane) {
    return {
      title: 'Tower Crane Not Found',
      description: 'The requested tower crane could not be found.'
    }
  }
  
  // Create base metadata for this crane
  const baseMetadata: Metadata = {
    title: crane.name,
    description: crane.description,
    openGraph: {
      title: `${crane.name} | ${crane.status} ${crane.category === 'Sale' ? 'For Sale' : 'For Rent'}`,
      description: crane.description,
      url: `https://www.nibmvb.eu/towercranes/${crane.slug}`,
      type: 'website',
      images: [
        {
          url: `https://www.nibmvb.eu${crane.image}`,
          width: 1200,
          height: 630,
          alt: crane.name
        }
      ]
    },
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    `/towercranes/${crane.slug}`,
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
} 