'use client'

export interface ABTestVariant {
  id: string
  name: string
  title?: string
  description?: string
  headline?: string
  emoji?: boolean
  brackets?: boolean
  numbers?: boolean
  urgency?: boolean
  weight: number
  active: boolean
}

export interface ABTestConfig {
  id: string
  name: string
  type: 'meta_description' | 'title' | 'headline' | 'ctr_bait'
  page: string
  variants: ABTestVariant[]
  trafficSplit: number
  startDate: Date
  endDate?: Date
  goalMetric: 'ctr' | 'conversions' | 'time_on_page' | 'bounce_rate'
  active: boolean
}

export interface ABTestResult {
  variantId: string
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  conversionRate: number
  timeOnPage?: number
  bounceRate?: number
  confidence: number
  isWinner: boolean
  significanceLevel: number
}

export interface CTRBaitTemplate {
  type: 'emoji' | 'brackets' | 'numbers' | 'urgency' | 'curiosity'
  prefix?: string
  suffix?: string
  insertPosition?: 'start' | 'end' | 'middle'
}

export class ABTestingEngine {
  private tests: Map<string, ABTestConfig> = new Map()
  private results: Map<string, Map<string, ABTestResult>> = new Map()
  private userAssignments: Map<string, Map<string, string>> = new Map()

  constructor() {
    this.loadTestsFromStorage()
    this.initializeTracking()
  }

  /**
   * Create a new A/B test
   */
  createTest(config: ABTestConfig): void {
    if (this.tests.has(config.id)) {
      throw new Error(`Test with ID ${config.id} already exists`)
    }

    // Validate configuration
    this.validateTestConfig(config)

    // Initialize results tracking
    const testResults = new Map<string, ABTestResult>()
    config.variants.forEach(variant => {
      testResults.set(variant.id, {
        variantId: variant.id,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        conversionRate: 0,
        confidence: 0,
        isWinner: false,
        significanceLevel: 0.95
      })
    })

    this.tests.set(config.id, config)
    this.results.set(config.id, testResults)
    this.saveTestsToStorage()

    console.log(`A/B test created: ${config.name} (${config.id})`)
  }

  /**
   * Get the variant for a specific user and test
   */
  getVariantForUser(testId: string, userId: string, page?: string): ABTestVariant | null {
    const test = this.tests.get(testId)
    if (!test || !test.active) {
      return null
    }

    // Check if test applies to this page
    if (page && test.page !== page && test.page !== '*') {
      return null
    }

    // Check if user already has assignment
    if (!this.userAssignments.has(testId)) {
      this.userAssignments.set(testId, new Map())
    }

    const testAssignments = this.userAssignments.get(testId)!
    if (testAssignments.has(userId)) {
      const variantId = testAssignments.get(userId)!
      return test.variants.find(v => v.id === variantId) || null
    }

    // Assign user to variant based on traffic split and weights
    const shouldInclude = Math.random() < (test.trafficSplit / 100)
    if (!shouldInclude) {
      return null
    }

    const variant = this.selectVariantByWeight(test.variants)
    testAssignments.set(userId, variant.id)
    
    // Track impression
    this.trackImpression(testId, variant.id)

    return variant
  }

  /**
   * Generate optimized meta content based on variant
   */
  generateOptimizedContent(variant: ABTestVariant, originalContent: string): string {
    let optimizedContent = originalContent

    if (variant.title) {
      optimizedContent = variant.title
    }

    if (variant.description) {
      optimizedContent = variant.description
    }

    if (variant.headline) {
      optimizedContent = variant.headline
    }

    // Apply CTR bait modifications
    if (variant.emoji) {
      optimizedContent = this.addEmojis(optimizedContent)
    }

    if (variant.brackets) {
      optimizedContent = this.addBrackets(optimizedContent)
    }

    if (variant.numbers) {
      optimizedContent = this.addNumbers(optimizedContent)
    }

    if (variant.urgency) {
      optimizedContent = this.addUrgency(optimizedContent)
    }

    return optimizedContent
  }

  /**
   * Track impression for a variant
   */
  trackImpression(testId: string, variantId: string): void {
    const testResults = this.results.get(testId)
    if (!testResults) return

    const result = testResults.get(variantId)
    if (!result) return

    result.impressions++
    this.updateCTR(result)
    this.saveResultsToStorage()

    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_impression', {
        event_category: 'AB Testing',
        event_label: `${testId}_${variantId}`,
        custom_parameters: {
          test_id: testId,
          variant_id: variantId
        }
      })
    }
  }

  /**
   * Track click for a variant
   */
  trackClick(testId: string, variantId: string): void {
    const testResults = this.results.get(testId)
    if (!testResults) return

    const result = testResults.get(variantId)
    if (!result) return

    result.clicks++
    this.updateCTR(result)
    this.saveResultsToStorage()

    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_click', {
        event_category: 'AB Testing',
        event_label: `${testId}_${variantId}`,
        custom_parameters: {
          test_id: testId,
          variant_id: variantId
        }
      })
    }
  }

  /**
   * Track conversion for a variant
   */
  trackConversion(testId: string, variantId: string): void {
    const testResults = this.results.get(testId)
    if (!testResults) return

    const result = testResults.get(variantId)
    if (!result) return

    result.conversions++
    this.updateConversionRate(result)
    this.saveResultsToStorage()

    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_conversion', {
        event_category: 'AB Testing',
        event_label: `${testId}_${variantId}`,
        custom_parameters: {
          test_id: testId,
          variant_id: variantId
        }
      })
    }
  }

  /**
   * Get test results with statistical significance
   */
  getTestResults(testId: string): Map<string, ABTestResult> | null {
    const results = this.results.get(testId)
    if (!results) return null

    // Calculate statistical significance
    this.calculateSignificance(testId)

    return results
  }

  /**
   * Generate CTR bait variations
   */
  generateCTRBaitVariations(originalText: string, count = 5): ABTestVariant[] {
    const variants: ABTestVariant[] = []
    const templates: CTRBaitTemplate[] = [
      { type: 'emoji', prefix: '🚀 ', suffix: ' 💯' },
      { type: 'brackets', prefix: '[PROVEN] ', suffix: '' },
      { type: 'numbers', prefix: '2024: ', suffix: '' },
      { type: 'urgency', prefix: '', suffix: ' - Limited Time!' },
      { type: 'curiosity', prefix: 'The Secret to ', suffix: ' (You Won\'t Believe #3)' }
    ]

    templates.slice(0, count).forEach((template, index) => {
      const optimizedText = this.applyCTRTemplate(originalText, template)
      variants.push({
        id: `ctr_variant_${index + 1}`,
        name: `CTR Variant ${index + 1} (${template.type})`,
        title: optimizedText,
        emoji: template.type === 'emoji',
        brackets: template.type === 'brackets',
        numbers: template.type === 'numbers',
        urgency: template.type === 'urgency',
        weight: 20,
        active: true
      })
    })

    return variants
  }

  /**
   * Create meta description A/B test
   */
  createMetaDescriptionTest(page: string, originalDescription: string, variations: string[]): string {
    const testId = `meta_desc_${page}_${Date.now()}`
    
    const variants: ABTestVariant[] = [
      {
        id: 'control',
        name: 'Control (Original)',
        description: originalDescription,
        weight: 50,
        active: true
      }
    ]

    // Add variations
    variations.forEach((variation, index) => {
      variants.push({
        id: `variation_${index + 1}`,
        name: `Variation ${index + 1}`,
        description: variation,
        weight: 50 / variations.length,
        active: true
      })
    })

    const config: ABTestConfig = {
      id: testId,
      name: `Meta Description Test - ${page}`,
      type: 'meta_description',
      page,
      variants,
      trafficSplit: 100,
      startDate: new Date(),
      goalMetric: 'ctr',
      active: true
    }

    this.createTest(config)
    return testId
  }

  /**
   * Create headline A/B test
   */
  createHeadlineTest(page: string, originalHeadline: string, variations: string[]): string {
    const testId = `headline_${page}_${Date.now()}`
    
    const variants: ABTestVariant[] = [
      {
        id: 'control',
        name: 'Control (Original)',
        headline: originalHeadline,
        weight: 50,
        active: true
      }
    ]

    // Add CTR bait variations
    const ctrVariations = this.generateCTRBaitVariations(originalHeadline, variations.length)
    variants.push(...ctrVariations)

    const config: ABTestConfig = {
      id: testId,
      name: `Headline Test - ${page}`,
      type: 'headline',
      page,
      variants,
      trafficSplit: 100,
      startDate: new Date(),
      goalMetric: 'ctr',
      active: true
    }

    this.createTest(config)
    return testId
  }

  // Private helper methods
  private validateTestConfig(config: ABTestConfig): void {
    if (!config.id || !config.name || !config.variants.length) {
      throw new Error('Invalid test configuration')
    }

    if (config.variants.length < 2) {
      throw new Error('Test must have at least 2 variants')
    }

    const totalWeight = config.variants.reduce((sum, v) => sum + v.weight, 0)
    if (Math.abs(totalWeight - 100) > 0.01) {
      throw new Error('Variant weights must sum to 100')
    }
  }

  private selectVariantByWeight(variants: ABTestVariant[]): ABTestVariant {
    const random = Math.random() * 100
    let cumulative = 0

    for (const variant of variants) {
      if (!variant.active) continue
      cumulative += variant.weight
      if (random <= cumulative) {
        return variant
      }
    }

    return variants[0] // Fallback
  }

  private updateCTR(result: ABTestResult): void {
    result.ctr = result.impressions > 0 ? (result.clicks / result.impressions) * 100 : 0
  }

  private updateConversionRate(result: ABTestResult): void {
    result.conversionRate = result.clicks > 0 ? (result.conversions / result.clicks) * 100 : 0
  }

  private calculateSignificance(testId: string): void {
    const results = this.results.get(testId)
    if (!results) return

    const resultsArray = Array.from(results.values())
    if (resultsArray.length < 2) return

    // Find control variant (usually first one or named 'control')
    const control = resultsArray[0]
    
    resultsArray.forEach((variant, index) => {
      if (index === 0) return // Skip control

      const { significance, confidence } = this.calculateTwoTailedTest(control, variant)
      variant.confidence = confidence
      variant.isWinner = significance > 0.95 && variant.ctr > control.ctr
    })
  }

  private calculateTwoTailedTest(control: ABTestResult, variant: ABTestResult): { significance: number, confidence: number } {
    // Simple two-proportion z-test
    const p1 = control.clicks / control.impressions
    const p2 = variant.clicks / variant.impressions
    const n1 = control.impressions
    const n2 = variant.impressions

    if (n1 === 0 || n2 === 0) return { significance: 0, confidence: 0 }

    const pooledP = (control.clicks + variant.clicks) / (n1 + n2)
    const se = Math.sqrt(pooledP * (1 - pooledP) * (1/n1 + 1/n2))
    
    if (se === 0) return { significance: 0, confidence: 0 }

    const z = Math.abs(p1 - p2) / se
    const significance = 2 * (1 - this.normalCDF(z))
    const confidence = 1 - significance

    return { significance, confidence }
  }

  private normalCDF(z: number): number {
    // Approximation of standard normal CDF
    return 0.5 * (1 + this.erf(z / Math.sqrt(2)))
  }

  private erf(x: number): number {
    // Approximation of error function
    const a1 =  0.254829592
    const a2 = -0.284496736
    const a3 =  1.421413741
    const a4 = -1.453152027
    const a5 =  1.061405429
    const p  =  0.3275911

    const sign = x < 0 ? -1 : 1
    x = Math.abs(x)

    const t = 1.0 / (1.0 + p * x)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

    return sign * y
  }

  // CTR enhancement methods
  private addEmojis(text: string): string {
    const emojis = ['🚀', '💯', '✅', '🔥', '⚡', '💎', '🎯', '📈']
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    return `${emoji} ${text}`
  }

  private addBrackets(text: string): string {
    const modifiers = ['PROVEN', 'EXCLUSIVE', 'NEW', 'UPDATED', 'EXPERT', 'SECRET']
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)]
    return `[${modifier}] ${text}`
  }

  private addNumbers(text: string): string {
    const currentYear = new Date().getFullYear()
    return `${currentYear}: ${text}`
  }

  private addUrgency(text: string): string {
    const urgencyPhrases = ['Limited Time!', 'Act Now!', 'Don\'t Miss Out!', 'Today Only!']
    const phrase = urgencyPhrases[Math.floor(Math.random() * urgencyPhrases.length)]
    return `${text} - ${phrase}`
  }

  private applyCTRTemplate(text: string, template: CTRBaitTemplate): string {
    let result = text

    if (template.prefix) {
      result = template.prefix + result
    }

    if (template.suffix) {
      result = result + template.suffix
    }

    return result
  }

  // Storage methods
  private loadTestsFromStorage(): void {
    if (typeof window === 'undefined') return

    try {
      const testsData = localStorage.getItem('ab_tests')
      const resultsData = localStorage.getItem('ab_results')
      const assignmentsData = localStorage.getItem('ab_assignments')

      if (testsData) {
        const tests = JSON.parse(testsData)
        Object.entries(tests).forEach(([id, config]) => {
          this.tests.set(id, config as ABTestConfig)
        })
      }

      if (resultsData) {
        const results = JSON.parse(resultsData)
        Object.entries(results).forEach(([testId, testResults]) => {
          const resultMap = new Map()
          Object.entries(testResults as any).forEach(([variantId, result]) => {
            resultMap.set(variantId, result)
          })
          this.results.set(testId, resultMap)
        })
      }

      if (assignmentsData) {
        const assignments = JSON.parse(assignmentsData)
        Object.entries(assignments).forEach(([testId, testAssignments]) => {
          const assignmentMap = new Map()
          Object.entries(testAssignments as any).forEach(([userId, variantId]) => {
            assignmentMap.set(userId, variantId)
          })
          this.userAssignments.set(testId, assignmentMap)
        })
      }
    } catch (error) {
      console.error('Error loading A/B tests from storage:', error)
    }
  }

  private saveTestsToStorage(): void {
    if (typeof window === 'undefined') return

    try {
      const testsObj = Object.fromEntries(this.tests)
      localStorage.setItem('ab_tests', JSON.stringify(testsObj))
    } catch (error) {
      console.error('Error saving A/B tests to storage:', error)
    }
  }

  private saveResultsToStorage(): void {
    if (typeof window === 'undefined') return

    try {
      const resultsObj: any = {}
      this.results.forEach((testResults, testId) => {
        resultsObj[testId] = Object.fromEntries(testResults)
      })
      localStorage.setItem('ab_results', JSON.stringify(resultsObj))

      const assignmentsObj: any = {}
      this.userAssignments.forEach((testAssignments, testId) => {
        assignmentsObj[testId] = Object.fromEntries(testAssignments)
      })
      localStorage.setItem('ab_assignments', JSON.stringify(assignmentsObj))
    } catch (error) {
      console.error('Error saving A/B test results to storage:', error)
    }
  }

  private initializeTracking(): void {
    if (typeof window === 'undefined') return

    // Track page views for impression counting
    const originalPushState = window.history.pushState
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args)
      // Trigger AB test evaluation on navigation
      setTimeout(() => {
        window.dispatchEvent(new Event('ab-test-navigation'))
      }, 100)
    }

    // Track clicks on elements with AB test variants
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      const testData = target.dataset.abTest
      if (testData) {
        const [testId, variantId] = testData.split(':')
        this.trackClick(testId, variantId)
      }
    })
  }
}

// Global instance
export const abTestingEngine = new ABTestingEngine()

// Utility functions for easy integration
export function getABTestVariant(testId: string, userId: string, page?: string): ABTestVariant | null {
  return abTestingEngine.getVariantForUser(testId, userId, page)
}

export function trackABTestImpression(testId: string, variantId: string): void {
  abTestingEngine.trackImpression(testId, variantId)
}

export function trackABTestClick(testId: string, variantId: string): void {
  abTestingEngine.trackClick(testId, variantId)
}

export function trackABTestConversion(testId: string, variantId: string): void {
  abTestingEngine.trackConversion(testId, variantId)
} 