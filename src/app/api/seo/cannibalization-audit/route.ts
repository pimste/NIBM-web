import { NextRequest, NextResponse } from 'next/server'
import { cannibalizationDetector } from '@/lib/seo/keyword-cannibalization'

export async function GET(request: NextRequest) {
  try {
    // Load pages from database
    await cannibalizationDetector.loadPagesFromDatabase()
    
    // Run cannibalization detection
    const report = cannibalizationDetector.detectCannibalization()
    
    return NextResponse.json({
      success: true,
      report,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error running cannibalization audit:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to run cannibalization audit',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, recommendations } = body

    if (action === 'consolidate' && recommendations) {
      const result = await cannibalizationDetector.autoConsolidate(recommendations)
      
      return NextResponse.json({
        success: true,
        result,
        message: 'Consolidation actions executed'
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error executing consolidation:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to execute consolidation',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
