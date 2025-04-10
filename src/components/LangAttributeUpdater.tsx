'use client'

import { useLanguage } from '@/context/LanguageContext'
import { useEffect, useState } from 'react'

export function LangAttributeUpdater({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  const [isMounted, setIsMounted] = useState(false)
  
  // Check if we're on the client side
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Update lang attribute when language changes
  useEffect(() => {
    if (isMounted && document.documentElement.lang !== language) {
      document.documentElement.lang = language
    }
  }, [language, isMounted])
  
  return <>{children}</>
} 