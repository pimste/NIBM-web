import { analyzeTFIDF, generateLSI, ContentAnalysis, LSIKeyword } from './tf-idf-analysis'
import { mapLSIKeywords } from './lsi-keyword-mapper'
import { Metadata } from 'next'

export interface ContentOptimizationResult {
  analysis: ContentAnalysis
  optimizedKeywords: string[]
  lsiKeywords: LSIKeyword[]
  recommendations: string[]
  suggestedMetaDescription?: string
  suggestedTitle?: string
}

export interface ContentOptimizationOptions {
  targetKeywords: string[]
  minKeywordDensity?: number
  maxKeywordDensity?: number
  includeLSI?: boolean
  optimizeMeta?: boolean
}

/**
 * Content optimizer that uses TF-IDF analysis to optimize content for SEO
 */
export class ContentOptimizer {
  /**
   * Analyze and optimize content using TF-IDF
   */
  optimizeContent(
    content: string,
    options: ContentOptimizationOptions
  ): ContentOptimizationResult {
    const {
      targetKeywords,
      minKeywordDensity = 0.5,
      maxKeywordDensity = 3.0,
      includeLSI = true,
      optimizeMeta = true
    } = options

    // Analyze content with TF-IDF
    const analysis = analyzeTFIDF(content, targetKeywords)

    // Extract LSI keywords if requested
    const lsiKeywords: LSIKeyword[] = []
    if (includeLSI) {
      targetKeywords.forEach(keyword => {
        // Use enhanced LSI mapper for better industry-specific keywords
        const lsiMapping = mapLSIKeywords(keyword, content)
        lsiKeywords.push(...lsiMapping.lsiKeywords)
        
        // Also get TF-IDF generated LSI for additional context
        const tfidfLSI = generateLSI(keyword, content)
        tfidfLSI.forEach(lsi => {
          if (!lsiKeywords.find(existing => existing.keyword === lsi.keyword)) {
            lsiKeywords.push(lsi)
          }
        })
      })
    }

    // Generate optimized keyword list (primary + LSI)
    const optimizedKeywords = [
      ...targetKeywords,
      ...lsiKeywords
        .filter(lsi => lsi.similarity > 0.6)
        .slice(0, 5)
        .map(lsi => lsi.keyword)
    ]

    // Generate recommendations
    const recommendations: string[] = []
    
    // Keyword density recommendations
    Object.entries(analysis.keywordDensity).forEach(([keyword, density]) => {
      if (density < minKeywordDensity) {
        recommendations.push(
          `Increase "${keyword}" density from ${density.toFixed(2)}% to at least ${minKeywordDensity}%`
        )
      } else if (density > maxKeywordDensity) {
        recommendations.push(
          `Reduce "${keyword}" density from ${density.toFixed(2)}% to avoid over-optimization`
        )
      }
    })

    // Add LSI keyword recommendations
    if (includeLSI && lsiKeywords.length > 0) {
      const missingLSI = lsiKeywords
        .filter(lsi => lsi.similarity > 0.7)
        .slice(0, 3)
        .map(lsi => lsi.keyword)
      
      if (missingLSI.length > 0) {
        recommendations.push(
          `Consider adding LSI keywords: ${missingLSI.join(', ')}`
        )
      }
    }

    // Content length recommendations
    if (analysis.contentLength < 1000) {
      recommendations.push(
        `Content is ${analysis.contentLength} characters. Consider expanding to 1500+ words for better SEO`
      )
    }

    // Readability recommendations
    if (analysis.readabilityScore < 50) {
      recommendations.push(
        `Readability score is ${analysis.readabilityScore.toFixed(1)}. Consider simplifying sentence structure`
      )
    }

    // Generate optimized meta description if requested
    let suggestedMetaDescription: string | undefined
    let suggestedTitle: string | undefined

    if (optimizeMeta) {
      suggestedMetaDescription = this.generateOptimizedMetaDescription(
        content,
        targetKeywords,
        lsiKeywords
      )
      suggestedTitle = this.generateOptimizedTitle(
        targetKeywords[0] || '',
        content
      )
    }

    return {
      analysis,
      optimizedKeywords,
      lsiKeywords: lsiKeywords.slice(0, 10),
      recommendations,
      suggestedMetaDescription,
      suggestedTitle
    }
  }

  /**
   * Generate optimized meta description with conversion focus
   */
  private generateOptimizedMetaDescription(
    content: string,
    keywords: string[],
    lsiKeywords: LSIKeyword[]
  ): string {
    // Extract first 2-3 sentences from content
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20)
    const firstSentences = sentences.slice(0, 2).join('. ')

    // Check for conversion keywords (buy, rent, quote, contact)
    const hasConversionIntent = keywords.some(kw => 
      ['buy', 'rent', 'rental', 'sale', 'quote', 'contact', 'inquiry'].some(intent => 
        kw.toLowerCase().includes(intent)
      )
    )

    // Ensure primary keyword is included
    let description = firstSentences
    if (keywords.length > 0 && !description.toLowerCase().includes(keywords[0].toLowerCase())) {
      description = `${keywords[0]}: ${description}`
    }

    // Add conversion CTA if conversion keywords present
    if (hasConversionIntent && description.length < 120) {
      if (keywords.some(kw => kw.toLowerCase().includes('rent'))) {
        description = `${description} Get a free rental quote today.`
      } else if (keywords.some(kw => kw.toLowerCase().includes('sale') || kw.toLowerCase().includes('buy'))) {
        description = `${description} Contact us for pricing and availability.`
      } else {
        description = `${description} Contact us for more information.`
      }
    }

    // Add LSI keyword if space allows
    if (description.length < 140 && lsiKeywords.length > 0) {
      const lsi = lsiKeywords[0].keyword
      if (!description.toLowerCase().includes(lsi.toLowerCase())) {
        description = `${description}. ${lsi}.`
      }
    }

    // Trim to 155 characters (optimal length)
    if (description.length > 155) {
      description = description.substring(0, 152) + '...'
    }

    return description
  }

  /**
   * Generate optimized title
   */
  private generateOptimizedTitle(primaryKeyword: string, content: string): string {
    // Extract title from content or use keyword
    const title = primaryKeyword
      ? `${primaryKeyword} | NIBM Tower Cranes`
      : 'NIBM Tower Cranes'

    // Ensure title is 50-60 characters
    if (title.length > 60) {
      return title.substring(0, 57) + '...'
    }

    return title
  }

  /**
   * Enhance metadata with TF-IDF insights
   */
  enhanceMetadata(
    baseMetadata: Metadata,
    content: string,
    targetKeywords: string[]
  ): Metadata {
    const optimization = this.optimizeContent(content, {
      targetKeywords,
      optimizeMeta: true
    })

    // Enhance description if not provided or if optimization suggests better one
    const enhancedDescription = optimization.suggestedMetaDescription || baseMetadata.description

    // Enhance keywords
    const existingKeywords = Array.isArray(baseMetadata.keywords)
      ? baseMetadata.keywords
      : baseMetadata.keywords
        ? [baseMetadata.keywords]
        : []

    const enhancedKeywords = [
      ...existingKeywords,
      ...optimization.optimizedKeywords.slice(0, 5)
    ]

    return {
      ...baseMetadata,
      description: enhancedDescription,
      keywords: enhancedKeywords,
      // Add openGraph description if not set
      openGraph: {
        ...baseMetadata.openGraph,
        description: baseMetadata.openGraph?.description || enhancedDescription
      },
      // Add twitter description if not set
      twitter: {
        ...baseMetadata.twitter,
        description: baseMetadata.twitter?.description || enhancedDescription
      }
    }
  }
}

// Global instance
export const contentOptimizer = new ContentOptimizer()

// Utility functions
export function optimizeContentForSEO(
  content: string,
  targetKeywords: string[],
  options?: Partial<ContentOptimizationOptions>
): ContentOptimizationResult {
  return contentOptimizer.optimizeContent(content, {
    targetKeywords,
    ...options
  })
}

export function enhanceMetadataWithSEO(
  baseMetadata: Metadata,
  content: string,
  targetKeywords: string[]
): Metadata {
  return contentOptimizer.enhanceMetadata(baseMetadata, content, targetKeywords)
}
