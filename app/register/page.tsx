"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Loader2, Eye, EyeOff, Sparkles, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Password validation
  const passwordRequirements = {
    minLength: password.length >= 6,
    hasMatch: password === confirmPassword && password.length > 0,
  }

  const isFormValid = name.trim() && email.trim() && passwordRequirements.minLength && passwordRequirements.hasMatch

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid) {
      toast({
        title: "Validation Error",
        description: "Please check all requirements and try again.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to AI Health Analytics. You're now signed in.",
        })
        router.push('/dashboard')
      } else {
        toast({
          title: "Registration failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen neon-gradient-bg cyber-grid flex items-center justify-center p-4">
      {/* Enhanced neon background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl neon-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl neon-pulse" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/8 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />

      <Card className="relative glass-card-hover w-full max-w-md floating neon-border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/20 mx-auto mb-4 neon-green">
            <Sparkles className="w-8 h-8 neon-text-green" />
          </div>
          <h1 className="text-2xl font-bold neon-text-green mb-2">Create Account</h1>
          <p className="text-white/60">Join the future of health analytics</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/90">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="neon-input rounded-2xl text-white placeholder:text-white/40 h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder:text-white/40 h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder:text-white/40 h-12 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white/90">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder:text-white/40 h-12 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {passwordRequirements.minLength ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <X className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-sm ${passwordRequirements.minLength ? 'text-green-400' : 'text-red-400'}`}>
                At least 6 characters
              </span>
            </div>
            <div className="flex items-center gap-2">
              {passwordRequirements.hasMatch ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <X className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-sm ${passwordRequirements.hasMatch ? 'text-green-400' : 'text-red-400'}`}>
                Passwords match
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full neon-button-primary text-white rounded-2xl h-12 font-medium disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-4 p-4 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl">
          <p className="text-green-400 text-xs text-center">
            🔒 Your data is stored locally for privacy and demo purposes
          </p>
        </div>
      </Card>
    </div>
  )
} 