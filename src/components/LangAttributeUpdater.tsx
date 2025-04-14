'use client'

import { useLanguage } from '@/context/LanguageContext'
import { useEffect } from 'react'

export function LangAttributeUpdater({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  
  // Update lang attribute when language changes, client-side only
  useEffect(() => {
    if (document.documentElement.lang !== language) {
      document.documentElement.lang = language
    }
  }, [language])
  
  return <>{children}</>
} 