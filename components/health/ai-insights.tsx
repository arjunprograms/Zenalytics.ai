"use client"
import { Card } from "@/components/ui/card"
import { Brain, TrendingUp, Lightbulb, Target } from "lucide-react"

export function AIInsights() {
  const insights = [
    {
      type: "correlation",
      title: "Sleep & Heart Rate Correlation",
      description: "Your heart rate variability improves by 15% when you get 7+ hours of sleep",
      confidence: 94,
      icon: Brain,
      color: "blue",
    },
    {
      type: "trend",
      title: "Fitness Improvement Trend",
      description: "Your VO2 max has increased by 8% over the past 3 months",
      confidence: 87,
      icon: TrendingUp,
      color: "green",
    },
    {
      type: "recommendation",
      title: "Hydration Optimization",
      description: "Drinking water 30 minutes before workouts could improve your performance by 12%",
      confidence: 76,
      icon: Lightbulb,
      color: "cyan",
    },
    {
      type: "goal",
      title: "Weekly Step Goal Achievement",
      description: "You're 23% more likely to hit your step goal on days you exercise in the morning",
      confidence: 91,
      icon: Target,
      color: "purple",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/20">
            <Brain className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white text-xl font-medium">AI-Powered Health Insights</h2>
            <p className="text-white/60">Personalized correlations and recommendations based on your data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 bg-${insight.color}-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-${insight.color}-500/20 flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 text-${insight.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">{insight.title}</h3>
                    <p className="text-white/70 text-sm mb-3">{insight.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div
                          className={`bg-${insight.color}-400 h-2 rounded-full`}
                          style={{ width: `${insight.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-white/60 text-xs">{insight.confidence}% confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
