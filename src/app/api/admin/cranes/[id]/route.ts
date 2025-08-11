import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET /api/cranes/[id] - Fetch single crane
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const crane = await prisma.crane.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })
    
    if (!crane) {
      return NextResponse.json(
        { error: 'Crane not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(crane)
  } catch (error) {
    console.error('Error fetching crane:', error)
    return NextResponse.json(
      { error: 'Failed to fetch crane' },
      { status: 500 }
    )
  }
}

// PUT /api/cranes/[id] - Update crane
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('PUT request received for crane ID:', params.id)
    
    await requireAuth()
    console.log('Authentication successful')
    
    const body = await request.json()
    console.log('Request body:', JSON.stringify(body, null, 2))
    
    // Generate slug from name if name changed
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    console.log('Generated slug:', slug)
    
    // Ensure features and images are arrays
    const features = Array.isArray(body.features) ? body.features : []
    const images = Array.isArray(body.images) ? body.images : []
    
    console.log('Features:', features)
    console.log('Images:', images)
    
    const updateData = {
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
    
    console.log('Update data:', JSON.stringify(updateData, null, 2))
    
    const crane = await prisma.crane.update({
      where: {
        id: parseInt(params.id)
      },
      data: updateData
    })
    
    console.log('Crane updated successfully:', crane.id)
    return NextResponse.json(crane)
  } catch (error) {
    console.error('Error updating crane:', error)
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { error: 'Failed to update crane', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// PATCH /api/cranes/[id] - Partial update crane
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth()
    
    const body = await request.json()
    
    // Only update the fields that are provided
    const updateData: any = {}
    
    if (body.hasOwnProperty('isAvailable')) {
      updateData.isAvailable = body.isAvailable
    }
    
    if (body.hasOwnProperty('status')) {
      updateData.status = body.status
    }
    
    if (body.hasOwnProperty('category')) {
      updateData.category = body.category
    }
    
    const crane = await prisma.crane.update({
      where: {
        id: parseInt(params.id)
      },
      data: updateData
    })
    
    return NextResponse.json(crane)
  } catch (error) {
    console.error('Error partially updating crane:', error)
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update crane' },
      { status: 500 }
    )
  }
}

// DELETE /api/cranes/[id] - Delete crane
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth()
    
    // First check if the crane exists
    const existingCrane = await prisma.crane.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if (!existingCrane) {
      return NextResponse.json(
        { error: 'Crane not found' },
        { status: 404 }
      )
    }

    await prisma.crane.delete({
      where: {
        id: parseInt(params.id)
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting crane:', error)
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to delete crane' },
      { status: 500 }
    )
  }
} 