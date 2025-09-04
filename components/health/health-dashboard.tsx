"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Activity, Heart, Zap, TrendingUp, Brain, Apple, Smartphone, Plus, Settings, Bell, User } from "lucide-react"
import { HealthMetrics } from "./health-metrics"
import { DataConnections } from "./data-connections"
import { AIInsights } from "./ai-insights"
import { AnomalyDetection } from "./anomaly-detection"
import { GPT4AllChat } from "./gpt4all-chat"
import { NotificationSettings } from "./notification-settings"
import { HealthFlowTimeline } from "./health-flow-timeline"

export function HealthDashboard() {
  const [activeView, setActiveView] = useState("overview")

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 mb-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-normal text-white mb-2">AI Health Analytics</h1>
            <p className="text-white/60">Your unified health intelligence platform</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setActiveView("notifications")}
              className="bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white rounded-2xl h-12 px-6"
            >
              <Bell className="w-5 h-5 mr-2" />
              Alerts
            </Button>
            <Button className="bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white rounded-2xl h-12 px-6">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </Button>
            <Button className="bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white rounded-2xl h-12 w-12">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-2 mb-6 shadow-2xl">
        <div className="flex gap-2 flex-wrap">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "timeline", label: "Health Flow", icon: TrendingUp },
            { id: "metrics", label: "Health Metrics", icon: Heart },
            { id: "connections", label: "Data Sources", icon: Smartphone },
            { id: "insights", label: "AI Insights", icon: Brain },
            { id: "anomalies", label: "Anomaly Detection", icon: TrendingUp },
            { id: "chat", label: "AI Assistant", icon: Brain },
            { id: "notifications", label: "Notifications", icon: Bell },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeView === id
                  ? "bg-white/20 backdrop-blur-sm text-white border border-white/20 shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {activeView === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-green-500/20">
                  <Heart className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-green-400 text-sm font-medium">+2.3%</span>
              </div>
              <h3 className="text-white text-lg font-medium mb-1">Heart Rate</h3>
              <p className="text-white/60 text-sm mb-2">Average: 72 BPM</p>
              <div className="text-2xl font-bold text-white">Excellent</div>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-blue-400 text-sm font-medium">+15%</span>
              </div>
              <h3 className="text-white text-lg font-medium mb-1">Daily Steps</h3>
              <p className="text-white/60 text-sm mb-2">Goal: 10,000</p>
              <div className="text-2xl font-bold text-white">8,547</div>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-purple-500/20">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-purple-400 text-sm font-medium">+8.1%</span>
              </div>
              <h3 className="text-white text-lg font-medium mb-1">Sleep Quality</h3>
              <p className="text-white/60 text-sm mb-2">Last night: 7.2h</p>
              <div className="text-2xl font-bold text-white">Good</div>
            </Card>

            {/* AI Health Score */}
            <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300 md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/20">
                  <Brain className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white text-xl font-medium mb-1">AI Health Score</h3>
                  <p className="text-white/60">Based on 47 data points from your connected devices</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-4xl font-bold text-white">87/100</div>
                <div className="flex-1">
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-400 h-3 rounded-full"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                  <p className="text-white/60 text-sm mt-2">Excellent health trajectory</p>
                </div>
              </div>
            </Card>

            {/* Connected Devices */}
            <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-white text-lg font-medium mb-4">Connected Devices</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <Apple className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Apple Health</p>
                    <p className="text-white/60 text-xs">Synced 2 min ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Fitbit Charge 5</p>
                    <p className="text-white/60 text-xs">Synced 5 min ago</p>
                  </div>
                </div>
                <Button className="w-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 text-white rounded-2xl h-10 mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Device
                </Button>
              </div>
            </Card>
          </div>
        )}
        {activeView === "timeline" && <HealthFlowTimeline />}
        {activeView === "metrics" && <HealthMetrics />}
        {activeView === "connections" && <DataConnections />}
        {activeView === "insights" && <AIInsights />}
        {activeView === "anomalies" && <AnomalyDetection />}
        {activeView === "chat" && <GPT4AllChat />}
        {activeView === "notifications" && <NotificationSettings />}
      </div>
    </div>
  )
}
