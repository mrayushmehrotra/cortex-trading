import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface MarketDataProps {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  high: number
  low: number
}

const mockData: MarketDataProps[] = [
  { symbol: "RELIANCE", price: 2456.75, change: 23.45, changePercent: 0.96, volume: 1234567, high: 2478.90, low: 2445.20 },
  { symbol: "TCS", price: 3789.50, change: -45.30, changePercent: -1.18, volume: 987654, high: 3834.80, low: 3765.10 },
  { symbol: "INFY", price: 1567.25, change: 12.80, changePercent: 0.82, volume: 2345678, high: 1578.45, low: 1554.70 },
  { symbol: "HDFC", price: 1678.90, change: -8.75, changePercent: -0.52, volume: 1876543, high: 1687.65, low: 1665.30 },
]

export function MarketData() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Market Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockData.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="font-semibold">{stock.symbol}</div>
                <div className="text-sm text-muted-foreground">
                  Vol: {(stock.volume / 1000000).toFixed(1)}M
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-mono text-lg">₹{stock.price.toFixed(2)}</div>
                <div className="flex items-center gap-1">
                  {stock.change > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <Badge variant={stock.change > 0 ? "success" : "destructive"}>
                    {stock.change > 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </Badge>
                </div>
              </div>
              
              <div className="text-right text-sm text-muted-foreground ml-4">
                <div>H: ₹{stock.high.toFixed(2)}</div>
                <div>L: ₹{stock.low.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}