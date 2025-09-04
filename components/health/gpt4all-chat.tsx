"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function GPT4AllChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI health assistant powered by GPT4All. I can analyze your health data and provide personalized insights. What would you like to know about your health metrics?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)

    try {
      // Use API instead of local function
      const { aiChatApi } = await import('@/lib/api')
      const result = await aiChatApi.sendMessage(currentInput)
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.success ? result.data?.response || 'Sorry, I could not process your request.' : 'Error occurred while processing your message.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error('Chat error:', error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const generateHealthResponse = (query: string): string => {
    // Simulate GPT4All responses based on health data
    const responses = {
      sleep:
        "Based on your recent sleep data, I notice you've been averaging 6.8 hours per night. Your sleep efficiency is good at 89%, but increasing your sleep duration to 7-8 hours could improve your heart rate variability by 10-15%. Consider establishing a consistent bedtime routine.",
      heart:
        "Your heart rate data shows excellent cardiovascular health. Your resting HR of 72 BPM is within optimal range, and your HRV of 42ms indicates good recovery. The recent 2.3% improvement suggests your current exercise routine is effective.",
      steps:
        "You're currently averaging 8,547 steps daily, which is 85% of your 10,000 step goal. Based on your activity patterns, you're most active in the mornings. Try adding a 10-minute evening walk to easily reach your daily target.",
      default:
        "I've analyzed your comprehensive health data including heart rate, sleep patterns, activity levels, and other metrics. Your overall health score of 87/100 indicates excellent wellness. Would you like me to focus on any specific area for improvement recommendations?",
    }

    const lowerQuery = query.toLowerCase()
    if (lowerQuery.includes("sleep")) return responses.sleep
    if (lowerQuery.includes("heart")) return responses.heart
    if (lowerQuery.includes("steps") || lowerQuery.includes("activity")) return responses.steps
    return responses.default
  }

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl h-[600px] flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-green-500/20">
          <Bot className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h2 className="text-white text-xl font-medium">GPT4All Health Assistant</h2>
          <p className="text-white/60">Local AI-powered health analysis and recommendations</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === "user"
                    ? "bg-blue-500/20 border border-blue-500/20"
                    : "bg-green-500/20 border border-green-500/20"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-blue-400" />
                ) : (
                  <Bot className="w-4 h-4 text-green-400" />
                )}
              </div>
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 ${
                  message.role === "user" ? "bg-blue-500/10" : ""
                }`}
              >
                <p className="text-white text-sm">{message.content}</p>
                <p className="text-white/40 text-xs mt-2">{message.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-green-500/20 border border-green-500/20 rounded-xl flex items-center justify-center">
              <Bot className="w-4 h-4 text-green-400" />
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-green-400 animate-spin" />
                <p className="text-white/60 text-sm">Analyzing your health data...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about your health metrics..."
          className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder:text-white/40"
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/20 rounded-2xl w-12 h-12 p-0"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  )
}
