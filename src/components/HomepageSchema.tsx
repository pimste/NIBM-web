import Script from 'next/script'
import { prisma } from '@/lib/prisma'

interface HomepageSchemaProps {
  language?: string
  siteUrl?: string
}

export async function HomepageSchema({ 
  language = 'en',
  siteUrl = 'https://www.nibmvb.eu'
}: HomepageSchemaProps) {
  // Fetch featured cranes from database
  let featuredCranes: Array<{ slug: string; name: string; image?: string }> = []
  
  try {
    const cranes = await prisma.crane.findMany({
      where: { isAvailable: true },
      select: {
        slug: true,
        name: true,
        images: true
      },
      take: 6,
      orderBy: {
        updatedAt: 'desc'
      }
    })
    
    featuredCranes = cranes.map(crane => ({
      slug: crane.slug,
      name: crane.name,
      image: Array.isArray(crane.images) && crane.images.length > 0 
        ? `${siteUrl}${crane.images[0]}` 
        : undefined
    }))
  } catch (error) {
    console.error('Error fetching cranes for schema:', error)
  }

  const homepageUrl = `${siteUrl}/${language}`
  const craneListingUrl = `${siteUrl}/${language}/towercranes`

  // ItemList schema for featured cranes
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${homepageUrl}#featured-cranes`,
    name: 'Featured Tower Cranes',
    description: 'Our selection of available tower cranes',
    itemListElement: featuredCranes.map((crane, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        '@id': `${siteUrl}/${language}/towercranes/${crane.slug}`,
        name: crane.name,
        url: `${siteUrl}/${language}/towercranes/${crane.slug}`,
        ...(crane.image && { image: crane.image })
      }
    }))
  }

  // CollectionPage schema for crane catalog
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${craneListingUrl}#collection`,
    name: 'Tower Crane Catalog',
    description: 'Browse our complete catalog of available tower cranes for sale and rental',
    url: craneListingUrl,
    mainEntity: {
      '@type': 'ItemList',
      '@id': `${homepageUrl}#featured-cranes`
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: homepageUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Tower Cranes',
          item: craneListingUrl
        }
      ]
    }
  }

  // BreadcrumbList schema for homepage
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${homepageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: homepageUrl
      }
    ]
  }

  // WebPage schema with mainEntity pointing to crane catalog
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${homepageUrl}#webpage`,
    url: homepageUrl,
    name: 'NIBM Tower Cranes - Professional Tower Crane Solutions',
    description: 'NIBM Tower Cranes specializes in professional tower crane sales, rental, installation, and maintenance services',
    mainEntity: {
      '@id': `${craneListingUrl}#collection`
    },
    breadcrumb: {
      '@id': `${homepageUrl}#breadcrumb`
    }
  }

  const schemas = [
    itemListSchema,
    collectionPageSchema,
    breadcrumbSchema,
    webPageSchema
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`homepage-schema-${index}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
