import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

// Fetch cranes from database for static generation
async function getCranes() {
  try {
    const cranes = await prisma.crane.findMany({
      where: {
        isAvailable: true
      },
      select: {
        slug: true
      }
    })
    return cranes
  } catch (error) {
    console.error('Error fetching cranes for static generation:', error)
    return []
  }
}

// Legacy hardcoded data (kept for fallback, but not used)
const cranes = [
  {
    id: 1,
    name: 'Potain MDT 178',
    slug: 'potain-mdt-178', // SEO-friendly slug
    image: '/images/optimized/Potain-MDT-178_3W.webp',
    description: 'The Potain MDT 178 is a versatile flat top tower crane designed for ease of transport, assembly, and operation. It offers excellent lift capacities and reach, making it ideal for a wide range of construction projects.',
    type: 'Flat Top',
    category: 'Sale',
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
  },
  {
    id: 2,
    name: 'Potain MC 85 B',
    slug: 'potain-mc-85-b', // SEO-friendly slug
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    description: 'The Potain MC 85 B is a reliable top-slewing tower crane suitable for medium-sized construction projects. With its compact design and excellent performance, it provides an effective lifting solution with minimal operational costs.',
    type: 'Top Slewing',
    category: 'Rental',
    maxCapacity: '5 tons',
    maxJibLength: '52 meters',
  },
  {
    id: 3,
    name: 'Potain MDT 219 J10',
    slug: 'potain-mdt-219-j10',
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    description: 'The Potain MDT 219 J10 is a powerful tower crane for heavy-duty projects. It combines robust lifting capacity with advanced technology for optimal performance.',
    type: 'Flat Top',
    category: 'Sale',
    maxCapacity: '10 tons',
    maxJibLength: '65 meters',
  },
  {
    id: 4,
    name: 'Potain MCT 88',
    slug: 'potain-mct-88',
    image: '/images/optimized/Potain-MDT-178_3W.webp',
    description: "The Potain MCT 88 offers excellent flexibility for urban construction projects. With its compact design and quick setup, it's ideal for space-constrained sites.",
    type: 'Flat Top',
    category: 'Rental',
    maxCapacity: '5 tons',
    maxJibLength: '52 meters',
  },
  {
    id: 5,
    name: 'Potain MC 125',
    slug: 'potain-mc-125',
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    description: 'The Potain MC 125 offers reliability and performance for mid-size construction projects. Its versatile design makes it suitable for a wide range of applications.',
    type: 'Top Slewing',
    category: 'Sale',
    maxCapacity: '6 tons',
    maxJibLength: '60 meters',
  },
  {
    id: 6,
    name: 'Potain MDT 189',
    slug: 'potain-mdt-189',
    image: '/images/optimized/Potain-MDT-178_3W.webp',
    description: 'The Potain MDT 189 delivers exceptional performance with its innovative flat-top design. It offers superior lifting capacity and ease of assembly.',
    type: 'Flat Top',
    category: 'Rental',
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
  },
  {
    id: 7,
    name: 'Potain MC 175 B',
    slug: 'potain-mc-175-b',
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    description: "The Potain MC 175 B is a high-performance top-slewing crane that combines power and precision. It's designed for demanding construction projects requiring significant lifting capacity.",
    type: 'Top Slewing',
    category: 'Sale',
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
  },
  {
    id: 8,
    name: 'Potain MDT 268 J12',
    slug: 'potain-mdt-268-j12',
    image: '/images/optimized/Potain-MDT-178_3W.webp',
    description: "The Potain MDT 268 J12 is a premium flat-top tower crane with exceptional capacity. It's designed for the most demanding construction projects.",
    type: 'Flat Top',
    category: 'Sale',
    maxCapacity: '12 tons',
    maxJibLength: '75 meters',
  },
  {
    id: 9,
    name: 'Potain MCT 135',
    slug: 'potain-mct-135',
    image: '/images/optimized/cropped-Top-page2-potain6.webp',
    description: "The Potain MCT 135 offers an excellent combination of compact design and lifting power. It's ideal for urban construction projects with space constraints.",
    type: 'Flat Top',
    category: 'Rental',
    maxCapacity: '6 tons',
    maxJibLength: '50 meters',
  },
]

// Types for page params
type Props = {
  params: { slug: string }
  children: React.ReactNode
}

// Generate metadata dynamically for each crane page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const crane = cranes.find(c => c.slug === slug)
  
  if (!crane) {
    return {
      title: 'Crane Not Found | NIBM Tower Cranes',
      description: 'The requested tower crane could not be found.',
    }
  }
  
  return {
    title: `${crane.name} - ${crane.type} Tower Crane | NIBM Tower Cranes`,
    description: `${crane.description.substring(0, 157)}...`,
    keywords: `${crane.name}, tower crane, ${crane.type}, ${crane.category === 'Sale' ? 'crane for sale' : 'crane rental'}, construction equipment, ${crane.maxCapacity} capacity, ${crane.maxJibLength} jib length`,
    alternates: {
      canonical: `/towercranes/${crane.slug}`,
    },
    openGraph: {
      title: `${crane.name} - ${crane.type} Tower Crane | NIBM Tower Cranes`,
      description: crane.description,
      images: [{
        url: crane.image,
        width: 1200,
        height: 630,
        alt: crane.name,
      }],
    }
  }
}

// Generate static paths for all cranes from database
export async function generateStaticParams() {
  const dbCranes = await getCranes()
  return dbCranes.map(crane => ({ slug: crane.slug }))
}

export default function CraneDetailLayout({ children }: Props) {
  // This layout wrapper just passes through the children (the page content)
  return children
} 