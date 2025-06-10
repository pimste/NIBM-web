'use client'

import Script from 'next/script'

interface CraneProductSchemaProps {
  crane: {
    name: string
    description: string
    image: string
    slug: string
    specifications?: {
      manufacturer?: string
      model?: string
      serialNumber?: string
    }
    maxCapacity?: string
    maxHeight?: string
    status?: string
    category?: string
  }
}

export function CraneProductSchema({ crane }: CraneProductSchemaProps) {
  const siteUrl = 'https://www.nibmvb.eu'
  const craneUrl = `${siteUrl}/en/towercranes/${crane.slug}`
  
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${craneUrl}#product`,
    name: crane.name,
    description: crane.description,
    image: `${siteUrl}${crane.image}`,
    url: craneUrl,
    sku: crane.specifications?.serialNumber || crane.specifications?.model,
    brand: {
      '@type': 'Brand',
      name: crane.specifications?.manufacturer || 'Potain'
    },
    manufacturer: {
      '@type': 'Organization',
      name: crane.specifications?.manufacturer || 'Potain'
    },
    model: crane.specifications?.model || crane.name,
    offers: {
      '@type': 'Offer',
      url: craneUrl,
      priceCurrency: 'EUR',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: crane.status === 'Available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: crane.category === 'Sale' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
      seller: {
        '@type': 'Organization',
        name: 'NIBM Tower Cranes',
        url: siteUrl
      }
    }
  }
  
  // Add product properties if provided
  const additionalProperties = []
  
  if (crane.maxCapacity) {
    additionalProperties.push({
      '@type': 'PropertyValue',
      name: 'Maximum Capacity',
      value: crane.maxCapacity
    })
  }
  
  if (crane.maxHeight) {
    additionalProperties.push({
      '@type': 'PropertyValue',
      name: 'Maximum Height',
      value: crane.maxHeight
    })
  }
  
  if (additionalProperties.length > 0) {
    schemaData['additionalProperty'] = additionalProperties
  }

  return (
    <Script id="crane-product-schema" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schemaData)}
    </Script>
  )
} 