'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage, Language } from '@/context/LanguageContext'
import ClientOnly from './ClientOnly'

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

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

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
      
      // Set the language in context/localStorage
      setLanguage(lang);
      
      // Force re-render by dispatching custom events
      try {
        // Use both events for redundancy
        window.dispatchEvent(new Event('languageChange'));
        setTimeout(() => {
          window.dispatchEvent(new Event('languageChanged'));
          console.log('Language change events dispatched');
        }, 50);
      } catch (error) {
        console.error('Error dispatching language change event:', error);
      }
    }
    setIsOpen(false);
  }

  // Language labels
  const languageLabels: Record<Language, string> = {
    en: 'English',
    nl: 'Nederlands',
    de: 'Deutsch'
  };

  return (
    <ClientOnly fallback={
      <div className="relative">
        <button 
          className="flex items-center p-1.5 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Change language"
        >
          <div className="w-6 h-6 rounded-full border border-white/20"></div>
        </button>
      </div>
    }>
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
    </ClientOnly>
  )
}