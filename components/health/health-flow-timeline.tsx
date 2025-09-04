"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { TrendingUp, Download, RefreshCw, Sparkles } from "lucide-react"

const healthFlowData = [
  { day: "Wed", heartRate: 4.2, steps: 6.8, sleep: 7.1, energy: 5.9 },
  { day: "Thu", heartRate: 3.8, steps: 5.2, sleep: 6.4, energy: 5.1 },
  { day: "Fri", heartRate: 5.1, steps: 8.3, sleep: 8.2, energy: 7.8 },
  { day: "Sat", heartRate: 6.2, steps: 9.1, sleep: 7.9, energy: 8.4 },
  { day: "Sun", heartRate: 5.8, steps: 7.6, sleep: 6.8, energy: 7.2 },
  { day: "Mon", heartRate: 4.9, steps: 8.9, sleep: 7.5, energy: 8.1 },
  { day: "Tue", heartRate: 3.2, steps: 5.4, sleep: 6.2, energy: 5.8 },
]

export function HealthFlowTimeline() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-purple-500/20">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-medium text-white">Zenalytics</h2>
              <p className="text-cyan-400 text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                AI Advanced Analysis Active
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
              {["7d", "14d", "30d"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedPeriod === period ? "bg-white text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
            <Button className="bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 text-white rounded-2xl h-10 px-4">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* AI Analysis Banner */}
        <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-green-400 animate-spin" />
            </div>
            <p className="text-green-400 text-sm font-medium">
              AI analysis enabled: Processing 7 days of health data for advanced pattern recognition
            </p>
          </div>
        </div>
      </Card>

      {/* Health Flow Timeline Chart */}
      <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
          <div>
            <h3 className="text-xl font-medium text-white">Health Flow Timeline</h3>
            <p className="text-cyan-400 text-sm">Advanced visualization of interconnected health metrics</p>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={healthFlowData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="heartRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="steps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="sleep" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#ffffff60", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#ffffff60", fontSize: 12 }} domain={[0, 12]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  backdropFilter: "blur(20px)",
                  color: "white",
                }}
              />
              <Area type="monotone" dataKey="sleep" stackId="1" stroke="#8b5cf6" strokeWidth={2} fill="url(#sleep)" />
              <Area type="monotone" dataKey="steps" stackId="1" stroke="#3b82f6" strokeWidth={2} fill="url(#steps)" />
              <Area
                type="monotone"
                dataKey="heartRate"
                stackId="1"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#heartRate)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Health Story Summary */}
      <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/20">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">Your Health Story This Week</h3>
              <p className="text-white/60 text-sm">
                Comprehensive analysis of your health patterns and their interconnections
              </p>
            </div>
          </div>
          <div className="bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/20 rounded-2xl px-4 py-2">
            <span className="text-cyan-400 text-sm font-medium">7-Day Analysis</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
