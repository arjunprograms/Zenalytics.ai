"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Lightbulb, Target, Zap, RefreshCw } from "lucide-react"

export function EnhancedAIInsights() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [insights, setInsights] = useState([
    {
      type: "correlation",
      title: "Sleep & Heart Rate Correlation",
      description:
        "GPT4All analysis shows your heart rate variability improves by 15% when you get 7+ hours of sleep. This correlation is stronger on weekends when stress levels are lower.",
      confidence: 94,
      icon: Brain,
      color: "blue",
      gpt4allGenerated: true,
    },
    {
      type: "trend",
      title: "Fitness Improvement Trajectory",
      description:
        "Local AI model predicts your VO2 max will reach 52.1 within 6 weeks if you maintain current training intensity. Consider adding interval training twice weekly.",
      confidence: 87,
      icon: TrendingUp,
      color: "green",
      gpt4allGenerated: true,
    },
    {
      type: "recommendation",
      title: "Personalized Hydration Strategy",
      description:
        "GPT4All recommends drinking 250ml water 45 minutes before workouts based on your sweat rate analysis. This could improve performance by 12% and reduce recovery time.",
      confidence: 89,
      icon: Lightbulb,
      color: "cyan",
      gpt4allGenerated: true,
    },
    {
      type: "goal",
      title: "Optimal Exercise Timing",
      description:
        "AI analysis of your circadian rhythm data suggests 9:30 AM workouts align best with your natural energy peaks, increasing workout effectiveness by 18%.",
      confidence: 91,
      icon: Target,
      color: "purple",
      gpt4allGenerated: true,
    },
  ])

  const generateNewInsights = async () => {
    setIsGenerating(true)

    // Simulate GPT4All processing
    setTimeout(() => {
      const newInsight = {
        type: "optimization",
        title: "Recovery Pattern Optimization",
        description:
          "GPT4All has identified that your recovery metrics improve 23% when you take rest days after high-intensity sessions. Consider scheduling active recovery on Wednesdays.",
        confidence: 85,
        icon: Zap,
        color: "orange",
        gpt4allGenerated: true,
      }

      setInsights((prev) => [newInsight, ...prev.slice(0, 3)])
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/20">
              <Brain className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-white text-xl font-medium">GPT4All Health Intelligence</h2>
              <p className="text-white/60">Local AI-powered correlations and personalized recommendations</p>
            </div>
          </div>
          <Button
            onClick={generateNewInsights}
            disabled={isGenerating}
            className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/20 rounded-2xl"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
            {isGenerating ? "Generating..." : "Generate New Insights"}
          </Button>
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
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-medium">{insight.title}</h3>
                      {insight.gpt4allGenerated && (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-lg border border-green-500/20">
                          GPT4All
                        </span>
                      )}
                    </div>
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
