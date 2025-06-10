'use client';

import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useLanguage } from '@/context/LanguageContext';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogImageAlt?: string;
  structuredData?: object;
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogImageAlt,
  structuredData,
}) => {
  const { language } = useLanguage();

  // Business structured data
  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.nibmtowercranes.com/#business",
    "name": "NIBM Tower Cranes",
    "image": [
      "https://www.nibmtowercranes.com/images/optimized/logo-blue.webp",
      "https://www.nibmtowercranes.com/images/optimized/sunset-TC-2.webp",
      "https://www.nibmtowercranes.com/images/optimized/cropped-Top-page2-potain6.webp"
    ],
    "description": {
      "en": "Professional tower crane rental, sales, and service. Specializing in Potain, Liebherr, and other top-brand tower cranes for construction projects in the Netherlands and Europe.",
      "nl": "Professionele torenkraan verhuur, verkoop en service. Gespecialiseerd in Potain, Liebherr en andere topmerken torenkranen voor bouwprojecten in Nederland en Europa.",
      "de": "Professionelle Turmkran-Vermietung, Verkauf und Service. Spezialisiert auf Potain, Liebherr und andere Top-Marken Turmkräne für Bauprojekte in den Niederlanden und Europa."
    }[language],
    "url": "https://www.nibmtowercranes.com",
    "telephone": process.env.NEXT_PUBLIC_COMPANY_PHONE || "+31-6-12345678",
    "email": process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@nibmtowercranes.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "Your Business Address",
      "addressLocality": process.env.NEXT_PUBLIC_COMPANY_CITY || "Your City",
      "postalCode": process.env.NEXT_PUBLIC_COMPANY_POSTAL_CODE || "1234 AB",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.1326",
      "longitude": "5.2913"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.nibmvb.eu",
      "https://www.linkedin.com/company/nibm-tower-cranes"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "Netherlands"
      },
      {
        "@type": "Country", 
        "name": "Belgium"
      },
      {
        "@type": "Country",
        "name": "Germany"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tower Crane Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tower Crane Rental",
            "description": "Professional tower crane rental services for construction projects"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tower Crane Sales",
            "description": "New and used tower crane sales from top manufacturers"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tower Crane Service & Maintenance",
            "description": "Professional service and maintenance for all tower crane brands"
          }
        }
      ]
    }
  };

  // Organization structured data
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.nibmtowercranes.com/#organization",
    "name": "NIBM Tower Cranes",
    "url": "https://www.nibmtowercranes.com",
    "logo": "https://www.nibmtowercranes.com/images/optimized/logo-blue.webp",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": process.env.NEXT_PUBLIC_COMPANY_PHONE || "+31-6-12345678",
      "contactType": "customer service",
      "email": process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@nibmtowercranes.com",
      "availableLanguage": ["Dutch", "English", "German"]
    },
    "founder": {
      "@type": "Person",
      "name": "NIBM Founder"
    },
    "foundingDate": "2000",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "10-50"
    }
  };

  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.nibmtowercranes.com/#website",
    "url": "https://www.nibmtowercranes.com",
    "name": "NIBM Tower Cranes",
    "description": "Professional tower crane rental, sales, and service",
    "publisher": {
      "@id": "https://www.nibmtowercranes.com/#organization"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.nibmtowercranes.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "inLanguage": [
      {
        "@type": "Language",
        "name": "Dutch",
        "alternateName": "nl"
      },
      {
        "@type": "Language", 
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language",
        "name": "German", 
        "alternateName": "de"
      }
    ]
  };

  // Service structured data
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Tower Crane Services",
    "description": "Comprehensive tower crane rental, sales, and maintenance services",
    "provider": {
      "@id": "https://www.nibmtowercranes.com/#organization"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Netherlands"
      },
      {
        "@type": "Country",
        "name": "Belgium"
      },
      {
        "@type": "Country",
        "name": "Germany"
      }
    ],
    "serviceType": "Construction Equipment Rental",
    "category": "Tower Crane Services"
  };

  return (
    <>
      {/* Business JSON-LD */}
      <Script
        id="business-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessStructuredData)
        }}
      />

      {/* Organization JSON-LD */}
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData)
        }}
      />

      {/* Website JSON-LD */}
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData)
        }}
      />

      {/* Service JSON-LD */}
      <Script
        id="service-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData)
        }}
      />

      {/* Custom structured data if provided */}
      {structuredData && (
        <Script
          id="custom-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </>
  );
};

export default SEOOptimizer; 