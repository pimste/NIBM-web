'use client'

import Head from 'next/head'
import { usePathname } from 'next/navigation'

interface CanonicalTagsProps {
  siteUrl?: string
}

export function CanonicalTags({ siteUrl = 'https://www.nibmvb.eu' }: CanonicalTagsProps) {
  const pathname = usePathname() || ''
  
  // Extract the path segments
  const pathSegments = pathname.split('/').filter(Boolean)
  
  // Check if the URL has a language prefix
  const hasLangPrefix = ['en', 'nl', 'de'].includes(pathSegments[0])
  
  // Determine the language for the canonical URL
  const language = hasLangPrefix ? pathSegments[0] : 'en'
  
  // Generate the canonical URL
  // - For homepage, language URLs like /en or /nl are canonical
  // - For other pages, we use the language prefix in the canonical URL
  let canonicalUrl = `${siteUrl}/${language}`
  
  if (pathSegments.length > (hasLangPrefix ? 1 : 0)) {
    // Get the path without language prefix
    const pathWithoutLang = hasLangPrefix 
      ? '/' + pathSegments.slice(1).join('/')
      : pathname
      
    // Add the path to the canonical URL
    canonicalUrl = `${siteUrl}/${language}${pathWithoutLang}`
  }
  
  // Normalize the URL (remove trailing slash except for homepage)
  if (canonicalUrl.endsWith('/') && canonicalUrl !== `${siteUrl}/${language}/`) {
    canonicalUrl = canonicalUrl.slice(0, -1)
  }
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
} 