'use client'

import Script from 'next/script'

export function ServiceSchema() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Tower Crane Services",
    "provider": {
      "@type": "Organization",
      "name": "NIBM Tower Cranes",
      "url": "https://www.nibmvb.eu",
      "telephone": "+31 6 53206004",
      "email": "gid.gehlen@nibmtowercranes.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tower Crane Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tower Crane Rental",
            "description": "Short and long-term rental options for a wide range of tower cranes to meet your project needs.",
            "serviceType": "Equipment Rental"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Tower Crane Sales",
            "description": "We offer a wide range of new and used tower cranes for sale with comprehensive documentation and warranties.",
            "serviceType": "Equipment Sales"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Installation & Dismantling",
            "description": "Professional installation and dismantling services by our expert team, ensuring safety and efficiency.",
            "serviceType": "Installation Service"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Maintenance & Repairs", 
            "description": "Regular maintenance services and emergency repairs to minimize downtime and extend equipment lifespan.",
            "serviceType": "Maintenance Service"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Operator Training",
            "description": "Comprehensive training programs for crane operators, focusing on safety protocols and operational efficiency.",
            "serviceType": "Training Service"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transport & Logistics",
            "description": "We handle all aspects of crane transportation including route planning, permits, and specialized transport equipment.",
            "serviceType": "Transportation Service"
          }
        }
      ]
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
      },
      {
        "@type": "Country",
        "name": "Luxembourg"
      }
    ],
    "slogan": "Elevating Construction To New Heights",
    "award": "Leading tower crane service provider in Europe"
  }

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      strategy="afterInteractive"
    />
  )
} 