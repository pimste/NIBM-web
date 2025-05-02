'use client';

import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Hook that provides a function to generate language-aware URLs
 * 
 * @returns Function that takes a path and returns a language-prefixed URL
 */
export function useLanguageUrl() {
  const { language } = useLanguage();
  const pathname = usePathname();
  
  /**
   * Get a URL with the current language prefix
   * 
   * @param path The path to add language prefix to
   * @param lang Optional language override (defaults to current language)
   * @returns Language-prefixed URL
   */
  const getUrl = (path: string, lang?: string) => {
    const currentLang = lang || language || 'en';
    
    // Handle root path specially
    if (path === '/') {
      return `/${currentLang}`;
    }
    
    // Add language prefix
    return `/${currentLang}${path}`;
  };
  
  /**
   * Parse the current pathname to extract path without language prefix
   * 
   * @returns Path without language prefix
   */
  const getCurrentPathWithoutLang = () => {
    if (!pathname) return '/';
    
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return '/';
    
    if (['en', 'nl', 'de'].includes(parts[0])) {
      if (parts.length === 1) return '/';
      return '/' + parts.slice(1).join('/');
    }
    
    return pathname;
  };
  
  return {
    getUrl,
    getCurrentPathWithoutLang
  };
} 