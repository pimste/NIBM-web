export interface PageKeywordData {
  url: string
  title: string
  metaDescription: string
  h1: string
  keywords: string[]
  content: string
  language: string
  lastUpdated: Date
  searchVolume?: number
  currentRanking?: number
}

export interface KeywordConflict {
  keyword: string
  conflictingPages: PageKeywordData[]
  severity: 'low' | 'medium' | 'high' | 'critical'
  conflictType: 'exact_match' | 'partial_overlap' | 'semantic_similarity'
  recommendations: ConsolidationRecommendation[]
  impactScore: number
}

export interface ConsolidationRecommendation {
  action: 'merge' | 'redirect' | 'differentiate' | 'noindex' | 'canonical'
  primaryPage: string
  secondaryPages: string[]
  reason: string
  expectedImpact: string
  priority: number
}

export interface CannibalizationReport {
  totalPages: number
  totalKeywords: number
  conflictsFound: number
  severityBreakdown: Record<string, number>
  topConflicts: KeywordConflict[]
  consolidationSuggestions: ConsolidationRecommendation[]
  preventionStrategies: string[]
}

export class KeywordCannibalizationDetector {
  private pages: Map<string, PageKeywordData> = new Map()
  private keywordIndex: Map<string, string[]> = new Map() // keyword -> page URLs
  private conflictCache: Map<string, KeywordConflict> = new Map()
  private similarityThreshold = 0.7

  constructor() {
    this.loadExistingPages()
  }

  /**
   * Add page for cannibalization analysis
   */
  addPage(page: PageKeywordData): void {
    this.pages.set(page.url, page)
    
    // Update keyword index
    page.keywords.forEach(keyword => {
      const normalizedKeyword = this.normalizeKeyword(keyword)
      if (!this.keywordIndex.has(normalizedKeyword)) {
        this.keywordIndex.set(normalizedKeyword, [])
      }
      
      const pages = this.keywordIndex.get(normalizedKeyword)!
      if (!pages.includes(page.url)) {
        pages.push(page.url)
      }
    })

    // Clear conflict cache to recalculate
    this.conflictCache.clear()
    
    console.log(`Added page to cannibalization detector: ${page.title}`)
  }

  /**
   * Detect keyword cannibalization across all pages
   */
  detectCannibalization(): CannibalizationReport {
    const conflicts: KeywordConflict[] = []
    
    // Analyze each keyword for conflicts
    this.keywordIndex.forEach((pageUrls, keyword) => {
      if (pageUrls.length > 1) {
        const conflict = this.analyzeKeywordConflict(keyword, pageUrls)
        if (conflict) {
          conflicts.push(conflict)
        }
      }
    })

    // Detect semantic similarities
    const semanticConflicts = this.detectSemanticCannibalization()
    conflicts.push(...semanticConflicts)

    // Generate consolidation suggestions
    const consolidationSuggestions = this.generateConsolidationSuggestions(conflicts)

    // Create severity breakdown
    const severityBreakdown = this.calculateSeverityBreakdown(conflicts)

    // Generate prevention strategies
    const preventionStrategies = this.generatePreventionStrategies()

    return {
      totalPages: this.pages.size,
      totalKeywords: this.keywordIndex.size,
      conflictsFound: conflicts.length,
      severityBreakdown,
      topConflicts: conflicts
        .sort((a, b) => b.impactScore - a.impactScore)
        .slice(0, 10),
      consolidationSuggestions,
      preventionStrategies
    }
  }

  /**
   * Analyze specific keyword for conflicts
   */
  analyzeKeywordConflict(keyword: string, pageUrls: string[]): KeywordConflict | null {
    const pages = pageUrls.map(url => this.pages.get(url)!).filter(Boolean)
    
    if (pages.length < 2) return null

    // Determine conflict type and severity
    const conflictType = this.determineConflictType(keyword, pages)
    const severity = this.calculateSeverity(keyword, pages, conflictType)
    const impactScore = this.calculateImpactScore(keyword, pages)

    // Generate recommendations
    const recommendations = this.generateRecommendations(keyword, pages, conflictType, severity)

    return {
      keyword,
      conflictingPages: pages,
      severity,
      conflictType,
      recommendations,
      impactScore
    }
  }

  /**
   * Detect semantic cannibalization (similar meaning keywords)
   */
  detectSemanticCannibalization(): KeywordConflict[] {
    const semanticConflicts: KeywordConflict[] = []
    const processedPairs = new Set<string>()

    this.keywordIndex.forEach((pages1, keyword1) => {
      this.keywordIndex.forEach((pages2, keyword2) => {
        if (keyword1 === keyword2) return
        
        const pairKey = [keyword1, keyword2].sort().join('|')
        if (processedPairs.has(pairKey)) return
        processedPairs.add(pairKey)

        const similarity = this.calculateSemanticSimilarity(keyword1, keyword2)
        
        if (similarity > this.similarityThreshold) {
          // Find overlapping pages
          const overlappingPages = pages1.filter(url => pages2.includes(url))
          
          if (overlappingPages.length > 0) {
            const conflictingPages = overlappingPages.map(url => this.pages.get(url)!).filter(Boolean)
            
            semanticConflicts.push({
              keyword: `${keyword1} / ${keyword2}`,
              conflictingPages,
              severity: this.calculateSemanticSeverity(similarity, conflictingPages.length),
              conflictType: 'semantic_similarity',
              recommendations: this.generateSemanticRecommendations(keyword1, keyword2, conflictingPages),
              impactScore: similarity * conflictingPages.length
            })
          }
        }
      })
    })

    return semanticConflicts
  }

  /**
   * Generate automatic consolidation suggestions
   */
  generateConsolidationSuggestions(conflicts: KeywordConflict[]): ConsolidationRecommendation[] {
    const suggestions: ConsolidationRecommendation[] = []

    conflicts.forEach(conflict => {
      conflict.recommendations.forEach(rec => {
        // Prioritize by severity and impact
        const priority = this.calculateRecommendationPriority(conflict, rec)
        
        suggestions.push({
          ...rec,
          priority
        })
      })
    })

    return suggestions.sort((a, b) => b.priority - a.priority)
  }

  /**
   * Automatically consolidate pages based on recommendations
   */
  async autoConsolidate(recommendations: ConsolidationRecommendation[]): Promise<{
    processed: number
    successful: number
    failed: number
    actions: string[]
  }> {
    let processed = 0
    let successful = 0
    let failed = 0
    const actions: string[] = []

    for (const rec of recommendations.slice(0, 5)) { // Process top 5 recommendations
      processed++
      
      try {
        const result = await this.executeConsolidation(rec)
        if (result.success) {
          successful++
          actions.push(result.action)
        } else {
          failed++
          actions.push(`Failed: ${result.error}`)
        }
      } catch (error) {
        failed++
        actions.push(`Error: ${error}`)
      }
    }

    return { processed, successful, failed, actions }
  }

  /**
   * Execute specific consolidation action
   */
  private async executeConsolidation(recommendation: ConsolidationRecommendation): Promise<{
    success: boolean
    action?: string
    error?: string
  }> {
    switch (recommendation.action) {
      case 'canonical':
        return this.createCanonicalLink(recommendation)
      
      case 'redirect':
        return this.createRedirect(recommendation)
      
      case 'merge':
        return this.mergeContent(recommendation)
      
      case 'differentiate':
        return this.differentiateContent(recommendation)
      
      case 'noindex':
        return this.addNoIndex(recommendation)
      
      default:
        return { success: false, error: 'Unknown action type' }
    }
  }

  /**
   * Preview consolidation impact
   */
  previewConsolidation(recommendation: ConsolidationRecommendation): {
    affectedPages: number
    expectedTrafficChange: string
    seoImpact: string
    userExperience: string
    implementationComplexity: string
  } {
    const affectedPages = recommendation.secondaryPages.length + 1

    const impacts = {
      canonical: {
        traffic: 'Minimal traffic loss, consolidates ranking signals',
        seo: 'Positive - eliminates cannibalization, strengthens primary page',
        ux: 'No direct impact on user experience',
        complexity: 'Low - add canonical tags to secondary pages'
      },
      redirect: {
        traffic: 'Preserves most traffic through 301 redirects',
        seo: 'Positive - full consolidation of ranking power',
        ux: 'Seamless - users automatically redirected',
        complexity: 'Medium - requires server configuration'
      },
      merge: {
        traffic: 'Potential increase from comprehensive content',
        seo: 'Very positive - creates authoritative resource',
        ux: 'Improved - single comprehensive resource',
        complexity: 'High - requires content restructuring'
      },
      differentiate: {
        traffic: 'Stable - maintains all pages with unique focus',
        seo: 'Positive - eliminates overlap while keeping all pages',
        ux: 'Improved - clearer page purposes',
        complexity: 'Medium - requires content optimization'
      },
      noindex: {
        traffic: 'Some loss from noindexed pages',
        seo: 'Positive - eliminates weak competing pages',
        ux: 'Minimal impact if done strategically',
        complexity: 'Low - add noindex meta tags'
      }
    }

    const impact = impacts[recommendation.action] || impacts.canonical

    return {
      affectedPages,
      expectedTrafficChange: impact.traffic,
      seoImpact: impact.seo,
      userExperience: impact.ux,
      implementationComplexity: impact.complexity
    }
  }

  // Private helper methods
  private normalizeKeyword(keyword: string): string {
    return keyword.toLowerCase().trim().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ')
  }

  private determineConflictType(keyword: string, pages: PageKeywordData[]): KeywordConflict['conflictType'] {
    // Check for exact matches in titles and H1s
    const exactMatches = pages.filter(page => 
      page.title.toLowerCase().includes(keyword.toLowerCase()) ||
      page.h1.toLowerCase().includes(keyword.toLowerCase())
    )

    if (exactMatches.length > 1) {
      return 'exact_match'
    }

    // Check for partial overlaps
    const hasPartialOverlap = pages.some(page => 
      page.keywords.some(kw => kw.toLowerCase().includes(keyword.toLowerCase()))
    )

    return hasPartialOverlap ? 'partial_overlap' : 'semantic_similarity'
  }

  private calculateSeverity(
    keyword: string, 
    pages: PageKeywordData[], 
    conflictType: KeywordConflict['conflictType']
  ): KeywordConflict['severity'] {
    let score = 0

    // Base score by conflict type
    switch (conflictType) {
      case 'exact_match': score += 3; break
      case 'partial_overlap': score += 2; break
      case 'semantic_similarity': score += 1; break
    }

    // Number of conflicting pages
    score += Math.min(pages.length - 1, 3)

    // Search volume impact (if available)
    const avgSearchVolume = pages.reduce((sum, page) => sum + (page.searchVolume || 0), 0) / pages.length
    if (avgSearchVolume > 1000) score += 2
    else if (avgSearchVolume > 100) score += 1

    // Title/H1 conflicts
    const titleConflicts = this.countTitleConflicts(keyword, pages)
    score += titleConflicts

    if (score >= 7) return 'critical'
    if (score >= 5) return 'high'
    if (score >= 3) return 'medium'
    return 'low'
  }

  private calculateImpactScore(keyword: string, pages: PageKeywordData[]): number {
    let impact = 0

    // Base impact from number of pages
    impact += pages.length * 10

    // Search volume impact
    const totalSearchVolume = pages.reduce((sum, page) => sum + (page.searchVolume || 0), 0)
    impact += Math.log(totalSearchVolume + 1) * 5

    // Ranking impact (if current rankings available)
    const hasGoodRankings = pages.some(page => (page.currentRanking || 100) <= 10)
    if (hasGoodRankings) impact += 20

    return impact
  }

  private generateRecommendations(
    keyword: string,
    pages: PageKeywordData[],
    conflictType: KeywordConflict['conflictType'],
    severity: KeywordConflict['severity']
  ): ConsolidationRecommendation[] {
    const recommendations: ConsolidationRecommendation[] = []

    // Determine primary page (usually most authoritative/recent)
    const primaryPage = this.selectPrimaryPage(pages)
    const secondaryPages = pages.filter(p => p.url !== primaryPage.url).map(p => p.url)

    switch (severity) {
      case 'critical':
        if (conflictType === 'exact_match') {
          recommendations.push({
            action: 'merge',
            primaryPage: primaryPage.url,
            secondaryPages,
            reason: 'Critical exact match conflict requires content consolidation',
            expectedImpact: 'High positive impact on rankings',
            priority: 0
          })
        }
        break

      case 'high':
        recommendations.push({
          action: 'canonical',
          primaryPage: primaryPage.url,
          secondaryPages,
          reason: 'High severity conflict needs canonical consolidation',
          expectedImpact: 'Moderate positive impact on rankings',
          priority: 0
        })
        break

      case 'medium':
        recommendations.push({
          action: 'differentiate',
          primaryPage: primaryPage.url,
          secondaryPages,
          reason: 'Medium conflict can be resolved by differentiating content focus',
          expectedImpact: 'Eliminates cannibalization while preserving all content',
          priority: 0
        })
        break

      case 'low':
        recommendations.push({
          action: 'canonical',
          primaryPage: primaryPage.url,
          secondaryPages: secondaryPages.slice(0, 1), // Only weakest page
          reason: 'Low impact conflict - minimal intervention needed',
          expectedImpact: 'Small positive impact',
          priority: 0
        })
        break
    }

    return recommendations
  }

  private calculateSemanticSimilarity(keyword1: string, keyword2: string): number {
    const words1 = keyword1.toLowerCase().split(' ')
    const words2 = keyword2.toLowerCase().split(' ')
    
    const commonWords = words1.filter(word => words2.includes(word))
    const totalWords = new Set([...words1, ...words2]).size
    
    return commonWords.length / totalWords
  }

  private calculateSemanticSeverity(similarity: number, pageCount: number): KeywordConflict['severity'] {
    const score = similarity * pageCount * 2
    
    if (score >= 3) return 'high'
    if (score >= 2) return 'medium'
    return 'low'
  }

  private generateSemanticRecommendations(
    keyword1: string,
    keyword2: string,
    pages: PageKeywordData[]
  ): ConsolidationRecommendation[] {
    const primaryPage = this.selectPrimaryPage(pages)
    
    return [{
      action: 'differentiate',
      primaryPage: primaryPage.url,
      secondaryPages: pages.filter(p => p.url !== primaryPage.url).map(p => p.url),
      reason: `Semantic similarity between "${keyword1}" and "${keyword2}" requires content differentiation`,
      expectedImpact: 'Resolves semantic cannibalization',
      priority: 0
    }]
  }

  private selectPrimaryPage(pages: PageKeywordData[]): PageKeywordData {
    // Select based on multiple factors
    return pages.reduce((best, current) => {
      let bestScore = this.calculatePageScore(best)
      let currentScore = this.calculatePageScore(current)
      
      return currentScore > bestScore ? current : best
    })
  }

  private calculatePageScore(page: PageKeywordData): number {
    let score = 0
    
    // Content length bonus
    score += Math.min(page.content.length / 1000, 10)
    
    // Recent update bonus
    const daysSinceUpdate = (Date.now() - page.lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
    if (daysSinceUpdate < 30) score += 5
    
    // Search volume bonus
    if (page.searchVolume) score += Math.log(page.searchVolume + 1)
    
    // Ranking bonus
    if (page.currentRanking && page.currentRanking <= 10) score += 10
    
    return score
  }

  private countTitleConflicts(keyword: string, pages: PageKeywordData[]): number {
    const titlesWithKeyword = pages.filter(page => 
      page.title.toLowerCase().includes(keyword.toLowerCase()) ||
      page.h1.toLowerCase().includes(keyword.toLowerCase())
    )
    
    return Math.max(0, titlesWithKeyword.length - 1)
  }

  private calculateRecommendationPriority(conflict: KeywordConflict, rec: ConsolidationRecommendation): number {
    let priority = 0
    
    // Severity impact
    switch (conflict.severity) {
      case 'critical': priority += 40; break
      case 'high': priority += 30; break
      case 'medium': priority += 20; break
      case 'low': priority += 10; break
    }
    
    // Action type impact
    switch (rec.action) {
      case 'canonical': priority += 20; break
      case 'redirect': priority += 15; break
      case 'differentiate': priority += 10; break
      case 'merge': priority += 25; break
      case 'noindex': priority += 5; break
    }
    
    // Impact score
    priority += Math.min(conflict.impactScore / 10, 20)
    
    return priority
  }

  private calculateSeverityBreakdown(conflicts: KeywordConflict[]): Record<string, number> {
    const breakdown = { critical: 0, high: 0, medium: 0, low: 0 }
    
    conflicts.forEach(conflict => {
      breakdown[conflict.severity]++
    })
    
    return breakdown
  }

  private generatePreventionStrategies(): string[] {
    return [
      'Implement keyword research coordination across content teams',
      'Create content calendar with keyword allocation tracking',
      'Use keyword mapping to assign primary keywords to specific pages',
      'Establish content guidelines for semantic keyword variation',
      'Regular cannibalization audits (monthly/quarterly)',
      'Train content creators on keyword cannibalization risks',
      'Implement automated monitoring for new content conflicts',
      'Create topic clusters instead of competing individual pages',
      'Use long-tail keyword variations to differentiate similar content',
      'Establish clear content consolidation workflows'
    ]
  }

  // Consolidation execution methods
  private async createCanonicalLink(rec: ConsolidationRecommendation): Promise<{ success: boolean; action?: string; error?: string }> {
    // Mock implementation - in reality, this would modify page headers
    console.log(`Creating canonical link from ${rec.secondaryPages.join(', ')} to ${rec.primaryPage}`)
    
    return {
      success: true,
      action: `Added canonical tags pointing to ${rec.primaryPage}`
    }
  }

  private async createRedirect(rec: ConsolidationRecommendation): Promise<{ success: boolean; action?: string; error?: string }> {
    // Mock implementation - in reality, this would configure redirects
    console.log(`Creating 301 redirects from ${rec.secondaryPages.join(', ')} to ${rec.primaryPage}`)
    
    return {
      success: true,
      action: `Created 301 redirects to ${rec.primaryPage}`
    }
  }

  private async mergeContent(rec: ConsolidationRecommendation): Promise<{ success: boolean; action?: string; error?: string }> {
    // Mock implementation - in reality, this would merge content
    console.log(`Merging content from ${rec.secondaryPages.join(', ')} into ${rec.primaryPage}`)
    
    return {
      success: true,
      action: `Merged content into comprehensive page at ${rec.primaryPage}`
    }
  }

  private async differentiateContent(rec: ConsolidationRecommendation): Promise<{ success: boolean; action?: string; error?: string }> {
    // Mock implementation - in reality, this would modify content
    console.log(`Differentiating content between ${rec.primaryPage} and ${rec.secondaryPages.join(', ')}`)
    
    return {
      success: true,
      action: `Differentiated content focus for ${rec.secondaryPages.length + 1} pages`
    }
  }

  private async addNoIndex(rec: ConsolidationRecommendation): Promise<{ success: boolean; action?: string; error?: string }> {
    // Mock implementation - in reality, this would add noindex tags
    console.log(`Adding noindex to ${rec.secondaryPages.join(', ')}`)
    
    return {
      success: true,
      action: `Added noindex tags to ${rec.secondaryPages.length} pages`
    }
  }

  /**
   * Load pages from database (cranes, blog posts, etc.)
   */
  async loadPagesFromDatabase(): Promise<void> {
    try {
      // Dynamic import to avoid circular dependencies
      const { prisma } = await import('@/lib/prisma')
      
      // Load cranes
      const cranes = await prisma.crane.findMany({
        where: { isAvailable: true },
        select: {
          slug: true,
          name: true,
          description: true,
          model: true,
          updatedAt: true
        }
      })

      cranes.forEach(crane => {
        const keywords = [
          'tower crane',
          crane.name,
          crane.model,
          'construction equipment',
          'Potain tower crane'
        ]

        this.addPage({
          url: `/en/towercranes/${crane.slug}`,
          title: `${crane.name} - Tower Crane | NIBM`,
          metaDescription: crane.description || '',
          h1: crane.name,
          keywords,
          content: crane.description || '',
          language: 'en',
          lastUpdated: crane.updatedAt
        })
      })

      console.log(`Loaded ${cranes.length} cranes for cannibalization detection`)
    } catch (error) {
      console.error('Error loading pages from database:', error)
    }
  }

  private loadExistingPages(): void {
    // Initialize with sample pages for demonstration
    const samplePages: PageKeywordData[] = [
      {
        url: '/en/towercranes',
        title: 'Tower Cranes - NIBM Construction Equipment',
        metaDescription: 'Professional tower cranes for construction projects',
        h1: 'Tower Cranes',
        keywords: ['tower cranes', 'construction equipment', 'building cranes'],
        content: 'Tower cranes are essential construction equipment...',
        language: 'en',
        lastUpdated: new Date(),
        searchVolume: 1200,
        currentRanking: 5
      },
      {
        url: '/en/services',
        title: 'Crane Services - NIBM',
        metaDescription: 'Tower crane services for construction projects',
        h1: 'Crane Services',
        keywords: ['crane services', 'tower crane services', 'construction services'],
        content: 'Our crane services provide reliable tower cranes...',
        language: 'en',
        lastUpdated: new Date(),
        searchVolume: 800,
        currentRanking: 8
      }
    ]

    samplePages.forEach(page => this.addPage(page))
  }

  // Public methods
  removePage(url: string): boolean {
    const page = this.pages.get(url)
    if (!page) return false

    // Remove from pages
    this.pages.delete(url)

    // Remove from keyword index
    page.keywords.forEach(keyword => {
      const normalizedKeyword = this.normalizeKeyword(keyword)
      const pages = this.keywordIndex.get(normalizedKeyword)
      if (pages) {
        const index = pages.indexOf(url)
        if (index > -1) {
          pages.splice(index, 1)
        }
        if (pages.length === 0) {
          this.keywordIndex.delete(normalizedKeyword)
        }
      }
    })

    // Clear cache
    this.conflictCache.clear()

    return true
  }

  getPageCount(): number {
    return this.pages.size
  }

  getKeywordCount(): number {
    return this.keywordIndex.size
  }

  getAllPages(): PageKeywordData[] {
    return Array.from(this.pages.values())
  }
}

// Global instance
export const cannibalizationDetector = new KeywordCannibalizationDetector()

// Utility functions
export function detectKeywordCannibalization(): CannibalizationReport {
  return cannibalizationDetector.detectCannibalization()
}

export function addPageForCannibalizationCheck(page: PageKeywordData): void {
  cannibalizationDetector.addPage(page)
}

export function analyzeKeywordConflict(keyword: string): KeywordConflict | null {
  const detector = cannibalizationDetector as any
  const pageUrls = detector.keywordIndex.get(detector.normalizeKeyword(keyword)) || []
  return detector.analyzeKeywordConflict(keyword, pageUrls)
}

export async function autoConsolidateKeywords(recommendations: ConsolidationRecommendation[]) {
  return await cannibalizationDetector.autoConsolidate(recommendations)
} 