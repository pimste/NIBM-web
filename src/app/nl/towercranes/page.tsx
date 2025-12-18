import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import TowerCranesClient from './TowerCranesClient'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for tower cranes page
  const baseMetadata: Metadata = {
    title: 'Torenkraan Catalogus | Bekijk Potain Modellen te Koop & Verhuur | NIBM',
    description: 'Bekijk onze complete catalogus van professionele torenkranen beschikbaar voor verkoop en verhuur. Ontdek Potain modellen inclusief MDT, MC en MCT series met gedetailleerde specificaties, capaciteiten en gieklengtes. Vind de perfecte torenkraan voor uw bouwproject.',
    openGraph: {
      title: 'Torenkraan Catalogus | Potain Modellen te Koop & Verhuur | NIBM',
      description: 'Ontdek onze selectie van premium Potain torenkranen met gedetailleerde specificaties, capaciteiten en beschikbaarheidsstatus. Professionele torenkraanoplossingen voor uw bouwprojecten.',
      url: 'https://www.nibmvb.eu/nl/towercranes',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Torenkraan Catalogus - Potain Modellen',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Torenkraan Catalogus | Potain Modellen te Koop & Verhuur | NIBM',
      description: 'Ontdek onze selectie van premium Potain torenkranen met gedetailleerde specificaties en beschikbaarheidsstatus.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/nl/towercranes',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function TowerCranes() {
  return <TowerCranesClient />
} 