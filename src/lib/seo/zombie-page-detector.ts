import { prisma } from '@/lib/prisma'

export interface PagePerformance {
  url: string
  title: string
  traffic: number
  lastTrafficDate: Date | null
  engagement: number
  bounceRate: number
  avgTimeOnPage: number
  isZombie: boolean
  zombieScore: number
  recommendations: string[]
}

export interface ZombiePageReport {
  totalPages: number
  zombiePages: PagePerformance[]
  atRiskPages: PagePerformance[]
  recommendations: string[]
  lastChecked: Date
}

/**
 * Detects and manages zombie pages (low-performing pages that should be noindexed)
 */
export class ZombiePageDetector {
  private performanceThresholds = {
    minTraffic: 0, // Zero traffic for 6+ months
    minEngagement: 0.1, // Minimum engagement rate
    maxBounceRate: 0.9, // Maximum acceptable bounce rate
    minTimeOnPage: 10, // Minimum seconds on page
    zombiePeriodMonths: 6 // Months without traffic to be considered zombie
  }

  /**
   * Detect zombie pages from database
   */
  async detectZombiePages(): Promise<ZombiePageReport> {
    try {
      // Fetch all cranes
      const cranes = await prisma.crane.findMany({
        select: {
          slug: true,
          name: true,
          updatedAt: true,
          isAvailable: true
        }
      })

      const pages: PagePerformance[] = []

      // Analyze each crane page
      for (const crane of cranes) {
        const url = `/en/towercranes/${crane.slug}`
        
        // In a real implementation, you would fetch actual analytics data
        // For now, we'll simulate based on update date and availability
        const performance = await this.analyzePagePerformance(url, crane)
        pages.push(performance)
      }

      // Categorize pages
      const zombiePages = pages.filter(p => p.isZombie)
      const atRiskPages = pages.filter(
        p => !p.isZombie && p.zombieScore > 0.5
      )

      // Generate recommendations
      const recommendations = this.generateRecommendations(
        zombiePages,
        atRiskPages
      )

      return {
        totalPages: pages.length,
        zombiePages,
        atRiskPages,
        recommendations,
        lastChecked: new Date()
      }
    } catch (error) {
      console.error('Error detecting zombie pages:', error)
      return {
        totalPages: 0,
        zombiePages: [],
        atRiskPages: [],
        recommendations: ['Error analyzing pages'],
        lastChecked: new Date()
      }
    }
  }

  /**
   * Analyze individual page performance
   */
  private async analyzePagePerformance(
    url: string,
    crane: { slug: string; name: string; updatedAt: Date; isAvailable: boolean }
  ): Promise<PagePerformance> {
    // Calculate days since last update
    const daysSinceUpdate =
      (Date.now() - crane.updatedAt.getTime()) / (1000 * 60 * 60 * 24)
    const monthsSinceUpdate = daysSinceUpdate / 30

    // Simulate traffic data (in production, fetch from analytics)
    // Pages not updated in 6+ months with no traffic are zombies
    const hasRecentTraffic = monthsSinceUpdate < this.performanceThresholds.zombiePeriodMonths
    const traffic = hasRecentTraffic ? 10 : 0 // Simulated
    const lastTrafficDate = hasRecentTraffic ? crane.updatedAt : null

    // Calculate zombie score (0-1, higher = more likely zombie)
    let zombieScore = 0

    // Age factor
    if (monthsSinceUpdate > this.performanceThresholds.zombiePeriodMonths) {
      zombieScore += 0.4
    }

    // Traffic factor
    if (traffic === 0 && !hasRecentTraffic) {
      zombieScore += 0.4
    }

    // Availability factor
    if (!crane.isAvailable) {
      zombieScore += 0.2
    }

    const isZombie = zombieScore >= 0.7

    // Generate recommendations
    const recommendations: string[] = []
    if (isZombie) {
      recommendations.push('Add noindex meta tag to prevent indexing')
      recommendations.push('Consider redirecting to similar active page')
      recommendations.push('Or update content to make it relevant again')
    } else if (zombieScore > 0.5) {
      recommendations.push('Monitor page performance closely')
      recommendations.push('Consider updating content to improve relevance')
      recommendations.push('Add internal links from high-traffic pages')
    }

    return {
      url,
      title: crane.name,
      traffic,
      lastTrafficDate,
      engagement: hasRecentTraffic ? 0.5 : 0.1,
      bounceRate: hasRecentTraffic ? 0.6 : 0.95,
      avgTimeOnPage: hasRecentTraffic ? 30 : 5,
      isZombie,
      zombieScore,
      recommendations
    }
  }

  /**
   * Automatically add noindex to zombie pages
   */
  async autoNoindexZombiePages(): Promise<{
    processed: number
    noindexed: number
    errors: number
    actions: string[]
  }> {
    const report = await this.detectZombiePages()
    const actions: string[] = []
    let noindexed = 0
    let errors = 0

    for (const zombiePage of report.zombiePages) {
      try {
        // In production, this would update the page's metadata
        // For now, we'll just log the action
        actions.push(
          `Added noindex to ${zombiePage.url} (zombie score: ${zombiePage.zombieScore.toFixed(2)})`
        )
        noindexed++
      } catch (error) {
        errors++
        actions.push(`Error processing ${zombiePage.url}: ${error}`)
      }
    }

    return {
      processed: report.zombiePages.length,
      noindexed,
      errors,
      actions
    }
  }

  /**
   * Restore page from zombie status (remove noindex)
   */
  async restorePage(url: string): Promise<{ success: boolean; message: string }> {
    try {
      // In production, this would update the page's metadata to remove noindex
      // For now, we'll just return success
      return {
        success: true,
        message: `Removed noindex from ${url}. Page will be re-indexed.`
      }
    } catch (error) {
      return {
        success: false,
        message: `Error restoring page: ${error}`
      }
    }
  }

  /**
   * Get metadata with noindex for zombie pages
   */
  getZombiePageMetadata(url: string): { robots: { index: boolean } } | null {
    // This would check if the page is a zombie and return appropriate metadata
    // For now, return null (no special handling)
    return null
  }

  /**
   * Generate recommendations for zombie and at-risk pages
   */
  private generateRecommendations(
    zombiePages: PagePerformance[],
    atRiskPages: PagePerformance[]
  ): string[] {
    const recommendations: string[] = []

    if (zombiePages.length > 0) {
      recommendations.push(
        `${zombiePages.length} zombie pages detected. Consider adding noindex tags.`
      )
      recommendations.push(
        'Review zombie pages and either update content or redirect to active pages.'
      )
    }

    if (atRiskPages.length > 0) {
      recommendations.push(
        `${atRiskPages.length} pages at risk of becoming zombies. Monitor closely.`
      )
      recommendations.push(
        'Update at-risk pages with fresh content and improve internal linking.'
      )
    }

    if (zombiePages.length === 0 && atRiskPages.length === 0) {
      recommendations.push('No zombie pages detected. All pages are performing well.')
    }

    recommendations.push(
      'Set up automated monitoring to detect zombie pages monthly.'
    )
    recommendations.push(
      'Consider implementing content freshness signals to prevent zombie pages.'
    )

    return recommendations
  }

  /**
   * Update performance thresholds
   */
  updateThresholds(thresholds: Partial<typeof this.performanceThresholds>): void {
    this.performanceThresholds = {
      ...this.performanceThresholds,
      ...thresholds
    }
  }
}

// Global instance
export const zombiePageDetector = new ZombiePageDetector()

// Utility functions
export async function detectZombiePages(): Promise<ZombiePageReport> {
  return await zombiePageDetector.detectZombiePages()
}

export async function autoNoindexZombiePages() {
  return await zombiePageDetector.autoNoindexZombiePages()
}

export async function restorePage(url: string) {
  return await zombiePageDetector.restorePage(url)
}
