'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import ClientOnly from './ClientOnly'

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <Link href="/" className="inline-block mb-6" aria-label="NIBM Tower Cranes - Homepage">
              <Image
                src="/images/logo-white.png"
                alt="NIBM Tower Cranes Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-neutral-300 mb-6">
              Specialists in the sale and rental of tower cranes, offering a full-service concept including planning, transport, mounting, inspections, training, and after-sales support.
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
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-300 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/towercranes" className="text-neutral-300 hover:text-white transition-colors">
                  Tower Crane Catalog
                </Link>
              </li>
              <li>
                <Link href="/technical-info" className="text-neutral-300 hover:text-white transition-colors">
                  Technical Information
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#sale" className="text-neutral-300 hover:text-white transition-colors">
                  Sale of Tower Cranes
                </Link>
              </li>
              <li>
                <Link href="/services#rent" className="text-neutral-300 hover:text-white transition-colors">
                  Rental of Tower Cranes
                </Link>
              </li>
              <li>
                <Link href="/services#planning" className="text-neutral-300 hover:text-white transition-colors">
                  Planning & Consulting
                </Link>
              </li>
              <li>
                <Link href="/services#transport" className="text-neutral-300 hover:text-white transition-colors">
                  Transport & Logistics
                </Link>
              </li>
              <li>
                <Link href="/services#mounting" className="text-neutral-300 hover:text-white transition-colors">
                  Mounting & Installation
                </Link>
              </li>
              <li>
                <Link href="/services#training" className="text-neutral-300 hover:text-white transition-colors">
                  Training & Certification
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ClientOnly>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="text-primary-300 mt-1 mr-3 flex-shrink-0" aria-hidden="true" />
                  <span className="text-neutral-300">
                    Kruisweg 8 6361 TG Nuth
                  </span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="text-primary-300 mr-3 flex-shrink-0" aria-hidden="true" />
                  <a href="tel:+31653206004" className="text-neutral-300 hover:text-white transition-colors" aria-label="Call our office">
                    +31 6 53206004
                  </a>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="text-primary-300 mr-3 flex-shrink-0" aria-hidden="true" />
                  <a href="mailto:gid.gehlen@nibmtowercranes.com" className="text-neutral-300 hover:text-white transition-colors" aria-label="Email us">
                    gid.gehlen@nibmtowercranes.com
                  </a>
                </li>
              </ul>
            </ClientOnly>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              &copy; {new Date().getFullYear()} NIBM Tower Cranes. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-neutral-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-neutral-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-neutral-400 hover:text-white text-sm transition-colors">
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 