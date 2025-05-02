'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

interface TowerCraneSchemaProps {
  siteUrl?: string
  companyName?: string
  name: string
  description: string
  image: string
  manufacturer?: string
  model?: string
  sku?: string
  maxCapacity?: string
  maxHeight?: string
  availability?: string
  condition?: string
  url?: string
}

export function TowerCraneSchema({
  siteUrl = 'https://www.nibmvb.eu',
  companyName = 'NIBM Tower Cranes',
  name,
  description,
  image,
  manufacturer = 'Potain',
  model,
  sku,
  maxCapacity,
  maxHeight,
  availability = 'InStock',
  condition = 'NewCondition',
  url
}: TowerCraneSchemaProps) {
  const pathname = usePathname() || ''
  
  // Only render on tower crane detail pages
  if (!pathname.includes('/towercranes/')) {
    return null
  }
  
  // Use provided URL or generate from pathname
  const craneUrl = url || `${siteUrl}${pathname}`

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${craneUrl}#product`,
    name: name,
    description: description,
    image: image,
    url: craneUrl,
    sku: sku || model,
    brand: {
      '@type': 'Brand',
      name: manufacturer
    },
    manufacturer: {
      '@type': 'Organization',
      name: manufacturer
    },
    model: model,
    offers: {
      '@type': 'Offer',
      url: craneUrl,
      priceCurrency: 'EUR',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: `https://schema.org/${availability}`,
      itemCondition: `https://schema.org/${condition}`,
      seller: {
        '@type': 'Organization',
        name: companyName,
        url: siteUrl
      }
    }
  }
  
  // Add product properties if provided
  const additionalProperties = []
  
  if (maxCapacity) {
    additionalProperties.push({
      '@type': 'PropertyValue',
      name: 'Maximum Capacity',
      value: maxCapacity
    })
  }
  
  if (maxHeight) {
    additionalProperties.push({
      '@type': 'PropertyValue',
      name: 'Maximum Height',
      value: maxHeight
    })
  }
  
  if (additionalProperties.length > 0) {
    schemaData['additionalProperty'] = additionalProperties
  }
  
  return (
    <Script id="tower-crane-schema" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schemaData)}
    </Script>
  )
} 