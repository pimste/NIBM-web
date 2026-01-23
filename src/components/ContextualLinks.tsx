'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { generateContextualLinks, LinkSuggestion } from '@/lib/seo/contextual-linking'

interface ContextualLinksProps {
  content: string
  keywords?: string[]
  maxLinks?: number
  className?: string
}

export function ContextualLinks({
  content,
  keywords = [],
  maxLinks = 5,
  className = ''
}: ContextualLinksProps) {
  const pathname = usePathname()
  const currentUrl = pathname || ''

  // Generate link suggestions
  const linkSuggestions = useMemo(() => {
    if (!content || content.length < 100) return []
    
    try {
      return generateContextualLinks(content, currentUrl, keywords)
        .slice(0, maxLinks)
    } catch (error) {
      console.error('Error generating contextual links:', error)
      return []
    }
  }, [content, currentUrl, keywords, maxLinks])

  if (linkSuggestions.length === 0) {
    return null
  }

  return (
    <div className={`contextual-links ${className}`}>
      <div className="flex flex-wrap gap-2">
        {linkSuggestions.map((suggestion, index) => (
          <Link
            key={`${suggestion.targetUrl}-${index}`}
            href={suggestion.targetUrl}
            className="inline-block px-3 py-1 text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md transition-colors"
            title={suggestion.reason}
          >
            {suggestion.anchorText}
          </Link>
        ))}
      </div>
    </div>
  )
}

/**
 * Component that injects contextual links into content
 */
export function ContentWithContextualLinks({
  content,
  keywords = [],
  maxLinks = 5
}: {
  content: string
  keywords?: string[]
  maxLinks?: number
}) {
  const pathname = usePathname()
  const currentUrl = pathname || ''

  // Generate link suggestions
  const linkSuggestions = useMemo(() => {
    if (!content || content.length < 100) return []
    
    try {
      return generateContextualLinks(content, currentUrl, keywords)
        .slice(0, maxLinks)
    } catch (error) {
      console.error('Error generating contextual links:', error)
      return []
    }
  }, [content, currentUrl, keywords, maxLinks])

  // Inject links into content
  const contentWithLinks = useMemo(() => {
    if (linkSuggestions.length === 0) return content

    let modifiedContent = content
    const processed = new Set<string>()

    // Sort by position (reverse to maintain positions when inserting)
    const sortedSuggestions = [...linkSuggestions].sort((a, b) => b.position - a.position)

    sortedSuggestions.forEach(suggestion => {
      if (processed.has(suggestion.targetUrl)) return
      processed.add(suggestion.targetUrl)

      // Find the anchor text in content
      const anchorIndex = modifiedContent.indexOf(suggestion.anchorText)
      if (anchorIndex !== -1) {
        const before = modifiedContent.substring(0, anchorIndex)
        const after = modifiedContent.substring(anchorIndex + suggestion.anchorText.length)
        const link = `<a href="${suggestion.targetUrl}" class="internal-link text-blue-600 hover:text-blue-800 underline">${suggestion.anchorText}</a>`
        
        modifiedContent = before + link + after
      }
    })

    return modifiedContent
  }, [content, linkSuggestions])

  return (
    <div 
      className="content-with-links"
      dangerouslySetInnerHTML={{ __html: contentWithLinks }}
    />
  )
}
