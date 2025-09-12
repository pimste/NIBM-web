'use client'

import { useEffect } from 'react'

export default function TestWidgetClient() {
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="widget.js"]')
    if (existingScript) {
      return
    }

    // Find the container where we want to place the widget
    const container = document.getElementById('keystone-widget-container')
    if (!container) {
      console.error('Widget container not found')
      return
    }

    // Create and load the widget script
    const script = document.createElement('script')
    script.src = 'https://www.usekeystone.app/api/widget.js?customer=a19bed71-7e3f-4def-b6a0-384a55eb38f3&settings=%7B%22theme%22%3A%22light%22%2C%22showPrice%22%3Atrue%2C%22showStatus%22%3Atrue%2C%22maxItems%22%3A10%2C%22defaultCategory%22%3A%22all%22%2C%22hidePoweredBy%22%3Afalse%7D'
    script.async = true
    script.defer = true
    
    // Add error handling
    script.onerror = () => {
      console.error('Failed to load Keystone widget script')
    }
    
    script.onload = () => {
      console.log('Keystone widget script loaded successfully')
    }
    
    // Append the script directly to the container
    // The widget script will insert itself as a sibling to the script tag
    container.appendChild(script)
    
    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      // Also remove any widget that might have been created
      const widget = document.getElementById('keystone-widget')
      if (widget && widget.parentNode) {
        widget.parentNode.removeChild(widget)
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
            {/* Widget script will be inserted here and widget will appear as sibling */}
          </div>
        </div>
      </div>
    </main>
  )
}
