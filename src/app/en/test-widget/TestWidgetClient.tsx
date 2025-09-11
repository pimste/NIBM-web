'use client'

import { useEffect } from 'react'

export default function TestWidgetClient() {
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="widget.js"]')
    if (existingScript) {
      return
    }

    // Create and load the widget script
    const script = document.createElement('script')
    script.src = 'https://www.usekeystone.app/api/widget.js?customer=c48181ab-2928-48e7-954d-ce5cb39685f7&settings=%7B%22theme%22%3A%22light%22%2C%22showPrice%22%3Atrue%2C%22showStatus%22%3Atrue%2C%22maxItems%22%3A10%2C%22defaultCategory%22%3A%22all%22%2C%22hidePoweredBy%22%3Afalse%7D'
    script.async = true
    script.defer = true
    
    // Add error handling
    script.onerror = () => {
      console.error('Failed to load Keystone widget script')
    }
    
    script.onload = () => {
      console.log('Keystone widget script loaded successfully')
    }
    
    // Append to document head
    document.head.appendChild(script)
    
    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

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
    </main>
  )
}
