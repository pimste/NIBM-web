'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import dynamic from 'next/dynamic'
import { ProtectedContact } from './ProtectedContact'
import { useLanguage } from '@/context/LanguageContext'
import { useLanguageUrl } from '@/hooks/useLanguageUrl'

// Dynamically import ClientOnly with fallback
const ClientOnly = dynamic(
  () => import('./ClientOnly').then(mod => mod.ClientOnly),
  { ssr: false, loading: () => null }
)

export function Footer() {
  const { language, t } = useLanguage();
  const { getUrl } = useLanguageUrl();
  
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <Link href={getUrl('/')} className="inline-block mb-6" aria-label="NIBM Tower Cranes - Homepage">
              <Image
                src="/images/optimized/logo-white.webp"
                alt="NIBM Tower Cranes Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
                placeholder="blur" 
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZXCLgAAAABJRU5ErkJggg=="
                priority 
                fetchPriority="high" 
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={80}
              />
            </Link>
            <p className="text-neutral-300 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neutral-300 hover:text-white transition-colors flex items-center"
                aria-label="Visit NIBM Tower Cranes Facebook page"
              >
                <FaFacebook size={24} className="mr-2" />
                <span className="hidden sm:inline text-sm">Facebook</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neutral-300 hover:text-white transition-colors flex items-center"
                aria-label="Visit NIBM Tower Cranes LinkedIn profile"
              >
                <FaLinkedin size={24} className="mr-2" />
                <span className="hidden sm:inline text-sm">LinkedIn</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neutral-300 hover:text-white transition-colors flex items-center"
                aria-label="Visit NIBM Tower Cranes Instagram profile"
              >
                <FaInstagram size={24} className="mr-2" />
                <span className="hidden sm:inline text-sm">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={getUrl('/')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href={getUrl('/about')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href={getUrl('/services')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href={getUrl('/towercranes')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('nav.towercranes')}
                </Link>
              </li>
              <li>
                <Link href={getUrl('/technical-info')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('nav.technical')}
                </Link>
              </li>
              <li>
                <Link href={getUrl('/contact')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={getUrl('/services#sale')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('services.sale.title')}
                </Link>
              </li>
              <li>
                <Link href={getUrl('/services#rent')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('services.rent.title')}
                </Link>
              </li>
              <li>
                <Link href={getUrl('/services#planning')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('services.planning.title')}
                </Link>
              </li>
              <li>
                <Link href={getUrl('/services#transport')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('services.transport.title')}
                </Link>
              </li>
              <li>
                <Link href={getUrl('/services#mounting')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('services.mounting.title')}
                </Link>
              </li>
              <li>
                <Link href={getUrl('/services#training')} className="text-neutral-300 hover:text-white transition-colors">
                  {t('services.training.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.contactUs')}</h3>
            <ClientOnly fallback={
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="text-primary-300 mt-1 mr-3 flex-shrink-0" aria-hidden="true" />
                  <span className="text-neutral-300">
                    {process.env.NEXT_PUBLIC_COMPANY_ADDRESS}<br />
                    {process.env.NEXT_PUBLIC_COMPANY_POSTAL_CODE} {process.env.NEXT_PUBLIC_COMPANY_CITY}
                  </span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="text-primary-300 mr-3 flex-shrink-0" aria-hidden="true" />
                  <span className="text-neutral-300">
                    {process.env.NEXT_PUBLIC_COMPANY_PHONE}
                  </span>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="text-primary-300 mr-3 flex-shrink-0" aria-hidden="true" />
                  <span className="text-neutral-300">
                    {process.env.NEXT_PUBLIC_COMPANY_EMAIL}
                  </span>
                </li>
              </ul>
            }>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="text-primary-300 mt-1 mr-3 flex-shrink-0" aria-hidden="true" />
                  <span className="text-neutral-300">
                    {process.env.NEXT_PUBLIC_COMPANY_ADDRESS}<br />
                    {process.env.NEXT_PUBLIC_COMPANY_POSTAL_CODE} {process.env.NEXT_PUBLIC_COMPANY_CITY}
                  </span>
                </li>
                <li>
                  <ProtectedContact 
                    type="phone" 
                    value={process.env.NEXT_PUBLIC_COMPANY_PHONE || "+31653206004"} 
                    className="flex items-center"
                    linkClassName="text-neutral-300 hover:text-white transition-colors"
                    iconClassName="text-primary-300 mr-3 flex-shrink-0"
                  />
                </li>
                <li>
                  <ProtectedContact 
                    type="email" 
                    value={process.env.NEXT_PUBLIC_COMPANY_EMAIL || "gid.gehlen@nibmtowercranes.com"} 
                    className="flex items-center"
                    linkClassName="text-neutral-300 hover:text-white transition-colors"
                    iconClassName="text-primary-300 mr-3 flex-shrink-0"
                  />
                </li>
              </ul>
            </ClientOnly>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-neutral-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} NIBM Tower Cranes. {t('footer.rights')}
              </p>
              <div className="flex space-x-6">
                <Link href={getUrl('/privacy-policy')} className="text-neutral-400 hover:text-white text-sm transition-colors">
                  {t('footer.privacy')}
                </Link>
                <Link href={getUrl('/terms-of-service')} className="text-neutral-400 hover:text-white text-sm transition-colors">
                  {t('footer.terms')}
                </Link>
                <Link href={getUrl('/cookies')} className="text-neutral-400 hover:text-white text-sm transition-colors">
                  {t('footer.cookies')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 