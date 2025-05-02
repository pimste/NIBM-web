import { Metadata } from 'next'

/**
 * Helper function that generates metadata with canonical URLs
 * for use with Next.js App Router metadata API
 * 
 * @param baseMetadata - base metadata to extend
 * @param pathname - current path
 * @param siteUrl - base URL of the site
 * @param languages - supported languages
 * @returns Metadata object with canonical and alternate URLs
 */
export function generatePageMetadata(
  baseMetadata: Metadata = {},
  pathname: string = '',
  siteUrl: string = 'https://www.nibmvb.eu',
  languages: string[] = ['en', 'nl', 'de']
): Metadata {
  // Extract the path segments
  const pathSegments = pathname.split('/').filter(Boolean)
  
  // Check if the URL has a language prefix
  const hasLangPrefix = languages.includes(pathSegments[0])
  
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
  
  // Generate hreflang alternate URLs
  const alternates: Record<string, string> = {}
  languages.forEach(lang => {
    let alternatePath = lang === 'en' ? '' : `/${lang}`
    
    // Get the path without language prefix
    const pathWithoutLang = hasLangPrefix 
      ? '/' + pathSegments.slice(1).join('/')
      : pathname
    
    // Add the path to the alternate URL
    if (pathWithoutLang && pathWithoutLang !== '/') {
      alternatePath += pathWithoutLang
    }
    
    // Add to alternates
    alternates[lang] = `${siteUrl}${alternatePath}`
  })
  
  return {
    ...baseMetadata,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates
    }
  }
} 