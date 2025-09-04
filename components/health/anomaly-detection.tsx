"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, TrendingDown } from "lucide-react"

export function AnomalyDetection() {
  const anomalies = [
    {
      id: 1,
      type: "warning",
      title: "Unusual Heart Rate Pattern",
      description: "Your resting heart rate has been 15% higher than usual for the past 3 days",
      timestamp: "2 hours ago",
      severity: "medium",
      resolved: false,
    },
    {
      id: 2,
      type: "info",
      title: "Sleep Pattern Change",
      description: "You've been going to bed 45 minutes later than your average bedtime",
      timestamp: "1 day ago",
      severity: "low",
      resolved: false,
    },
    {
      id: 3,
      type: "resolved",
      title: "Hydration Level Normalized",
      description: "Your hydration levels have returned to normal after yesterday's alert",
      timestamp: "2 days ago",
      severity: "low",
      resolved: true,
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white text-xl font-medium mb-2">Anomaly Detection</h2>
            <p className="text-white/60">AI-powered monitoring for unusual health patterns</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Monitoring Active</span>
          </div>
        </div>

        <div className="space-y-4">
          {anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 ${
                anomaly.severity === "medium"
                  ? "border-orange-500/30"
                  : anomaly.resolved
                    ? "border-green-500/30"
                    : "border-white/10"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    anomaly.resolved
                      ? "bg-green-500/20 border border-green-500/20"
                      : anomaly.severity === "medium"
                        ? "bg-orange-500/20 border border-orange-500/20"
                        : "bg-blue-500/20 border border-blue-500/20"
                  }`}
                >
                  {anomaly.resolved ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : anomaly.severity === "medium" ? (
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{anomaly.title}</h3>
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <Clock className="w-3 h-3" />
                      {anomaly.timestamp}
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{anomaly.description}</p>
                  {!anomaly.resolved && (
                    <div className="flex gap-2">
                      <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl h-8 px-3 text-xs">
                        View Details
                      </Button>
                      <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl h-8 px-3 text-xs">
                        Mark as Resolved
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
