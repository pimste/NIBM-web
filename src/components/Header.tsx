'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { FaBars, FaTimes, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { ProtectedContact } from './ProtectedContact'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ClientOnly } from './ClientOnly'

// Instead of hardcoded paths, create a function to get language-aware URLs
const getLanguageAwareUrl = (path: string, language: string) => {
  if (path === '/') {
    return `/${language}`;
  }
  return `/${language}${path}`;
};

export function Header() {
  const { t: translate, language } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Ensure we always have a translation function even if context fails
  const t = (key: string) => {
    try {
      return translate(key) || key
    } catch (error) {
      console.error('Translation error:', error)
      return key // Fallback to key if translation fails
    }
  }

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    // Prevent scrolling when menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  // Navigation with language-aware URLs
  const navigationItems = [
    { key: 'nav.home', href: getLanguageAwareUrl('/', language) },
    { key: 'nav.about', href: getLanguageAwareUrl('/about', language) },
    { key: 'nav.services', href: getLanguageAwareUrl('/services', language) },
    { key: 'nav.towercranes', href: getLanguageAwareUrl('/towercranes', language) },
    { key: 'nav.technical', href: getLanguageAwareUrl('/technical-info', language) },
    { key: 'nav.contact', href: getLanguageAwareUrl('/contact', language) },
  ]

  return (
    <>
      {/* Top Contact Bar */}
      <ClientOnly fallback={null}>
        <div className="hidden lg:block bg-primary-900 text-white py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <ProtectedContact 
                  type="phone" 
                  value="+31653206004" 
                  className="flex items-center text-sm hover:text-secondary transition-colors"
                  iconClassName="mr-2"
                />
                <ProtectedContact 
                  type="email" 
                  value="gid.gehlen@nibmtowercranes.com" 
                  className="flex items-center text-sm hover:text-secondary transition-colors"
                  iconClassName="mr-2"
                />
              </div>
              <div className="flex space-x-4 items-center">
                <Link href="/technical-info#faq" className="text-xs hover:text-secondary transition-colors">{t('topbar.faq')}</Link>
                <div className="ml-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 ${
          isScrolled 
            ? 'bg-white shadow-lg py-3' 
            : 'bg-gradient-to-r from-primary-900 to-primary-800 py-5'
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center">
                <Image 
                  src={isScrolled ? "/images/logo-blue.png" : "/images/logo-white.png"}
                  alt="NIBM Tower Cranes Logo"
                  width={160}
                  height={50}
                  className="h-14 w-auto"
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 flex-grow justify-end">
              <div className="flex flex-wrap justify-end items-center">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-2 lg:px-3 xl:px-4 py-2 font-medium text-sm lg:text-base transition-colors whitespace-nowrap ${
                        pathname === item.href
                          ? isScrolled 
                            ? 'text-primary'
                            : 'text-secondary' 
                          : isScrolled
                            ? 'text-neutral-800 hover:text-primary'
                            : 'text-white hover:text-secondary'
                      }`}
                    >
                      {t(item.key)}
                      {pathname === item.href && (
                        <motion.span 
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-current" 
                          layoutId="underline"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="ml-4"
              >
                <Link
                  href={getLanguageAwareUrl('/contact', language)}
                  className="bg-secondary hover:bg-secondary-600 text-white font-medium px-3 lg:px-4 xl:px-6 py-2.5 rounded-md transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm lg:text-base whitespace-nowrap"
                >
                  {t('nav.quote')}
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Header Actions */}
            <div className="flex lg:hidden items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white bg-primary-800 hover:bg-primary-700 transition-colors"
                onClick={toggleMenu}
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <ClientOnly fallback={null}>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 z-40 bg-primary-900 lg:hidden overflow-y-auto"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-10">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <Image 
                      src="/images/logo-white.png"
                      alt="NIBM Tower Cranes Logo"
                      width={150}
                      height={50}
                      className="h-12 w-auto"
                      priority
                    />
                  </Link>
                  <button
                    type="button"
                    className="text-white hover:text-secondary"
                    onClick={toggleMenu}
                  >
                    <FaTimes className="h-6 w-6" />
                  </button>
                </div>

                {/* Language Section */}
                <div className="mb-8">
                  <p className="text-white/60 text-sm uppercase tracking-wide mb-4">
                    Select Language
                  </p>
                  <LanguageSwitcher variant="inline" />
                </div>
                
                <nav className="space-y-8">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`block text-2xl font-display font-medium ${
                          pathname === item.href
                            ? 'text-secondary'
                            : 'text-white hover:text-secondary'
                        }`}
                        onClick={toggleMenu}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: navigationItems.length * 0.1 }}
                    className="pt-6"
                  >
                    <Link 
                      href={getLanguageAwareUrl('/contact', language)} 
                      className="w-full flex items-center justify-center bg-secondary hover:bg-secondary-600 text-white font-medium px-5 py-3 rounded-md transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 space-x-2 mt-4"
                    >
                      <span>{t('nav.quote')}</span>
                      <motion.span 
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <FaArrowRight />
                      </motion.span>
                    </Link>
                  </motion.div>
                  
                  <div className="pt-8 border-t border-primary-800">
                    <p className="text-white/60 mb-4">Contact Us</p>
                    <div className="space-y-3">
                      <ProtectedContact 
                        type="phone" 
                        value="+31653206004" 
                        className="flex items-center text-white hover:text-secondary transition-colors"
                        iconClassName="mr-3 w-4 h-4"
                      />
                      <ProtectedContact 
                        type="email" 
                        value="gid.gehlen@nibmtowercranes.com" 
                        className="flex items-center text-white hover:text-secondary transition-colors"
                        iconClassName="mr-3 w-4 h-4"
                      />
                    </div>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ClientOnly>
    </>
  )
} 