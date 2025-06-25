import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
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