'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

interface ContactPageSchemaProps {
  siteUrl?: string
  companyName?: string
  streetAddress?: string
  addressLocality?: string
  postalCode?: string
  addressCountry?: string
  telephone?: string
  email?: string
}

export function ContactPageSchema({
  siteUrl = 'https://www.nibmvb.eu',
  companyName = 'NIBM Tower Cranes',
  streetAddress = 'Kruisweg 8',
  addressLocality = 'Nuth',
  postalCode = '6361 TG',
  addressCountry = 'Netherlands',
  telephone = '+31653206004',
  email = 'gid.gehlen@nibmtowercranes.com'
}: ContactPageSchemaProps) {
  const pathname = usePathname() || ''
  
  // Only render on contact page
  if (!pathname.includes('/contact')) {
    return null
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${siteUrl}${pathname}#contactpage`,
    url: `${siteUrl}${pathname}`,
    name: 'Contact NIBM Tower Cranes',
            description: 'Contact us for tower crane sales and services',
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#business`,
      name: companyName
    },
    // Add schema for ContactPoint
    mainEntity: {
      '@type': 'ContactPoint',
      '@id': `${siteUrl}${pathname}#contactpoint`,
      telephone: telephone,
      email: email,
      contactType: 'customer service',
      areaServed: ['Netherlands', 'Germany', 'Belgium', 'Europe'],
      availableLanguage: ['English', 'Dutch', 'German'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: streetAddress,
        addressLocality: addressLocality,
        postalCode: postalCode,
        addressCountry: addressCountry
      },
      hoursAvailable: [
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
      ]
    }
  }
  
  return (
    <Script id="contact-schema" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schemaData)}
    </Script>
  )
} 