'use client'

import { useLanguage } from '@/context/LanguageContext'
import { useEffect } from 'react'

export function LangAttributeUpdater({ children }: { children: React.ReactNode }) {
  const { language, isClient } = useLanguage()
  
  useEffect(() => {
    if (isClient && document.documentElement.lang !== language) {
      document.documentElement.lang = language
    }
  }, [language, isClient])
  
  return <>{children}</>
} 