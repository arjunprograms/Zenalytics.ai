import { NextRequest, NextResponse } from 'next/server'
import { getHealthMetrics, getHealthInsights } from '@/lib/health-data'

export async function POST(req: NextRequest) {
  try {
    const { userId, message } = await req.json()
    
    if (!userId || !message) {
      return NextResponse.json(
        { success: false, message: 'User ID and message are required' },
        { status: 400 }
      )
    }
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Get user's health data for context
    const metrics = getHealthMetrics(userId)
    const insights = getHealthInsights(userId)
    
    // Generate contextual response based on user query
    const response = generateAIResponse(message.toLowerCase(), metrics, insights)
    
    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date()
    })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateAIResponse(query: string, metrics: any[], insights: any[]): string {
  // Advanced response generation based on user's actual data
  const responses = {
    sleep: generateSleepResponse(metrics),
    heart: generateHeartResponse(metrics),
    steps: generateStepsResponse(metrics),
    weight: generateWeightResponse(metrics),
    general: generateGeneralResponse(metrics, insights)
  }
  
  if (query.includes('sleep')) return responses.sleep
  if (query.includes('heart') || query.includes('pulse')) return responses.heart
  if (query.includes('steps') || query.includes('activity') || query.includes('walk')) return responses.steps
  if (query.includes('weight') || query.includes('bmi')) return responses.weight
  
  return responses.general
}

function generateSleepResponse(metrics: any[]): string {
  const sleepMetrics = metrics.filter(m => m.type === 'sleep')
  if (sleepMetrics.length === 0) {
    return "I notice you haven't recorded any sleep data yet. Sleep tracking is crucial for understanding your overall health patterns. Try connecting your sleep tracker or manually logging your sleep hours."
  }
  
  const avgSleep = sleepMetrics.reduce((sum, m) => sum + m.value, 0) / sleepMetrics.length
  
  if (avgSleep >= 7) {
    return `Excellent! Your average sleep duration is ${avgSleep.toFixed(1)} hours, which is within the optimal range. This likely contributes to better heart rate variability and overall recovery. Keep maintaining this consistent sleep schedule.`
  } else {
    return `Your average sleep duration is ${avgSleep.toFixed(1)} hours, which is below the recommended 7-9 hours. Based on health research, improving your sleep could enhance your heart rate variability by 10-15% and boost your daily energy levels.`
  }
}

function generateHeartResponse(metrics: any[]): string {
  const heartMetrics = metrics.filter(m => m.type === 'heart_rate')
  if (heartMetrics.length === 0) {
    return "I don't see any heart rate data yet. Heart rate monitoring provides valuable insights into your cardiovascular health, stress levels, and recovery patterns. Consider connecting a heart rate monitor or fitness tracker."
  }
  
  const latestHR = heartMetrics[heartMetrics.length - 1]?.value || 72
  
  if (latestHR >= 60 && latestHR <= 80) {
    return `Your recent resting heart rate of ${latestHR} BPM is excellent and indicates good cardiovascular fitness. This is within the optimal range for most adults. Your heart efficiency suggests you're maintaining good overall health.`
  } else if (latestHR > 80) {
    return `Your recent heart rate of ${latestHR} BPM is slightly elevated. This could indicate stress, caffeine intake, or the need for better recovery. Consider monitoring your sleep quality and stress levels. If consistently high, consult a healthcare provider.`
  } else {
    return `Your resting heart rate of ${latestHR} BPM is quite low, which often indicates excellent cardiovascular fitness, especially if you're an athlete. However, if you're not very active, this might be worth discussing with a healthcare provider.`
  }
}

function generateStepsResponse(metrics: any[]): string {
  const stepsMetrics = metrics.filter(m => m.type === 'steps')
  if (stepsMetrics.length === 0) {
    return "I don't see any activity data yet. Daily step tracking is a great way to monitor your activity levels and overall health. The general recommendation is 8,000-10,000 steps per day for optimal health benefits."
  }
  
  const latestSteps = stepsMetrics[stepsMetrics.length - 1]?.value || 0
  
  if (latestSteps >= 10000) {
    return `Outstanding! You've achieved ${latestSteps.toLocaleString()} steps, which exceeds the recommended daily target. This level of activity supports cardiovascular health, mental well-being, and weight management. Keep up the excellent work!`
  } else if (latestSteps >= 7000) {
    return `Good progress with ${latestSteps.toLocaleString()} steps! You're close to the optimal range. Adding a 10-15 minute walk could easily get you to 10,000 steps and provide additional health benefits.`
  } else {
    return `You've logged ${latestSteps.toLocaleString()} steps today. While any movement is beneficial, aiming for 8,000-10,000 steps daily can significantly improve your cardiovascular health and energy levels. Consider taking short walks throughout the day.`
  }
}

function generateWeightResponse(metrics: any[]): string {
  const weightMetrics = metrics.filter(m => m.type === 'weight')
  if (weightMetrics.length === 0) {
    return "Weight tracking can provide valuable insights into your health trends over time. Regular monitoring helps you understand how your diet, exercise, and lifestyle choices affect your body composition."
  }
  
  return "Based on your weight data, I can help you track trends and correlations with your activity levels and other health metrics. Consistent tracking helps identify patterns and supports your health goals."
}

function generateGeneralResponse(metrics: any[], insights: any[]): string {
  const totalMetrics = metrics.length
  const totalInsights = insights.length
  
  if (totalMetrics === 0) {
    return "Welcome to your AI health assistant! I'm here to help analyze your health data and provide personalized insights. Start by connecting your health devices or manually logging some metrics like sleep, activity, or heart rate."
  }
  
  return `I've analyzed your ${totalMetrics} health data points and generated ${totalInsights} personalized insights. Your overall health profile shows good engagement with tracking. Would you like me to focus on any specific area like sleep optimization, activity patterns, or heart health?`
} 