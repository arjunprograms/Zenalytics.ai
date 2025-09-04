"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Apple, Activity, Smartphone, Watch, Plus, CheckCircle, AlertCircle } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getDataSources, updateDataSource } from "@/lib/health-data"
import { demoApi } from "@/lib/api"

export function DataConnections() {
  const [connections, setConnections] = useState([
    {
      id: "apple-health",
      name: "Apple Health",
      icon: Apple,
      connected: true,
      lastSync: "2 minutes ago",
      dataPoints: 47,
      status: "active",
    },
    {
      id: "fitbit",
      name: "Fitbit",
      icon: Activity,
      connected: true,
      lastSync: "5 minutes ago",
      dataPoints: 23,
      status: "active",
    },
    {
      id: "google-fit",
      name: "Google Fit",
      icon: Smartphone,
      connected: false,
      lastSync: "Never",
      dataPoints: 0,
      status: "disconnected",
    },
    {
      id: "garmin",
      name: "Garmin Connect",
      icon: Watch,
      connected: false,
      lastSync: "Never",
      dataPoints: 0,
      status: "disconnected",
    },
  ])

  // Load data sources from backend on component mount
  useEffect(() => {
    const loadDataSources = async () => {
      try {
        const user = getCurrentUser()
        if (user) {
          const sources = getDataSources(user.id)
          if (sources.length > 0) {
            // Convert backend data to component format
            const formattedSources = sources.map(source => ({
              id: source.id,
              name: source.name,
              icon: getIconForSource(source.id),
              connected: source.connected,
              lastSync: source.lastSync,
              dataPoints: source.dataPoints,
              status: source.status,
            }))
            setConnections(formattedSources)
          }
        }
      } catch (error) {
        console.error('Failed to load data sources:', error)
      }
    }

    loadDataSources()
  }, [])

  const getIconForSource = (sourceId: string) => {
    switch (sourceId) {
      case 'apple-health': return Apple
      case 'fitbit': return Activity
      case 'google-fit': return Smartphone
      case 'garmin': return Watch
      default: return Activity
    }
  }

  const handleConnect = async (id: string) => {
    try {
      // Update local state immediately for UI responsiveness
      setConnections((prev) =>
        prev.map((conn) =>
          conn.id === id ? { ...conn, connected: true, status: "active", lastSync: "Just now" } : conn,
        ),
      )

      // Update backend
      updateDataSource(id, {
        connected: true,
        status: 'active',
        lastSync: 'Just now'
      })

      // If demo user, generate some sample data
      const user = getCurrentUser()
      if (user?.isDemo) {
        // Generate a few random metrics to simulate data sync
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            demoApi.generateRandomMetric()
          }, i * 500)
        }
      }
    } catch (error) {
      console.error('Failed to connect data source:', error)
      // Revert state on error
      setConnections((prev) =>
        prev.map((conn) =>
          conn.id === id ? { ...conn, connected: false, status: "disconnected" } : conn,
        ),
      )
    }
  }

  const handleAddDevice = async () => {
    const user = getCurrentUser()
    if (user?.isDemo) {
      // For demo users, simulate adding a new device
      await demoApi.generateRandomMetric()
      
      // Update data points for connected devices
      setConnections(prev => 
        prev.map(conn => 
          conn.connected 
            ? { ...conn, dataPoints: conn.dataPoints + 1, lastSync: 'Just now' }
            : conn
        )
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Connected Sources */}
      <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl">
        <h2 className="text-white text-xl font-medium mb-6">Connected Data Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections
            .filter((conn) => conn.connected)
            .map((connection) => {
              const Icon = connection.icon
              return (
                <div
                  key={connection.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{connection.name}</h3>
                        <p className="text-white/60 text-sm">Last sync: {connection.lastSync}</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">{connection.dataPoints} data points</span>
                    <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl h-8 px-3 text-xs">
                      Configure
                    </Button>
                  </div>
                </div>
              )
            })}
        </div>
      </Card>

      {/* Available Sources */}
      <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl">
        <h2 className="text-white text-xl font-medium mb-6">Available Data Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections
            .filter((conn) => !conn.connected)
            .map((connection) => {
              const Icon = connection.icon
              return (
                <div
                  key={connection.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{connection.name}</h3>
                        <p className="text-white/60 text-sm">Not connected</p>
                      </div>
                    </div>
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  </div>
                  <Button
                    onClick={() => handleConnect(connection.id)}
                    className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/20 rounded-xl h-8"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </div>
              )
            })}
        </div>
        
        {/* Add Demo Data Button for Demo Users */}
        {getCurrentUser()?.isDemo && (
          <div className="mt-6 p-4 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-purple-400 font-medium">Demo Mode</h3>
                <p className="text-purple-300/60 text-sm">Generate sample health data</p>
              </div>
              <Button
                onClick={handleAddDevice}
                className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/20 rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Sample Data
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
