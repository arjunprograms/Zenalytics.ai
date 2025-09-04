export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  isDemo?: boolean
}

export interface AuthResponse {
  success: boolean
  user?: User
  message?: string
  token?: string
}

// Cache-based user storage
const USERS_CACHE_KEY = 'health_app_users'
const CURRENT_USER_KEY = 'health_app_current_user'

// Demo user profile
export const DEMO_USER: User = {
  id: 'demo-user-123',
  email: 'demo@healthapp.com',
  name: 'Demo User',
  createdAt: new Date('2024-01-01'),
  isDemo: true
}

// Get users from cache
function getUsersFromCache(): User[] {
  if (typeof window === 'undefined') return []
  const cached = localStorage.getItem(USERS_CACHE_KEY)
  return cached ? JSON.parse(cached) : []
}

// Save users to cache
function saveUsersToCache(users: User[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(USERS_CACHE_KEY, JSON.stringify(users))
}

// Get current user from cache
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const cached = localStorage.getItem(CURRENT_USER_KEY)
  return cached ? JSON.parse(cached) : null
}

// Save current user to cache
function setCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

// Register new user
export async function registerUser(email: string, password: string, name: string): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const users = getUsersFromCache()
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'User already exists with this email' }
  }
  
  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    email,
    name,
    createdAt: new Date(),
    isDemo: false
  }
  
  users.push(newUser)
  saveUsersToCache(users)
  setCurrentUser(newUser)
  
  return { 
    success: true, 
    user: newUser, 
    token: `token-${newUser.id}`,
    message: 'Account created successfully' 
  }
}

// Login user
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const users = getUsersFromCache()
  const user = users.find(u => u.email === email)
  
  if (!user) {
    return { success: false, message: 'User not found' }
  }
  
  // In a real app, you'd verify password hash here
  // For demo purposes, accept any password
  
  setCurrentUser(user)
  
  return { 
    success: true, 
    user, 
    token: `token-${user.id}`,
    message: 'Login successful' 
  }
}

// Login with demo account
export async function loginDemo(): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  setCurrentUser(DEMO_USER)
  
  return { 
    success: true, 
    user: DEMO_USER, 
    token: `token-${DEMO_USER.id}`,
    message: 'Demo login successful' 
  }
}

// Logout user
export function logoutUser() {
  setCurrentUser(null)
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
} 