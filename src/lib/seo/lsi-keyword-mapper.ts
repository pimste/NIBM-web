import { generateLSI, LSIKeyword } from './tf-idf-analysis'

export interface LSIMapping {
  primaryKeyword: string
  lsiKeywords: LSIKeyword[]
  entityType: 'PRODUCT' | 'SERVICE' | 'LOCATION' | 'BRAND' | 'GENERAL'
  industryContext: string[]
  relatedTerms: string[]
  semanticCluster: string
}

export interface EntityMapping {
  entity: string
  type: 'PERSON' | 'ORGANIZATION' | 'LOCATION' | 'PRODUCT' | 'SERVICE'
  mentions: number
  context: string[]
  relevance: number
}

/**
 * LSI Keyword Mapper for tower crane industry
 * Maps primary keywords to semantically related terms using Latent Semantic Indexing
 */
export class LSIKeywordMapper {
  private industryLSIMap: Record<string, string[]> = {
    // Tower crane types
    'tower crane': [
      'construction crane',
      'building crane',
      'mobile crane',
      'self-erecting crane',
      'luffing crane',
      'hammerhead crane',
      'top-slewing crane',
      'flat-top crane',
      'crane equipment',
      'lifting equipment',
      'construction machinery'
    ],
    'potain crane': [
      'potain tower crane',
      'potain construction crane',
      'potain lifting equipment',
      'potain crane rental',
      'potain crane for sale',
      'potain crane models',
      'potain MDT series',
      'potain MC series',
      'potain MCT series'
    ],
    'crane rental': [
      'tower crane rental',
      'construction crane rental',
      'crane leasing',
      'equipment rental',
      'crane hire',
      'temporary crane rental',
      'project crane rental',
      'short-term crane rental'
    ],
    'crane for sale': [
      'tower crane sale',
      'used tower crane',
      'new tower crane',
      'crane purchase',
      'buy tower crane',
      'crane dealer',
      'crane sales',
      'construction equipment sale'
    ],
    // Construction terms
    'construction': [
      'building',
      'construction project',
      'construction site',
      'building construction',
      'commercial construction',
      'residential construction',
      'infrastructure',
      'construction industry'
    ],
    // Safety terms
    'crane safety': [
      'construction safety',
      'crane operator safety',
      'workplace safety',
      'safety regulations',
      'crane safety training',
      'safety protocols',
      'hazard prevention',
      'safety equipment'
    ],
    // Service terms
    'crane maintenance': [
      'crane service',
      'crane repair',
      'crane inspection',
      'preventive maintenance',
      'crane upkeep',
      'equipment maintenance',
      'crane servicing'
    ],
    'crane installation': [
      'crane assembly',
      'crane setup',
      'crane mounting',
      'crane erection',
      'crane installation service',
      'professional installation',
      'crane positioning'
    ],
    // Location-based
    'tower crane Netherlands': [
      'tower crane rental Netherlands',
      'crane rental Amsterdam',
      'crane rental Rotterdam',
      'crane services Netherlands',
      'Dutch crane rental',
      'Netherlands construction crane'
    ],
    'tower crane Germany': [
      'tower crane rental Germany',
      'crane rental Berlin',
      'crane services Germany',
      'German crane rental',
      'Germany construction crane'
    ],
    'tower crane Belgium': [
      'tower crane rental Belgium',
      'crane rental Brussels',
      'crane services Belgium',
      'Belgian crane rental',
      'Belgium construction crane'
    ]
  }

  private entityPatterns: Map<string, RegExp> = new Map()

  constructor() {
    this.initializeEntityPatterns()
  }

  /**
   * Map primary keyword to LSI keywords
   */
  mapLSIKeywords(
    primaryKeyword: string,
    contentContext?: string
  ): LSIMapping {
    // Get base LSI keywords from industry map
    const baseLSI = this.industryLSIMap[primaryKeyword.toLowerCase()] || []
    
    // Generate LSI keywords using TF-IDF engine
    const generatedLSI = generateLSI(primaryKeyword, contentContext)
    
    // Combine and deduplicate
    const allLSI: LSIKeyword[] = []
    const seen = new Set<string>()
    
    // Add base LSI keywords
    baseLSI.forEach(keyword => {
      if (!seen.has(keyword.toLowerCase())) {
        seen.add(keyword.toLowerCase())
        allLSI.push({
          keyword,
          similarity: 0.8, // High similarity for industry-specific terms
          context: this.generateContext(keyword),
          relatedTerms: this.findRelatedTerms(keyword)
        })
      }
    })
    
    // Add generated LSI keywords
    generatedLSI.forEach(lsi => {
      if (!seen.has(lsi.keyword.toLowerCase())) {
        seen.add(lsi.keyword.toLowerCase())
        allLSI.push(lsi)
      }
    })

    // Sort by similarity
    allLSI.sort((a, b) => b.similarity - a.similarity)

    // Determine entity type
    const entityType = this.determineEntityType(primaryKeyword)

    // Get industry context
    const industryContext = this.getIndustryContext(primaryKeyword)

    // Get semantic cluster
    const semanticCluster = this.getSemanticCluster(primaryKeyword)

    return {
      primaryKeyword,
      lsiKeywords: allLSI.slice(0, 15), // Top 15 LSI keywords
      entityType,
      industryContext,
      relatedTerms: this.findRelatedTerms(primaryKeyword),
      semanticCluster
    }
  }

  /**
   * Extract entities from content
   */
  extractEntities(content: string): EntityMapping[] {
    const entities: EntityMapping[] = []
    
    this.entityPatterns.forEach((pattern, entityType) => {
      const matches = content.match(pattern) || []
      
      matches.forEach(match => {
        const cleanMatch = match.trim()
        const existing = entities.find(
          e => e.entity.toLowerCase() === cleanMatch.toLowerCase()
        )
        
        if (existing) {
          existing.mentions++
        } else {
          entities.push({
            entity: cleanMatch,
            type: this.getEntityType(cleanMatch, entityType),
            mentions: 1,
            context: this.extractEntityContext(content, cleanMatch),
            relevance: this.calculateEntityRelevance(cleanMatch, content)
          })
        }
      })
    })

    return entities.sort((a, b) => b.relevance - a.relevance)
  }

  /**
   * Get LSI keywords for multiple primary keywords
   */
  mapMultipleKeywords(
    primaryKeywords: string[],
    contentContext?: string
  ): Map<string, LSIMapping> {
    const mappings = new Map<string, LSIMapping>()
    
    primaryKeywords.forEach(keyword => {
      mappings.set(keyword, this.mapLSIKeywords(keyword, contentContext))
    })
    
    return mappings
  }

  /**
   * Integrate LSI keywords into content
   */
  integrateLSIKeywords(
    content: string,
    primaryKeyword: string,
    maxIntegrations: number = 3
  ): string {
    const mapping = this.mapLSIKeywords(primaryKeyword, content)
    let integratedContent = content
    
    // Select top LSI keywords that aren't already in content
    const keywordsToAdd = mapping.lsiKeywords
      .filter(lsi => !content.toLowerCase().includes(lsi.keyword.toLowerCase()))
      .slice(0, maxIntegrations)
    
    // Add LSI keywords naturally into content
    keywordsToAdd.forEach((lsi, index) => {
      const sentences = integratedContent.split(/[.!?]+/)
      if (sentences.length > index + 1) {
        const insertIndex = Math.floor(sentences.length / (maxIntegrations + 1)) * (index + 1)
        const sentence = sentences[insertIndex]?.trim()
        if (sentence && !sentence.toLowerCase().includes(lsi.keyword.toLowerCase())) {
          sentences[insertIndex] = `${sentence}, including ${lsi.keyword}.`
          integratedContent = sentences.join('. ')
        }
      }
    })
    
    return integratedContent
  }

  /**
   * Generate LSI keywords for meta description
   */
  generateLSIForMeta(
    primaryKeyword: string,
    baseDescription: string
  ): string {
    const mapping = this.mapLSIKeywords(primaryKeyword, baseDescription)
    
    // Find LSI keyword that fits naturally
    const suitableLSI = mapping.lsiKeywords.find(
      lsi => 
        lsi.similarity > 0.6 &&
        !baseDescription.toLowerCase().includes(lsi.keyword.toLowerCase()) &&
        lsi.keyword.length < 30
    )
    
    if (suitableLSI && baseDescription.length < 120) {
      return `${baseDescription} ${suitableLSI.keyword}.`
    }
    
    return baseDescription
  }

  // Private helper methods
  private initializeEntityPatterns(): void {
    this.entityPatterns.set('ORGANIZATION', /\b[A-Z][a-z]+ [A-Z][a-z]+(?: [A-Z][a-z]+)?\b/g)
    this.entityPatterns.set('PRODUCT', /\b[A-Z][a-z]+(?:-[A-Z][a-z]+)* \d+\b/g)
    this.entityPatterns.set('LOCATION', /\b[A-Z][a-z]+(?:, [A-Z][a-z]+)*\b/g)
    this.entityPatterns.set('BRAND', /\b(Potain|Liebherr|NIBM|Terex|Manitowoc)\b/gi)
  }

  private determineEntityType(keyword: string): LSIMapping['entityType'] {
    const lower = keyword.toLowerCase()
    
    if (lower.includes('potain') || lower.includes('liebherr') || lower.includes('terex')) {
      return 'BRAND'
    }
    if (lower.includes('rental') || lower.includes('service') || lower.includes('maintenance')) {
      return 'SERVICE'
    }
    if (lower.includes('crane') && (lower.includes('sale') || lower.includes('buy'))) {
      return 'PRODUCT'
    }
    if (lower.includes('netherlands') || lower.includes('germany') || lower.includes('belgium')) {
      return 'LOCATION'
    }
    
    return 'GENERAL'
  }

  private getIndustryContext(keyword: string): string[] {
    const lower = keyword.toLowerCase()
    const contexts: string[] = []
    
    if (lower.includes('crane')) {
      contexts.push('construction equipment', 'heavy machinery', 'lifting equipment')
    }
    if (lower.includes('rental')) {
      contexts.push('equipment leasing', 'project management', 'construction services')
    }
    if (lower.includes('sale')) {
      contexts.push('equipment sales', 'construction machinery', 'industrial equipment')
    }
    if (lower.includes('safety')) {
      contexts.push('workplace safety', 'construction safety', 'safety compliance')
    }
    
    return contexts.length > 0 ? contexts : ['construction', 'building', 'equipment']
  }

  private getSemanticCluster(keyword: string): string {
    const lower = keyword.toLowerCase()
    
    if (lower.includes('potain')) return 'potain-cranes'
    if (lower.includes('rental')) return 'crane-rental'
    if (lower.includes('sale')) return 'crane-sales'
    if (lower.includes('safety')) return 'safety-compliance'
    if (lower.includes('maintenance')) return 'crane-services'
    if (lower.includes('netherlands') || lower.includes('germany') || lower.includes('belgium')) {
      return 'local-services'
    }
    
    return 'general-construction'
  }

  private generateContext(keyword: string): string[] {
    const contexts: Record<string, string[]> = {
      'construction crane': ['building sites', 'heavy lifting', 'project management'],
      'crane safety': ['operator training', 'safety protocols', 'hazard prevention'],
      'crane rental': ['equipment leasing', 'project duration', 'cost efficiency'],
      'crane maintenance': ['preventive care', 'equipment servicing', 'inspection schedules']
    }
    
    return contexts[keyword.toLowerCase()] || ['construction', 'tower crane', 'building']
  }

  private findRelatedTerms(keyword: string): string[] {
    const relations: Record<string, string[]> = {
      'mobile crane': ['truck crane', 'all-terrain crane', 'rough terrain crane'],
      'tower crane': ['self-erecting crane', 'luffing crane', 'hammerhead crane'],
      'crane operator': ['crane certification', 'operator training', 'safety protocols'],
      'potain crane': ['potain MDT', 'potain MC', 'potain MCT', 'potain tower crane']
    }
    
    const lower = keyword.toLowerCase()
    for (const [key, terms] of Object.entries(relations)) {
      if (lower.includes(key)) {
        return terms
      }
    }
    
    return []
  }

  private getEntityType(entity: string, patternType: string): EntityMapping['type'] {
    if (entity.includes('NIBM') || entity.includes('Tower Cranes')) {
      return 'ORGANIZATION'
    }
    if (/\d/.test(entity) && (entity.includes('MDT') || entity.includes('MC') || entity.includes('MCT'))) {
      return 'PRODUCT'
    }
    if (entity.includes(',') || ['Netherlands', 'Germany', 'Belgium'].some(c => entity.includes(c))) {
      return 'LOCATION'
    }
    if (['Potain', 'Liebherr', 'Terex'].some(b => entity.includes(b))) {
      return 'PRODUCT'
    }
    
    return patternType === 'ORGANIZATION' ? 'ORGANIZATION' : 'SERVICE'
  }

  private extractEntityContext(content: string, entity: string): string[] {
    const sentences = content.split(/[.!?]+/)
    return sentences
      .filter(sentence => sentence.includes(entity))
      .map(sentence => sentence.trim())
      .slice(0, 3)
  }

  private calculateEntityRelevance(entity: string, content: string): number {
    const mentions = (content.match(new RegExp(entity, 'gi')) || []).length
    const contentLength = content.length
    return (mentions / contentLength) * 1000
  }
}

// Global instance
export const lsiKeywordMapper = new LSIKeywordMapper()

// Utility functions
export function mapLSIKeywords(
  primaryKeyword: string,
  contentContext?: string
): LSIMapping {
  return lsiKeywordMapper.mapLSIKeywords(primaryKeyword, contentContext)
}

export function integrateLSIKeywords(
  content: string,
  primaryKeyword: string,
  maxIntegrations?: number
): string {
  return lsiKeywordMapper.integrateLSIKeywords(content, primaryKeyword, maxIntegrations)
}

export function generateLSIForMeta(
  primaryKeyword: string,
  baseDescription: string
): string {
  return lsiKeywordMapper.generateLSIForMeta(primaryKeyword, baseDescription)
}
