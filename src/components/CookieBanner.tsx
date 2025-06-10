'use client'

import { useState, useEffect } from 'react'
import { FaCookie, FaTimes } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { useLanguageUrl } from '@/hooks/useLanguageUrl'
import Link from 'next/link'

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { t, language } = useLanguage()
  const { getUrl } = useLanguageUrl()

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookie-consent')
    
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true)
        setIsVisible(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    // Store consent in localStorage
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    
    // Hide banner with animation
    setIsVisible(false)
    setTimeout(() => {
      setShowBanner(false)
    }, 300)

    // Track the consent acceptance
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
    }
  }

  const declineCookies = () => {
    // Store decline in localStorage
    localStorage.setItem('cookie-consent', 'declined')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    
    // Hide banner
    setIsVisible(false)
    setTimeout(() => {
      setShowBanner(false)
    }, 300)

    // Disable analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      })
    }
  }

  if (!showBanner) return null

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-white border-t border-neutral-200 shadow-lg">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Cookie Icon & Message */}
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 mt-1">
                <FaCookie className="text-primary text-xl" />
              </div>
              <div className="text-sm text-neutral-700 leading-relaxed">
                <p className="mb-2">
                  {language === 'nl' && (
                    <>
                      Deze website gebruikt cookies voor analytische doeleinden om de gebruikerservaring te verbeteren. 
                      Door verder te gaan, accepteert u ons gebruik van cookies.
                    </>
                  )}
                  {language === 'de' && (
                    <>
                      Diese Website verwendet Cookies für Analysezwecke, um die Benutzererfahrung zu verbessern. 
                      Durch Fortfahren akzeptieren Sie unsere Verwendung von Cookies.
                    </>
                  )}
                  {(language === 'en' || !language) && (
                    <>
                      This website uses cookies for analytics to improve user experience. 
                      By continuing, you accept our use of cookies.
                    </>
                  )}
                </p>
                <Link 
                  href={getUrl('/privacy-policy')} 
                  className="text-primary hover:text-primary-700 underline text-xs"
                >
                  {language === 'nl' && 'Privacybeleid'}
                  {language === 'de' && 'Datenschutzrichtlinie'}
                  {(language === 'en' || !language) && 'Privacy Policy'}
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={declineCookies}
                className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-800 border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors"
              >
                {language === 'nl' && 'Weigeren'}
                {language === 'de' && 'Ablehnen'}
                {(language === 'en' || !language) && 'Decline'}
              </button>
              <button
                onClick={acceptCookies}
                className="px-4 py-2 text-sm text-white bg-primary hover:bg-primary-700 rounded-md transition-colors font-medium"
              >
                {language === 'nl' && 'Accepteren'}
                {language === 'de' && 'Akzeptieren'}
                {(language === 'en' || !language) && 'Accept'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    gtag: (command: string, action: string, parameters: any) => void
  }
} 