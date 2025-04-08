'use client'

import Script from 'next/script'

export function SEOProvider() {
  // Structured data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NIBM Tower Cranes",
    "url": "https://www.nibmvb.eu/",
    "logo": "https://www.nibmvb.eu/images/logo-blue.png",
    "description": "NIBM Tower Cranes specializes in the sale and rental of tower cranes, offering comprehensive services including planning, transport, mounting, inspections, training, and after-sales support.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31-123-456-789",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Construction Avenue",
      "addressLocality": "Building District",
      "postalCode": "1234 AB",
      "addressCountry": "Netherlands"
    }
  };

  return (
    <>
      {/* Structured Data Script */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        strategy="afterInteractive"
      />
    </>
  )
} 