import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import TowerCranesClient from './TowerCranesClient'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for tower cranes page
  const baseMetadata: Metadata = {
    title: 'Turmkran Katalog | Potain Modelle zum Verkauf & Vermietung | NIBM',
    description: 'Durchsuchen Sie unseren kompletten Katalog von professionellen Turmkranen zum Verkauf und zur Vermietung. Entdecken Sie Potain-Modelle einschließlich MDT, MC und MCT Serien mit detaillierten Spezifikationen, Kapazitäten und Auslegerlängen. Finden Sie den perfekten Turmkran für Ihr Bauprojekt.',
    openGraph: {
      title: 'Turmkran Katalog | Potain Modelle zum Verkauf & Vermietung | NIBM',
      description: 'Entdecken Sie unsere Auswahl an Premium-Potain-Turmkranen mit detaillierten Spezifikationen, Kapazitäten und Verfügbarkeitsstatus. Professionelle Turmkranlösungen für Ihre Bauprojekte.',
      url: 'https://www.nibmvb.eu/de/towercranes',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Turmkran Katalog - Potain Modelle',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Turmkran Katalog | Potain Modelle zum Verkauf & Vermietung | NIBM',
      description: 'Entdecken Sie unsere Auswahl an Premium-Potain-Turmkranen mit detaillierten Spezifikationen und Verfügbarkeitsstatus.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/de/towercranes',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function TowerCranes() {
  return <TowerCranesClient />
} 