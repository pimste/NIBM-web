import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { isRateLimited, getClientIP } from '@/lib/rateLimit'

// Rate limiting: 10 requests per minute per IP
const RATE_LIMIT_CONFIG = {
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
}

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = getClientIP(request)
    
    // Check rate limiting
    if (isRateLimited(ip, 'video', RATE_LIMIT_CONFIG)) {
      return new NextResponse('Too many requests. Please try again later.', { 
        status: 429 
      })
    }
    
    const videoPath = join(process.cwd(), 'public', 'videos', 'new_backgroundvid.mp4')
    const videoBuffer = await readFile(videoPath)
    
    return new NextResponse(videoBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    return new NextResponse('Video not found', { status: 404 })
  }
} 