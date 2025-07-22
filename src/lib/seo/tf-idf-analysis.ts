export interface TFIDFResult {
  term: string
  tf: number
  idf: number
  tfidf: number
  relevanceScore: number
}

export interface LSIKeyword {
  keyword: string
  similarity: number
  context: string[]
  relatedTerms: string[]
}

export interface ContentAnalysis {
  primaryKeywords: TFIDFResult[]
  lsiKeywords: LSIKeyword[]
  semanticTopics: string[]
  keywordDensity: Record<string, number>
  readabilityScore: number
  contentLength: number
  recommendations: string[]
}

export interface EntityMapping {
  entity: string
  type: 'PERSON' | 'ORGANIZATION' | 'LOCATION' | 'PRODUCT' | 'SERVICE'
  mentions: number
  context: string[]
  relevance: number
}

export class TFIDFAnalysisEngine {
  private stopWords: Set<string>
  private documentCorpus: string[] = []
  private idfCache: Map<string, number> = new Map()
  private entityPatterns: Map<string, RegExp> = new Map()

  constructor() {
    this.initializeStopWords()
    this.initializeEntityPatterns()
  }

  /**
   * Analyze content using TF-IDF methodology
   */
  analyzeContent(content: string, targetKeywords: string[] = []): ContentAnalysis {
    // Clean and tokenize content
    const tokens = this.tokenizeContent(content)
    const cleanedContent = this.removeStopWords(tokens)
    
    // Calculate TF-IDF scores
    const tfidfResults = this.calculateTFIDF(cleanedContent, content)
    
    // Extract LSI keywords
    const lsiKeywords = this.extractLSIKeywords(content, targetKeywords)
    
    // Identify semantic topics
    const semanticTopics = this.identifySemanticTopics(content, tfidfResults)
    
    // Calculate keyword density
    const keywordDensity = this.calculateKeywordDensity(content, targetKeywords)
    
    // Calculate readability score
    const readabilityScore = this.calculateReadabilityScore(content)
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(tfidfResults, lsiKeywords, keywordDensity)

    return {
      primaryKeywords: tfidfResults.slice(0, 10),
      lsiKeywords,
      semanticTopics,
      keywordDensity,
      readabilityScore,
      contentLength: content.length,
      recommendations
    }
  }

  /**
   * Extract and map entities from content
   */
  extractEntities(content: string): EntityMapping[] {
    const entities: EntityMapping[] = []
    
    this.entityPatterns.forEach((pattern, entityType) => {
      const matches = content.match(pattern) || []
      
      matches.forEach(match => {
        const cleanMatch = match.trim()
        const existing = entities.find(e => e.entity.toLowerCase() === cleanMatch.toLowerCase())
        
        if (existing) {
          existing.mentions++
        } else {
          entities.push({
            entity: cleanMatch,
            type: this.getEntityType(cleanMatch),
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
   * Generate LSI keyword suggestions
   */
  generateLSIKeywords(primaryKeyword: string, contentContext?: string): LSIKeyword[] {
    const lsiKeywords: LSIKeyword[] = []
    
    // Tower crane related LSI keywords
    const lsiMapping: Record<string, string[]> = {
      'tower crane': [
        'construction crane', 'mobile crane', 'crane operator', 'crane rental',
        'heavy lifting', 'construction equipment', 'building construction',
        'crane safety', 'crane installation', 'crane maintenance'
      ],
      'construction': [
        'building', 'architecture', 'engineering', 'infrastructure',
        'project management', 'site development', 'commercial building',
        'residential construction', 'structural engineering'
      ],
      'safety': [
        'workplace safety', 'construction safety', 'safety regulations',
        'safety training', 'hazard prevention', 'safety equipment',
        'safety protocols', 'risk management', 'safety compliance'
      ],
      'equipment': [
        'machinery', 'tools', 'hardware', 'apparatus', 'devices',
        'instruments', 'gear', 'technology', 'systems', 'components'
      ]
    }

    const relatedTerms = lsiMapping[primaryKeyword.toLowerCase()] || []
    
    relatedTerms.forEach(term => {
      const similarity = this.calculateSemanticSimilarity(primaryKeyword, term)
      
      lsiKeywords.push({
        keyword: term,
        similarity,
        context: this.generateLSIContext(term),
        relatedTerms: this.findRelatedTerms(term)
      })
    })

    // Add contextual LSI keywords if content is provided
    if (contentContext) {
      const contextualKeywords = this.extractContextualLSI(contentContext, primaryKeyword)
      lsiKeywords.push(...contextualKeywords)
    }

    return lsiKeywords.sort((a, b) => b.similarity - a.similarity).slice(0, 10)
  }

  /**
   * Optimize content with TF-IDF recommendations
   */
  optimizeContentTFIDF(content: string, targetKeywords: string[], targetDensity = 0.02): string {
    const analysis = this.analyzeContent(content, targetKeywords)
    let optimizedContent = content

    // Add underrepresented keywords
    targetKeywords.forEach(keyword => {
      const currentDensity = analysis.keywordDensity[keyword] || 0
      
      if (currentDensity < targetDensity) {
        const additions = Math.ceil((targetDensity - currentDensity) * analysis.contentLength / 100)
        optimizedContent = this.insertKeywordNaturally(optimizedContent, keyword, additions)
      }
    })

    // Add LSI keywords for semantic richness
    analysis.lsiKeywords.slice(0, 5).forEach(lsi => {
      if (!optimizedContent.toLowerCase().includes(lsi.keyword.toLowerCase())) {
        optimizedContent = this.insertLSIKeyword(optimizedContent, lsi.keyword)
      }
    })

    return optimizedContent
  }

  /**
   * Calculate semantic similarity between terms
   */
  private calculateSemanticSimilarity(term1: string, term2: string): number {
    // Simple semantic similarity based on character overlap and common words
    const words1 = term1.toLowerCase().split(' ')
    const words2 = term2.toLowerCase().split(' ')
    
    let commonWords = 0
    words1.forEach(word => {
      if (words2.includes(word)) {
        commonWords++
      }
    })

    const similarity = commonWords / Math.max(words1.length, words2.length)
    
    // Add contextual bonuses for industry-specific relationships
    const industryBonus = this.getIndustrySemanticBonus(term1, term2)
    
    return Math.min(similarity + industryBonus, 1.0)
  }

  /**
   * Calculate TF-IDF scores for terms
   */
  private calculateTFIDF(tokens: string[], originalContent: string): TFIDFResult[] {
    const termFrequencies = this.calculateTermFrequencies(tokens)
    const results: TFIDFResult[] = []

    Object.entries(termFrequencies).forEach(([term, tf]) => {
      const idf = this.calculateIDF(term)
      const tfidf = tf * idf
      const relevanceScore = this.calculateRelevanceScore(term, originalContent)

      results.push({
        term,
        tf,
        idf,
        tfidf,
        relevanceScore
      })
    })

    return results.sort((a, b) => b.tfidf - a.tfidf)
  }

  /**
   * Calculate term frequencies
   */
  private calculateTermFrequencies(tokens: string[]): Record<string, number> {
    const frequencies: Record<string, number> = {}
    const totalTerms = tokens.length

    tokens.forEach(token => {
      frequencies[token] = (frequencies[token] || 0) + 1
    })

    // Normalize frequencies
    Object.keys(frequencies).forEach(term => {
      frequencies[term] = frequencies[term] / totalTerms
    })

    return frequencies
  }

  /**
   * Calculate Inverse Document Frequency
   */
  private calculateIDF(term: string): number {
    if (this.idfCache.has(term)) {
      return this.idfCache.get(term)!
    }

    // If no corpus is available, use estimated values
    if (this.documentCorpus.length === 0) {
      const estimatedIDF = this.estimateIDF(term)
      this.idfCache.set(term, estimatedIDF)
      return estimatedIDF
    }

    let documentsWithTerm = 0
    this.documentCorpus.forEach(doc => {
      if (doc.toLowerCase().includes(term.toLowerCase())) {
        documentsWithTerm++
      }
    })

    const idf = Math.log(this.documentCorpus.length / (documentsWithTerm + 1))
    this.idfCache.set(term, idf)
    return idf
  }

  /**
   * Estimate IDF for terms without corpus
   */
  private estimateIDF(term: string): number {
    // Industry-specific term frequency estimates
    const commonTerms = new Set(['tower', 'crane', 'construction', 'building', 'safety', 'equipment'])
    const rareTerms = new Set(['nibm', 'hydraulic', 'counterweight', 'jib', 'mast'])
    
    if (rareTerms.has(term.toLowerCase())) {
      return 3.0 // High IDF for rare terms
    } else if (commonTerms.has(term.toLowerCase())) {
      return 1.5 // Medium IDF for common terms
    } else {
      return 2.0 // Default IDF
    }
  }

  /**
   * Extract LSI keywords from content
   */
  private extractLSIKeywords(content: string, targetKeywords: string[]): LSIKeyword[] {
    const lsiKeywords: LSIKeyword[] = []
    
    targetKeywords.forEach(keyword => {
      const lsiTerms = this.generateLSIKeywords(keyword, content)
      lsiKeywords.push(...lsiTerms)
    })

    // Remove duplicates and sort by similarity
    const uniqueLSI = lsiKeywords.filter((lsi, index, self) => 
      index === self.findIndex(l => l.keyword === lsi.keyword)
    )

    return uniqueLSI.sort((a, b) => b.similarity - a.similarity)
  }

  /**
   * Identify semantic topics using clustering
   */
  private identifySemanticTopics(content: string, tfidfResults: TFIDFResult[]): string[] {
    const topics: string[] = []
    const topTerms = tfidfResults.slice(0, 20)
    
    // Group related terms into topics
    const topicClusters = this.clusterTerms(topTerms)
    
    topicClusters.forEach(cluster => {
      const topicName = this.generateTopicName(cluster)
      if (topicName) {
        topics.push(topicName)
      }
    })

    return topics
  }

  /**
   * Calculate keyword density for target keywords
   */
  private calculateKeywordDensity(content: string, keywords: string[]): Record<string, number> {
    const density: Record<string, number> = {}
    const wordCount = content.split(/\s+/).length

    keywords.forEach(keyword => {
      const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
      const matches = content.match(regex) || []
      density[keyword] = (matches.length / wordCount) * 100
    })

    return density
  }

  /**
   * Calculate readability score (Flesch Reading Ease)
   */
  private calculateReadabilityScore(content: string): number {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const words = content.split(/\s+/).filter(w => w.length > 0)
    const syllables = words.reduce((count, word) => count + this.countSyllables(word), 0)

    if (sentences.length === 0 || words.length === 0) return 0

    const avgSentenceLength = words.length / sentences.length
    const avgSyllablesPerWord = syllables / words.length

    const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord)
    return Math.max(0, Math.min(100, fleschScore))
  }

  /**
   * Generate optimization recommendations
   */
  private generateRecommendations(
    tfidfResults: TFIDFResult[], 
    lsiKeywords: LSIKeyword[], 
    keywordDensity: Record<string, number>
  ): string[] {
    const recommendations: string[] = []

    // Check keyword density
    Object.entries(keywordDensity).forEach(([keyword, density]) => {
      if (density < 0.5) {
        recommendations.push(`Increase density of "${keyword}" (currently ${density.toFixed(2)}%)`)
      } else if (density > 3.0) {
        recommendations.push(`Reduce density of "${keyword}" to avoid over-optimization (currently ${density.toFixed(2)}%)`)
      }
    })

    // LSI keyword recommendations
    const missingLSI = lsiKeywords.filter(lsi => lsi.similarity > 0.7).slice(0, 3)
    if (missingLSI.length > 0) {
      recommendations.push(`Add LSI keywords: ${missingLSI.map(lsi => lsi.keyword).join(', ')}`)
    }

    // TF-IDF recommendations
    const lowTFIDF = tfidfResults.filter(result => result.tfidf < 0.01)
    if (lowTFIDF.length > 5) {
      recommendations.push(`Consider adding more relevant terms to improve content relevance`)
    }

    return recommendations
  }

  // Helper methods
  private tokenizeContent(content: string): string[] {
    return content
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 2)
  }

  private removeStopWords(tokens: string[]): string[] {
    return tokens.filter(token => !this.stopWords.has(token))
  }

  private initializeStopWords(): void {
    this.stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have',
      'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'this', 'that', 'these', 'those', 'here', 'there', 'where', 'when',
      'how', 'why', 'what', 'who', 'which', 'can', 'may', 'must', 'shall'
    ])
  }

  private initializeEntityPatterns(): void {
    this.entityPatterns.set('ORGANIZATION', /\b[A-Z][a-z]+ [A-Z][a-z]+(?: [A-Z][a-z]+)?\b/g)
    this.entityPatterns.set('PRODUCT', /\b[A-Z][a-z]+(?:-[A-Z][a-z]+)* \d+\b/g)
    this.entityPatterns.set('LOCATION', /\b[A-Z][a-z]+(?:, [A-Z][a-z]+)*\b/g)
  }

  private getEntityType(entity: string): EntityMapping['type'] {
    if (entity.includes('NIBM') || entity.includes('Tower Cranes')) {
      return 'ORGANIZATION'
    } else if (/\d/.test(entity)) {
      return 'PRODUCT'
    } else if (entity.includes(',')) {
      return 'LOCATION'
    } else {
      return 'ORGANIZATION'
    }
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
    return (mentions / contentLength) * 1000 // Normalize to reasonable scale
  }

  private generateLSIContext(term: string): string[] {
    const contexts: Record<string, string[]> = {
      'construction crane': ['building sites', 'heavy lifting', 'project management'],
      'crane safety': ['operator training', 'safety protocols', 'hazard prevention'],
      'crane rental': ['equipment leasing', 'project duration', 'cost efficiency']
    }
    
    return contexts[term] || ['construction', 'tower crane', 'building']
  }

  private findRelatedTerms(term: string): string[] {
    const relations: Record<string, string[]> = {
      'mobile crane': ['truck crane', 'all-terrain crane', 'rough terrain crane'],
      'tower crane': ['self-erecting crane', 'luffing crane', 'hammerhead crane'],
      'crane operator': ['crane certification', 'operator training', 'safety protocols']
    }
    
    return relations[term] || []
  }

  private extractContextualLSI(content: string, primaryKeyword: string): LSIKeyword[] {
    // Extract terms that appear near the primary keyword
    const contextualTerms: LSIKeyword[] = []
    const regex = new RegExp(`(.{50}${primaryKeyword}.{50})`, 'gi')
    const matches = content.match(regex) || []
    
    matches.forEach(match => {
      const terms = this.tokenizeContent(match)
      terms.forEach(term => {
        if (term !== primaryKeyword && term.length > 3) {
          const similarity = this.calculateSemanticSimilarity(primaryKeyword, term)
          if (similarity > 0.3) {
            contextualTerms.push({
              keyword: term,
              similarity,
              context: [match.substring(0, 100)],
              relatedTerms: []
            })
          }
        }
      })
    })
    
    return contextualTerms
  }

  private calculateRelevanceScore(term: string, content: string): number {
    // Calculate relevance based on position, frequency, and context
    const firstOccurrence = content.toLowerCase().indexOf(term.toLowerCase())
    const totalOccurrences = (content.toLowerCase().match(new RegExp(term.toLowerCase(), 'g')) || []).length
    
    const positionScore = firstOccurrence < content.length * 0.1 ? 0.3 : 0.1 // Bonus for early appearance
    const frequencyScore = Math.min(totalOccurrences * 0.1, 0.5) // Frequency bonus
    const lengthScore = term.length > 5 ? 0.2 : 0.1 // Longer terms get bonus
    
    return positionScore + frequencyScore + lengthScore
  }

  private getIndustrySemanticBonus(term1: string, term2: string): number {
    const industryTerms = new Set(['tower', 'crane', 'construction', 'building', 'safety', 'equipment', 'lifting', 'height'])
    const term1Words = term1.toLowerCase().split(' ')
    const term2Words = term2.toLowerCase().split(' ')
    
    let bonus = 0
    term1Words.forEach(word => {
      if (industryTerms.has(word) && term2Words.some(w => industryTerms.has(w))) {
        bonus += 0.1
      }
    })
    
    return Math.min(bonus, 0.3)
  }

  private clusterTerms(terms: TFIDFResult[]): TFIDFResult[][] {
    // Simple clustering based on semantic similarity
    const clusters: TFIDFResult[][] = []
    const used = new Set<string>()
    
    terms.forEach(term => {
      if (used.has(term.term)) return
      
      const cluster = [term]
      used.add(term.term)
      
      terms.forEach(otherTerm => {
        if (!used.has(otherTerm.term)) {
          const similarity = this.calculateSemanticSimilarity(term.term, otherTerm.term)
          if (similarity > 0.4) {
            cluster.push(otherTerm)
            used.add(otherTerm.term)
          }
        }
      })
      
      if (cluster.length > 1) {
        clusters.push(cluster)
      }
    })
    
    return clusters
  }

  private generateTopicName(cluster: TFIDFResult[]): string | null {
    if (cluster.length < 2) return null
    
    const topTerm = cluster[0].term
    const relatedTerms = cluster.slice(1, 3).map(t => t.term)
    
    return `${topTerm} (${relatedTerms.join(', ')})`
  }

  private countSyllables(word: string): number {
    word = word.toLowerCase()
    if (word.length <= 3) return 1
    
    const vowels = word.match(/[aeiouy]+/g)
    let syllableCount = vowels ? vowels.length : 1
    
    if (word.endsWith('e')) syllableCount--
    return Math.max(1, syllableCount)
  }

  private insertKeywordNaturally(content: string, keyword: string, times: number): string {
    let result = content
    const sentences = content.split(/(?<=[.!?])\s+/)
    
    for (let i = 0; i < times && i < sentences.length; i++) {
      const randomIndex = Math.floor(Math.random() * sentences.length)
      const sentence = sentences[randomIndex]
      
      if (!sentence.toLowerCase().includes(keyword.toLowerCase())) {
        sentences[randomIndex] = sentence.replace(/\.$/, `, including ${keyword}.`)
      }
    }
    
    return sentences.join(' ')
  }

  private insertLSIKeyword(content: string, lsiKeyword: string): string {
    const sentences = content.split(/(?<=[.!?])\s+/)
    const randomIndex = Math.floor(Math.random() * sentences.length)
    
    sentences.splice(randomIndex, 0, `${lsiKeyword} is an important consideration in this context.`)
    
    return sentences.join(' ')
  }

  // Public methods for corpus management
  addToCorpus(document: string): void {
    this.documentCorpus.push(document)
    this.idfCache.clear() // Clear cache when corpus changes
  }

  getCorpusSize(): number {
    return this.documentCorpus.length
  }

  clearCorpus(): void {
    this.documentCorpus = []
    this.idfCache.clear()
  }
}

// Global instance
export const tfidfEngine = new TFIDFAnalysisEngine()

// Utility functions
export function analyzeTFIDF(content: string, keywords: string[] = []): ContentAnalysis {
  return tfidfEngine.analyzeContent(content, keywords)
}

export function generateLSI(keyword: string, context?: string): LSIKeyword[] {
  return tfidfEngine.generateLSIKeywords(keyword, context)
}

export function optimizeWithTFIDF(content: string, keywords: string[]): string {
  return tfidfEngine.optimizeContentTFIDF(content, keywords)
}

export function extractContentEntities(content: string): EntityMapping[] {
  return tfidfEngine.extractEntities(content)
} 