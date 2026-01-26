import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { isRateLimited, getClientIP } from '@/lib/rateLimit'

// Rate limiting: Reduced to 5 requests per minute per IP to prevent bandwidth abuse
const RATE_LIMIT_CONFIG = {
  maxRequests: 5,
  windowMs: 60 * 1000, // 1 minute
}

// Suspicious user agents to block
const SUSPICIOUS_USER_AGENTS = [
  'curl',
  'wget',
  'python-requests',
  'python-urllib',
  'scrapy',
  'scraper',
  'headless',
  'phantomjs',
  'selenium',
  'playwright',
  'puppeteer',
  'httpie',
  'postman',
  'insomnia',
  'go-http-client',
  'java/',
  'okhttp',
  'apache-httpclient',
  'rest-client',
  'httpclient',
  'axios',
  'node-fetch',
  'got',
  'request',
  'urllib',
]

// Legitimate search engine bots to allow
const LEGITIMATE_BOTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'facebot',
  'ia_archiver',
  'applebot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'discordbot',
]

/**
 * Check if the request is from a bot that should be blocked
 */
function isBlockedBot(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || ''
  const accept = request.headers.get('accept')?.toLowerCase() || ''
  
  // If no user agent, likely a bot
  if (!userAgent) {
    return true
  }
  
  // Check if it's a legitimate bot (allow these)
  const isLegitimateBot = LEGITIMATE_BOTS.some((bot) => userAgent.includes(bot))
  if (isLegitimateBot) {
    return false
  }
  
  // Block if user agent contains generic bot terms (unless it's a legitimate bot)
  if (
    (userAgent.includes('bot') || 
     userAgent.includes('crawler') || 
     userAgent.includes('spider') ||
     userAgent.includes('scraper')) &&
    !isLegitimateBot
  ) {
    return true
  }
  
  // Block if Accept header is missing or suspicious
  if (!accept || accept === '*/*' || accept === 'image/*') {
    // But allow if it looks like a real browser
    if (!userAgent.includes('mozilla') && !userAgent.includes('chrome') && !userAgent.includes('safari')) {
      return true
    }
  }
  
  // Check for suspicious user agents
  const isSuspicious = SUSPICIOUS_USER_AGENTS.some((suspicious) => 
    userAgent.includes(suspicious)
  )
  
  return isSuspicious
}

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting and logging
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referer = request.headers.get('referer') || 'none'
    
    // Log request for monitoring (helps identify bot patterns)
    console.log(`[Video API] Request from IP: ${ip}, UA: ${userAgent.substring(0, 100)}, Referer: ${referer.substring(0, 100)}`)
    
    // FIRST: Aggressive bot blocking before any processing
    if (isBlockedBot(request)) {
      console.log(`[Video API] Blocked bot request from IP: ${ip}`)
      return new NextResponse('Forbidden', { 
        status: 403,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      })
    }
    
    // SECOND: For legitimate browser requests, redirect to static file (preferred method)
    // This reduces load on Vercel Compute and uses CDN caching
    const isBrowser = userAgent.toLowerCase().includes('mozilla') || 
                     userAgent.toLowerCase().includes('chrome') || 
                     userAgent.toLowerCase().includes('safari') ||
                     userAgent.toLowerCase().includes('firefox') ||
                     userAgent.toLowerCase().includes('edge')
    
    if (isBrowser) {
      // Redirect to static file - this is the preferred method now
      return NextResponse.redirect(new URL('/videos/new_backgroundvid.mp4', request.url), {
        status: 301,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }
    
    // THIRD: Check rate limiting for non-browser requests (backward compatibility)
    if (isRateLimited(ip, 'video', RATE_LIMIT_CONFIG)) {
      console.log(`[Video API] Rate limited request from IP: ${ip}`)
      return new NextResponse('Too many requests. Please try again later.', { 
        status: 429,
        headers: {
          'Retry-After': '60',
        },
      })
    }
    
    // FOURTH: Serve video for backward compatibility (legacy clients, etc.)
    // This should rarely be hit now that we redirect browsers
    const videoPath = join(process.cwd(), 'public', 'videos', 'new_backgroundvid.mp4')
    const videoBuffer = await readFile(videoPath)
    
    console.log(`[Video API] Serving video to IP: ${ip} (backward compatibility)`)
    
    return new NextResponse(videoBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('[Video API] Error:', error)
    return new NextResponse('Video not found', { status: 404 })
  }
} 