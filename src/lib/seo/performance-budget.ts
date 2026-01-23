export interface PerformanceBudget {
  lcp: number // Largest Contentful Paint (ms)
  fid: number // First Input Delay (ms)
  cls: number // Cumulative Layout Shift
  fcp: number // First Contentful Paint (ms)
  ttfb: number // Time to First Byte (ms)
  inp: number // Interaction to Next Paint (ms)
}

export interface PerformanceMetric {
  name: string
  value: number
  budget: number
  status: 'good' | 'needs-improvement' | 'poor'
  threshold: {
    good: number
    needsImprovement: number
  }
}

export interface PerformanceBudgetReport {
  metrics: PerformanceMetric[]
  overallStatus: 'good' | 'needs-improvement' | 'poor'
  violations: PerformanceMetric[]
  recommendations: string[]
  timestamp: Date
}

/**
 * Performance budget enforcement and monitoring
 */
export class PerformanceBudget {
  private budgets: PerformanceBudget = {
    lcp: 2500, // 2.5 seconds
    fid: 100, // 100ms
    cls: 0.1, // 0.1
    fcp: 1800, // 1.8 seconds
    ttfb: 800, // 800ms
    inp: 200 // 200ms
  }

  private thresholds = {
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    fcp: { good: 1800, needsImprovement: 3000 },
    ttfb: { good: 800, needsImprovement: 1800 },
    inp: { good: 200, needsImprovement: 500 }
  }

  /**
   * Check performance metrics against budget
   */
  checkBudget(metrics: Partial<PerformanceBudget>): PerformanceBudgetReport {
    const performanceMetrics: PerformanceMetric[] = []
    const violations: PerformanceMetric[] = []

    // Check each metric
    Object.entries(this.budgets).forEach(([key, budget]) => {
      const value = metrics[key as keyof PerformanceBudget]
      if (value === undefined) return

      const threshold = this.thresholds[key as keyof typeof this.thresholds]
      let status: 'good' | 'needs-improvement' | 'poor'

      if (value <= threshold.good) {
        status = 'good'
      } else if (value <= threshold.needsImprovement) {
        status = 'needs-improvement'
      } else {
        status = 'poor'
      }

      const metric: PerformanceMetric = {
        name: key.toUpperCase(),
        value,
        budget,
        status,
        threshold
      }

      performanceMetrics.push(metric)

      // Check if budget is violated
      if (value > budget) {
        violations.push(metric)
      }
    })

    // Determine overall status
    const hasPoor = performanceMetrics.some(m => m.status === 'poor')
    const hasNeedsImprovement = performanceMetrics.some(
      m => m.status === 'needs-improvement'
    )

    let overallStatus: 'good' | 'needs-improvement' | 'poor'
    if (hasPoor) {
      overallStatus = 'poor'
    } else if (hasNeedsImprovement) {
      overallStatus = 'needs-improvement'
    } else {
      overallStatus = 'good'
    }

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      violations,
      performanceMetrics
    )

    return {
      metrics: performanceMetrics,
      overallStatus,
      violations,
      recommendations,
      timestamp: new Date()
    }
  }

  /**
   * Validate performance during build
   */
  validateBuild(metrics: Partial<PerformanceBudget>): {
    passed: boolean
    report: PerformanceBudgetReport
    shouldFail: boolean
  } {
    const report = this.checkBudget(metrics)
    const shouldFail = report.violations.length > 0 && report.overallStatus === 'poor'

    return {
      passed: !shouldFail,
      report,
      shouldFail
    }
  }

  /**
   * Monitor performance in real-time
   */
  monitorPerformance(
    callback: (report: PerformanceBudgetReport) => void
  ): () => void {
    // In browser environment, monitor Web Vitals
    if (typeof window !== 'undefined') {
      const observers: PerformanceObserver[] = []

      // Monitor LCP
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            startTime: number
          }
          if (lastEntry) {
            this.reportMetric('lcp', lastEntry.startTime, callback)
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        observers.push(lcpObserver)
      } catch (e) {
        console.warn('LCP observer not supported')
      }

      // Monitor CLS
      try {
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        // Send CLS when page becomes hidden
        const sendCLS = () => {
          if (clsValue > 0) {
            this.reportMetric('cls', clsValue, callback)
          }
        }
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') {
            sendCLS()
          }
        })
        observers.push(clsObserver)
      } catch (e) {
        console.warn('CLS observer not supported')
      }

      // Monitor FID
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime
            this.reportMetric('fid', fid, callback)
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
        observers.push(fidObserver)
      } catch (e) {
        console.warn('FID observer not supported')
      }

      // Cleanup function
      return () => {
        observers.forEach(observer => observer.disconnect())
      }
    }

    // No-op cleanup if not in browser
    return () => {}
  }

  /**
   * Report individual metric
   */
  private reportMetric(
    metricName: keyof PerformanceBudget,
    value: number,
    callback: (report: PerformanceBudgetReport) => void
  ): void {
    const metrics: Partial<PerformanceBudget> = {
      [metricName]: value
    }
    const report = this.checkBudget(metrics)
    callback(report)
  }

  /**
   * Generate recommendations based on violations
   */
  private generateRecommendations(
    violations: PerformanceMetric[],
    allMetrics: PerformanceMetric[]
  ): string[] {
    const recommendations: string[] = []

    violations.forEach(violation => {
      switch (violation.name) {
        case 'LCP':
          recommendations.push(
            `LCP is ${violation.value}ms (budget: ${violation.budget}ms). Optimize images, use CDN, implement lazy loading, and reduce server response time.`
          )
          break
        case 'FID':
          recommendations.push(
            `FID is ${violation.value}ms (budget: ${violation.budget}ms). Reduce JavaScript execution time, break up long tasks, and optimize third-party scripts.`
          )
          break
        case 'CLS':
          recommendations.push(
            `CLS is ${violation.value} (budget: ${violation.budget}). Set explicit dimensions for images and videos, avoid inserting content above existing content, and use CSS aspect-ratio.`
          )
          break
        case 'FCP':
          recommendations.push(
            `FCP is ${violation.value}ms (budget: ${violation.budget}ms). Optimize critical rendering path, minimize render-blocking resources, and use resource hints.`
          )
          break
        case 'TTFB':
          recommendations.push(
            `TTFB is ${violation.value}ms (budget: ${violation.budget}ms). Improve server response time, use CDN, enable caching, and optimize database queries.`
          )
          break
        case 'INP':
          recommendations.push(
            `INP is ${violation.value}ms (budget: ${violation.budget}ms). Reduce JavaScript execution time, optimize event handlers, and minimize main thread work.`
          )
          break
      }
    })

    // General recommendations
    if (violations.length > 0) {
      recommendations.push(
        'Consider implementing code splitting and lazy loading for non-critical resources.'
      )
      recommendations.push(
        'Use Next.js Image component for automatic image optimization.'
      )
      recommendations.push(
        'Enable compression (gzip/brotli) and leverage browser caching.'
      )
    }

    return recommendations
  }

  /**
   * Update budget thresholds
   */
  updateBudgets(newBudgets: Partial<PerformanceBudget>): void {
    this.budgets = {
      ...this.budgets,
      ...newBudgets
    }
  }

  /**
   * Get current budgets
   */
  getBudgets(): PerformanceBudget {
    return { ...this.budgets }
  }
}

// Global instance
export const performanceBudget = new PerformanceBudget()

// Utility functions
export function checkPerformanceBudget(
  metrics: Partial<PerformanceBudget>
): PerformanceBudgetReport {
  return performanceBudget.checkBudget(metrics)
}

export function validateBuildPerformance(
  metrics: Partial<PerformanceBudget>
) {
  return performanceBudget.validateBuild(metrics)
}
