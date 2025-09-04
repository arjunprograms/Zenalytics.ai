"use client"
import { Card } from "@/components/ui/card"
import { Heart, Activity, Moon, Droplets, Thermometer, Scale } from "lucide-react"

export function HealthMetrics() {
  const metrics = [
    {
      title: "Heart Rate Variability",
      value: "42ms",
      trend: "+5.2%",
      icon: Heart,
      color: "red",
      description: "Indicates good cardiovascular health and recovery",
    },
    {
      title: "VO2 Max",
      value: "48.3",
      trend: "+2.1%",
      icon: Activity,
      color: "blue",
      description: "Above average for your age group",
    },
    {
      title: "Sleep Efficiency",
      value: "89%",
      trend: "+3.4%",
      icon: Moon,
      color: "purple",
      description: "Excellent sleep quality with minimal interruptions",
    },
    {
      title: "Hydration Level",
      value: "2.1L",
      trend: "-0.3L",
      icon: Droplets,
      color: "cyan",
      description: "Slightly below recommended daily intake",
    },
    {
      title: "Body Temperature",
      value: "98.6°F",
      trend: "Normal",
      icon: Thermometer,
      color: "orange",
      description: "Within healthy range",
    },
    {
      title: "Body Mass Index",
      value: "22.4",
      trend: "-0.2",
      icon: Scale,
      color: "green",
      description: "Healthy weight range",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card
            key={index}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-${metric.color}-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-${metric.color}-500/20`}
              >
                <Icon className={`w-6 h-6 text-${metric.color}-400`} />
              </div>
              <span
                className={`text-${metric.trend.startsWith("+") ? "green" : metric.trend.startsWith("-") ? "red" : "white"}-400 text-sm font-medium`}
              >
                {metric.trend}
              </span>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">{metric.title}</h3>
            <div className="text-3xl font-bold text-white mb-3">{metric.value}</div>
            <p className="text-white/60 text-sm">{metric.description}</p>
          </Card>
        )
      })}
    </div>
  )
}
