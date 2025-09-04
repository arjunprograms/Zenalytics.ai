import { NextRequest, NextResponse } from 'next/server'
import { getHealthMetrics, addHealthMetric, analyzeHealthData } from '@/lib/health-data'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const analyze = searchParams.get('analyze') === 'true'
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      )
    }
    
    const metrics = getHealthMetrics(userId)
    
    if (analyze) {
      const analysis = analyzeHealthData(userId)
      return NextResponse.json({
        success: true,
        metrics,
        analysis,
        count: metrics.length
      })
    }
    
    return NextResponse.json({
      success: true,
      metrics,
      count: metrics.length
    })
  } catch (error) {
    console.error('Get metrics error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, type, value, unit, source } = await req.json()
    
    if (!userId || !type || value === undefined || !unit || !source) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }
    
    const newMetric = {
      id: `metric-${Date.now()}`,
      userId,
      type,
      value: Number(value),
      unit,
      source,
      timestamp: new Date()
    }
    
    addHealthMetric(newMetric)
    
    return NextResponse.json({
      success: true,
      metric: newMetric,
      message: 'Health metric added successfully'
    })
  } catch (error) {
    console.error('Add metric error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 