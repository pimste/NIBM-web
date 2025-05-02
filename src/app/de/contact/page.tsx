import { Metadata } from 'next'
import ContactClient from './ContactClient'

const baseMetadata = {
  title: 'NIBM Tower Cranes | Kontakt',
  description: 'Kontaktseite für NIBM Tower Cranes',
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    ...baseMetadata,
    alternates: {
      canonical: `https://nibmvb.eu/de/contact`,
      languages: {
        'en': 'https://nibmvb.eu/en/contact',
        'nl': 'https://nibmvb.eu/nl/contact',
        'de': 'https://nibmvb.eu/de/contact',
      },
    },
  }
}

export default function Contact() {
  return <ContactClient />
} 