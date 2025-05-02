'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { usePathname } from 'next/navigation'

export function LangAttributeUpdater({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  const pathname = usePathname()

  // Update lang attribute when language changes, client-side only
  useEffect(() => {
    // Check if the URL has a language prefix that should override the language context
    if (pathname) {
      const pathParts = pathname.split('/').filter(Boolean)
      const urlLang = pathParts[0]
      
      if (['en', 'nl', 'de'].includes(urlLang)) {
        // URL language takes precedence
        if (document.documentElement.lang !== urlLang) {
          document.documentElement.lang = urlLang
        }
        return
      }
    }
    
    // Fall back to language from context
    if (document.documentElement.lang !== language) {
      document.documentElement.lang = language
    }
  }, [language, pathname])

  return <>{children}</>
} 