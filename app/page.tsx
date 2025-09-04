"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Activity, Sparkles, ArrowRight, Shield, Zap } from "lucide-react"
import { getCurrentUser, isAuthenticated } from "@/lib/auth"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      if (isAuthenticated()) {
        router.push('/dashboard')
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

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
        {/* Navigation */}
        <nav className="p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/20">
                <Brain className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-white text-xl font-bold">AI Health Analytics</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:text-cyan-400">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 rounded-2xl">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">AI-Powered Health Intelligence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your Health Data Into
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Actionable Insights
              </span>
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Connect all your health devices and get AI-powered insights that help you understand 
              the complex relationships between your sleep, exercise, nutrition, and overall well-being.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 rounded-2xl h-12 px-8 text-lg">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 text-white border border-purple-500/20 rounded-2xl h-12 px-8 text-lg backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/20 mb-6">
                <Brain className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-white text-xl font-bold mb-4">AI-Powered Correlations</h3>
              <p className="text-white/60">
                Discover hidden relationships between your health metrics. Our AI identifies patterns 
                like how sleep quality affects your workout performance.
              </p>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-purple-500/20 mb-6">
                <Activity className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-white text-xl font-bold mb-4">Unified Dashboard</h3>
              <p className="text-white/60">
                Connect Apple Health, Fitbit, Google Fit, and more. View all your health data 
                in one comprehensive, easy-to-understand dashboard.
              </p>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-green-500/20 mb-6">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white text-xl font-bold mb-4">Privacy-First AI</h3>
              <p className="text-white/60">
                Your health data stays private. Our local AI processing ensures your personal 
                information never leaves your device while still providing powerful insights.
              </p>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-[24px] p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/20 mx-auto mb-6">
              <Zap className="w-10 h-10 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Health Journey?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who have discovered the power of AI-driven health insights. 
              Start your journey to better health today.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 rounded-2xl h-12 px-8 text-lg">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl h-12 px-8 text-lg backdrop-blur-sm">
                  Explore Demo
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
