import { NextRequest, NextResponse } from 'next/server'
import { getHealthInsights, generateHealthInsight } from '@/lib/health-data'
import { getCurrentUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    // In a real app, you'd validate the JWT token from headers
    // For demo purposes, we'll get the current user from localStorage (client-side)
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      )
    }
    
    const insights = getHealthInsights(userId)
    
    return NextResponse.json({
      success: true,
      insights,
      count: insights.length
    })
  } catch (error) {
    console.error('Get insights error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, query } = await req.json()
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      )
    }
    
    // Generate new AI insight
    const newInsight = await generateHealthInsight(userId, query)
    
    return NextResponse.json({
      success: true,
      insight: newInsight,
      message: 'New insight generated successfully'
    })
  } catch (error) {
    console.error('Generate insight error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 