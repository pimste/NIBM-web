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

// Static crane slugs for build-time generation
const staticCraneSlugs = [
  'potain-mdt-178',
  'potain-mc-85-b',
  'potain-mdt-219-j10',
  'potain-mct-88',
  'potain-mc-125',
  'potain-mdt-189',
  'potain-mc-175-b',
  'potain-mdt-268-j12',
  'potain-mct-135'
]

export async function generateStaticParams() {
  return staticCraneSlugs.map((slug) => ({
    slug: slug,
  }))
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