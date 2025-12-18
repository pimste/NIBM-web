'use client'

import Script from 'next/script'

interface ReviewSchemaProps {
  averageRating?: number
  reviewCount?: number
  bestRating?: number
  worstRating?: number
  reviews?: Array<{
    author: string
    datePublished: string
    reviewBody: string
    reviewRating: {
      ratingValue: number
      bestRating?: number
      worstRating?: number
    }
  }>
}

export function ReviewSchema({
  averageRating = 4.8,
  reviewCount = 0,
  bestRating = 5,
  worstRating = 1,
  reviews = []
}: ReviewSchemaProps) {
  // Only show if we have reviews or review count
  if (reviewCount === 0 && reviews.length === 0) {
    return null
  }

  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: averageRating,
    reviewCount: reviewCount || reviews.length,
    bestRating: bestRating,
    worstRating: worstRating
  }

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.nibmvb.eu/#business',
    name: 'NIBM Tower Cranes',
    aggregateRating: aggregateRating,
    ...(reviews.length > 0 && {
      review: reviews.map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author
        },
        datePublished: review.datePublished,
        reviewBody: review.reviewBody,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.reviewRating.ratingValue,
          bestRating: review.reviewRating.bestRating || bestRating,
          worstRating: review.reviewRating.worstRating || worstRating
        }
      }))
    })
  }

  return (
    <Script
      id="review-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      strategy="afterInteractive"
    />
  )
}

