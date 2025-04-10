'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import ClientOnly from './ClientOnly'

const navigation = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.services', href: '/services' },
  { key: 'nav.towercranes', href: '/towercranes' },
  { key: 'nav.technical', href: '/technical-info' },
  { key: 'nav.contact', href: '/contact' },
]

export function Header() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

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

  return (
    <>
      {/* Top Contact Bar */}
      <div className="hidden lg:block bg-primary-900 text-white py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <ClientOnly>
              <div className="flex items-center space-x-6">
                <a href="tel:+31653206004" className="flex items-center text-sm hover:text-secondary transition-colors">
                  <FaPhone className="mr-2" /> +31 6 53206004
                </a>
                <a href="mailto:gid.gehlen@nibmtowercranes.com" className="flex items-center text-sm hover:text-secondary transition-colors">
                  <FaEnvelope className="mr-2" /> gid.gehlen@nibmtowercranes.com
                </a>
              </div>
            </ClientOnly>
            <ClientOnly>
              <div className="flex space-x-4 items-center">
                <Link href="#" className="text-xs hover:text-secondary transition-colors">{t('topbar.news')}</Link>
                <Link href="#" className="text-xs hover:text-secondary transition-colors">{t('topbar.careers')}</Link>
                <Link href="#" className="text-xs hover:text-secondary transition-colors">{t('topbar.faq')}</Link>
                <div className="ml-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>

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
                {navigation.map((item, index) => (
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
                  href="/contact"
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
                  />
                </Link>
                <div className="flex items-center">
                  <div className="mr-4">
                    <LanguageSwitcher />
                  </div>
                  <button
                    type="button"
                    className="text-white hover:text-secondary"
                    onClick={toggleMenu}
                  >
                    <FaTimes className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <nav className="space-y-8">
                {navigation.map((item, index) => (
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
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                  className="pt-6"
                >
                  <Link
                    href="/contact"
                    className="inline-block bg-secondary hover:bg-secondary-600 text-white font-medium px-8 py-3 rounded-md transition-colors w-full text-center text-lg"
                    onClick={toggleMenu}
                  >
                    {t('nav.quote')}
                  </Link>
                </motion.div>
                
                <ClientOnly>
                  <div className="pt-8 border-t border-primary-800">
                    <p className="text-white/60 mb-4">Contact Us</p>
                    <a href="tel:+31653206004" className="flex items-center text-white mb-3 hover:text-secondary transition-colors">
                      <FaPhone className="mr-3" /> +31 6 53206004
                    </a>
                    <a href="mailto:gid.gehlen@nibmtowercranes.com" className="flex items-center text-white hover:text-secondary transition-colors">
                      <FaEnvelope className="mr-3" /> gid.gehlen@nibmtowercranes.com
                    </a>
                    <p className="text-white mt-3">Kruisweg 8 6361 TG Nuth</p>
                  </div>
                </ClientOnly>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 