import { Metadata } from 'next'
import TechnicalInfoClient from './TechnicalInfoClient'

// Base metadata for technical-info page in de language
const baseMetadata: Metadata = {
  title: 'NIBM Tower Cranes | Technische Informationen',
  description: 'Technische Informationen für NIBM Tower Cranes',
}

// Generate metadata for this page
export const generateMetadata = async () => {
  return {
    ...baseMetadata,
    alternates: {
      canonical: 'https://www.nibmvb.eu/de/technical-info',
      languages: {
        'en': 'https://www.nibmvb.eu/en/technical-info',
        'nl': 'https://www.nibmvb.eu/nl/technical-info',
        'de': 'https://www.nibmvb.eu/de/technical-info',
      }
    }
  }
}

export default function TechnicalInfo() {
  return <TechnicalInfoClient />
} 