import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import ContactClient from './ContactClient'

// Base metadata for contact page in nl language
const baseMetadata: Metadata = {
  title: 'Contact | NIBM Tower Cranes - Specialist in Torenkranen',
  description: 'Neem contact op met NIBM Tower Cranes voor professionele torenkraan verkoop, verhuur, installatie en onderhoudsdiensten. Contacteer ons kantoor in Nederland op Kruisweg 8, Nuth, of ons kantoor in Israël. Deskundige ondersteuning voor uw bouwprojecten.',
  openGraph: {
    title: 'Contact NIBM Tower Cranes - Specialist in Torenkranen',
    description: 'Contacteer onze torenkraan specialisten voor verkoop, verhuur, installatie en onderhoudsdiensten. Kantoren in Nederland en Israël.',
    url: 'https://www.nibmvb.eu/nl/contact',
    images: [
      {
        url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
        width: 1200,
        height: 630,
        alt: 'Contact NIBM Tower Cranes - Professionele Torenkraan Diensten',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact NIBM Tower Cranes - Specialist in Torenkranen',
    description: 'Neem contact op met onze torenkraan specialisten voor professionele verkoop, verhuur en onderhoudsdiensten.',
    images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
  },
}

// Generate metadata for this page
export const generateMetadata = async () => {
  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/nl/contact',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function Contact() {
  return <ContactClient />
} 