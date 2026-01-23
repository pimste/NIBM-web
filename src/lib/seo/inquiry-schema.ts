/**
 * Schema markup optimized for crane inquiries and conversions
 */

export interface InquirySchemaOptions {
  craneName: string
  craneModel: string
  category: 'sale' | 'rental'
  price?: string
  availability: 'InStock' | 'OutOfStock' | 'PreOrder'
  url: string
  image?: string
  description: string
  phone?: string
  email?: string
}

/**
 * Generate Offer schema for crane sales (conversion-focused)
 */
export function generateOfferSchema(options: InquirySchemaOptions) {
  if (options.category !== 'sale') return null

  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    "itemOffered": {
      "@type": "Product",
      "name": options.craneName,
      "description": options.description,
      "image": options.image,
      "brand": {
        "@type": "Brand",
        "name": "Potain"
      },
      "model": options.craneModel
    },
    "priceCurrency": "EUR",
    "price": options.price || "Contact for pricing",
    "availability": `https://schema.org/${options.availability}`,
    "url": options.url,
    "seller": {
      "@type": "Organization",
      "name": "NIBM Tower Cranes",
      "url": "https://www.nibmvb.eu"
    },
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "priceCurrency": "EUR",
      "price": options.price || "Contact for pricing",
      "valueAddedTaxIncluded": true
    },
    "eligibleRegion": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 50.8951,
        "longitude": 5.8952
      },
      "geoRadius": {
        "@type": "Distance",
        "name": "Europe"
      }
    }
  }
}

/**
 * Generate Service schema for crane rentals (conversion-focused)
 */
export function generateServiceSchema(options: InquirySchemaOptions) {
  if (options.category !== 'rental') return null

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${options.craneName} Rental`,
    "description": options.description,
    "provider": {
      "@type": "Organization",
      "name": "NIBM Tower Cranes",
      "url": "https://www.nibmvb.eu",
      "telephone": options.phone || "+31 6 53206004",
      "email": options.email || "gid.gehlen@nibmtowercranes.com"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Netherlands"
      },
      {
        "@type": "Country",
        "name": "Germany"
      },
      {
        "@type": "Country",
        "name": "Belgium"
      }
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": options.price || "Contact for quote",
      "availability": `https://schema.org/${options.availability}`,
      "url": options.url,
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "priceCurrency": "EUR",
        "price": options.price || "Contact for quote"
      }
    },
    "serviceType": "Tower Crane Rental",
    "category": "Construction Equipment Rental"
  }
}

/**
 * Generate ContactPoint schema for easy inquiry
 */
export function generateContactPointSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    "telephone": "+31 6 53206004",
    "contactType": "Sales",
    "email": "gid.gehlen@nibmtowercranes.com",
    "availableLanguage": ["English", "Dutch", "German"],
    "areaServed": ["NL", "DE", "BE"],
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  }
}

/**
 * Generate complete inquiry-optimized schema
 */
export function generateInquirySchema(options: InquirySchemaOptions) {
  const schemas: any[] = []

  // Add Offer or Service schema based on category
  if (options.category === 'sale') {
    const offerSchema = generateOfferSchema(options)
    if (offerSchema) schemas.push(offerSchema)
  } else {
    const serviceSchema = generateServiceSchema(options)
    if (serviceSchema) schemas.push(serviceSchema)
  }

  // Add ContactPoint for easy inquiry
  schemas.push(generateContactPointSchema())

  return schemas
}
