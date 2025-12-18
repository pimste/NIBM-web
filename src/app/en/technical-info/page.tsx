import { Metadata } from 'next'
import TechnicalInfoClient from './TechnicalInfoClient'

import { generatePageMetadata } from '../../page-metadata'

// Base metadata for technical-info page in en language
const baseMetadata: Metadata = {
  title: 'Technical Information | Tower Crane Specifications & Guidelines | NIBM',
  description: 'Comprehensive technical information, specifications, and safety guidelines for tower cranes. Learn about tower crane capacities, jib lengths, load charts, installation requirements, and operational best practices from NIBM Tower Cranes experts.',
  openGraph: {
    title: 'Tower Crane Technical Information & Specifications | NIBM',
    description: 'Access detailed technical specifications, safety guidelines, and operational information for tower cranes. Expert resources for construction professionals.',
    url: 'https://www.nibmvb.eu/en/technical-info',
    images: [
      {
        url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
        width: 1200,
        height: 630,
        alt: 'Tower Crane Technical Information and Specifications',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tower Crane Technical Information & Specifications | NIBM',
    description: 'Comprehensive technical information and specifications for tower cranes. Expert resources for construction professionals.',
    images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
  },
}

// Generate metadata for this page
export const generateMetadata = async () => {
  return generatePageMetadata(
    baseMetadata,
    '/en/technical-info',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function TechnicalInfo() {
  return <TechnicalInfoClient />
} 