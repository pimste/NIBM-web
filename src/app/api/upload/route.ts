import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API: Starting upload process')
    console.log('Upload API: Environment check - SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Not set')
    console.log('Upload API: Environment check - SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Not set')
    
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

    // Try Supabase storage first
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { supabase } = await import('@/lib/supabase')
        
        // Generate unique filename
        const timestamp = Date.now()
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const filename = `${timestamp}_${originalName}`
        
        console.log('Upload API: Uploading to Supabase storage:', filename)
        
        // First, check if bucket exists
        try {
          const { data: buckets, error: listError } = await supabase.storage.listBuckets()
          console.log('Upload API: Available buckets:', buckets?.map(b => b.name) || 'None')
          
          if (listError) {
            console.error('Upload API: Error listing buckets:', listError)
          }
        } catch (bucketError) {
          console.error('Upload API: Error checking buckets:', bucketError)
        }
        
        // Upload to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('crane-images')
          .upload(filename, buffer, {
            contentType: file.type,
            upsert: false
          })

        if (uploadError) {
          console.error('Upload API: Supabase upload error:', uploadError)
          console.error('Upload API: Error details:', JSON.stringify(uploadError, null, 2))
          
          // If bucket doesn't exist, try to create it
          if (uploadError.message?.includes('Bucket not found')) {
            console.log('Upload API: Bucket not found, attempting to create it...')
            
            const { data: createBucketData, error: createBucketError } = await supabase.storage
              .createBucket('crane-images', {
                public: true,
                allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
                fileSizeLimit: 5242880 // 5MB
              })
            
            if (createBucketError) {
              console.error('Upload API: Failed to create bucket:', createBucketError)
              throw new Error('Failed to create storage bucket: ' + createBucketError.message)
            }
            
            console.log('Upload API: Bucket created successfully, retrying upload...')
            
            // Retry upload
            const { data: retryUploadData, error: retryUploadError } = await supabase.storage
              .from('crane-images')
              .upload(filename, buffer, {
                contentType: file.type,
                upsert: false
              })
            
            if (retryUploadError) {
              console.error('Upload API: Retry upload failed:', retryUploadError)
              throw new Error('Failed to upload file after creating bucket: ' + retryUploadError.message)
            }
            
            // Use retry data for success response
            const { data: publicUrlData } = supabase.storage
              .from('crane-images')
              .getPublicUrl(retryUploadData.path)

            const imageUrl = publicUrlData.publicUrl
            console.log('Upload API: Returning public URL (after retry):', imageUrl)
            
            return NextResponse.json({ url: imageUrl })
          }
          
          throw new Error('Supabase upload failed: ' + uploadError.message)
        }

        console.log('Upload API: File uploaded successfully to Supabase:', uploadData.path)

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('crane-images')
          .getPublicUrl(uploadData.path)

        const imageUrl = publicUrlData.publicUrl
        console.log('Upload API: Returning public URL:', imageUrl)
        
        return NextResponse.json({ url: imageUrl })
      } catch (supabaseError) {
        console.error('Upload API: Supabase storage failed, falling back to base64:', supabaseError)
        // Fall through to base64 fallback
      }
    } else {
      console.log('Upload API: Supabase not configured, using base64 fallback')
    }

    // Fallback: Convert to base64 data URL
    console.log('Upload API: Using base64 fallback')
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`
    
    console.log('Upload API: Returning base64 data URL (length:', dataUrl.length, ')')
    
    return NextResponse.json({ url: dataUrl })
  } catch (error) {
    console.error('Upload API: Unexpected error:', error)
    console.error('Upload API: Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return NextResponse.json({ error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
} 