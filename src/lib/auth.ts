import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function getSession() {
  const sessionCookie = cookies().get('admin-session')
  if (!sessionCookie?.value) return null
  
  try {
    const session = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
    if (session.exp < Date.now()) {
      return null
    }
    return session
  } catch {
    return null
  }
}

export async function createSession(adminId: string) {
  const session = Buffer.from(JSON.stringify({ 
    adminId, 
    exp: Date.now() + 24 * 60 * 60 * 1000 
  })).toString('base64')
  
  cookies().set('admin-session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/'
  })
}

export async function destroySession() {
  cookies().delete('admin-session')
}

export async function authenticateAdmin(username: string, password: string) {
  try {
    // Find admin user in database
    const admin = await prisma.admin.findUnique({
      where: { username }
    })
    
    if (!admin) {
      return null
    }
    
    // Verify password
    const isValid = await verifyPassword(password, admin.password)
    if (!isValid) {
      return null
    }
    
    return { id: admin.id.toString(), username: admin.username }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
} 