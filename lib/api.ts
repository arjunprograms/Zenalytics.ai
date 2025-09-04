import { getCurrentUser } from './auth'

// API client configuration
const API_BASE = '/api'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Helper function to make API calls
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'API call failed')
    }

    return { success: true, data }
  } catch (error) {
    console.error('API call error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Health Insights API
export const healthInsightsApi = {
  // Get all insights for current user
  getInsights: async () => {
    const user = getCurrentUser()
    if (!user) throw new Error('No authenticated user')
    
    return apiCall(`/health/insights?userId=${user.id}`)
  },

  // Generate new insight
  generateInsight: async (query?: string) => {
    const user = getCurrentUser()
    if (!user) throw new Error('No authenticated user')
    
    return apiCall('/health/insights', {
      method: 'POST',
      body: JSON.stringify({ userId: user.id, query }),
    })
  },
}

// Health Metrics API
export const healthMetricsApi = {
  // Get all metrics for current user
  getMetrics: async (analyze: boolean = false) => {
    const user = getCurrentUser()
    if (!user) throw new Error('No authenticated user')
    
    return apiCall(`/health/metrics?userId=${user.id}&analyze=${analyze}`)
  },

  // Add new health metric
  addMetric: async (type: string, value: number, unit: string, source: string) => {
    const user = getCurrentUser()
    if (!user) throw new Error('No authenticated user')
    
    return apiCall('/health/metrics', {
      method: 'POST',
      body: JSON.stringify({ userId: user.id, type, value, unit, source }),
    })
  },
}

// AI Chat API
export const aiChatApi = {
  // Send message to AI assistant
  sendMessage: async (message: string) => {
    const user = getCurrentUser()
    if (!user) throw new Error('No authenticated user')
    
    return apiCall('/health/chat', {
      method: 'POST',
      body: JSON.stringify({ userId: user.id, message }),
    })
  },
}

// Auth API
export const authApi = {
  // Login user
  login: async (email: string, password: string, isDemo: boolean = false) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, isDemo }),
    })
  },

  // Register user
  register: async (name: string, email: string, password: string) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  },
}

// Utility functions for demo data
export const demoApi = {
  // Initialize demo data
  initializeDemoData: async () => {
    const user = getCurrentUser()
    if (!user?.isDemo) return { success: false, error: 'Not a demo user' }
    
    // Trigger data initialization by calling metrics API
    return healthMetricsApi.getMetrics(true)
  },

  // Generate random health metric for demo
  generateRandomMetric: async () => {
    const user = getCurrentUser()
    if (!user?.isDemo) return { success: false, error: 'Not a demo user' }
    
    const metricTypes = [
      { type: 'heart_rate', min: 60, max: 100, unit: 'bpm' },
      { type: 'steps', min: 5000, max: 15000, unit: 'steps' },
      { type: 'sleep', min: 6, max: 9, unit: 'hours' },
      { type: 'weight', min: 60, max: 90, unit: 'kg' },
    ]
    
    const randomMetric = metricTypes[Math.floor(Math.random() * metricTypes.length)]
    const value = Math.random() * (randomMetric.max - randomMetric.min) + randomMetric.min
    
    return healthMetricsApi.addMetric(
      randomMetric.type,
      Math.round(value * 10) / 10,
      randomMetric.unit,
      'Demo Device'
    )
  },
} 