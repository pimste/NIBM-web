export interface InternalLink {
  url: string
  title: string
  description: string
  keywords: string[]
  category: string
  language: string
  lastUpdated: Date
  authority: number
  relevanceScore?: number
}

export interface LinkSuggestion {
  anchorText: string
  targetUrl: string
  relevanceScore: number
  context: string
  position: number
  reason: string
}

export interface RelevanceMatrix {
  sourceKeywords: string[]
  targetKeywords: string[]
  similarity: number
  contextualRelevance: number
  categoryRelevance: number
  overallScore: number
}

export interface LinkingStrategy {
  maxLinksPerPage: number
  minRelevanceThreshold: number
  avoidOverlinking: boolean
  distributeAuthority: boolean
  prioritizeRecent: boolean
  respectNofollow: boolean
}

export class ContextualLinkingEngine {
  private pages: Map<string, InternalLink> = new Map()
  private relevanceCache: Map<string, RelevanceMatrix> = new Map()
  private linkingStrategy: LinkingStrategy
  private stopWords: Set<string>

  constructor(strategy?: Partial<LinkingStrategy>) {
    this.linkingStrategy = {
      maxLinksPerPage: 5,
      minRelevanceThreshold: 0.3,
      avoidOverlinking: true,
      distributeAuthority: true,
      prioritizeRecent: true,
      respectNofollow: false,
      ...strategy
    }
    
    this.initializeStopWords()
    this.loadExistingPages()
  }

  /**
   * Add a page to the internal linking system
   */
  addPage(page: InternalLink): void {
    // Calculate page authority based on content quality indicators
    page.authority = this.calculatePageAuthority(page)
    
    this.pages.set(page.url, page)
    
    // Clear relevance cache to recalculate with new page
    this.relevanceCache.clear()
    
    console.log(`Added page to linking system: ${page.title} (authority: ${page.authority})`)
  }

  /**
   * Generate contextual link suggestions for content
   */
  generateLinkSuggestions(
    content: string, 
    currentPageUrl: string, 
    currentPageKeywords: string[] = []
  ): LinkSuggestion[] {
    const suggestions: LinkSuggestion[] = []
    
    // Analyze content for linkable phrases
    const linkablePhrases = this.extractLinkablePhrases(content, currentPageKeywords)
    
    // Find relevant pages for each phrase
    linkablePhrases.forEach(phrase => {
      const relevantPages = this.findRelevantPages(
        phrase.keywords, 
        currentPageUrl, 
        phrase.category
      )
      
      relevantPages.forEach(page => {
        const relevanceScore = this.calculateRelevanceScore(
          phrase.keywords,
          page.keywords,
          phrase.category,
          page.category
        )
        
        if (relevanceScore >= this.linkingStrategy.minRelevanceThreshold) {
          suggestions.push({
            anchorText: phrase.text,
            targetUrl: page.url,
            relevanceScore,
            context: phrase.context,
            position: phrase.position,
            reason: this.generateLinkReason(phrase, page, relevanceScore)
          })
        }
      })
    })

    // Sort and filter suggestions
    return this.optimizeLinkSuggestions(suggestions, content)
  }

  /**
   * Inject contextual links into content
   */
  injectContextualLinks(
    content: string,
    currentPageUrl: string,
    keywords: string[] = []
  ): string {
    const suggestions = this.generateLinkSuggestions(content, currentPageUrl, keywords)
    let modifiedContent = content
    
    // Apply links in reverse order to maintain position accuracy
    suggestions
      .sort((a, b) => b.position - a.position)
      .slice(0, this.linkingStrategy.maxLinksPerPage)
      .forEach(suggestion => {
        modifiedContent = this.insertLink(
          modifiedContent,
          suggestion.anchorText,
          suggestion.targetUrl,
          suggestion.position
        )
      })

    return modifiedContent
  }

  /**
   * Build relevance matrix between pages
   */
  buildRelevanceMatrix(sourceUrl: string, targetUrl: string): RelevanceMatrix {
    const cacheKey = `${sourceUrl}:${targetUrl}`
    
    if (this.relevanceCache.has(cacheKey)) {
      return this.relevanceCache.get(cacheKey)!
    }

    const sourcePage = this.pages.get(sourceUrl)
    const targetPage = this.pages.get(targetUrl)
    
    if (!sourcePage || !targetPage) {
      throw new Error('Pages not found in linking system')
    }

    const matrix: RelevanceMatrix = {
      sourceKeywords: sourcePage.keywords,
      targetKeywords: targetPage.keywords,
      similarity: this.calculateKeywordSimilarity(sourcePage.keywords, targetPage.keywords),
      contextualRelevance: this.calculateContextualRelevance(sourcePage, targetPage),
      categoryRelevance: this.calculateCategoryRelevance(sourcePage.category, targetPage.category),
      overallScore: 0
    }

    // Calculate weighted overall score
    matrix.overallScore = (
      matrix.similarity * 0.4 +
      matrix.contextualRelevance * 0.4 +
      matrix.categoryRelevance * 0.2
    )

    this.relevanceCache.set(cacheKey, matrix)
    return matrix
  }

  /**
   * Detect and resolve over-linking issues
   */
  detectOverlinking(content: string): {
    hasOverlinking: boolean
    linkDensity: number
    recommendations: string[]
  } {
    const wordCount = content.split(/\s+/).length
    const linkMatches = content.match(/<a\s+[^>]*href[^>]*>/gi) || []
    const linkCount = linkMatches.length
    
    const linkDensity = (linkCount / wordCount) * 100
    const hasOverlinking = linkDensity > 2.5 // More than 2.5% link density
    
    const recommendations: string[] = []
    
    if (hasOverlinking) {
      recommendations.push(`Reduce link density from ${linkDensity.toFixed(2)}% to under 2.5%`)
      recommendations.push(`Remove ${Math.ceil(linkCount - (wordCount * 0.025))} links`)
    }
    
    if (linkCount > this.linkingStrategy.maxLinksPerPage) {
      recommendations.push(`Limit links to ${this.linkingStrategy.maxLinksPerPage} per page`)
    }

    return {
      hasOverlinking,
      linkDensity,
      recommendations
    }
  }

  /**
   * Generate link audit report
   */
  generateLinkAudit(): {
    totalPages: number
    avgLinksPerPage: number
    topLinkingPages: InternalLink[]
    orphanedPages: InternalLink[]
    overlinkingIssues: string[]
    recommendations: string[]
  } {
    const totalPages = this.pages.size
    const allPages = Array.from(this.pages.values())
    
    // Calculate average links per page (mock calculation)
    const avgLinksPerPage = 3.2 // This would be calculated from actual link data
    
    // Find top linking pages (high authority)
    const topLinkingPages = allPages
      .sort((a, b) => b.authority - a.authority)
      .slice(0, 10)
    
    // Find orphaned pages (pages with no incoming links)
    const orphanedPages = allPages.filter(page => this.isOrphanedPage(page))
    
    // Detect overlinking issues
    const overlinkingIssues: string[] = []
    allPages.forEach(page => {
      if (page.authority < 0.3) {
        overlinkingIssues.push(`Low authority page may have too many outbound links: ${page.title}`)
      }
    })

    const recommendations = this.generateAuditRecommendations({
      totalPages,
      avgLinksPerPage,
      orphanedPages: orphanedPages.length,
      overlinkingIssues: overlinkingIssues.length
    })

    return {
      totalPages,
      avgLinksPerPage,
      topLinkingPages,
      orphanedPages,
      overlinkingIssues,
      recommendations
    }
  }

  // Private helper methods
  private extractLinkablePhrases(content: string, keywords: string[]): Array<{
    text: string
    keywords: string[]
    category: string
    context: string
    position: number
  }> {
    const phrases: Array<{
      text: string
      keywords: string[]
      category: string
      context: string
      position: number
    }> = []

    // Extract noun phrases and keyword combinations
    const sentences = content.split(/[.!?]+/)
    
    sentences.forEach((sentence, sentenceIndex) => {
      // Find keyword mentions and related phrases
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b([^.!?]*${keyword}[^.!?]*)\\b`, 'gi')
        const matches = sentence.match(regex) || []
        
        matches.forEach(match => {
          const cleanMatch = match.trim()
          if (cleanMatch.length > keyword.length + 10) {
            const position = content.indexOf(cleanMatch)
            
            phrases.push({
              text: this.extractBestAnchorText(cleanMatch, keyword),
              keywords: [keyword, ...this.extractRelatedKeywords(cleanMatch)],
              category: this.categorizePhrase(cleanMatch),
              context: sentence.trim(),
              position
            })
          }
        })
      })
    })

    // Remove duplicates and sort by relevance
    return this.deduplicatePhrases(phrases)
  }

  private findRelevantPages(
    keywords: string[], 
    excludeUrl: string, 
    category?: string
  ): InternalLink[] {
    const relevantPages: InternalLink[] = []
    
    this.pages.forEach(page => {
      if (page.url === excludeUrl) return
      
      const relevanceScore = this.calculateRelevanceScore(
        keywords,
        page.keywords,
        category || 'general',
        page.category
      )
      
      if (relevanceScore >= this.linkingStrategy.minRelevanceThreshold) {
        page.relevanceScore = relevanceScore
        relevantPages.push(page)
      }
    })

    return relevantPages.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
  }

  private calculateRelevanceScore(
    sourceKeywords: string[],
    targetKeywords: string[],
    sourceCategory: string,
    targetCategory: string
  ): number {
    const keywordSimilarity = this.calculateKeywordSimilarity(sourceKeywords, targetKeywords)
    const categoryBonus = sourceCategory === targetCategory ? 0.2 : 0
    const diversityBonus = this.calculateKeywordDiversity(sourceKeywords, targetKeywords)
    
    return Math.min(keywordSimilarity + categoryBonus + diversityBonus, 1.0)
  }

  private calculateKeywordSimilarity(keywords1: string[], keywords2: string[]): number {
    if (keywords1.length === 0 || keywords2.length === 0) return 0
    
    const commonKeywords = keywords1.filter(kw => 
      keywords2.some(kw2 => kw2.toLowerCase().includes(kw.toLowerCase()))
    )
    
    return commonKeywords.length / Math.max(keywords1.length, keywords2.length)
  }

  private calculateContextualRelevance(page1: InternalLink, page2: InternalLink): number {
    // Calculate relevance based on description similarity
    const desc1Words = page1.description.toLowerCase().split(/\s+/)
    const desc2Words = page2.description.toLowerCase().split(/\s+/)
    
    const commonWords = desc1Words.filter(word => 
      desc2Words.includes(word) && !this.stopWords.has(word)
    )
    
    return commonWords.length / Math.max(desc1Words.length, desc2Words.length)
  }

  private calculateCategoryRelevance(category1: string, category2: string): number {
    if (category1 === category2) return 1.0
    
    // Define category relationships
    const categoryRelations: Record<string, string[]> = {
      'tower-cranes': ['construction', 'equipment', 'safety'],
      'construction': ['tower-cranes', 'building', 'engineering'],
      'safety': ['tower-cranes', 'training', 'regulations'],
      'services': ['tower-cranes', 'rental', 'maintenance']
    }
    
    const related = categoryRelations[category1] || []
    return related.includes(category2) ? 0.7 : 0.2
  }

  private calculatePageAuthority(page: InternalLink): number {
    let authority = 0.5 // Base authority
    
    // Boost for keyword richness
    if (page.keywords.length > 5) authority += 0.2
    
    // Boost for recent content
    const daysSinceUpdate = (Date.now() - page.lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
    if (daysSinceUpdate < 30) authority += 0.1
    
    // Boost for comprehensive description
    if (page.description.length > 200) authority += 0.1
    
    // Category-specific boosts
    if (['tower-cranes', 'services'].includes(page.category)) authority += 0.1
    
    return Math.min(authority, 1.0)
  }

  private optimizeLinkSuggestions(suggestions: LinkSuggestion[], content: string): LinkSuggestion[] {
    // Remove duplicates targeting the same URL
    const uniqueSuggestions = suggestions.filter((suggestion, index, self) =>
      index === self.findIndex(s => s.targetUrl === suggestion.targetUrl)
    )
    
    // Sort by relevance score
    const sortedSuggestions = uniqueSuggestions.sort((a, b) => b.relevanceScore - a.relevanceScore)
    
    // Apply linking strategy constraints
    let finalSuggestions = sortedSuggestions.slice(0, this.linkingStrategy.maxLinksPerPage)
    
    // Distribute authority if enabled
    if (this.linkingStrategy.distributeAuthority) {
      finalSuggestions = this.distributeAuthorityLinks(finalSuggestions)
    }
    
    return finalSuggestions
  }

  private distributeAuthorityLinks(suggestions: LinkSuggestion[]): LinkSuggestion[] {
    // Ensure we don't over-link to high authority pages
    const urlCounts: Record<string, number> = {}
    
    return suggestions.filter(suggestion => {
      urlCounts[suggestion.targetUrl] = (urlCounts[suggestion.targetUrl] || 0) + 1
      return urlCounts[suggestion.targetUrl] <= 2 // Max 2 links to same page
    })
  }

  private insertLink(content: string, anchorText: string, targetUrl: string, position: number): string {
    const beforeText = content.substring(0, position)
    const afterText = content.substring(position + anchorText.length)
    
    const linkHtml = `<a href="${targetUrl}" class="internal-link">${anchorText}</a>`
    
    return beforeText + linkHtml + afterText
  }

  private extractBestAnchorText(phrase: string, keyword: string): string {
    // Extract the most relevant part of the phrase as anchor text
    const words = phrase.split(/\s+/)
    const keywordIndex = words.findIndex(word => word.toLowerCase().includes(keyword.toLowerCase()))
    
    if (keywordIndex === -1) return keyword
    
    // Include keyword and surrounding words (2-4 words total)
    const start = Math.max(0, keywordIndex - 1)
    const end = Math.min(words.length, keywordIndex + 3)
    
    return words.slice(start, end).join(' ')
  }

  private extractRelatedKeywords(phrase: string): string[] {
    const words = phrase.toLowerCase().split(/\s+/)
    const relevantWords = words.filter(word => 
      word.length > 3 && 
      !this.stopWords.has(word) &&
      /^[a-z]+$/i.test(word)
    )
    
    return relevantWords.slice(0, 3)
  }

  private categorizePhrase(phrase: string): string {
    const categories: Record<string, string[]> = {
      'tower-cranes': ['tower crane', 'crane', 'lifting', 'construction crane'],
      'safety': ['safety', 'secure', 'protection', 'hazard', 'risk'],
      'construction': ['building', 'construction', 'site', 'project'],
      'services': ['service', 'rental', 'maintenance', 'installation']
    }
    
    const lowerPhrase = phrase.toLowerCase()
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerPhrase.includes(keyword))) {
        return category
      }
    }
    
    return 'general'
  }

  private deduplicatePhrases(phrases: Array<any>): Array<any> {
    const seen = new Set<string>()
    return phrases.filter(phrase => {
      const key = phrase.text.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  private calculateKeywordDiversity(keywords1: string[], keywords2: string[]): number {
    const allKeywords = [...new Set([...keywords1, ...keywords2])]
    const uniqueKeywords = allKeywords.length
    const totalKeywords = keywords1.length + keywords2.length
    
    return uniqueKeywords / totalKeywords * 0.1 // Small bonus for diversity
  }

  private generateLinkReason(phrase: any, page: InternalLink, relevanceScore: number): string {
    if (relevanceScore > 0.8) {
      return `High relevance: Direct keyword match for "${phrase.keywords[0]}"`
    } else if (relevanceScore > 0.6) {
      return `Good relevance: Related topic in ${page.category} category`
    } else if (relevanceScore > 0.4) {
      return `Moderate relevance: Semantic similarity detected`
    } else {
      return `Low relevance: Tangential relationship`
    }
  }

  private isOrphanedPage(page: InternalLink): boolean {
    // Mock implementation - in reality, this would check actual incoming links
    return page.authority < 0.3 && Math.random() < 0.1
  }

  private generateAuditRecommendations(metrics: any): string[] {
    const recommendations: string[] = []
    
    if (metrics.avgLinksPerPage < 2) {
      recommendations.push('Increase internal linking - aim for 3-5 contextual links per page')
    }
    
    if (metrics.orphanedPages > metrics.totalPages * 0.1) {
      recommendations.push('Address orphaned pages by adding contextual links from related content')
    }
    
    if (metrics.overlinkingIssues > 0) {
      recommendations.push('Review and reduce overlinking on flagged pages')
    }
    
    recommendations.push('Implement contextual linking automation for new content')
    recommendations.push('Regular link audit every 3 months to maintain link quality')
    
    return recommendations
  }

  private initializeStopWords(): void {
    this.stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have',
      'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'
    ])
  }

  /**
   * Load pages from relevance matrix
   */
  async loadPagesFromRelevanceMatrix(): Promise<void> {
    try {
      const { linkRelevanceMatrix } = await import('./link-relevance-matrix')
      await linkRelevanceMatrix.buildMatrix()
      
      const pages = linkRelevanceMatrix.getAllPagesAsInternalLinks()
      pages.forEach(page => this.addPage(page))
      
      console.log(`Loaded ${pages.length} pages from relevance matrix`)
    } catch (error) {
      console.error('Error loading pages from relevance matrix:', error)
      this.loadExistingPages()
    }
  }

  private loadExistingPages(): void {
    // Initialize with existing site pages
    const defaultPages: InternalLink[] = [
      {
        url: '/en/services',
        title: 'Tower Crane Services',
        description: 'Professional tower crane rental and installation services',
        keywords: ['tower crane', 'rental', 'services', 'installation'],
        category: 'services',
        language: 'en',
        lastUpdated: new Date(),
        authority: 0.8
      },
      {
        url: '/en/towercranes',
        title: 'Tower Cranes Equipment',
        description: 'High-quality tower cranes for construction projects',
        keywords: ['tower crane', 'equipment', 'construction', 'building'],
        category: 'tower-cranes',
        language: 'en',
        lastUpdated: new Date(),
        authority: 0.9
      },
      {
        url: '/en/about',
        title: 'About NIBM',
        description: 'Learn about NIBM Tower Cranes',
        keywords: ['about', 'company', 'NIBM'],
        category: 'about',
        language: 'en',
        lastUpdated: new Date(),
        authority: 0.7
      }
    ]

    defaultPages.forEach(page => this.addPage(page))
  }

  // Public configuration methods
  updateStrategy(newStrategy: Partial<LinkingStrategy>): void {
    this.linkingStrategy = { ...this.linkingStrategy, ...newStrategy }
  }

  getStrategy(): LinkingStrategy {
    return { ...this.linkingStrategy }
  }

  clearCache(): void {
    this.relevanceCache.clear()
  }

  getAllPages(): InternalLink[] {
    return Array.from(this.pages.values())
  }

  removePage(url: string): boolean {
    const removed = this.pages.delete(url)
    if (removed) {
      this.relevanceCache.clear()
    }
    return removed
  }
}

// Global instance
export const contextualLinkingEngine = new ContextualLinkingEngine()

// Utility functions
export function generateContextualLinks(
  content: string, 
  currentUrl: string, 
  keywords: string[] = []
): LinkSuggestion[] {
  return contextualLinkingEngine.generateLinkSuggestions(content, currentUrl, keywords)
}

export function injectInternalLinks(
  content: string,
  currentUrl: string,
  keywords: string[] = []
): string {
  return contextualLinkingEngine.injectContextualLinks(content, currentUrl, keywords)
}

export function addPageToLinkingSystem(page: InternalLink): void {
  contextualLinkingEngine.addPage(page)
}

export function auditInternalLinks() {
  return contextualLinkingEngine.generateLinkAudit()
} 