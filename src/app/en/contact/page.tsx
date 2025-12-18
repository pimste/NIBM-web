import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import ContactClient from './ContactClient'

// Base metadata for contact page in en language
const baseMetadata: Metadata = {
  title: 'Contact Us | NIBM Tower Cranes - Expert Tower Crane Solutions',
  description: 'Get in touch with NIBM Tower Cranes for professional tower crane sales, rental, installation, and maintenance services. Contact our Netherlands office at Kruisweg 8, Nuth, or our Israel office. Expert support for your construction projects.',
  openGraph: {
    title: 'Contact NIBM Tower Cranes - Expert Tower Crane Solutions',
    description: 'Contact our tower crane specialists for sales, rental, installation, and maintenance services. Offices in Netherlands and Israel.',
    url: 'https://www.nibmvb.eu/en/contact',
    images: [
      {
        url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
        width: 1200,
        height: 630,
        alt: 'Contact NIBM Tower Cranes - Professional Tower Crane Services',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact NIBM Tower Cranes - Expert Tower Crane Solutions',
    description: 'Get in touch with our tower crane specialists for professional sales, rental, and maintenance services.',
    images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
  },
}

// Generate metadata for this page
export const generateMetadata = async () => {
  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/en/contact',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function Contact() {
  return <ContactClient />
} 