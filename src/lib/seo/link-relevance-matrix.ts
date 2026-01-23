import { prisma } from '@/lib/prisma'
import { InternalLink, RelevanceMatrix } from './contextual-linking'

export interface PageData {
  url: string
  title: string
  description: string
  keywords: string[]
  category: string
  language: string
  lastUpdated: Date
  authority: number
}

export interface RelevanceMatrixData {
  sourceUrl: string
  targetUrl: string
  relevance: RelevanceMatrix
  lastCalculated: Date
}

/**
 * Builds and maintains relevance matrix for internal linking
 */
export class LinkRelevanceMatrix {
  private matrix: Map<string, Map<string, RelevanceMatrix>> = new Map()
  private pages: Map<string, PageData> = new Map()

  /**
   * Load all pages from database
   */
  async loadPagesFromDatabase(): Promise<void> {
    try {
      // Load cranes
      const cranes = await prisma.crane.findMany({
        where: { isAvailable: true },
        select: {
          slug: true,
          name: true,
          description: true,
          updatedAt: true,
          category: true
        }
      })

      cranes.forEach(crane => {
        const keywords = [
          'tower crane',
          crane.name,
          'construction equipment',
          'Potain tower crane',
          crane.category === 'rental' ? 'crane rental' : 'crane for sale'
        ]

        this.pages.set(`/en/towercranes/${crane.slug}`, {
          url: `/en/towercranes/${crane.slug}`,
          title: crane.name,
          description: crane.description || '',
          keywords,
          category: 'tower-cranes',
          language: 'en',
          lastUpdated: crane.updatedAt,
          authority: this.calculateAuthority(crane.description || '', keywords)
        })
      })

      // Add static pages
      const staticPages: PageData[] = [
        {
          url: '/en/towercranes',
          title: 'Tower Cranes',
          description: 'Browse our complete catalog of professional tower cranes',
          keywords: ['tower cranes', 'construction equipment', 'crane catalog'],
          category: 'tower-cranes',
          language: 'en',
          lastUpdated: new Date(),
          authority: 0.9
        },
        {
          url: '/en/services',
          title: 'Tower Crane Services',
          description: 'Professional tower crane rental and installation services',
          keywords: ['crane services', 'crane rental', 'crane installation'],
          category: 'services',
          language: 'en',
          lastUpdated: new Date(),
          authority: 0.8
        },
        {
          url: '/en/about',
          title: 'About NIBM',
          description: 'Learn about NIBM Tower Cranes and our expertise',
          keywords: ['about', 'company', 'NIBM'],
          category: 'about',
          language: 'en',
          lastUpdated: new Date(),
          authority: 0.7
        }
      ]

      staticPages.forEach(page => {
        this.pages.set(page.url, page)
      })

      console.log(`Loaded ${this.pages.size} pages for relevance matrix`)
    } catch (error) {
      console.error('Error loading pages from database:', error)
    }
  }

  /**
   * Build relevance matrix for all pages
   */
  async buildMatrix(): Promise<void> {
    await this.loadPagesFromDatabase()

    const pageUrls = Array.from(this.pages.keys())

    // Calculate relevance between all page pairs
    for (const sourceUrl of pageUrls) {
      const sourcePage = this.pages.get(sourceUrl)
      if (!sourcePage) continue

      if (!this.matrix.has(sourceUrl)) {
        this.matrix.set(sourceUrl, new Map())
      }

      for (const targetUrl of pageUrls) {
        if (sourceUrl === targetUrl) continue

        const targetPage = this.pages.get(targetUrl)
        if (!targetPage) continue

        const relevance = this.calculateRelevance(sourcePage, targetPage)
        
        this.matrix.get(sourceUrl)!.set(targetUrl, relevance)
      }
    }

    console.log(`Built relevance matrix for ${this.matrix.size} pages`)
  }

  /**
   * Get relevance between two pages
   */
  getRelevance(sourceUrl: string, targetUrl: string): RelevanceMatrix | null {
    return this.matrix.get(sourceUrl)?.get(targetUrl) || null
  }

  /**
   * Get top relevant pages for a source page
   */
  getTopRelevantPages(
    sourceUrl: string,
    limit: number = 5,
    minRelevance: number = 0.3
  ): Array<{ url: string; relevance: RelevanceMatrix }> {
    const sourceRelevances = this.matrix.get(sourceUrl)
    if (!sourceRelevances) return []

    const relevances = Array.from(sourceRelevances.entries())
      .filter(([_, relevance]) => relevance.overallScore >= minRelevance)
      .sort((a, b) => b[1].overallScore - a[1].overallScore)
      .slice(0, limit)
      .map(([url, relevance]) => ({ url, relevance }))

    return relevances
  }

  /**
   * Calculate relevance between two pages
   */
  private calculateRelevance(source: PageData, target: PageData): RelevanceMatrix {
    // Keyword similarity
    const keywordSimilarity = this.calculateKeywordSimilarity(
      source.keywords,
      target.keywords
    )

    // Contextual relevance (description similarity)
    const contextualRelevance = this.calculateContextualRelevance(
      source.description,
      target.description
    )

    // Category relevance
    const categoryRelevance = this.calculateCategoryRelevance(
      source.category,
      target.category
    )

    // Overall score (weighted)
    const overallScore = (
      keywordSimilarity * 0.4 +
      contextualRelevance * 0.4 +
      categoryRelevance * 0.2
    )

    return {
      sourceKeywords: source.keywords,
      targetKeywords: target.keywords,
      similarity: keywordSimilarity,
      contextualRelevance,
      categoryRelevance,
      overallScore
    }
  }

  private calculateKeywordSimilarity(
    keywords1: string[],
    keywords2: string[]
  ): number {
    if (keywords1.length === 0 || keywords2.length === 0) return 0

    const set1 = new Set(keywords1.map(k => k.toLowerCase()))
    const set2 = new Set(keywords2.map(k => k.toLowerCase()))

    const intersection = new Set([...set1].filter(k => set2.has(k)))
    const union = new Set([...set1, ...set2])

    return intersection.size / union.size
  }

  private calculateContextualRelevance(
    desc1: string,
    desc2: string
  ): number {
    const words1 = desc1.toLowerCase().split(/\s+/)
    const words2 = desc2.toLowerCase().split(/\s+/)

    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been'
    ])

    const filtered1 = words1.filter(w => !stopWords.has(w) && w.length > 3)
    const filtered2 = words2.filter(w => !stopWords.has(w) && w.length > 3)

    const set1 = new Set(filtered1)
    const set2 = new Set(filtered2)

    const intersection = new Set([...set1].filter(w => set2.has(w)))
    const union = new Set([...set1, ...set2])

    return union.size > 0 ? intersection.size / union.size : 0
  }

  private calculateCategoryRelevance(
    category1: string,
    category2: string
  ): number {
    if (category1 === category2) return 1.0

    const categoryRelations: Record<string, string[]> = {
      'tower-cranes': ['services', 'construction'],
      'services': ['tower-cranes', 'construction'],
      'construction': ['tower-cranes', 'services'],
      'about': ['services', 'tower-cranes']
    }

    const related = categoryRelations[category1] || []
    return related.includes(category2) ? 0.7 : 0.2
  }

  private calculateAuthority(description: string, keywords: string[]): number {
    let authority = 0.5

    // Content length bonus
    if (description.length > 200) authority += 0.2

    // Keyword richness
    if (keywords.length > 5) authority += 0.2

    // Industry-specific terms
    const industryTerms = ['tower crane', 'construction', 'equipment', 'Potain']
    const hasIndustryTerms = industryTerms.some(term =>
      description.toLowerCase().includes(term.toLowerCase())
    )
    if (hasIndustryTerms) authority += 0.1

    return Math.min(authority, 1.0)
  }

  /**
   * Get all pages as InternalLink format
   */
  getAllPagesAsInternalLinks(): InternalLink[] {
    return Array.from(this.pages.values()).map(page => ({
      url: page.url,
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      category: page.category,
      language: page.language,
      lastUpdated: page.lastUpdated,
      authority: page.authority
    }))
  }

  /**
   * Update matrix when page is added/updated
   */
  async updatePage(page: PageData): Promise<void> {
    this.pages.set(page.url, page)

    // Recalculate relevances for this page
    const pageUrls = Array.from(this.pages.keys())

    if (!this.matrix.has(page.url)) {
      this.matrix.set(page.url, new Map())
    }

    for (const otherUrl of pageUrls) {
      if (otherUrl === page.url) continue

      const otherPage = this.pages.get(otherUrl)
      if (!otherPage) continue

      const relevance = this.calculateRelevance(page, otherPage)
      this.matrix.get(page.url)!.set(otherUrl, relevance)

      // Also update reverse relevance
      if (!this.matrix.has(otherUrl)) {
        this.matrix.set(otherUrl, new Map())
      }
      const reverseRelevance = this.calculateRelevance(otherPage, page)
      this.matrix.get(otherUrl)!.set(page.url, reverseRelevance)
    }
  }
}

// Global instance
export const linkRelevanceMatrix = new LinkRelevanceMatrix()

// Utility functions
export async function buildRelevanceMatrix(): Promise<void> {
  await linkRelevanceMatrix.buildMatrix()
}

export function getTopRelevantPages(
  sourceUrl: string,
  limit?: number,
  minRelevance?: number
) {
  return linkRelevanceMatrix.getTopRelevantPages(sourceUrl, limit, minRelevance)
}
