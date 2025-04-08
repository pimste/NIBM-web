'use client'

import { useLanguage } from '@/context/LanguageContext'
import { useEffect } from 'react'

export function LangAttributeUpdater({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  
  useEffect(() => {
    if (document.documentElement.lang !== language) {
      document.documentElement.lang = language
    }
  }, [language])
  
  return <>{children}</>
} 