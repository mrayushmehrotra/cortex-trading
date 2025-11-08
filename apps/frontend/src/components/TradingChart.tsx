import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react"
import { useState } from "react"

interface ChartData {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

const mockChartData: ChartData[] = [
  { time: "09:15", open: 2450, high: 2465, low: 2445, close: 2460, volume: 125000 },
  { time: "09:30", open: 2460, high: 2470, low: 2455, close: 2465, volume: 98000 },
  { time: "09:45", open: 2465, high: 2475, low: 2460, close: 2470, volume: 110000 },
  { time: "10:00", open: 2470, high: 2480, low: 2465, close: 2475, volume: 87000 },
  { time: "10:15", open: 2475, high: 2485, low: 2470, close: 2480, volume: 95000 },
]

const timeframes = ["1m", "5m", "15m", "1h", "1d"]

export function TradingChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("15m")
  const [selectedSymbol] = useState("RELIANCE")

  const currentPrice = 2456.75
  const change = 23.45
  const changePercent = 0.96

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {selectedSymbol} Chart
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-2xl font-bold">₹{currentPrice.toFixed(2)}</div>
              <div className="flex items-center gap-1">
                {change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <Badge variant={change > 0 ? "success" : "destructive"}>
                  {change > 0 ? "+" : ""}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={selectedTimeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Simplified chart representation */}
        <div className="h-64 bg-muted rounded-lg p-4 flex items-end justify-between">
          {mockChartData.map((candle, index) => {
            const isGreen = candle.close > candle.open
            const bodyHeight = Math.abs(candle.close - candle.open) / 5 // Simplified scaling
            const wickTop = (candle.high - Math.max(candle.open, candle.close)) / 5
            const wickBottom = (Math.min(candle.open, candle.close) - candle.low) / 5
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-muted-foreground mb-2">{candle.time}</div>
                <div className="flex flex-col items-center">
                  {/* Upper wick */}
                  <div 
                    className={`w-0.5 ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ height: `${wickTop * 4}px` }}
                  />
                  {/* Body */}
                  <div 
                    className={`w-4 ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ height: `${Math.max(bodyHeight * 4, 2)}px` }}
                  />
                  {/* Lower wick */}
                  <div 
                    className={`w-0.5 ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ height: `${wickBottom * 4}px` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {(candle.volume / 1000).toFixed(0)}K
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Chart indicators */}
        <div className="mt-4 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>RSI: 65.4</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>MACD: 12.3</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>EMA(20): 2445.6</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}