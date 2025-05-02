'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/app/page-metadata'

/**
 * Hook that generates metadata based on the current pathname
 * For client-side components that need SEO metadata
 * 
 * @param baseMetadata - base metadata to extend
 * @param siteUrl - base URL of the site
 * @param languages - supported languages
 * @returns Metadata object with canonical and alternate URLs
 */
export function useClientMetadata(
  baseMetadata: Metadata = {},
  siteUrl: string = 'https://www.nibmvb.eu',
  languages: string[] = ['en', 'nl', 'de']
): Metadata {
  const pathname = usePathname() || ''
  const [metadata, setMetadata] = useState<Metadata>(baseMetadata)
  
  useEffect(() => {
    setMetadata(generatePageMetadata(baseMetadata, pathname, siteUrl, languages))
  }, [pathname, baseMetadata, siteUrl, JSON.stringify(languages)])
  
  return metadata
} 