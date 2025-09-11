import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import TestWidgetClient from './TestWidgetClient.tsx'

// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for test widget page
  const baseMetadata: Metadata = {
    title: 'Test Widget | NIBM Tower Cranes',
    description: 'Test page for Keystone widget integration.',
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/en/test-widget',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function TestWidgetPage() {
  return <TestWidgetClient />
}