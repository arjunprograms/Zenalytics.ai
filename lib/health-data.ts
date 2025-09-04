export interface HealthMetric {
  id: string
  userId: string
  type: 'heart_rate' | 'steps' | 'sleep' | 'weight' | 'blood_pressure' | 'temperature'
  value: number
  unit: string
  timestamp: Date
  source: string
}

export interface HealthInsight {
  id: string
  userId: string
  type: 'correlation' | 'trend' | 'recommendation' | 'goal' | 'anomaly'
  title: string
  description: string
  confidence: number
  timestamp: Date
  gpt4allGenerated?: boolean
}

export interface DataSource {
  id: string
  name: string
  connected: boolean
  lastSync: string
  dataPoints: number
  status: 'active' | 'disconnected' | 'error'
}

// Cache keys
const HEALTH_METRICS_KEY = 'health_app_metrics'
const HEALTH_INSIGHTS_KEY = 'health_app_insights'
const DATA_SOURCES_KEY = 'health_app_sources'

// Demo health data
export const DEMO_HEALTH_METRICS: HealthMetric[] = [
  {
    id: 'metric-1',
    userId: 'demo-user-123',
    type: 'heart_rate',
    value: 72,
    unit: 'bpm',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    source: 'Apple Health'
  },
  {
    id: 'metric-2',
    userId: 'demo-user-123',
    type: 'steps',
    value: 8547,
    unit: 'steps',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    source: 'Fitbit'
  },
  {
    id: 'metric-3',
    userId: 'demo-user-123',
    type: 'sleep',
    value: 7.2,
    unit: 'hours',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    source: 'Apple Health'
  },
  {
    id: 'metric-4',
    userId: 'demo-user-123',
    type: 'weight',
    value: 75.5,
    unit: 'kg',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    source: 'Smart Scale'
  }
]

export const DEMO_HEALTH_INSIGHTS: HealthInsight[] = [
  {
    id: 'insight-1',
    userId: 'demo-user-123',
    type: 'correlation',
    title: 'Sleep & Heart Rate Correlation',
    description: 'GPT4All analysis shows your heart rate variability improves by 15% when you get 7+ hours of sleep. This correlation is stronger on weekends when stress levels are lower.',
    confidence: 94,
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
    gpt4allGenerated: true
  },
  {
    id: 'insight-2',
    userId: 'demo-user-123',
    type: 'trend',
    title: 'Fitness Improvement Trajectory',
    description: 'Local AI model predicts your VO2 max will reach 52.1 within 6 weeks if you maintain current training intensity. Consider adding interval training twice weekly.',
    confidence: 87,
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    gpt4allGenerated: true
  },
  {
    id: 'insight-3',
    userId: 'demo-user-123',
    type: 'anomaly',
    title: 'Unusual Heart Rate Pattern',
    description: 'Your resting heart rate has been 15% higher than usual for the past 3 days. This could indicate increased stress or early signs of illness.',
    confidence: 78,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    gpt4allGenerated: true
  }
]

export const DEMO_DATA_SOURCES: DataSource[] = [
  {
    id: 'apple-health',
    name: 'Apple Health',
    connected: true,
    lastSync: '2 minutes ago',
    dataPoints: 47,
    status: 'active'
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    connected: true,
    lastSync: '5 minutes ago',
    dataPoints: 23,
    status: 'active'
  },
  {
    id: 'google-fit',
    name: 'Google Fit',
    connected: false,
    lastSync: 'Never',
    dataPoints: 0,
    status: 'disconnected'
  }
]

// Cache utility functions
function getFromCache<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  const cached = localStorage.getItem(key)
  return cached ? JSON.parse(cached) : defaultValue
}

function saveToCache<T>(key: string, data: T) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(data))
}

// Health metrics functions
export function getHealthMetrics(userId: string): HealthMetric[] {
  const allMetrics = getFromCache<HealthMetric[]>(HEALTH_METRICS_KEY, [])
  
  // If no metrics exist and it's demo user, initialize with demo data
  if (allMetrics.length === 0 && userId === 'demo-user-123') {
    saveToCache(HEALTH_METRICS_KEY, DEMO_HEALTH_METRICS)
    return DEMO_HEALTH_METRICS
  }
  
  return allMetrics.filter(metric => metric.userId === userId)
}

export function addHealthMetric(metric: HealthMetric) {
  const allMetrics = getFromCache<HealthMetric[]>(HEALTH_METRICS_KEY, [])
  allMetrics.push(metric)
  saveToCache(HEALTH_METRICS_KEY, allMetrics)
}

// Health insights functions
export function getHealthInsights(userId: string): HealthInsight[] {
  const allInsights = getFromCache<HealthInsight[]>(HEALTH_INSIGHTS_KEY, [])
  
  // If no insights exist and it's demo user, initialize with demo data
  if (allInsights.length === 0 && userId === 'demo-user-123') {
    saveToCache(HEALTH_INSIGHTS_KEY, DEMO_HEALTH_INSIGHTS)
    return DEMO_HEALTH_INSIGHTS
  }
  
  return allInsights.filter(insight => insight.userId === userId)
}

export function addHealthInsight(insight: HealthInsight) {
  const allInsights = getFromCache<HealthInsight[]>(HEALTH_INSIGHTS_KEY, [])
  allInsights.push(insight)
  saveToCache(HEALTH_INSIGHTS_KEY, allInsights)
}

// Data sources functions
export function getDataSources(userId: string): DataSource[] {
  const sources = getFromCache<DataSource[]>(DATA_SOURCES_KEY, [])
  
  // If no sources exist and it's demo user, initialize with demo data
  if (sources.length === 0 && userId === 'demo-user-123') {
    saveToCache(DATA_SOURCES_KEY, DEMO_DATA_SOURCES)
    return DEMO_DATA_SOURCES
  }
  
  return sources
}

export function updateDataSource(sourceId: string, updates: Partial<DataSource>) {
  const sources = getFromCache<DataSource[]>(DATA_SOURCES_KEY, [])
  const index = sources.findIndex(s => s.id === sourceId)
  
  if (index !== -1) {
    sources[index] = { ...sources[index], ...updates }
    saveToCache(DATA_SOURCES_KEY, sources)
  }
}

// AI processing functions
export async function generateHealthInsight(userId: string, query?: string): Promise<HealthInsight> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const insights = [
    {
      type: 'correlation' as const,
      title: 'Exercise & Sleep Quality',
      description: 'Your sleep quality improves by 23% on days you exercise for more than 30 minutes. Morning workouts show the strongest correlation.',
      confidence: 89
    },
    {
      type: 'recommendation' as const,
      title: 'Hydration Optimization',
      description: 'Based on your activity patterns, drinking water 30 minutes before meals could improve your energy levels by 18%.',
      confidence: 82
    },
    {
      type: 'trend' as const,
      title: 'Recovery Pattern',
      description: 'Your heart rate variability has improved 12% over the past month, indicating better cardiovascular fitness and recovery.',
      confidence: 91
    }
  ]
  
  const randomInsight = insights[Math.floor(Math.random() * insights.length)]
  
  const newInsight: HealthInsight = {
    id: `insight-${Date.now()}`,
    userId,
    ...randomInsight,
    timestamp: new Date(),
    gpt4allGenerated: true
  }
  
  addHealthInsight(newInsight)
  return newInsight
}

// Health data analysis
export function analyzeHealthData(userId: string) {
  const metrics = getHealthMetrics(userId)
  const insights = getHealthInsights(userId)
  
  // Calculate basic health score
  const recentMetrics = metrics.filter(m => {
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    return new Date(m.timestamp) > dayAgo
  })
  
  const healthScore = Math.min(100, Math.max(0, 75 + (recentMetrics.length * 5)))
  
  return {
    healthScore,
    totalMetrics: metrics.length,
    totalInsights: insights.length,
    lastUpdate: new Date(),
    summary: `You have ${recentMetrics.length} health metrics recorded in the last 24 hours.`
  }
} 