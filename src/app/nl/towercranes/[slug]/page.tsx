import { Metadata } from 'next'
import { generateTowerCraneMetadata } from './metadata'
import CraneDetailsClient from './CraneDetailsClient'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return generateTowerCraneMetadata({ params })
}

export default function CraneDetails({ params }: { params: { slug: string } }) {
  return <CraneDetailsClient />
} 