import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import ContactClient from './ContactClient'

// Base metadata for contact page in en language
const baseMetadata: Metadata = {
  title: 'NIBM Tower Cranes | Contact',
  description: 'Contact page for NIBM Tower Cranes',
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