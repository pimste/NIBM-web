'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ServiceSchema } from '@/components/ServiceSchema'

export function SEOProvider() {
  const pathname = usePathname()
  const [url, setUrl] = useState('')

  // Set the full URL on the client side
  useEffect(() => {
    setUrl(`https://www.nibmvb.eu${pathname}`)
  }, [pathname])

  // Structured data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NIBM Tower Cranes",
    "url": "https://www.nibmvb.eu/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.nibmvb.eu/images/optimized/logo-blue.webp",
      "width": 160,
      "height": 50
    },
          "description": "NIBM Tower Cranes specializes in the sale of tower cranes, offering comprehensive services including planning, transport, mounting, inspections, and after-sales support.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31 6 53206004",
      "contactType": "customer service",
      "email": "gid.gehlen@nibmtowercranes.com"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kruisweg 8",
      "addressLocality": "Nuth",
      "postalCode": "6361 TG",
      "addressCountry": "Netherlands"
    },
    "sameAs": [
      "https://www.facebook.com/nibmtowercranes",
      "https://www.linkedin.com/company/nibm-tower-cranes",
      "https://www.instagram.com/nibmtowercranes"
    ]
  };

  // Structured data for Website
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.nibmvb.eu/",
    "name": "NIBM Tower Cranes",
    "description": "Professional tower crane sales, rental, and services across Europe",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.nibmvb.eu/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Structured data for BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": generateBreadcrumbs(pathname)
  };

  // Structured data for Local Business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "NIBM Tower Cranes",
    "image": "https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp",
    "priceRange": "€€€",
    "telephone": "+31 6 53206004",
    "email": "gid.gehlen@nibmtowercranes.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kruisweg 8",
      "addressLocality": "Nuth",
      "postalCode": "6361 TG",
      "addressCountry": "Netherlands"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.8951,
      "longitude": 5.8952
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ]
  };

  return (
    <>
      {/* Organization Structured Data */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        strategy="afterInteractive"
      />

      {/* Website Structured Data */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy="afterInteractive"
      />

      {/* Breadcrumb Structured Data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />

      {/* Local Business Structured Data */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        strategy="afterInteractive"
      />

      {/* Service Schema */}
      <ServiceSchema />
    </>
  )
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbs(pathname) {
  if (!pathname) return [];

  const paths = pathname.split('/').filter(Boolean);
  let accumPath = '';

  // Always start with home
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.nibmvb.eu/"
    }
  ];

  // Create a readable name from each path segment
  paths.forEach((path, index) => {
    accumPath += '/' + path;
    
    // Format the path segment into a readable name
    let name = path.replace(/-/g, ' ');
    // Capitalize first letter of each word
    name = name.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      "@type": "ListItem",
      "position": index + 2, // +2 because we start at 1 and already have the home item
      "name": name,
      "item": `https://www.nibmvb.eu${accumPath}`
    });
  });

  return breadcrumbs;
} 