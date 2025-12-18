import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import TechnicalInfoClient from './TechnicalInfoClient'

// Base metadata for technical-info page in nl language
const baseMetadata: Metadata = {
  title: 'Technische Informatie | Torenkraan Specificaties & Richtlijnen | NIBM',
  description: 'Uitgebreide technische informatie, specificaties en veiligheidsrichtlijnen voor torenkranen. Leer over torenkraan capaciteiten, giek lengtes, lastdiagrammen, installatievereisten en operationele best practices van NIBM Tower Cranes experts.',
  openGraph: {
    title: 'Technische Informatie & Specificaties Torenkranen | NIBM',
    description: 'Toegang tot gedetailleerde technische specificaties, veiligheidsrichtlijnen en operationele informatie voor torenkranen. Expert bronnen voor bouwprofessionals.',
    url: 'https://www.nibmvb.eu/nl/technical-info',
    images: [
      {
        url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
        width: 1200,
        height: 630,
        alt: 'Technische Informatie en Specificaties Torenkranen',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technische Informatie & Specificaties Torenkranen | NIBM',
    description: 'Uitgebreide technische informatie en specificaties voor torenkranen. Expert bronnen voor bouwprofessionals.',
    images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
  },
}

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMetadata(
    baseMetadata,
    '/nl/technical-info',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function TechnicalInfo() {
  return <TechnicalInfoClient />
} 