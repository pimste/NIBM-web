import { Metadata } from 'next'
import TechnicalInfoClient from './TechnicalInfoClient'

// Base metadata for technical-info page in nl language
const baseMetadata = {
  title: 'NIBM Tower Cranes | Technische info',
  description: 'Technische informatie pagina voor NIBM Tower Cranes',
}

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    ...baseMetadata,
    alternates: {
      canonical: `https://nibmvb.eu/nl/technical-info`,
      languages: {
        'en': 'https://nibmvb.eu/en/technical-info',
        'nl': 'https://nibmvb.eu/nl/technical-info',
        'de': 'https://nibmvb.eu/de/technical-info',
      },
    },
  }
}

export default function TechnicalInfo() {
  return <TechnicalInfoClient />
} 