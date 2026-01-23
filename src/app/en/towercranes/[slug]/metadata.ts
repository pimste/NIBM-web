import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { generatePageMetadata } from '@/app/page-metadata'
import { optimizeContentForSEO } from '@/lib/seo/content-optimizer'
import { getConversionKeywords, generateConversionMetaDescription } from '@/lib/seo/conversion-keywords'

export async function generateTowerCraneMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // Fetch crane from database
    const crane = await prisma.crane.findUnique({
      where: { slug: params.slug },
      select: {
        name: true,
        model: true,
        year: true,
        description: true,
        maxCapacity: true,
        maxJibLength: true,
        maxHeight: true,
        condition: true,
        category: true,
        isAvailable: true
      }
    })

    if (!crane) {
      return {
        title: 'Tower Crane - NIBM',
        description: 'Professional tower crane services and equipment',
      }
    }

    // Build content string for TF-IDF analysis
    const contentParts = [
      crane.description || '',
      `Model: ${crane.model}`,
      `Year: ${crane.year || 'N/A'}`,
      `Maximum capacity: ${crane.maxCapacity}`,
      `Maximum jib length: ${crane.maxJibLength}`,
      `Maximum height: ${crane.maxHeight}`,
      `Condition: ${crane.condition || 'Excellent'}`,
      `Category: ${crane.category || 'Sale'}`,
      'Professional tower crane services by NIBM Tower Cranes. Expert solutions for construction projects.'
    ]
    const content = contentParts.filter(Boolean).join('. ')

    // Define conversion-focused keywords (inquiry intent)
    const conversionKeywords = getConversionKeywords(
      crane.name,
      crane.category as 'sale' | 'rental'
    )
    
    // Combine with base keywords
    const targetKeywords = [
      ...conversionKeywords, // Conversion keywords first (higher priority)
      crane.name,
      crane.model,
      'Potain tower crane',
      'NIBM tower cranes'
    ].filter(Boolean) as string[]

    // Optimize content with TF-IDF
    const optimization = optimizeContentForSEO(content, targetKeywords, {
      minKeywordDensity: 0.5,
      maxKeywordDensity: 3.0,
      includeLSI: true,
      optimizeMeta: true
    })

    // Generate conversion-focused meta description with CTA
    const conversionDescription = generateConversionMetaDescription(
      crane.name,
      crane.category as 'sale' | 'rental',
      optimization.suggestedMetaDescription || crane.description || '',
      true // Include CTA
    )
    
    // Build base metadata with conversion focus
    const baseMetadata: Metadata = {
      title: `${crane.name} - ${crane.category === 'rental' ? 'Tower Crane Rental' : 'Tower Crane For Sale'} | NIBM`,
      description: conversionDescription,
      keywords: [
        ...conversionKeywords.slice(0, 5), // Prioritize conversion keywords
        crane.name,
        crane.model,
        'Potain tower crane',
        'NIBM tower cranes',
        ...optimization.optimizedKeywords.slice(0, 3)
      ],
      openGraph: {
        title: `${crane.name} - NIBM Tower Cranes`,
        description: optimization.suggestedMetaDescription || crane.description || '',
        type: 'website',
        siteName: 'NIBM - Tower Crane Services',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${crane.name} - NIBM`,
        description: optimization.suggestedMetaDescription || crane.description || '',
      },
    }

    // Generate page metadata with canonical URLs and hreflang
    return generatePageMetadata(
      baseMetadata,
      `/en/towercranes/${params.slug}`,
      'https://www.nibmvb.eu',
      ['en', 'nl', 'de'],
      content,
      targetKeywords
    )
  } catch (error) {
    console.error('Error generating crane metadata:', error)
    // Fallback metadata
    return {
      title: 'Tower Crane - NIBM',
      description: 'Professional tower crane services and equipment',
    }
  }
} 