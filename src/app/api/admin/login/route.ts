import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }
    
    const admin = await authenticateAdmin(username, password)
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    await createSession(admin.id)
    
    return NextResponse.json({ 
      success: true, 
      admin: { id: admin.id, username: admin.username } 
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
} 