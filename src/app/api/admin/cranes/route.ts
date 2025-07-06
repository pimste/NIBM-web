import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    await requireAuth()

    // Fetch all cranes
    const cranes = await prisma.crane.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(cranes)
  } catch (error) {
    console.error('Error fetching cranes:', error)
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    await requireAuth()

    const body = await request.json()
    
    // Generate slug from name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    // Ensure features and images are arrays
    const features = Array.isArray(body.features) ? body.features : []
    const images = Array.isArray(body.images) ? body.images : []
    
    // Create new crane
    const crane = await prisma.crane.create({
      data: {
        name: body.name,
        slug,
        model: body.model,
        year: parseInt(body.year),
        type: body.type,
        condition: body.condition,
        serialNumber: body.serialNumber,
        maxCapacity: body.maxCapacity,
        maxJibLength: body.maxJibLength,
        maxHeight: body.maxHeight,
        counterJibLength: body.counterJibLength,
        towerType: body.towerType,
        cabinType: body.cabinType,
        hoistSpeed: body.hoistSpeed,
        trolleySpeed: body.trolleySpeed,
        slewing: body.slewing,
        powerRequirements: body.powerRequirements,
        description: body.description,
        features,
        images,
        brochureUrl: body.brochureUrl || null,
        isAvailable: body.isAvailable ?? true,
        status: body.status || 'available',
        category: body.category
      }
    })

    return NextResponse.json(crane, { status: 201 })
  } catch (error) {
    console.error('Error creating crane:', error)
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 