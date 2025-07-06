import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { requireAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API: Starting upload process')
    
    // Verify admin authentication
    try {
      await requireAuth()
      console.log('Upload API: Authentication successful')
    } catch (authError) {
      console.error('Upload API: Authentication failed:', authError)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    console.log('Upload API: File received:', file ? file.name : 'No file')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      console.log('Upload API: Invalid file type:', file.type)
      return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' }, { status: 400 })
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      console.log('Upload API: File too large:', file.size)
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 })
    }

    console.log('Upload API: Processing file:', file.name, 'Size:', file.size, 'Type:', file.type)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}_${originalName}`
    
    // Save to public/images directory
    const path = join(process.cwd(), 'public', 'images', filename)
    console.log('Upload API: Saving file to:', path)
    
    try {
      await writeFile(path, buffer)
      console.log('Upload API: File saved successfully')
    } catch (writeError) {
      console.error('Upload API: Error writing file:', writeError)
      return NextResponse.json({ error: 'Failed to save file' }, { status: 500 })
    }

    // Return the URL
    const imageUrl = `/images/${filename}`
    console.log('Upload API: Returning URL:', imageUrl)
    return NextResponse.json({ url: imageUrl })
  } catch (error) {
    console.error('Upload API: Unexpected error:', error)
    console.error('Upload API: Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return NextResponse.json({ error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
} 