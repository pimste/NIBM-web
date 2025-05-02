import { Metadata } from 'next'
import { generatePageMetadata } from '../../../page-metadata'

// Find crane by slug helper function (placeholder - actual data would come from a database or API)
function findCraneBySlug(slug: string) {
  // This is just a placeholder - in a real app, you'd fetch this from an API or database
  const cranes = [
    {
      slug: 'potain-mdt-178',
      name: 'Potain MDT 178',
      description: 'The Potain MDT 178 is a versatile flat top tower crane designed for ease of transport, assembly, and operation.',
      image: '/images/optimized/Potain-MDT-178_3W.webp',
      status: 'Available',
      category: 'Sale',
    },
    {
      slug: 'potain-mc-85-b',
      name: 'Potain MC 85 B',
      description: 'The Potain MC 85 B is a reliable top-slewing tower crane suitable for medium-sized construction projects.',
      image: '/images/optimized/cropped-Top-page2-potain6.webp',
      status: 'Available',
      category: 'Rental',
    },
  ]
  return cranes.find(crane => crane.slug === slug)
}

export async function generateTowerCraneMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
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
    `/towercranes/${params.slug}`,
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
} 