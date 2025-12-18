'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

interface SchemaMarkupProps {
  companyName?: string
  companyLogo?: string
  streetAddress?: string
  addressLocality?: string
  postalCode?: string
  addressCountry?: string
  telephone?: string
  email?: string
  siteUrl?: string
}

export function SchemaMarkup({
  companyName = 'NIBM Tower Cranes',
  companyLogo = 'https://www.nibmvb.eu/images/optimized/logo-blue.webp',
  streetAddress = 'Kruisweg 8',
  addressLocality = 'Nuth',
  postalCode = '6361 TG',
  addressCountry = 'Netherlands',
  telephone = '+31 6 53206004',
  email = 'gid.gehlen@nibmtowercranes.com',
  siteUrl = 'https://www.nibmvb.eu'
}: SchemaMarkupProps) {
  const pathname = usePathname() || ''
  
  // Extract current page path for breadcrumbs
  const pathSegments = pathname.split('/').filter(Boolean)
  
  // If path has language prefix, remove it for breadcrumbs
  let segments = [...pathSegments]
  if (['en', 'nl', 'de'].includes(segments[0])) {
    segments = segments.slice(1)
  }
  
  // Determine language from pathname
  const supportedLanguages = ['en', 'nl', 'de']
  const isFirstSegmentLanguage = segments.length > 0 && supportedLanguages.includes(segments[0])
  const language = isFirstSegmentLanguage ? segments[0] : 'en'
  const contentSegments = isFirstSegmentLanguage ? segments.slice(1) : segments
  
  // Don't generate breadcrumbs if only language segment (homepage)
  if (isFirstSegmentLanguage && contentSegments.length === 0) {
    // No breadcrumbs needed
  } else if (contentSegments.length > 0) {
    // Generate breadcrumb items
    const breadcrumbItems = []
    
    // Add Home as the first breadcrumb (with language prefix)
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}/${language}`
    })
    
    // Build path with language prefix
    let accumPath = `/${language}`
    
    // Generate breadcrumb items for content segments
    contentSegments.forEach((segment, index) => {
      accumPath += '/' + segment
      
      // Format the segment for display (replace hyphens with spaces and capitalize)
      const name = segment
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
      
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: index + 2, // +2 because we have Home at position 1
        name,
        item: `${siteUrl}${accumPath}`
      })
    })
    
    // Add breadcrumbs to schema
    schemaData['@graph'].push({
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}${pathname}#breadcrumb`,
      itemListElement: breadcrumbItems
    })
  }
  
  // Create the schema.org JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // LocalBusiness schema
      {
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#business`,
        name: companyName,
        image: companyLogo,
        email: email,
        telephone: telephone,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: companyLogo
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: streetAddress,
          addressLocality: addressLocality,
          postalCode: postalCode,
          addressCountry: addressCountry
        },
        openingHours: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday'
            ],
            opens: '08:00',
            closes: '17:00'
          }
        ],
        sameAs: [
          'https://facebook.com/nibmtowercranes',
          'https://linkedin.com/company/nibmtowercranes',
          'https://instagram.com/nibmtowercranes'
        ]
      },
      
      // Website schema
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: companyName,
        description: 'Specialists in the sale of tower cranes',
        publisher: {
          '@id': `${siteUrl}/#business`
        },
        inLanguage: ['en', 'nl', 'de']
      }
    ]
  }
  
  
  return (
    <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schemaData)}
    </Script>
  )
} 