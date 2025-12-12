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

    return NextResponse.json(cranes, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
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
    
    // Generate unique slug from name
    let slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    // Check if slug already exists and make it unique if needed
    let counter = 1
    let uniqueSlug = slug
    while (true) {
      const existingCraneWithSlug = await prisma.crane.findUnique({
        where: { slug: uniqueSlug }
      })
      
      if (!existingCraneWithSlug) {
        break
      }
      
      uniqueSlug = `${slug}-${counter}`
      counter++
    }
    
    slug = uniqueSlug
    

    
    // Ensure features and images are arrays
    const features = Array.isArray(body.features) ? body.features : []
    const images = Array.isArray(body.images) ? body.images : []
    
    // Create new crane
    const crane = await prisma.crane.create({
      data: {
        name: body.name,
        slug,
        model: body.model,
        year: body.year === '-' || body.year === '' ? null : parseInt(body.year),
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
    
    // Handle Prisma unique constraint violations
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      if (error.message.includes('slug')) {
        return NextResponse.json({ 
          error: 'A crane with this name already exists. Please choose a different name.' 
        }, { status: 400 })
      }
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 