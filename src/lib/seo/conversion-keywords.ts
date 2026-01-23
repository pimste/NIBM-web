/**
 * Conversion-focused keywords for crane inquiries
 * These keywords target users with buying/renting intent
 */

export interface ConversionKeyword {
  keyword: string
  intent: 'buy' | 'rent' | 'quote' | 'contact' | 'price'
  priority: 'high' | 'medium' | 'low'
  searchVolume?: number
  competition?: 'low' | 'medium' | 'high'
}

export const conversionKeywords: Record<string, ConversionKeyword[]> = {
  // High-intent purchase keywords
  buy: [
    { keyword: 'buy tower crane', intent: 'buy', priority: 'high' },
    { keyword: 'tower crane for sale', intent: 'buy', priority: 'high' },
    { keyword: 'used tower crane for sale', intent: 'buy', priority: 'high' },
    { keyword: 'potain crane for sale', intent: 'buy', priority: 'high' },
    { keyword: 'tower crane price', intent: 'buy', priority: 'high' },
    { keyword: 'tower crane cost', intent: 'buy', priority: 'high' },
    { keyword: 'where to buy tower crane', intent: 'buy', priority: 'high' },
    { keyword: 'tower crane dealer', intent: 'buy', priority: 'medium' },
    { keyword: 'tower crane sales', intent: 'buy', priority: 'medium' },
  ],
  
  // High-intent rental keywords
  rent: [
    { keyword: 'tower crane rental', intent: 'rent', priority: 'high' },
    { keyword: 'rent tower crane', intent: 'rent', priority: 'high' },
    { keyword: 'tower crane hire', intent: 'rent', priority: 'high' },
    { keyword: 'crane rental quote', intent: 'quote', priority: 'high' },
    { keyword: 'tower crane rental price', intent: 'rent', priority: 'high' },
    { keyword: 'tower crane rental cost', intent: 'rent', priority: 'high' },
    { keyword: 'construction crane rental', intent: 'rent', priority: 'high' },
    { keyword: 'tower crane leasing', intent: 'rent', priority: 'medium' },
  ],
  
  // Quote/contact intent
  quote: [
    { keyword: 'tower crane quote', intent: 'quote', priority: 'high' },
    { keyword: 'crane rental quote', intent: 'quote', priority: 'high' },
    { keyword: 'get crane quote', intent: 'quote', priority: 'high' },
    { keyword: 'tower crane inquiry', intent: 'contact', priority: 'high' },
    { keyword: 'contact crane dealer', intent: 'contact', priority: 'high' },
    { keyword: 'crane rental inquiry', intent: 'contact', priority: 'high' },
  ],
  
  // Local + intent combinations (high conversion)
  localBuy: [
    { keyword: 'tower crane for sale Netherlands', intent: 'buy', priority: 'high' },
    { keyword: 'buy tower crane Amsterdam', intent: 'buy', priority: 'high' },
    { keyword: 'tower crane dealer Netherlands', intent: 'buy', priority: 'high' },
    { keyword: 'tower crane for sale Germany', intent: 'buy', priority: 'high' },
    { keyword: 'tower crane for sale Belgium', intent: 'buy', priority: 'high' },
  ],
  
  localRent: [
    { keyword: 'tower crane rental Netherlands', intent: 'rent', priority: 'high' },
    { keyword: 'tower crane rental Amsterdam', intent: 'rent', priority: 'high' },
    { keyword: 'tower crane rental Rotterdam', intent: 'rent', priority: 'high' },
    { keyword: 'tower crane rental Germany', intent: 'rent', priority: 'high' },
    { keyword: 'tower crane rental Belgium', intent: 'rent', priority: 'high' },
    { keyword: 'tower crane rental near me', intent: 'rent', priority: 'high' },
  ],
  
  // Urgency/action keywords
  urgent: [
    { keyword: 'tower crane available now', intent: 'contact', priority: 'high' },
    { keyword: 'immediate crane rental', intent: 'rent', priority: 'high' },
    { keyword: 'quick crane quote', intent: 'quote', priority: 'high' },
    { keyword: 'emergency crane rental', intent: 'rent', priority: 'medium' },
  ]
}

/**
 * Get conversion-focused keywords for a crane
 */
export function getConversionKeywords(
  craneName: string,
  category: 'sale' | 'rental',
  location?: string
): string[] {
  const keywords: string[] = []
  
  // Base conversion keywords based on category
  if (category === 'sale') {
    keywords.push(
      'buy tower crane',
      'tower crane for sale',
      'used tower crane',
      'tower crane price',
      `${craneName} for sale`
    )
  } else {
    keywords.push(
      'tower crane rental',
      'rent tower crane',
      'crane rental quote',
      'tower crane hire',
      `${craneName} rental`
    )
  }
  
  // Add location-specific if provided
  if (location) {
    keywords.push(
      `tower crane ${category === 'sale' ? 'for sale' : 'rental'} ${location}`,
      `buy tower crane ${location}`,
      `tower crane ${location}`
    )
  }
  
  // Always include inquiry-focused keywords
  keywords.push(
    'tower crane quote',
    'crane inquiry',
    'contact crane dealer',
    'get crane quote'
  )
  
  return keywords
}

/**
 * Generate conversion-focused meta description
 */
export function generateConversionMetaDescription(
  craneName: string,
  category: 'sale' | 'rental',
  baseDescription: string,
  includeCTA: boolean = true
): string {
  const cta = includeCTA 
    ? (category === 'sale' 
        ? ' Contact us for pricing and availability.' 
        : ' Get a free rental quote today.')
    : ''
  
  // Ensure description includes conversion keywords
  let description = baseDescription
  
  if (category === 'sale' && !description.toLowerCase().includes('sale')) {
    description = `${description} Available for sale.`
  }
  
  if (category === 'rental' && !description.toLowerCase().includes('rent')) {
    description = `${description} Available for rental.`
  }
  
  // Add CTA
  description = `${description}${cta}`
  
  // Trim to optimal length (155 chars)
  if (description.length > 155) {
    description = description.substring(0, 152) + '...'
  }
  
  return description
}

/**
 * Get all high-priority conversion keywords
 */
export function getHighPriorityConversionKeywords(): string[] {
  const allKeywords: string[] = []
  
  Object.values(conversionKeywords).forEach(keywordGroup => {
    keywordGroup
      .filter(kw => kw.priority === 'high')
      .forEach(kw => {
        if (!allKeywords.includes(kw.keyword)) {
          allKeywords.push(kw.keyword)
        }
      })
  })
  
  return allKeywords
}
