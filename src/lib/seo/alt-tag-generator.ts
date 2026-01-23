import { mapLSIKeywords } from './lsi-keyword-mapper'

export interface AltTagOptions {
  primaryKeyword: string
  context?: string
  imageType?: 'crane' | 'construction' | 'service' | 'general'
  includeBrand?: boolean
  includeLocation?: string
  maxLength?: number
}

export interface AltTagVariation {
  alt: string
  keywords: string[]
  length: number
  score: number
}

/**
 * Automated alt tag generator with keyword variation
 */
export class AltTagGenerator {
  private variationTemplates: Record<string, string[]> = {
    crane: [
      '{keyword} tower crane',
      '{keyword} construction crane',
      '{keyword} lifting equipment',
      '{keyword} building crane',
      'Professional {keyword}',
      '{keyword} crane equipment',
      '{keyword} construction machinery',
      '{keyword} heavy lifting equipment'
    ],
    construction: [
      '{keyword} construction site',
      '{keyword} building project',
      '{keyword} construction equipment',
      '{keyword} construction machinery',
      '{keyword} building site'
    ],
    service: [
      '{keyword} service',
      '{keyword} professional service',
      '{keyword} expert service',
      '{keyword} professional assistance'
    ],
    general: [
      '{keyword}',
      '{keyword} image',
      '{keyword} photo',
      'Image of {keyword}'
    ]
  }

  /**
   * Generate optimized alt tag with keyword variation
   */
  generateAltTag(options: AltTagOptions): string {
    const {
      primaryKeyword,
      context,
      imageType = 'general',
      includeBrand = true,
      includeLocation,
      maxLength = 125
    } = options

    // Get LSI keywords for variation
    const lsiMapping = mapLSIKeywords(primaryKeyword, context)
    
    // Select best variation template
    const templates = this.variationTemplates[imageType] || this.variationTemplates.general
    
    // Generate multiple variations
    const variations: AltTagVariation[] = []
    
    templates.forEach(template => {
      let alt = template.replace('{keyword}', primaryKeyword)
      
      // Add brand if requested
      if (includeBrand && !alt.toLowerCase().includes('nibm')) {
        alt = `${alt} by NIBM Tower Cranes`
      }
      
      // Add location if provided
      if (includeLocation) {
        alt = `${alt} in ${includeLocation}`
      }
      
      // Calculate score based on keyword density and LSI inclusion
      const score = this.calculateAltScore(alt, primaryKeyword, lsiMapping)
      
      variations.push({
        alt: alt.trim(),
        keywords: [primaryKeyword, ...lsiMapping.lsiKeywords.slice(0, 2).map(l => l.keyword)],
        length: alt.length,
        score
      })
    })
    
    // Also generate LSI-based variations
    lsiMapping.lsiKeywords.slice(0, 3).forEach(lsi => {
      if (lsi.similarity > 0.6) {
        const alt = `${lsi.keyword} - ${primaryKeyword}`
        variations.push({
          alt,
          keywords: [primaryKeyword, lsi.keyword],
          length: alt.length,
          score: lsi.similarity * 0.8
        })
      }
    })
    
    // Filter by max length and sort by score
    const validVariations = variations
      .filter(v => v.length <= maxLength)
      .sort((a, b) => b.score - a.score)
    
    // Return best variation or fallback
    return validVariations.length > 0 
      ? validVariations[0].alt 
      : this.generateFallbackAlt(primaryKeyword, imageType)
  }

  /**
   * Generate multiple alt tag variations for rotation
   */
  generateAltTagVariations(
    options: AltTagOptions,
    count: number = 5
  ): string[] {
    const variations: string[] = []
    const used = new Set<string>()
    
    // Generate variations with different LSI keywords
    const lsiMapping = mapLSIKeywords(options.primaryKeyword, options.context)
    
    // Base variations
    const templates = this.variationTemplates[options.imageType || 'general']
    templates.forEach(template => {
      if (variations.length >= count) return
      
      let alt = template.replace('{keyword}', options.primaryKeyword)
      if (options.includeBrand && !alt.toLowerCase().includes('nibm')) {
        alt = `${alt} by NIBM`
      }
      
      if (!used.has(alt.toLowerCase())) {
        variations.push(alt)
        used.add(alt.toLowerCase())
      }
    })
    
    // LSI variations
    lsiMapping.lsiKeywords.slice(0, count).forEach(lsi => {
      if (variations.length >= count) return
      
      const alt = `${lsi.keyword} - ${options.primaryKeyword}`
      if (!used.has(alt.toLowerCase())) {
        variations.push(alt)
        used.add(alt.toLowerCase())
      }
    })
    
    return variations.slice(0, count)
  }

  /**
   * Generate alt tag for crane images
   */
  generateCraneAltTag(
    craneName: string,
    craneModel: string,
    context?: string
  ): string {
    const variations = [
      `${craneName} tower crane - ${craneModel}`,
      `${craneModel} construction crane - ${craneName}`,
      `Potain ${craneModel} tower crane`,
      `${craneName} - Professional tower crane equipment`,
      `${craneModel} crane for construction projects`
    ]
    
    // Use LSI to enhance
    const lsiMapping = mapLSIKeywords(craneName, context)
    if (lsiMapping.lsiKeywords.length > 0) {
      const lsi = lsiMapping.lsiKeywords[0]
      variations.push(`${craneName} - ${lsi.keyword}`)
    }
    
    // Return best variation (first one that's descriptive)
    return variations[0]
  }

  /**
   * Generate alt tag for service images
   */
  generateServiceAltTag(serviceName: string, context?: string): string {
    return this.generateAltTag({
      primaryKeyword: serviceName,
      context,
      imageType: 'service',
      includeBrand: true
    })
  }

  /**
   * Generate alt tag for construction site images
   */
  generateConstructionAltTag(
    description: string,
    location?: string
  ): string {
    const keywords = this.extractKeywords(description)
    const primaryKeyword = keywords[0] || 'construction'
    
    return this.generateAltTag({
      primaryKeyword,
      context: description,
      imageType: 'construction',
      includeLocation: location,
      includeBrand: false
    })
  }

  // Private helper methods
  private calculateAltScore(
    alt: string,
    primaryKeyword: string,
    lsiMapping: any
  ): number {
    let score = 0
    
    // Primary keyword presence
    if (alt.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      score += 10
    }
    
    // LSI keyword presence
    lsiMapping.lsiKeywords.slice(0, 3).forEach((lsi: any) => {
      if (alt.toLowerCase().includes(lsi.keyword.toLowerCase())) {
        score += lsi.similarity * 5
      }
    })
    
    // Length score (prefer 80-125 characters)
    if (alt.length >= 80 && alt.length <= 125) {
      score += 5
    } else if (alt.length < 80) {
      score += 2
    }
    
    // Descriptive score (more words = better)
    const wordCount = alt.split(/\s+/).length
    if (wordCount >= 4 && wordCount <= 8) {
      score += 3
    }
    
    return score
  }

  private generateFallbackAlt(keyword: string, imageType: string): string {
    const templates: Record<string, string> = {
      crane: `${keyword} tower crane`,
      construction: `${keyword} construction site`,
      service: `${keyword} service`,
      general: keyword
    }
    
    return templates[imageType] || keyword
  }

  private extractKeywords(text: string): string[] {
    // Simple keyword extraction
    const words = text.toLowerCase().split(/\s+/)
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'])
    
    return words
      .filter(word => word.length > 4 && !stopWords.has(word))
      .slice(0, 3)
  }
}

// Global instance
export const altTagGenerator = new AltTagGenerator()

// Utility functions
export function generateAltTag(options: AltTagOptions): string {
  return altTagGenerator.generateAltTag(options)
}

export function generateCraneAltTag(
  craneName: string,
  craneModel: string,
  context?: string
): string {
  return altTagGenerator.generateCraneAltTag(craneName, craneModel, context)
}

export function generateAltTagVariations(
  options: AltTagOptions,
  count?: number
): string[] {
  return altTagGenerator.generateAltTagVariations(options, count)
}
