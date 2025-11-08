import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Badge } from "~/components/ui/badge"
import { ShoppingCart, TrendingUp, TrendingDown } from "lucide-react"

export function OrderForm() {
  const [orderType, setOrderType] = useState("market")
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [symbol, setSymbol] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ orderType, side, symbol, quantity, price })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Place Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={side === "buy" ? "default" : "outline"}
              onClick={() => setSide("buy")}
              className="bg-green-600 hover:bg-green-700"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Buy
            </Button>
            <Button
              type="button"
              variant={side === "sell" ? "default" : "outline"}
              onClick={() => setSide("sell")}
              className="bg-red-600 hover:bg-red-700"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Sell
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium">Symbol</label>
            <Input
              placeholder="e.g., RELIANCE"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Order Type</label>
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market">Market</SelectItem>
                <SelectItem value="limit">Limit</SelectItem>
                <SelectItem value="stop">Stop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Quantity</label>
            <Input
              type="number"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1"
            />
          </div>

          {orderType !== "market" && (
            <div>
              <label className="text-sm font-medium">Price</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">Estimated Value:</span>
            <Badge variant="outline">
              ₹{quantity && price ? (Number(quantity) * Number(price)).toFixed(2) : "0.00"}
            </Badge>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Place {side.toUpperCase()} Order
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}