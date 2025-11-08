import { MarketData } from "./MarketData"
import { OrderForm } from "./OrderForm"
import { Portfolio } from "./Portfolio"
import { OrderBook } from "./OrderBook"
import { TradingChart } from "./TradingChart"

export function TradingDashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Trading Dashboard</h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live Market Data</span>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Market Data & Order Form */}
          <div className="lg:col-span-1 space-y-6">
            <MarketData />
            <OrderForm />
          </div>

          {/* Center Column - Chart */}
          <div className="lg:col-span-2">
            <TradingChart />
          </div>

          {/* Right Column - Order Book */}
          <div className="lg:col-span-1">
            <OrderBook />
          </div>
        </div>

        {/* Bottom Section - Portfolio */}
        <div className="mt-8">
          <Portfolio />
        </div>
      </div>
    </div>
  )
}