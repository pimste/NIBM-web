'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage, Language } from '@/context/LanguageContext'
import dynamic from 'next/dynamic'

// Dynamically import ClientOnly with fallback
const ClientOnly = dynamic(
  () => import('./ClientOnly').then(mod => mod.ClientOnly),
  { ssr: false, loading: () => null }
)

// Flag CSS styles without using images
const flagStyles: Record<Language, { background: string }> = {
  en: {
    background: `
      linear-gradient(to right, transparent 46%, #C8102E 46%, #C8102E 54%, transparent 54%),
      linear-gradient(to bottom, transparent 46%, #C8102E 46%, #C8102E 54%, transparent 54%),
      linear-gradient(to right, transparent 42%, #FFFFFF 42%, #FFFFFF 58%, transparent 58%),
      linear-gradient(to bottom, transparent 42%, #FFFFFF 42%, #FFFFFF 58%, transparent 58%),
      linear-gradient(135deg, transparent 45%, #C8102E 45%, #C8102E 55%, transparent 55%),
      linear-gradient(45deg, transparent 45%, #C8102E 45%, #C8102E 55%, transparent 55%),
      linear-gradient(135deg, transparent 43%, #FFFFFF 43%, #FFFFFF 47%, transparent 47%),
      linear-gradient(135deg, transparent 53%, #FFFFFF 53%, #FFFFFF 57%, transparent 57%),
      linear-gradient(45deg, transparent 43%, #FFFFFF 43%, #FFFFFF 47%, transparent 47%),
      linear-gradient(45deg, transparent 53%, #FFFFFF 53%, #FFFFFF 57%, transparent 57%),
      #012169
    `
  },
  nl: {
    background: `
      linear-gradient(to bottom, 
        #AE1C28 0%, #AE1C28 33.3%, 
        #FFFFFF 33.3%, #FFFFFF 66.6%, 
        #21468B 66.6%, #21468B 100%)
    `
  },
  de: {
    background: `
      linear-gradient(to bottom, 
        #000000 0%, #000000 33.3%, 
        #DD0000 33.3%, #DD0000 66.6%, 
        #FFCE00 66.6%, #FFCE00 100%)
    `
  }
};

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'inline'
}

export function LanguageSwitcher({ variant = 'dropdown' }: LanguageSwitcherProps) {
  const languageContext = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  
  // Create safe versions of the language context
  const language = languageContext?.language || 'en' as Language
  const setLanguage = languageContext?.setLanguage || (() => console.warn('setLanguage not available'))

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false)
    
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  // Handle language change
  const changeLanguage = (lang: Language) => {
    if (lang !== language) {
      console.log(`Changing language from ${language} to ${lang}`);
      
      // Clear existing cookie first, then set new one
      document.cookie = `NEXT_LOCALE=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=${30 * 24 * 60 * 60}`;
      
      // Parse the current pathname to properly update the URL
      const pathParts = pathname?.split('/').filter(Boolean) || [];
      const supportedLangs = ['en', 'nl', 'de'];
      
      // Check if the first part is a language code
      const hasLangPrefix = pathParts.length > 0 && supportedLangs.includes(pathParts[0]);
      
      // Construct new URL with correct language prefix
      let newPath;
      if (hasLangPrefix) {
        // Replace existing language prefix
        const pathWithoutLang = pathParts.slice(1).join('/');
        newPath = `/${lang}${pathWithoutLang ? `/${pathWithoutLang}` : ''}`;
      } else {
        // Add language prefix to path
        newPath = `/${lang}${pathname || ''}`;
      }
      
      // Normalize path (remove duplicate slashes)
      newPath = newPath.replace(/\/+/g, '/');
      
      // Remove trailing slash unless it's the root path
      if (newPath.endsWith('/') && newPath !== '/') {
        newPath = newPath.slice(0, -1);
      }
      
      console.log(`Redirecting to: ${newPath}`);
      
      // Navigate to the new URL with a small delay to ensure cookie is set
      setTimeout(() => {
        window.location.href = newPath;
      }, 100);
    }
    setIsOpen(false);
  }

  // Language labels
  const languageLabels: Record<Language, string> = {
    en: 'English',
    nl: 'Nederlands',
    de: 'Deutsch'
  };

  // The fallback UI to show during server-side rendering
  const fallbackUI = (
    <div className="relative">
      <button 
        className="flex items-center p-1.5 rounded-md hover:bg-white/10 transition-colors"
        aria-label="Change language"
      >
        <div className="w-6 h-6 rounded-full border border-white/20"></div>
      </button>
    </div>
  );

  // The dropdown UI (desktop)
  const dropdownUI = (
    <div className="relative">
      <button 
        className="flex items-center p-1.5 rounded-md hover:bg-white/10 transition-colors group"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        aria-label="Change language"
      >
        <div 
          className="w-6 h-6 rounded-full shadow-sm border border-white/30 group-hover:border-white/50 transition-all"
          style={{
            background: flagStyles[language].background
          }}
        ></div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg py-2 z-[100] min-w-32 border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            {Object.entries(flagStyles).map(([code, styles]) => (
              <button
                key={code}
                className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-neutral-100 transition-colors ${
                  language === code ? 'bg-neutral-50 font-medium' : ''
                }`}
                onClick={() => changeLanguage(code as Language)}
              >
                <div 
                  className="w-6 h-6 rounded-full shadow-sm border border-neutral-200 mr-3 flex-shrink-0"
                  style={{
                    background: styles.background
                  }}
                ></div>
                <span className="text-neutral-800">{languageLabels[code as Language]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // The inline UI (mobile)
  const inlineUI = (
    <div className="flex flex-col space-y-2">
      {Object.entries(flagStyles).map(([code, styles], index) => {
        const isActive = language === code;
        return (
          <motion.button
            key={code}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
            className={`
              flex items-center justify-between w-full px-4 py-3 rounded-lg
              transition-all duration-300 text-lg font-medium
              ${isActive 
                ? 'bg-secondary text-white shadow-lg scale-105' 
                : 'bg-white/10 text-white hover:bg-white/20'
              }
            `}
            onClick={() => changeLanguage(code as Language)}
          >
            <div className="flex items-center">
              <div 
                className="w-8 h-8 rounded-full shadow-md border-2 border-white/30 mr-4 flex-shrink-0"
                style={{
                  background: styles.background
                }}
              ></div>
              <span>{languageLabels[code as Language]}</span>
            </div>
            {isActive && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30 
                }}
                className="text-xl"
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );

  const switcherUI = variant === 'inline' ? inlineUI : dropdownUI;

  return (
    typeof ClientOnly === 'function' ? (
      <ClientOnly fallback={fallbackUI}>
        {switcherUI}
      </ClientOnly>
    ) : (
      // Fallback in case ClientOnly is undefined
      fallbackUI
    )
  )
}