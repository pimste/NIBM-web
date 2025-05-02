'use client'

import { usePathname } from 'next/navigation'
import Head from 'next/head'

// Define the supported languages
const languages = ['en', 'nl', 'de']
const baseUrl = 'https://www.nibmvb.eu'

export function HreflangTags() {
  const pathname = usePathname()
  
  if (!pathname) return null
  
  // Extract the path without language prefix
  const pathParts = pathname.split('/').filter(Boolean)
  const hasLangPrefix = languages.includes(pathParts[0])
  
  // Get the path without language prefix
  const pathWithoutLang = hasLangPrefix 
    ? '/' + pathParts.slice(1).join('/')
    : pathname
  
  // Current language is the first part of the path or default to 'en'
  const currentLang = hasLangPrefix ? pathParts[0] : 'en'
  
  // Generate alternate URLs for each language
  const alternateUrls = languages.map(lang => {
    // For homepage
    if (pathWithoutLang === '/') {
      return {
        lang,
        url: `${baseUrl}/${lang}`
      }
    }
    
    // For other pages
    return {
      lang,
      url: `${baseUrl}/${lang}${pathWithoutLang}`
    }
  })
  
  return (
    <Head>
      {/* Generate hreflang tags for each language */}
      {alternateUrls.map(({ lang, url }) => (
        <link 
          key={lang}
          rel="alternate" 
          hrefLang={lang} 
          href={url}
        />
      ))}
      
      {/* Add x-default for search engines */}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${baseUrl}/en${pathWithoutLang}`}
      />
    </Head>
  )
} 