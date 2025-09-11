import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'

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

import Script from 'next/script'

export default function TestWidgetPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test Widget Page</h1>
        <p className="text-gray-600 mb-8">
          This page is for testing the Keystone widget integration.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Keystone Widget</h2>
          <div id="keystone-widget-container">
            {/* Widget content will be inserted here by the script */}
          </div>
        </div>
      </div>
      
      <Script
        src="https://www.usekeystone.app/api/widget.js?customer=c48181ab-2928-48e7-954d-ce5cb39685f7&settings=%7B%22theme%22%3A%22light%22%2C%22showPrice%22%3Atrue%2C%22showStatus%22%3Atrue%2C%22maxItems%22%3A10%2C%22defaultCategory%22%3A%22all%22%2C%22hidePoweredBy%22%3Afalse%7D"
        strategy="afterInteractive"
        onLoad={() => console.log('Keystone widget script loaded')}
        onError={() => console.error('Failed to load Keystone widget script')}
      />
    </main>
  )
}
