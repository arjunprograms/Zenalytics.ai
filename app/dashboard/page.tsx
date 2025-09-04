"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, getCurrentUser, logoutUser } from "@/lib/auth"
import { HealthDashboard } from "@/components/health/health-dashboard"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push('/login')
      } else {
        const currentUser = getCurrentUser()
        setUser(currentUser)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    logoutUser()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Top Navigation */}
        <nav className="p-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-white text-xl font-bold">AI Health Analytics</h1>
              {user?.isDemo && (
                <span className="bg-purple-500/20 border border-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                  Demo Mode
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/70">
                <User className="w-4 h-4" />
                <span className="text-sm">{user?.name}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-white/70 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto p-6">
          {user?.isDemo && (
            <div className="mb-6 p-4 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-purple-400 font-medium">🚀 Demo Mode Active</h3>
                  <p className="text-purple-300/60 text-sm">
                    You're exploring the platform with sample data. All features are fully functional!
                  </p>
                </div>
                <Button
                  onClick={() => router.push('/register')}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/20 rounded-xl"
                >
                  Create Real Account
                </Button>
              </div>
            </div>
          )}
          
          <HealthDashboard />
        </div>
      </div>
    </div>
  )
}
