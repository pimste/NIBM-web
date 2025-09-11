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

export default function TestWidgetPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <html>
        <head>
            <title>Widget Test</title>
        </head>
        <body>
            <h1>My Website</h1>
            <p>This is where your widget will appear:</p>
            
            <script src="https://www.usekeystone.app/api/widget.js?customer=c48181ab-2928-48e7-954d-ce5cb39685f7&settings=%7B%22theme%22%3A%22light%22%2C%22showPrice%22%3Atrue%2C%22showStatus%22%3Atrue%2C%22maxItems%22%3A10%2C%22defaultCategory%22%3A%22all%22%2C%22colors%22%3A%7B%22primaryColor%22%3A%22%232563eb%22%2C%22secondaryColor%22%3A%22%231f2937%22%2C%22textColor%22%3A%22%231f2937%22%2C%22backgroundColor%22%3A%22%23ffffff%22%7D%2C%22hidePoweredBy%22%3Afalse%7D"></script>
            
            <p>Your equipment catalog should appear above this text.</p>
        </body>
        </html>
      </div>
    </main>
  )
}
