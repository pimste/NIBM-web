'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { HiChevronRight } from 'react-icons/hi'

export function BreadcrumbNav() {
  const pathname = usePathname()
  const { t: translate } = useLanguage()
  
  // Create a safe translation function
  const t = (key: string) => {
    try {
      return translate ? translate(key) || key : key
    } catch (error) {
      console.error('Translation error:', error)
      return key // Fallback to key if translation fails
    }
  }

  // Don't render breadcrumbs on the homepage
  if (!pathname || pathname === '/') {
    return null
  }

  // Split the pathname into segments
  const pathSegments = pathname.split('/').filter(Boolean)
  
  // If no segments after filtering, don't render breadcrumbs
  if (pathSegments.length === 0) {
    return null
  }

  // Get the language from the URL path (first segment)
  const supportedLanguages = ['en', 'nl', 'de']
  const urlLanguage = supportedLanguages.includes(pathSegments[0]) ? pathSegments[0] : 'en'
  
  // Check if the first segment is a language code and skip it in breadcrumbs display
  const isFirstSegmentLanguage = supportedLanguages.includes(pathSegments[0])
  const contentSegments = isFirstSegmentLanguage ? pathSegments.slice(1) : pathSegments

  // Don't render breadcrumbs if we're on the language root page
  if (isFirstSegmentLanguage && contentSegments.length === 0) {
    return null
  }

  // Convert slug-case to Title Case and get translations
  function formatSegment(segment: string) {
    // Try to get a translation for this segment
    const translationKey = `nav.${segment.replace(/-/g, '')}`
    const translation = t(translationKey)
    
    // If we got back the same key, it means there's no translation
    if (translation === translationKey) {
      // Just format the segment by replacing dashes with spaces and capitalizing
      return segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
    
    return translation
  }

  // Create the breadcrumb items
  let currentPath = isFirstSegmentLanguage ? `/${pathSegments[0]}` : ''
  const breadcrumbs = [
    // Always start with Home
    { href: isFirstSegmentLanguage ? `/${pathSegments[0]}` : '/', label: t('nav.home') }
  ]

  // Build up the breadcrumbs based on content segments
  contentSegments.forEach((segment) => {
    currentPath += `/${segment}`
    breadcrumbs.push({
      href: currentPath,
      label: formatSegment(segment)
    })
  })

  return (
    <div className="bg-primary text-white relative z-10">
      <nav 
        aria-label="Breadcrumb" 
        className="container mx-auto px-4 pt-4"
      >
        <ol className="flex flex-wrap items-center text-[10px] text-white/80 tracking-wide">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1
            
            return (
              <li key={crumb.href} className="flex items-center">
                {index > 0 && (
                  <HiChevronRight className="mx-0.5 h-2 w-2 text-white/60" aria-hidden="true" />
                )}
                
                {isLast ? (
                  <span className="font-medium text-white" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link 
                    href={crumb.href}
                    className="hover:text-primary-300 focus:text-primary-300 transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            )})}
        </ol>
      </nav>
    </div>
  )
} 