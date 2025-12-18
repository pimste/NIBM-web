'use client'

import Script from 'next/script'

interface ArticleSchemaProps {
  title: string
  description: string
  date: string
  url: string
  image?: string
  author?: {
    name: string
    url?: string
  }
  publisher?: {
    name: string
    logo?: string
  }
}

export function ArticleSchema({
  title,
  description,
  date,
  url,
  image = 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
  author = {
    name: 'NIBM Tower Cranes',
  },
  publisher = {
    name: 'NIBM Tower Cranes',
    logo: 'https://www.nibmvb.eu/images/optimized/logo-blue.webp',
  },
}: ArticleSchemaProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Organization',
      name: author.name,
      ...(author.url && { url: author.url }),
      // E-E-A-T: Show expertise and authority
      sameAs: [
        'https://www.facebook.com/nibmtowercranes',
        'https://www.linkedin.com/company/nibm-tower-cranes',
        'https://www.instagram.com/nibmtowercranes'
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    // E-E-A-T: Indicate expertise
    about: {
      '@type': 'Thing',
      name: 'Tower Cranes',
      description: 'Professional tower crane sales, rental, and maintenance services'
    },
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      strategy="afterInteractive"
    />
  )
}

