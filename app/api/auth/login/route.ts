import { NextRequest, NextResponse } from 'next/server'
import { loginUser, loginDemo } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password, isDemo } = await req.json()
    
    // Handle demo login
    if (isDemo) {
      const result = await loginDemo()
      return NextResponse.json(result)
    }
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    // Authenticate user
    const result = await loginUser(email, password)
    
    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 401 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 