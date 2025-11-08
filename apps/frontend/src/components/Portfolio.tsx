import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Wallet, TrendingUp, TrendingDown, PieChart } from "lucide-react"

interface Position {
  symbol: string
  quantity: number
  avgPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
}

const mockPositions: Position[] = [
  { symbol: "RELIANCE", quantity: 50, avgPrice: 2400.00, currentPrice: 2456.75, pnl: 2837.50, pnlPercent: 2.36 },
  { symbol: "TCS", quantity: 25, avgPrice: 3800.00, currentPrice: 3789.50, pnl: -262.50, pnlPercent: -0.28 },
  { symbol: "INFY", quantity: 100, avgPrice: 1550.00, currentPrice: 1567.25, pnl: 1725.00, pnlPercent: 1.11 },
]

export function Portfolio() {
  const totalInvestment = mockPositions.reduce((sum, pos) => sum + (pos.quantity * pos.avgPrice), 0)
  const currentValue = mockPositions.reduce((sum, pos) => sum + (pos.quantity * pos.currentPrice), 0)
  const totalPnL = currentValue - totalInvestment
  const totalPnLPercent = (totalPnL / totalInvestment) * 100

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Portfolio Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">₹{totalInvestment.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Invested</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">₹{currentValue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Current Value</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">P&L</div>
            </div>
            <div className="text-center">
              <Badge variant={totalPnL >= 0 ? "success" : "destructive"} className="text-lg px-3 py-1">
                {totalPnL >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">Returns</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Holdings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Holdings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPositions.map((position) => (
              <div key={position.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-semibold">{position.symbol}</div>
                  <div className="text-sm text-muted-foreground">
                    {position.quantity} shares @ ₹{position.avgPrice.toFixed(2)}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-mono">₹{position.currentPrice.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">
                    Value: ₹{(position.quantity * position.currentPrice).toLocaleString()}
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <div className={`font-semibold ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {position.pnl >= 0 ? '+' : ''}₹{position.pnl.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-1">
                    {position.pnl >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-sm ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {position.pnlPercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}