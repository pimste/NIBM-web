import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Enable caching for GET requests - revalidate every 5 minutes
export const revalidate = 300

// GET /api/cranes/[slug] - Fetch single crane by slug (public API - only show available ones)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const crane = await prisma.crane.findFirst({
      where: {
        slug: params.slug,
        isAvailable: true // Only show cranes that are available for public viewing
      }
    })
    
    if (!crane) {
      return NextResponse.json(
        { error: 'Crane not found' },
        { status: 404 }
      )
    }
    
    // Transform the data to match frontend expectations
    const transformedCrane = {
      ...crane,
      image: Array.isArray(crane.images) && crane.images.length > 0 ? crane.images[0] : '/images/placeholder-crane.jpg',
      gallery: Array.isArray(crane.images) ? crane.images : [],
      specifications: {
        manufacturer: 'Potain', // Default manufacturer
        model: crane.model,
        yearOfManufacture: crane.year ?? '-',
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
    }
    
    // Add cache control headers with stale-while-revalidate strategy
    // Increased caching to reduce origin requests and bandwidth usage
    return NextResponse.json(transformedCrane, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Vary': 'Accept'
      }
    })
  } catch (error) {
    console.error('Error fetching crane:', error)
    return NextResponse.json(
      { error: 'Failed to fetch crane' },
      { status: 500 }
    )
  }
} 