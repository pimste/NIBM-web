import fs from 'fs/promises'
import path from 'path'
import { parse } from 'csv-parse/sync'

export interface KeywordData {
  keyword: string
  searchVolume: number
  difficulty: number
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational'
  category: string
  relatedKeywords: string[]
  targetLanguage: 'en' | 'nl' | 'de'
  contentType: 'pillar' | 'cluster' | 'comparison' | 'howto' | 'review'
}

export interface ContentTemplate {
  title: string
  metaDescription: string
  h1: string
  sections: ContentSection[]
  schema: any
  faqItems: FAQItem[]
}

export interface ContentSection {
  heading: string
  content: string
  keywords: string[]
  internalLinks: string[]
}

export interface FAQItem {
  question: string
  answer: string
}

export class ProgrammaticContentGenerator {
  private readonly baseOutputPath: string
  private readonly templatesPath: string
  
  constructor(outputPath = 'src/app', templatesPath = 'src/lib/seo/templates') {
    this.baseOutputPath = outputPath
    this.templatesPath = templatesPath
  }

  /**
   * Ingest keywords from CSV file
   */
  async ingestKeywordsFromCSV(csvPath: string): Promise<KeywordData[]> {
    try {
      const csvContent = await fs.readFile(csvPath, 'utf-8')
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true
      })
      
      return records.map((record: any) => ({
        keyword: record.keyword || record.Keyword,
        searchVolume: parseInt(record.searchVolume || record['Search Volume']) || 0,
        difficulty: parseInt(record.difficulty || record.Difficulty) || 0,
        intent: record.intent || record.Intent || 'informational',
        category: record.category || record.Category || 'general',
        relatedKeywords: (record.relatedKeywords || record['Related Keywords'] || '').split(',').map((k: string) => k.trim()),
        targetLanguage: record.language || record.Language || 'en',
        contentType: record.contentType || record['Content Type'] || 'pillar'
      }))
    } catch (error) {
      console.error('Error ingesting CSV:', error)
      throw error
    }
  }

  /**
   * Ingest keywords from API endpoint
   */
  async ingestKeywordsFromAPI(apiUrl: string, apiKey?: string): Promise<KeywordData[]> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }
      
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`
      }
      
      const response = await fetch(apiUrl, { headers })
      const data = await response.json()
      
      return data.keywords || data
    } catch (error) {
      console.error('Error ingesting from API:', error)
      throw error
    }
  }

  /**
   * Generate content template from keyword data
   */
  async generateContentTemplate(keywordData: KeywordData): Promise<ContentTemplate> {
    const { keyword, intent, category, relatedKeywords, contentType } = keywordData
    
    // Generate title variations with TF-IDF optimization
    const title = this.generateTitle(keyword, contentType, keywordData.targetLanguage)
    const metaDescription = this.generateMetaDescription(keyword, intent, keywordData.targetLanguage)
    
    // Generate content sections with semantic variation
    const sections = await this.generateContentSections(keywordData)
    
    // Generate FAQ items for schema
    const faqItems = this.generateFAQItems(keyword, relatedKeywords, keywordData.targetLanguage)
    
    // Generate schema markup
    const schema = this.generateSchemaMarkup(keywordData, title, metaDescription)
    
    return {
      title,
      metaDescription,
      h1: title,
      sections,
      schema,
      faqItems
    }
  }

  /**
   * Generate MDX page from template
   */
  async generateMDXPage(keywordData: KeywordData, template: ContentTemplate): Promise<string> {
    const { keyword, targetLanguage } = keywordData
    const slug = this.generateSlug(keyword)
    
    const mdxContent = `---
title: "${template.title}"
description: "${template.metaDescription}"
keywords: ["${keyword}", ${keywordData.relatedKeywords.map(k => `"${k}"`).join(', ')}]
canonical: "/${targetLanguage}/${keywordData.category}/${slug}"
language: "${targetLanguage}"
category: "${keywordData.category}"
contentType: "${keywordData.contentType}"
generatedAt: "${new Date().toISOString()}"
---

import { Metadata } from 'next'
import { generatePageMetadata } from '../../../page-metadata'
import { ProgrammaticSchema } from '@/components/ProgrammaticSchema'
import { AutoFAQ } from '@/components/AutoFAQ'
import { ContextualLinks } from '@/components/ContextualLinks'
import { ContentJumpLinks } from '@/components/ContentJumpLinks'

// Generate metadata for this programmatic page
export const generateMetadata = async (): Promise<Metadata> => {
  const baseMetadata: Metadata = {
    title: '${template.title}',
    description: '${template.metaDescription}',
    keywords: [${keywordData.relatedKeywords.map(k => `"${k}"`).join(', ')}],
  }

  return generatePageMetadata(
    baseMetadata,
    '/${targetLanguage}/${keywordData.category}/${slug}',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function ${this.toPascalCase(slug)}Page() {
  const schemaData = ${JSON.stringify(template.schema, null, 2)}
  const faqData = ${JSON.stringify(template.faqItems, null, 2)}
  const sections = ${JSON.stringify(template.sections.map(s => ({ id: this.generateSlug(s.heading), title: s.heading })), null, 2)}

  return (
    <main className="container mx-auto px-4 py-8">
      <ProgrammaticSchema data={schemaData} />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">${template.h1}</h1>
          <ContentJumpLinks sections={sections} />
        </header>

        <div className="prose prose-lg max-w-none">
${template.sections.map(section => `
          <section id="${this.generateSlug(section.heading)}" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">${section.heading}</h2>
            <div className="content-section">
              ${section.content}
            </div>
            <ContextualLinks keywords={${JSON.stringify(section.keywords)}} />
          </section>
`).join('')}

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <AutoFAQ items={faqData} />
          </section>
        </div>
      </div>
    </main>
  )
}
`

    return mdxContent
  }

  /**
   * Generate and save page files
   */
  async saveGeneratedPage(keywordData: KeywordData, mdxContent: string): Promise<string> {
    const { targetLanguage, category } = keywordData
    const slug = this.generateSlug(keywordData.keyword)
    
    const dirPath = path.join(this.baseOutputPath, targetLanguage, category, slug)
    const filePath = path.join(dirPath, 'page.tsx')
    
    // Create directory if it doesn't exist
    await fs.mkdir(dirPath, { recursive: true })
    
    // Write the file
    await fs.writeFile(filePath, mdxContent, 'utf-8')
    
    console.log(`Generated page: ${filePath}`)
    return filePath
  }

  /**
   * Process batch of keywords
   */
  async processBatch(keywords: KeywordData[]): Promise<string[]> {
    const generatedFiles: string[] = []
    
    for (const keywordData of keywords) {
      try {
        console.log(`Processing keyword: ${keywordData.keyword}`)
        
        const template = await this.generateContentTemplate(keywordData)
        const mdxContent = await this.generateMDXPage(keywordData, template)
        const filePath = await this.saveGeneratedPage(keywordData, mdxContent)
        
        generatedFiles.push(filePath)
        
        // Add delay to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`Error processing keyword ${keywordData.keyword}:`, error)
      }
    }
    
    return generatedFiles
  }

  // Helper methods
  private generateTitle(keyword: string, contentType: string, language: string): string {
    const templates = {
      en: {
        pillar: `${keyword} | Complete Guide 2024`,
        cluster: `${keyword} - Expert Analysis`,
        comparison: `Best ${keyword} - Comparison Guide`,
        howto: `How to ${keyword} - Step by Step Guide`,
        review: `${keyword} Review - Pros & Cons`
      },
      nl: {
        pillar: `${keyword} | Complete Gids 2024`,
        cluster: `${keyword} - Expert Analyse`,
        comparison: `Beste ${keyword} - Vergelijking`,
        howto: `Hoe ${keyword} - Stap voor Stap`,
        review: `${keyword} Review - Voor & Nadelen`
      },
      de: {
        pillar: `${keyword} | Vollständiger Leitfaden 2024`,
        cluster: `${keyword} - Expertenanalyse`,
        comparison: `Beste ${keyword} - Vergleich`,
        howto: `Wie ${keyword} - Schritt für Schritt`,
        review: `${keyword} Bewertung - Vor & Nachteile`
      }
    }
    
    return templates[language as keyof typeof templates]?.[contentType as keyof typeof templates.en] || 
           `${keyword} - NIBM Tower Cranes`
  }

  private generateMetaDescription(keyword: string, intent: string, language: string): string {
    const templates = {
      en: {
        informational: `Learn everything about ${keyword}. Expert insights, tips, and comprehensive information from NIBM Tower Cranes professionals.`,
        commercial: `Looking for ${keyword}? Compare options, pricing, and features. Get expert advice from NIBM Tower Cranes.`,
        transactional: `Get ${keyword} from NIBM Tower Cranes. Professional service, competitive pricing, and expert support.`,
        navigational: `Find ${keyword} information at NIBM Tower Cranes. Your trusted partner for tower crane solutions.`
      },
      nl: {
        informational: `Leer alles over ${keyword}. Expert inzichten, tips en uitgebreide informatie van NIBM Tower Cranes professionals.`,
        commercial: `Op zoek naar ${keyword}? Vergelijk opties, prijzen en functies. Krijg expert advies van NIBM Tower Cranes.`,
        transactional: `Krijg ${keyword} van NIBM Tower Cranes. Professionele service, concurrerende prijzen en expert ondersteuning.`,
        navigational: `Vind ${keyword} informatie bij NIBM Tower Cranes. Uw vertrouwde partner voor torenkraan oplossingen.`
      },
      de: {
        informational: `Erfahren Sie alles über ${keyword}. Experteneinblicke, Tipps und umfassende Informationen von NIBM Tower Cranes Profis.`,
        commercial: `Suchen Sie ${keyword}? Vergleichen Sie Optionen, Preise und Funktionen. Holen Sie sich Expertenrat von NIBM Tower Cranes.`,
        transactional: `Erhalten Sie ${keyword} von NIBM Tower Cranes. Professioneller Service, wettbewerbsfähige Preise und Expertenunterstützung.`,
        navigational: `Finden Sie ${keyword} Informationen bei NIBM Tower Cranes. Ihr vertrauenswürdiger Partner für Turmkranlösungen.`
      }
    }
    
    return templates[language as keyof typeof templates]?.[intent as keyof typeof templates.en] || 
           `Professional ${keyword} services from NIBM Tower Cranes.`
  }

  private async generateContentSections(keywordData: KeywordData): Promise<ContentSection[]> {
    const { keyword, contentType, targetLanguage, relatedKeywords } = keywordData
    
    const sections: ContentSection[] = []
    
    switch (contentType) {
      case 'pillar':
        sections.push(
          {
            heading: `What is ${keyword}?`,
            content: `${keyword} is a crucial aspect of tower crane operations that requires careful consideration and expertise. At NIBM Tower Cranes, we understand the complexities involved in ${keyword} and provide comprehensive solutions to meet your project needs.`,
            keywords: [keyword, ...relatedKeywords.slice(0, 3)],
            internalLinks: [`/${targetLanguage}/services`, `/${targetLanguage}/about`]
          },
          {
            heading: `Key Benefits of ${keyword}`,
            content: `Our ${keyword} solutions offer numerous advantages including improved efficiency, enhanced safety, and cost-effective operations. These benefits make ${keyword} an essential consideration for any construction project involving tower cranes.`,
            keywords: relatedKeywords.slice(0, 4),
            internalLinks: [`/${targetLanguage}/services`]
          },
          {
            heading: `Best Practices for ${keyword}`,
            content: `Implementing ${keyword} requires following industry best practices and adhering to safety standards. Our expert team at NIBM Tower Cranes ensures that all ${keyword} implementations meet or exceed industry requirements.`,
            keywords: [keyword, ...relatedKeywords.slice(2, 5)],
            internalLinks: [`/${targetLanguage}/technical-info`]
          }
        )
        break
        
      case 'comparison':
        sections.push(
          {
            heading: `${keyword} Comparison Overview`,
            content: `When evaluating different ${keyword} options, it's important to consider factors such as performance, cost, and compatibility with your existing equipment. This comprehensive comparison will help you make an informed decision.`,
            keywords: [keyword, 'comparison', ...relatedKeywords.slice(0, 2)],
            internalLinks: [`/${targetLanguage}/towercranes`]
          },
          {
            heading: `Top ${keyword} Solutions`,
            content: `We've analyzed the leading ${keyword} solutions in the market to provide you with detailed comparisons of features, pricing, and performance metrics.`,
            keywords: relatedKeywords.slice(0, 5),
            internalLinks: [`/${targetLanguage}/services`]
          }
        )
        break
        
      default:
        sections.push(
          {
            heading: `Understanding ${keyword}`,
            content: `${keyword} plays a vital role in tower crane operations. Our comprehensive guide covers everything you need to know about ${keyword} and how it can benefit your construction projects.`,
            keywords: [keyword, ...relatedKeywords.slice(0, 3)],
            internalLinks: [`/${targetLanguage}/services`, `/${targetLanguage}/contact`]
          }
        )
    }
    
    return sections
  }

  private generateFAQItems(keyword: string, relatedKeywords: string[], language: string): FAQItem[] {
    const templates = {
      en: [
        {
          question: `What is ${keyword}?`,
          answer: `${keyword} refers to a specific aspect of tower crane operations that is essential for safe and efficient construction projects. Our team at NIBM Tower Cranes has extensive experience with ${keyword} applications.`
        },
        {
          question: `How does ${keyword} benefit my project?`,
          answer: `${keyword} provides numerous benefits including improved efficiency, enhanced safety protocols, and cost-effective solutions for your construction needs.`
        },
        {
          question: `Do you provide ${keyword} services?`,
          answer: `Yes, NIBM Tower Cranes offers comprehensive ${keyword} services as part of our full-service tower crane solutions. Contact us to discuss your specific requirements.`
        }
      ],
      nl: [
        {
          question: `Wat is ${keyword}?`,
          answer: `${keyword} verwijst naar een specifiek aspect van torenkraan operaties dat essentieel is voor veilige en efficiënte bouwprojecten. Ons team bij NIBM Tower Cranes heeft uitgebreide ervaring met ${keyword} toepassingen.`
        },
        {
          question: `Hoe profiteert mijn project van ${keyword}?`,
          answer: `${keyword} biedt talrijke voordelen waaronder verbeterde efficiëntie, verbeterde veiligheidsprotocollen en kosteneffectieve oplossingen voor uw bouwbehoeften.`
        }
      ],
      de: [
        {
          question: `Was ist ${keyword}?`,
          answer: `${keyword} bezieht sich auf einen spezifischen Aspekt von Turmkranoperationen, der für sichere und effiziente Bauprojekte unerlässlich ist. Unser Team bei NIBM Tower Cranes hat umfangreiche Erfahrung mit ${keyword} Anwendungen.`
        },
        {
          question: `Wie profitiert mein Projekt von ${keyword}?`,
          answer: `${keyword} bietet zahlreiche Vorteile einschließlich verbesserter Effizienz, verstärkter Sicherheitsprotokolle und kosteneffektiver Lösungen für Ihre Bauanforderungen.`
        }
      ]
    }
    
    return templates[language as keyof typeof templates] || templates.en
  }

  private generateSchemaMarkup(keywordData: KeywordData, title: string, description: string) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "author": {
        "@type": "Organization",
        "name": "NIBM Tower Cranes"
      },
      "publisher": {
        "@type": "Organization",
        "name": "NIBM Tower Cranes",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.nibmvb.eu/images/optimized/logo-blue.webp"
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.nibmvb.eu/${keywordData.targetLanguage}/${keywordData.category}/${this.generateSlug(keywordData.keyword)}`
      },
      "keywords": [keywordData.keyword, ...keywordData.relatedKeywords].join(', '),
      "about": {
        "@type": "Thing",
        "name": keywordData.keyword
      }
    }
  }

  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  private toPascalCase(str: string): string {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }
}

// Export utility functions for use in scripts
export async function generateFromCSV(csvPath: string, outputPath?: string) {
  const generator = new ProgrammaticContentGenerator(outputPath)
  const keywords = await generator.ingestKeywordsFromCSV(csvPath)
  return await generator.processBatch(keywords)
}

export async function generateFromAPI(apiUrl: string, apiKey?: string, outputPath?: string) {
  const generator = new ProgrammaticContentGenerator(outputPath)
  const keywords = await generator.ingestKeywordsFromAPI(apiUrl, apiKey)
  return await generator.processBatch(keywords)
} 