import { Metadata } from 'next'
import ContactClient from './ContactClient'

import { generatePageMetadata } from '../../page-metadata'

const baseMetadata: Metadata = {
  title: 'Kontakt | NIBM Tower Cranes - Experte für Turmkrane',
  description: 'Kontaktieren Sie NIBM Tower Cranes für professionelle Turmkran-Verkauf, Vermietung, Installation und Wartungsdienste. Kontaktieren Sie unser Büro in den Niederlanden unter Kruisweg 8, Nuth, oder unser Büro in Israel. Fachkundige Unterstützung für Ihre Bauprojekte.',
  openGraph: {
    title: 'Kontakt NIBM Tower Cranes - Experte für Turmkrane',
    description: 'Kontaktieren Sie unsere Turmkran-Spezialisten für Verkauf, Vermietung, Installation und Wartungsdienste. Büros in den Niederlanden und Israel.',
    url: 'https://www.nibmvb.eu/de/contact',
    images: [
      {
        url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
        width: 1200,
        height: 630,
        alt: 'Kontakt NIBM Tower Cranes - Professionelle Turmkran-Dienste',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt NIBM Tower Cranes - Experte für Turmkrane',
    description: 'Kontaktieren Sie unsere Turmkran-Spezialisten für professionelle Verkaufs-, Vermietungs- und Wartungsdienste.',
    images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
  },
}

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMetadata(
    baseMetadata,
    '/de/contact',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function Contact() {
  return <ContactClient />
} 