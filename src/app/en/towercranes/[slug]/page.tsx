import { Metadata } from 'next'
import { generateTowerCraneMetadata } from './metadata'
import dynamic from 'next/dynamic'

// Disable SSR to avoid hydration issues
const CraneDetailsClient = dynamic(
  () => import('./CraneDetailsClient'),
  { 
    ssr: false,
    loading: () => <p>Loading crane details...</p>
  }
)

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return generateTowerCraneMetadata({ params })
}

interface CraneDetailPageProps {
  params: { slug: string };
}

export default function CraneDetailPage({ params }: CraneDetailPageProps) {
  return <CraneDetailsClient slug={params.slug} />;
} 