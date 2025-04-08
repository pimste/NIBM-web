'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function ClientOnly({ children, fallback = null }: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false)
  const { language, isClient } = useLanguage()
  
  useEffect(() => {
    // Set hasMounted to true immediately if we're on the client
    if (isClient) {
      setHasMounted(true)
    }
    
    // Listen for language change events
    const handleLanguageChange = () => {
      console.log('Language change detected in ClientOnly');
      setHasMounted(true);
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [isClient])
  
  // Force re-render when language changes
  useEffect(() => {
    if (hasMounted) {
      console.log('Language changed in ClientOnly component:', language);
      setHasMounted(true);
    }
  }, [language, hasMounted])
  
  // Return fallback if not mounted or not on client
  if (!hasMounted || !isClient) {
    return <>{fallback}</>
  }
  
  // After hydration, render the children
  return <>{children}</>
} 