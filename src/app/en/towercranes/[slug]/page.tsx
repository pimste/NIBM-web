import { Metadata } from 'next'
import { generateTowerCraneMetadata } from './metadata'
import dynamic from 'next/dynamic'
import { prisma } from '@/lib/prisma'

// Enable ISR - revalidate every 5 minutes
export const revalidate = 300

// Disable SSR to avoid hydration issues
const CraneDetailsClient = dynamic(
  () => import('./CraneDetailsClient'),
  { 
    ssr: false,
    loading: () => <p>Loading crane details...</p>
  }
)

// Generate static params from database
export async function generateStaticParams() {
  try {
    const cranes = await prisma.crane.findMany({
      where: {
        isAvailable: true
      },
      select: {
        slug: true
      }
    })
    
    return cranes.map((crane) => ({
      slug: crane.slug,
    }))
  } catch (error) {
    console.error('Error fetching crane slugs for static generation:', error)
    // Fallback to empty array if database query fails
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return generateTowerCraneMetadata({ params })
}

interface CraneDetailPageProps {
  params: { slug: string };
}

export default function CraneDetailPage({ params }: CraneDetailPageProps) {
  return <CraneDetailsClient slug={params.slug} />;
} 