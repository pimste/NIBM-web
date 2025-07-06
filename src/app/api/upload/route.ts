import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

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

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}_${originalName}`
    
    console.log('Upload API: Uploading to Supabase storage:', filename)
    
    // Upload to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('crane-images')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Upload API: Supabase upload error:', uploadError)
      return NextResponse.json({ error: 'Failed to upload file to storage', details: uploadError.message }, { status: 500 })
    }

    console.log('Upload API: File uploaded successfully to Supabase:', uploadData.path)

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('crane-images')
      .getPublicUrl(uploadData.path)

    const imageUrl = publicUrlData.publicUrl
    console.log('Upload API: Returning public URL:', imageUrl)
    
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