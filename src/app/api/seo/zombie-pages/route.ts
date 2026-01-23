import { NextRequest, NextResponse } from 'next/server'
import { detectZombiePages, autoNoindexZombiePages, restorePage } from '@/lib/seo/zombie-page-detector'

export async function GET(request: NextRequest) {
  try {
    const report = await detectZombiePages()
    
    return NextResponse.json({
      success: true,
      report,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error detecting zombie pages:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to detect zombie pages',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, url } = body

    if (action === 'noindex') {
      const result = await autoNoindexZombiePages()
      return NextResponse.json({
        success: true,
        result,
        message: 'Zombie pages processed'
      })
    }

    if (action === 'restore' && url) {
      const result = await restorePage(url)
      return NextResponse.json({
        success: result.success,
        message: result.message
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error processing zombie pages:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process zombie pages',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
