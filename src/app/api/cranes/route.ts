import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET /api/cranes - Fetch all cranes (public API - only show available ones)
export async function GET() {
  try {
    const cranes = await prisma.crane.findMany({
      where: {
        isAvailable: true // Only show cranes that are available for public viewing
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    // Transform the data to match frontend expectations
    const transformedCranes = cranes.map(crane => ({
      ...crane,
      image: Array.isArray(crane.images) && crane.images.length > 0 ? crane.images[0] : '/images/placeholder-crane.jpg',
      gallery: Array.isArray(crane.images) ? crane.images : [],
      specifications: {
        manufacturer: 'Potain', // Default manufacturer
        model: crane.model,
        yearOfManufacture: crane.year,
        serialNumber: crane.serialNumber,
        condition: crane.condition,
        maxCapacity: crane.maxCapacity,
        maxJibLength: crane.maxJibLength,
        maxHeight: crane.maxHeight,
        counterJibLength: crane.counterJibLength,
        towerType: crane.towerType,
        cabinType: crane.cabinType,
        powerRequirements: crane.powerRequirements,
        hoistSpeed: crane.hoistSpeed,
        trolleySpeed: crane.trolleySpeed,
        slewing: crane.slewing,
      }
    }))
    
    // Add cache control headers to prevent caching
    return NextResponse.json(transformedCranes, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching cranes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cranes' },
      { status: 500 }
    )
  }
}

// POST /api/cranes - Create new crane
export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    
    const body = await request.json()
    
    // Generate slug from name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    // Check if slug already exists
    const existingCraneWithSlug = await prisma.crane.findUnique({
      where: { slug }
    })
    
    if (existingCraneWithSlug) {
      return NextResponse.json({ 
        error: 'A crane with this name already exists. Please choose a different name.' 
      }, { status: 400 })
    }
    
    // Check if serial number already exists
    const existingCraneWithSerial = await prisma.crane.findUnique({
      where: { serialNumber: body.serialNumber }
    })
    
    if (existingCraneWithSerial) {
      return NextResponse.json({ 
        error: 'A crane with this serial number already exists. Please use a different serial number.' 
      }, { status: 400 })
    }
    
    // Ensure features and images are arrays
    const features = Array.isArray(body.features) ? body.features : []
    const images = Array.isArray(body.images) ? body.images : []
    
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
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Handle Prisma unique constraint violations
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      if (error.message.includes('slug')) {
        return NextResponse.json({ 
          error: 'A crane with this name already exists. Please choose a different name.' 
        }, { status: 400 })
      }
      if (error.message.includes('serialNumber')) {
        return NextResponse.json({ 
          error: 'A crane with this serial number already exists. Please use a different serial number.' 
        }, { status: 400 })
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create crane' },
      { status: 500 }
    )
  }
} 