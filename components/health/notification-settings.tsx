"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, MessageSquare, Smartphone, Clock, Heart, TrendingUp, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NotificationPreferences {
  email: string
  phone: string
  emailEnabled: boolean
  smsEnabled: boolean
  frequency: number
  healthAnomalies: boolean
  weeklyInsights: boolean
  goalAchievements: boolean
  medicationReminders: boolean
}

export function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: "",
    phone: "",
    emailEnabled: true,
    smsEnabled: false,
    frequency: 2,
    healthAnomalies: true,
    weeklyInsights: true,
    goalAchievements: true,
    medicationReminders: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings saved",
        description: "Your preferences have been updated successfully.",
      })
    }, 1000)
  }

  const frequencyOptions = [
    { value: 1, label: "Once per day", description: "Essential alerts only" },
    { value: 2, label: "Twice per day", description: "Morning and evening updates" },
    { value: 3, label: "Three times per day", description: "Regular health check-ins" },
    { value: 4, label: "Four times per day", description: "Frequent monitoring" },
    { value: 5, label: "Five times per day", description: "Maximum alerts" },
  ]

  const notificationTypes = [
    {
      key: "healthAnomalies" as keyof NotificationPreferences,
      icon: AlertTriangle,
      title: "Health Anomalies",
      description: "Unusual patterns in your health data",
      color: "text-red-500",
    },
    {
      key: "weeklyInsights" as keyof NotificationPreferences,
      icon: TrendingUp,
      title: "Weekly Insights",
      description: "AI-generated health summaries and trends",
      color: "text-blue-500",
    },
    {
      key: "goalAchievements" as keyof NotificationPreferences,
      icon: Heart,
      title: "Goal Achievements",
      description: "Milestone celebrations and progress updates",
      color: "text-green-500",
    },
    {
      key: "medicationReminders" as keyof NotificationPreferences,
      icon: Clock,
      title: "Medication Reminders",
      description: "Scheduled medication and supplement alerts",
      color: "text-purple-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Bell className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription className="text-white/70">
            Add your email and phone number to receive health notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={preferences.email}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, email: e.target.value }))}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white/90">
                Phone Number
              </Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={preferences.phone}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, phone: e.target.value }))}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Methods */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <MessageSquare className="h-5 w-5" />
            Delivery Methods
          </CardTitle>
          <CardDescription className="text-white/70">Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white/90">Email Notifications</Label>
              <p className="text-sm text-white/60">Detailed health reports and insights</p>
            </div>
            <Switch
              checked={preferences.emailEnabled}
              onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, emailEnabled: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white/90">SMS Notifications</Label>
              <p className="text-sm text-white/60">Critical alerts and reminders</p>
            </div>
            <Switch
              checked={preferences.smsEnabled}
              onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, smsEnabled: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Frequency Settings */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="h-5 w-5" />
            Notification Frequency
          </CardTitle>
          <CardDescription className="text-white/70">
            Control how often you receive notifications per day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={preferences.frequency.toString()}
            onValueChange={(value) => setPreferences((prev) => ({ ...prev, frequency: Number.parseInt(value) }))}
          >
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {frequencyOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  <div className="flex flex-col">
                    <span>{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
              {preferences.frequency} notification{preferences.frequency !== 1 ? "s" : ""} per day
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Bell className="h-5 w-5" />
            Notification Types
          </CardTitle>
          <CardDescription className="text-white/70">
            Choose which types of health notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationTypes.map((type) => {
            const Icon = type.icon
            return (
              <div key={type.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${type.color}`} />
                  <div className="space-y-0.5">
                    <Label className="text-white/90">{type.title}</Label>
                    <p className="text-sm text-white/60">{type.description}</p>
                  </div>
                </div>
                <Switch
                  checked={preferences[type.key] as boolean}
                  onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, [type.key]: checked }))}
                />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-white/90 hover:bg-white text-black font-medium px-8"
        >
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  )
}
